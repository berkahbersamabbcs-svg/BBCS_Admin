// =====================================
// BERKAH BERSAMA CORE SYSTEM
// SECURITY BBCS V3.5
// LOGIN + SESSION + HAK AKSES
// =====================================


console.log(
"Security BBCS V3.5 Aktif"
);


// =====================================
// CEK LOGIN
// =====================================

function cekLoginBBCS(){


let status =
localStorage.getItem(
"loginAktif"
);



if(status !== "YA"){


alert(
"Silakan Login Terlebih Dahulu"
);


location.replace(
    new URL(
        "/login.html",
        location.origin
    ).href
);


return false;


}


return true;


}



// Jalankan keamanan halaman

cekLoginBBCS();




// =====================================
// SESSION BBCS
// =====================================

function mulaiSessionBBCS(){


localStorage.setItem(
"mulaiSession",
new Date()
.toLocaleString(
"id-ID"
)
);



console.log(
"Session BBCS Aktif"
);


}



if(
localStorage.getItem("loginAktif")
=="YA"
){

mulaiSessionBBCS();

}





// =====================================
// HAK AKSES USER
// =====================================


let levelAdmin =
localStorage.getItem(
"levelAdmin"
);


if(!levelAdmin){


levelAdmin =
"ADMIN";


localStorage.setItem(
"levelAdmin",
levelAdmin
);


}



console.log(
"Level BBCS :",
levelAdmin
);





function cekHakAksesBBCS(){



let menu =
document.querySelectorAll(
".menu a"
);



if(levelAdmin=="ADMIN"){


console.log(
"Akses ADMIN penuh"
);


return;


}





if(levelAdmin=="OPERATOR"){



let boleh=[

"Anggota",
"Rekening",
"Simpanan",
"Pinjaman",
"Angsuran",
"Transaksi",
"Kas"

];



menu.forEach(function(item){



let nama =
item.innerText.trim();



if(
!boleh.includes(nama)
&&
!nama.includes("Logout")
){


item.style.display="none";


}


});



console.log(
"Akses OPERATOR aktif"
);



}






if(levelAdmin=="VIEWER"){



let boleh=[

"Laporan",
"🖨️ Cetak"

];



menu.forEach(function(item){


let nama =
item.innerText.trim();



if(
!boleh.includes(nama)
&&
!nama.includes("Logout")
){


item.style.display="none";


}



});



console.log(
"Akses VIEWER aktif"
);



}



}





// Jalankan hak akses setelah halaman siap

document.addEventListener(
"DOMContentLoaded",
function(){


cekHakAksesBBCS();


}
);





// =====================================
// LOG AKTIVITAS BBCS
// =====================================


let logAktivitas =
JSON.parse(
localStorage.getItem(
"logAktivitas"
)
)
||
[];




function tambahLogBBCS(aksi){



logAktivitas.push({

id:
"LOG"+
Date.now(),


aksi:
aksi,


nama:
localStorage.getItem(
"namaAdmin"
)
||
"Administrator BBCS",


waktu:
new Date()
.toLocaleString(
"id-ID"
)


});



localStorage.setItem(
"logAktivitas",
JSON.stringify(
logAktivitas
)
);



console.log(
"LOG BBCS :",
aksi
);



}





// =====================================
// LOG LOGIN SEKALI
// =====================================


if(
localStorage.getItem("loginAktif")
=="YA"
){


let terakhir =
localStorage.getItem(
"logLoginTerakhir"
);



let sekarang =
Date.now();



if(
!terakhir ||
sekarang - Number(terakhir) > 5000
){


tambahLogBBCS(
"LOGIN SYSTEM"
);


localStorage.setItem(
"logLoginTerakhir",
sekarang
);


}


}




// =====================================
// LOGOUT BBCS
// =====================================


function logoutBBCS(){



tambahLogBBCS(
"LOGOUT SYSTEM"
);



localStorage.setItem(
"loginAktif",
"TIDAK"
);



localStorage.removeItem(
"mulaiSession"
);



location.replace(
    new URL(
        "/login.html",
        location.origin
    ).href
);



}





// =====================================
// PROTEKSI TOMBOL
// =====================================


function proteksiFungsiBBCS(){


if(
levelAdmin=="VIEWER"
){


let tombol =
document.querySelectorAll(
"button"
);



tombol.forEach(function(b){


b.disabled=true;


});



}



console.log(
"Proteksi Fungsi BBCS Siap"
);



}





document.addEventListener(
"DOMContentLoaded",
function(){


proteksiFungsiBBCS();


}
);



console.log(
"Security BBCS V3.5 Siap"
);