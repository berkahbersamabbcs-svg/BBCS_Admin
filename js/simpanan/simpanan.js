// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MODUL SIMPANAN BBCS
// TERINTEGRASI TRANSAKSI + KAS
// BAGIAN 1/2
// =====================================

console.log(
    "Modul Simpanan BBCS Aktif"
);


// =====================================
// PILIH ANGGOTA
// =====================================

function tampilPilihanAnggotaSimpanan(){

    let pilih =
        document.getElementById(
            "pilihAnggotaSimpanan"
        );


    if(!pilih){

        return;

    }


    pilih.innerHTML = `
        <option value="">
            Pilih Anggota
        </option>
    `;


    if(
        !Array.isArray(anggota)
    ){

        return;

    }


    anggota.forEach(function(item){

        if(
            !item ||
            !item.id
        ){

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
// SIMPAN SETORAN
// =====================================

function simpanSimpanan(){

    let pilih =
        document.getElementById(
            "pilihAnggotaSimpanan"
        );


    if(!pilih){

        return;

    }


    let idAnggota =
        pilih.value;


    // =================================
    // VALIDASI ANGGOTA
    // =================================

    if(!idAnggota){

        alert(
            "Pilih anggota terlebih dahulu"
        );

        return;

    }


    // =================================
    // JENIS SIMPANAN
    // =================================

    let jenisElement =
        document.getElementById(
            "jenisSimpanan"
        );


    if(!jenisElement){

        alert(
            "Jenis simpanan tidak ditemukan"
        );

        return;

    }


    let jenis =
        jenisElement.value;


    if(!jenis){

        alert(
            "Jenis simpanan belum dipilih"
        );

        return;

    }


    // =================================
    // JUMLAH
    // =================================

    let jumlahElement =
        document.getElementById(
            "jumlahSimpanan"
        );


    if(!jumlahElement){

        alert(
            "Kolom jumlah simpanan tidak ditemukan"
        );

        return;

    }


    let jumlah =
        angkaNilai(
            jumlahElement.value
        );


    if(jumlah <= 0){

        alert(
            "Jumlah simpanan belum diisi"
        );

        return;

    }


    // =================================
    // CARI ANGGOTA
    // =================================

    let dataAnggota =
        anggota.find(function(item){

            return (
                item &&
                item.id == idAnggota
            );

        });


    if(!dataAnggota){

        alert(
            "Anggota tidak ditemukan"
        );

        return;

    }


    // =================================
    // CARI REKENING
    // =================================

    let rek =
        cariRekening(
            idAnggota
        );


    if(!rek){

        alert(
            "Rekening tidak ditemukan"
        );

        return;

    }


    // =================================
    // SINKRON NAMA REKENING
    // =================================

    rek.nama =
        dataAnggota.nama;


    let namaAnggota =
        dataAnggota.nama;


    // =================================
    // KONFIRMASI
    // =================================

    let yakin =
        confirm(

            "Konfirmasi Simpanan\n\n" +

            "ID     : " +
            idAnggota +

            "\nNama   : " +
            namaAnggota +

            "\nJenis  : " +
            jenis +

            "\nJumlah : " +
            rupiah(jumlah) +

            "\n\nData sudah benar?"

        );


    if(!yakin){

        return;

    }


    // =================================
    // UPDATE REKENING
    // =================================

    if(
        jenis ==
        "Simpanan Pokok"
    ){

        rek.simpananPokok =
            Number(
                rek.simpananPokok || 0
            )
            +
            jumlah;

    }


    if(
        jenis ==
        "Simpanan Wajib"
    ){

        rek.simpananWajib =
            Number(
                rek.simpananWajib || 0
            )
            +
            jumlah;

    }


    if(
        jenis ==
        "Simpanan Sukarela"
    ){

        rek.simpananSukarela =
            Number(
                rek.simpananSukarela || 0
            )
            +
            jumlah;

    }


    // =================================
    // NOMOR TRANSAKSI
    // =================================

    let idTransaksi =
        nomorTransaksiBaru();


    // =================================
    // REFERENSI SIMPANAN
    // =================================

    let referensi =
        "SP-" +
        idTransaksi;


    // =================================
    // DATA SIMPANAN
    // =================================

    simpanan.push({

        id:
            idTransaksi,

        idAnggota:
            idAnggota,

        anggota:
            idAnggota,

        namaAnggota:
            namaAnggota,

        nama:
            namaAnggota,

        jenis:
            jenis,

        jumlah:
            jumlah,

        tanggal:
            new Date()
                .toISOString()
                .substring(0,10)

    });


    // =====================================
    // BAGIAN 1 SELESAI
    // =====================================
    // =====================================
// TRANSAKSI + KAS BBCS
// =====================================
//
// SATU JALUR UANG:
//
// SIMPANAN
//     ↓
// TRANSAKSI
//     ↓
// KAS
//
// TIDAK ADA kas.push() DI SINI
// TIDAK ADA tambahTransaksi() DI SINI
// =====================================


// =====================================
// CEK MESIN TRANSAKSI + KAS
// =====================================

if(
    typeof catatTransaksiKas !==
    "function"
){

    alert(
        "Mesin Transaksi + Kas belum aktif"
    );

    console.error(
        "catatTransaksiKas() tidak ditemukan"
    );

    return;

}


// =====================================
// CATAT TRANSAKSI + KAS
// =====================================

catatTransaksiKas(

    "Pemasukan",

    "Simpanan",

    jenis +
    " - " +
    namaAnggota,

    jumlah,

    idAnggota,

    namaAnggota,

    referensi

);


// =====================================
// SINKRONISASI DATA
// =====================================

if(
    typeof sinkronSemuaData ===
    "function"
){

    sinkronSemuaData();

}


// =====================================
// SIMPAN DATABASE
// =====================================

simpanDatabaseAman();


// =====================================
// RESET FORM
// =====================================

pilih.selectedIndex =
    0;


jenisElement.selectedIndex =
    0;


jumlahElement.value =
    "";


// =====================================
// PESAN BERHASIL
// =====================================

alert(
    "Simpanan berhasil disimpan\n\n" +

    "Transaksi tercatat\n" +

    "Kas bertambah " +
    rupiah(jumlah)
);


// =====================================
// PENUTUP FUNGSI
// =====================================

}


// =====================================
// MODUL SELESAI
// =====================================

console.log(
    "Modul Simpanan BBCS Siap"
);
