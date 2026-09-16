// =====================================
// BERKAH BERSAMA CORE SYSTEM
// KONEKTOR EKSEKUTOR BBCS
// FILE : Mesin/konektor.js
// VERSI : V18
// =====================================

console.log(
    "Konektor Eksekutor BBCS mulai"
);


// =====================================
// PROSES PEMBAYARAN DARI UI
// =====================================

function konektorBayarAngsuran(
    idPinjaman,
    bulanPembayaran,
    pokokDibayar
){

    // ---------------------------------
    // VALIDASI DASAR
    // ---------------------------------

    if(!idPinjaman){

        return {

            berhasil: false,

            pesan:
                "ID pinjaman tidak ditemukan"

        };

    }


    if(!bulanPembayaran){

        return {

            berhasil: false,

            pesan:
                "Bulan pembayaran tidak ditemukan"

        };

    }


    pokokDibayar =
        Number(
            pokokDibayar
        ) || 0;


    if(pokokDibayar < 0){

        return {

            berhasil: false,

            pesan:
                "Pokok pembayaran tidak valid"

        };

    }


    // ---------------------------------
    // CEK EKSEKUTOR
    // ---------------------------------

    if(
        typeof eksekutorPembayaran !==
        "function"
    ){

        console.error(
            "eksekutorPembayaran() tidak ditemukan"
        );

        return {

            berhasil: false,

            pesan:
                "Mesin Eksekutor belum aktif"

        };

    }


    // ---------------------------------
    // KIRIM KE MESIN EKSEKUTOR
    // ---------------------------------

    let hasil =
        eksekutorPembayaran(

            idPinjaman,

            bulanPembayaran,

            pokokDibayar

        );


    // ---------------------------------
    // CEK HASIL
    // ---------------------------------

    if(!hasil){

        return {

            berhasil: false,

            pesan:
                "Tidak ada hasil pembayaran"

        };

    }


    if(!hasil.berhasil){

        console.warn(
            "PEMBAYARAN GAGAL:",
            hasil.pesan
        );

        return hasil;

    }


    // ---------------------------------
    // LOG HASIL
    // ---------------------------------

    console.log(
        "===== KONEKTOR PEMBAYARAN BBCS ====="
    );


    console.log(
        "ID Pinjaman :",
        hasil.idPinjaman
    );


    console.log(
        "Bulan :",
        hasil.bulanPembayaran
    );


    console.log(
        "Pokok :",
        hasil.pokokDibayar
    );


    console.log(
        "Jasa Wajib :",
        hasil.jasaWajib
    );


    console.log(
        "Denda :",
        hasil.denda
    );


    console.log(
        "Jasa Berjalan :",
        hasil.jasaBerjalan
    );


    console.log(
        "Total :",
        hasil.totalBayar
    );


    console.log(
        "Saldo Akhir :",
        hasil.saldoAkhir
    );


    console.log(
        "Periode Selesai :",
        hasil.periodeSelesai
    );


    console.log(
        "Status :",
        hasil.status
    );


    return hasil;

}


// =====================================
// ALIAS
// =====================================

function konektorPembayaran(){

    return konektorBayarAngsuran.apply(
        null,
        arguments
    );

}


// =====================================
// TEST KONEKTOR
// =====================================

function simulasiKonektor(){

    console.log(
        "===== SIMULASI KONEKTOR BBCS ====="
    );


    if(
        !Array.isArray(pinjaman)
    ){

        console.error(
            "Database pinjaman tidak tersedia"
        );

        return null;

    }


    let data =
        pinjaman.find(
            function(item){

                return (
                    item &&
                    item.id === "PJ00001"
                );

            }
        );


    if(!data){

        console.warn(
            "PJ00001 tidak ditemukan"
        );

        return null;

    }


    let hasil =
        konektorBayarAngsuran(

            "PJ00001",

            "2026-10",

            1000

        );


    console.log(
        "HASIL KONEKTOR:",
        hasil
    );


    return hasil;

}


// =====================================
// STATUS MESIN
// =====================================

console.log(
    "Konektor Eksekutor BBCS siap"
);