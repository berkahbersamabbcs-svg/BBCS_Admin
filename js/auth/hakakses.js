// =====================================
// BERKAH BERSAMA CORE SYSTEM
// SISTEM HAK AKSES MENU V3.3
// VERSI AMAN - ANTI DECLARATION DUPLICATE
// =====================================

console.log(
    "Hak Akses BBCS V3.3 Aktif"
);


// =====================================
// AMBIL LEVEL ADMIN
// =====================================

window.levelAdmin =
    localStorage.getItem(
        "levelAdmin"
    ) || "";


console.log(
    "Level :",
    window.levelAdmin
);


// =====================================
// CEK HAK AKSES MENU
// =====================================

function cekHakAkses(){

    let menu =
        document.querySelectorAll(
            ".menu a"
        );


    const level =
        window.levelAdmin;


    // =================================
    // LEVEL BELUM ADA
    // =================================

    if(!level){

        console.log(
            "Level Admin belum tersedia"
        );

        return;

    }


    // =================================
    // ADMIN
    // AKSES PENUH
    // =================================

    if(level === "ADMIN"){

        console.log(
            "Akses ADMIN penuh"
        );

        return;

    }


    // =================================
    // OPERATOR
    // =================================

    if(level === "OPERATOR"){

        const boleh = [

            "Anggota",
            "Rekening",
            "Simpanan",
            "Pinjaman",
            "Angsuran",
            "Transaksi",
            "Kas",
            "LOG AKTIVITAS"

        ];


        menu.forEach(function(item){

            const namaMenu =
                item.innerText
                    .trim();


            if(

                !boleh.includes(
                    namaMenu
                )

                &&

                !namaMenu.includes(
                    "Logout"
                )

                &&

                !namaMenu.includes(
                    "Keluar"
                )

            ){

                item.style.display =
                    "none";

            }

        });


        console.log(
            "Akses OPERATOR aktif"
        );

        return;

    }


    // =================================
    // VIEWER
    // =================================

    if(level === "VIEWER"){

        const boleh = [

            "Laporan",
            "🖨️ Cetak",
            "LOG AKTIVITAS"

        ];


        menu.forEach(function(item){

            const namaMenu =
                item.innerText
                    .trim();


            if(

                !boleh.includes(
                    namaMenu
                )

                &&

                !namaMenu.includes(
                    "Logout"
                )

                &&

                !namaMenu.includes(
                    "Keluar"
                )

            ){

                item.style.display =
                    "none";

            }

        });


        console.log(
            "Akses VIEWER aktif"
        );

        return;

    }


    // =================================
    // LEVEL TIDAK DIKENALI
    // =================================

    console.log(
        "Level tidak dikenali :",
        level
    );

}


// =====================================
// JALANKAN SISTEM
// =====================================

if(
    document.readyState ===
    "loading"
){

    document.addEventListener(
        "DOMContentLoaded",
        cekHakAkses
    );

}
else{

    cekHakAkses();

}


// =====================================
// STATUS
// =====================================

console.log(
    "Menu Hak Akses BBCS selesai"
);