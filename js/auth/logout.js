// =====================================
// BERKAH BERSAMA CORE SYSTEM
// LOGOUT + SESSION BBCS V3.2
// =====================================

console.log(
    "Session BBCS Aktif"
);


// =====================================
// LOGIN SESSION
// =====================================

function mulaiSessionBBCS(){

    if(
        localStorage.getItem("loginAktif") === "YA"
    ){

        if(
            !localStorage.getItem("mulaiSession")
        ){

            localStorage.setItem(
                "mulaiSession",
                new Date().toLocaleString("id-ID")
            );

        }

    }

}


// =====================================
// LOGOUT SYSTEM
// =====================================

function logoutBBCS(){

    let nama =
        localStorage.getItem("namaAdmin")
        ||
        "Administrator";


    if(
        typeof catatLogBBCS === "function"
    ){

        catatLogBBCS(
            "LOGOUT SYSTEM"
        );

    }


    localStorage.setItem(
        "loginAktif",
        "TIDAK"
    );


    localStorage.removeItem(
        "mulaiSession"
    );


    alert(
        "Logout Berhasil"
    );


    location.href =
        "login.html";

}


// =====================================
// CEK SESSION
// =====================================

function cekSessionBBCS(){

    let login =
        localStorage.getItem(
            "loginAktif"
        );


    if(
        login !== "YA"
    ){

        return;

    }


    console.log(
        "Session Aktif BBCS"
    );

}


// =====================================
// JALANKAN SESSION
// =====================================

mulaiSessionBBCS();

cekSessionBBCS();


// =====================================
// SELESAI
// =====================================

console.log(
    "Logout BBCS Siap"
);