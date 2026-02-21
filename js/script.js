// Tempat menyimpan data task
let listTugas = [];

// Fungsi pembantu untuk mengubah yyyy-mm-dd menjadi dd/mm/yyyy
function formatTanggal(tanggalMentah) {
    if (!tanggalMentah) return "";
    
    // Memecah tanggal berdasarkan tanda strip (-)
    // Contoh: "2024-12-31" menjadi ["2024", "12", "31"]
    let bagian = tanggalMentah.split("-");
    
    // Gabungkan kembali dengan urutan: Hari / Bulan / Tahun
    return bagian[2] + "/" + bagian[1] + "/" + bagian[0];
}

// Fungsi untuk menambah task
function tambahTugas() {
    let inputTugas = document.getElementById("todo-input");
    let inputTanggal = document.getElementById("todo-date");

    // Validasi
    if (inputTugas.value === "" || inputTanggal.value === "") {
        alert("Fill in the task and date first, okay!");
        return;
    }

    // Masukkan data ke dalam Array
    let tugasBaru = {
        nama: inputTugas.value,
        tanggal: inputTanggal.value,
        status: false
    };

    listTugas.push(tugasBaru);

    // Kosongkan input lagi
    inputTugas.value = "";
    inputTanggal.value = "";

    tampilkanData();
}

// Fungsi untuk menampilkan data ke tabel dengan fitur FILTER
function tampilkanData() {
    let tabel = document.getElementById("tabel-body");
    let pesan = document.getElementById("pesan-kosong");
    let filterSekarang = document.getElementById("filter-select").value; // Ambil nilai filter (semua/selesai/belum)
    
    tabel.innerHTML = ""; // Bersihkan tabel agar tidak menumpuk

    let adaDataDitampilkan = false;

    // Ulangi daftar tugas satu per satu
    for (let i = 0; i < listTugas.length; i++) {
        let item = listTugas[i];

        if (
            filterSekarang === "semua" || 
            (filterSekarang === "selesai" && item.status === true) || 
            (filterSekarang === "belum" && item.status === false)) 
            {
                adaDataDitampilkan = true;

                let baris = `
                <tr>
                    <td class="${item.status ? 'coret' : ''}">${item.nama}</td>
                    <td class="${item.status ? 'coret' : ''}">${formatTanggal(item.tanggal)}</td>
                    <td>
                        <input type="checkbox" ${item.status ? 'checked' : ''} onclick="ubahStatus(${i})">
                    </td>
                    <td>
                        <button onclick="hapusSatu(${i})" style="color:#ff4d4d; background:none; border:none; cursor:pointer;">Hapus</button>
                    </td>
                </tr>
                `;
                tabel.innerHTML += baris;
            }
        }

    // Tampilkan pesan "No task found" jika filter kosong atau array kosong
    if (!adaDataDitampilkan) {
        pesan.style.display = "block";
    } else {
        pesan.style.display = "none";
    }
}

// Fungsi ubah status (Finished/Not finished)
function ubahStatus(index) {
    listTugas[index].status = !listTugas[index].status;
    tampilkanData();
}

// Fungsi hapus satu tugas
function hapusSatu(index) {
    listTugas.splice(index, 1);
    tampilkanData();
}

// Fungsi hapus semua
function hapusSemua() {
    if (confirm("Hapus semua tugas?")) {
        listTugas = [];
        tampilkanData();
    }
}

// Fungsi ini dipanggil setiap kali dropdown filter diubah
function filterTugas() {
    tampilkanData(); // Panggil ulang fungsi tampilkan data karena logika filter sudah ada di dalamnya
}