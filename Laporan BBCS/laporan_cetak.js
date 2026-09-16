// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MODUL CETAK LAPORAN BBCS V3.x
// =====================================

console.log("Laporan Cetak BBCS V3.x mulai");


// =====================================
// FORMAT RUPIAH
// =====================================

function formatCetakBBCS(nilai){

    if(typeof rupiah === "function"){

        return rupiah(nilai);

    }

    return "Rp " +
        Number(nilai || 0)
            .toLocaleString("id-ID");

}


// =====================================
// CEK HALAMAN
// =====================================

function cekHalamanCetakBBCS(){

    if(typeof window === "undefined"){

        return false;

    }

    if(typeof document === "undefined"){

        return false;

    }

    return true;

}


// =====================================
// CETAK LAPORAN BBCS
// =====================================

function cetakLaporan(){

    console.log(
        "===================================="
    );

    console.log(
        "CETAK LAPORAN BBCS"
    );

    console.log(
        "===================================="
    );


    if(!cekHalamanCetakBBCS()){

        console.warn(
            "Halaman cetak BBCS tidak tersedia"
        );

        return;

    }


    // =================================
    // REFRESH DATA SEBELUM CETAK
    // =================================

    try{

        if(
            typeof tampilRingkasanLaporan ===
            "function"
        ){

            tampilRingkasanLaporan();

        }

    }
    catch(error){

        console.warn(
            "Refresh laporan dilewati:",
            error
        );

    }


    // =================================
    // REFRESH KAS
    // =================================

    try{

        if(
            typeof tampilKasBBCS ===
            "function"
        ){

            tampilKasBBCS();

        }

    }
    catch(error){

        console.warn(
            "Refresh Kas dilewati:",
            error
        );

    }


    // =================================
    // CETAK
    // =================================

    setTimeout(function(){

        console.log(
            "Menjalankan window.print()"
        );

        window.print();

    }, 100);


}


// =====================================
// CETAK SETELAH HALAMAN SIAP
// =====================================

function cetakLaporanSiap(){

    if(
        document.readyState ===
        "loading"
    ){

        document.addEventListener(
            "DOMContentLoaded",
            function(){

                cetakLaporan();

            }
        );

    }
    else{

        cetakLaporan();

    }

}


// =====================================
// SELESAI
// =====================================

console.log(
    "Laporan Cetak BBCS V3.x siap"
);