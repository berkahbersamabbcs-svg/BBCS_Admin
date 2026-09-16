// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MODUL TRANSAKSI UMUM
// VERSI FINAL
// =====================================
//
// TRANSAKSI UMUM:
// Kategori    : Pemasukan / Pengeluaran
// Nominal     : Jumlah transaksi
// Tanggal     : Otomatis new Date()
// Keterangan  : Penjelasan transaksi
//
// LOGIKA:
//
// PEMASUKAN
// → PENDAPATAN BBCS
// → KAS MASUK
//
// PENGELUARAN
// → PENGURANG LABA
// → KAS KELUAR
//
// CATATAN:
// Transaksi Pinjaman, Simpanan, Angsuran,
// Investor, dan transaksi otomatis lainnya
// TIDAK berasal dari menu ini.
// =====================================

console.log(
    "Modul Transaksi BBCS Aktif"
);


// =====================================
// KONSTANTA
// =====================================

const KATEGORI_PEMASUKAN =
    "Pemasukan";

const KATEGORI_PENGELUARAN =
    "Pengeluaran";

const KLASIFIKASI_PENDAPATAN =
    "PENDAPATAN";

const KLASIFIKASI_PENGURANG_LABA =
    "PENGURANG_LABA";

const SUMBER_TRANSAKSI_UMUM =
    "TRANSAKSI_UMUM";

const NAMA_KATEGORI =
    "Transaksi Umum";


// =====================================
// VALIDASI KATEGORI
// =====================================

function validasiKategoriTransaksiUmum(
    kategori
){

    return (
        kategori === KATEGORI_PEMASUKAN ||
        kategori === KATEGORI_PENGELUARAN
    );

}


// =====================================
// TENTUKAN KLASIFIKASI
// =====================================

function klasifikasiTransaksiUmum(
    kategori
){

    if(
        kategori ===
        KATEGORI_PEMASUKAN
    ){

        return KLASIFIKASI_PENDAPATAN;

    }


    if(
        kategori ===
        KATEGORI_PENGELUARAN
    ){

        return KLASIFIKASI_PENGURANG_LABA;

    }


    return null;

}


// =====================================
// FORMAT TANGGAL OTOMATIS
// =====================================

function tanggalTransaksiBBCS(){

    return new Date()
        .toLocaleDateString(
            "id-ID"
        );

}


// =====================================
// PILIH ANGGOTA
// =====================================
//
// Tidak digunakan lagi oleh form
// Transaksi Umum.
// Fungsi tetap dipertahankan untuk
// kompatibilitas modul lama.
// =====================================

function tampilPilihanAnggotaTransaksi(){

    let pilih =
        document.getElementById(
            "pilihAnggota"
        );


    if(!pilih){

        return;

    }


    pilih.innerHTML =
        "<option value=''>Pilih Anggota</option>";


    if(
        !Array.isArray(anggota)
    ){

        return;

    }


    anggota.forEach(function(item){

        if(!item){

            return;

        }


        pilih.innerHTML += `

            <option value="${item.id}">
                ${item.id} - ${item.nama}
            </option>

        `;

    });

}


// =====================================
// ISI DATA ANGGOTA
// =====================================
//
// Dipertahankan untuk kompatibilitas.
// Tidak digunakan Transaksi Umum baru.
// =====================================

function isiAnggotaTransaksi(){

    let pilih =
        document.getElementById(
            "pilihAnggota"
        );


    if(!pilih){

        return;

    }


    let id =
        pilih.value;


    let data =
        Array.isArray(anggota)

            ? anggota.find(function(item){

                return item.id == id;

            })

            : null;


    if(!data){

        return;

    }


    let nomor =
        document.getElementById(
            "nomorTransaksi"
        );


    let nama =
        document.getElementById(
            "namaTransaksi"
        );


    if(nomor){

        nomor.value =
            data.id;

    }


    if(nama){

        nama.value =
            data.nama;

    }

}


// =====================================
// SIMPAN TRANSAKSI UMUM
// =====================================

function simpanTransaksi(){

    // =================================
    // AMBIL KATEGORI
    // =================================

    let inputKategori =
        document.getElementById(
            "kategoriTransaksi"
        );


    if(!inputKategori){

        alert(
            "Kolom kategori transaksi tidak ditemukan."
        );

        return;

    }


    let kategori =
        inputKategori.value;


    // =================================
    // VALIDASI KATEGORI
    // =================================

    if(
        !validasiKategoriTransaksiUmum(
            kategori
        )
    ){

        alert(
            "Silakan pilih Pemasukan atau Pengeluaran."
        );

        return;

    }


    // =================================
    // TENTUKAN KLASIFIKASI
    // =================================

    let klasifikasi =
        klasifikasiTransaksiUmum(
            kategori
        );


    if(!klasifikasi){

        alert(
            "Klasifikasi transaksi tidak valid."
        );

        return;

    }


    // =================================
    // AMBIL NOMINAL
    // =================================

    let inputJumlah =
        document.getElementById(
            "jumlahTransaksi"
        );


    if(!inputJumlah){

        alert(
            "Kolom nominal transaksi tidak ditemukan."
        );

        return;

    }


    let jumlah =
        angkaNilai(
            inputJumlah.value
        );


    // =================================
    // VALIDASI NOMINAL
    // =================================

    if(
        !Number.isFinite(jumlah) ||
        jumlah <= 0
    ){

        alert(
            "Nominal transaksi belum diisi."
        );

        return;

    }


    // =================================
    // AMBIL KETERANGAN
    // =================================

    let inputKeterangan =
        document.getElementById(
            "keteranganTransaksi"
        );


    if(!inputKeterangan){

        alert(
            "Kolom keterangan transaksi tidak ditemukan."
        );

        return;

    }


    let keterangan =
        inputKeterangan.value.trim();


    // =================================
    // VALIDASI KETERANGAN
    // =================================

    if(!keterangan){

        alert(
            "Keterangan transaksi belum diisi."
        );

        return;

    }


    // =================================
    // TANGGAL OTOMATIS
    // =================================

    let tanggal =
        tanggalTransaksiBBCS();


    // =================================
    // REFERENSI OTOMATIS
    // =================================

    let referensi =
        "TR-" +
        Date.now();


    // =================================
    // KONFIRMASI
    // =================================

    let pesanKonfirmasi =

        "Konfirmasi Transaksi\n\n" +

        "Kategori : " +
        kategori +
        "\n" +

        "Nominal : " +
        rupiah(jumlah) +
        "\n" +

        "Keterangan : " +
        keterangan +
        "\n\n" +

        (
            kategori ===
            KATEGORI_PEMASUKAN

                ? "Transaksi ini akan menjadi Pendapatan BBCS."

                : "Transaksi ini akan menjadi Pengurang Laba."
        );


    let yakin =
        confirm(
            pesanKonfirmasi
        );


    if(!yakin){

        return;

    }


    // =================================
    // SIMPAN KE DATABASE TRANSAKSI
    // =================================

    tambahTransaksi(

        kategori,

        NAMA_KATEGORI,

        keterangan,

        jumlah,

        null,

        null,

        referensi

    );


    // =================================
    // AMBIL TRANSAKSI TERAKHIR
    // =================================

    let transaksiTerakhir =
        transaksi[
            transaksi.length - 1
        ];


    if(!transaksiTerakhir){

        alert(
            "Transaksi gagal disimpan."
        );

        return;

    }


    // =================================
    // TAMBAHKAN INFORMASI MESIN
    // =================================

    transaksiTerakhir.tanggal =
        tanggal;


    transaksiTerakhir.kategori =
        kategori;


    transaksiTerakhir.jenis =
        kategori;


    transaksiTerakhir.klasifikasi =
        klasifikasi;


    transaksiTerakhir.sumber =
        SUMBER_TRANSAKSI_UMUM;


    transaksiTerakhir.tipeLaporan =

        kategori ===
        KATEGORI_PEMASUKAN

            ? "PENDAPATAN"

            : "PENGURANG_LABA";


    // =================================
    // SIMPAN KE KAS
    // =================================

    kas.push({

        id:
            nomorKasBaru(),

        tanggal:
            tanggal,

        jenis:
            kategori,

        kategori:
            NAMA_KATEGORI,

        keterangan:
            keterangan,

        jumlah:
            jumlah,

        idAnggota:
            null,

        namaAnggota:
            null,

        referensi:
            referensi,

        sumber:
            SUMBER_TRANSAKSI_UMUM,

        klasifikasi:
            klasifikasi

    });


    // =================================
    // DATA CETAK
    // =================================

    let dataCetak = {

        referensi:
            referensi,

        tanggal:
            tanggal,

        anggota:
            null,

        nama:
            null,

        jenis:
            kategori,

        kategori:
            NAMA_KATEGORI,

        klasifikasi:
            klasifikasi,

        jumlah:
            jumlah,

        keterangan:
            keterangan,

        status:
            "BERHASIL"

    };


    localStorage.setItem(

        "dataCetak",

        JSON.stringify(
            dataCetak
        )

    );


    // =================================
    // SIMPAN DATABASE
    // =================================

    simpanDatabaseAman();


    // =================================
    // BERSIHKAN FORM
    // =================================

    inputJumlah.value =
        "";

    inputKeterangan.value =
        "";


    // =================================
    // SELESAI
    // =================================

    alert(

        kategori ===
        KATEGORI_PEMASUKAN

            ? "Pemasukan berhasil dicatat sebagai Pendapatan BBCS."

            : "Pengeluaran berhasil dicatat sebagai Pengurang Laba."

    );


    console.log(
        "✅ Transaksi Umum berhasil:",
        transaksiTerakhir
    );

}


// =====================================
// RINGKASAN TRANSAKSI UMUM
// =====================================

function hitungRingkasanTransaksiUmum(){

    if(
        !Array.isArray(transaksi)
    ){

        return {

            pemasukan: 0,

            pengeluaran: 0,

            pendapatan: 0,

            pengurangLaba: 0,

            netto: 0

        };

    }


    let data =
        transaksi.filter(function(item){

            return (

                item &&
                item.sumber ===
                    SUMBER_TRANSAKSI_UMUM

            );

        });


    let pemasukan =
        0;

    let pengeluaran =
        0;


    data.forEach(function(item){

        let jumlah =
            Number(
                item.jumlah || 0
            );


        if(
            item.klasifikasi ===
            KLASIFIKASI_PENDAPATAN
        ){

            pemasukan +=
                jumlah;

        }


        if(
            item.klasifikasi ===
            KLASIFIKASI_PENGURANG_LABA
        ){

            pengeluaran +=
                jumlah;

        }

    });


    return {

        pemasukan:
            pemasukan,

        pengeluaran:
            pengeluaran,

        pendapatan:
            pemasukan,

        pengurangLaba:
            pengeluaran,

        netto:
            pemasukan -
            pengeluaran

    };

}


// =====================================
// RIWAYAT TRANSAKSI
// =====================================
//
// TIDAK DITAMPILKAN DI APK.
// Data tetap tersimpan di database.
//
// Fungsi ini sengaja tidak membuat
// tampilan riwayat lagi.
// =====================================

function tampilRiwayatTransaksi(){

    console.log(
        "Riwayat Transaksi Umum disimpan di database."
    );

}


// =====================================
// INIT MODUL TRANSAKSI
// =====================================

function initTransaksiBBCS(){

    console.log(
        "✅ Modul Transaksi BBCS siap digunakan."
    );

}


// =====================================
// INIT
// =====================================

if(
    document.readyState ===
    "loading"
){

    document.addEventListener(

        "DOMContentLoaded",

        initTransaksiBBCS

    );

} else {

    initTransaksiBBCS();

}


// =====================================
// EXPORT GLOBAL
// =====================================

window.tambahTransaksi =
    tambahTransaksi;

window.simpanTransaksi =
    simpanTransaksi;

window.tampilPilihanAnggotaTransaksi =
    tampilPilihanAnggotaTransaksi;

window.isiAnggotaTransaksi =
    isiAnggotaTransaksi;

window.tampilRiwayatTransaksi =
    tampilRiwayatTransaksi;

window.hitungRingkasanTransaksiUmum =
    hitungRingkasanTransaksiUmum;

window.klasifikasiTransaksiUmum =
    klasifikasiTransaksiUmum;

console.log(
    "✅ Transaksi BBCS pembaruan siap."
);