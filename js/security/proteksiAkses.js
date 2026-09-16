// =====================================
// BERKAH BERSAMA CORE SYSTEM
// PROTEKSI FUNGSI BBCS V3.4
// =====================================


console.log(
"Proteksi Fungsi BBCS V3.4 Aktif"
);



// =====================================
// AMBIL LEVEL USER
// =====================================

let levelUserBBCS =
localStorage.getItem(
"levelAdmin"
);



console.log(
"User Level :",
levelUserBBCS
);





// =====================================
// DAFTAR HAK AKSES
// =====================================

const aksesBBCS = {


ADMIN:[

"TAMBAH",
"EDIT",
"HAPUS",
"TRANSAKSI",
"BACKUP",
"RESTORE",
"LAPORAN",
"CETAK"

],



OPERATOR:[

"TAMBAH",
"EDIT",
"TRANSAKSI",
"LAPORAN",
"CETAK"

],



VIEWER:[

"LAPORAN",
"CETAK"

]


};






// =====================================
// CEK IZIN AKSES
// =====================================

function bolehAkses(aksi){


let daftar =
aksesBBCS[levelUserBBCS] || [];



if(
daftar.includes(aksi)
){


return true;


}



console.log(
"Akses ditolak :",
aksi
);



return false;


}







// =====================================
// BLOK FUNGSI DENGAN PESAN
// =====================================

function cekAkses(aksi){



if(
bolehAkses(aksi)
){

return true;

}



alert(
"Anda tidak memiliki izin untuk melakukan aksi ini"
);



return false;


}






// =====================================
// PROTEKSI TOMBOL OTOMATIS
// =====================================

function proteksiTombolBBCS(){



let tombol =
document.querySelectorAll(
"button"
);



tombol.forEach(function(btn){



let aksi =
btn.dataset.aksi;



if(!aksi){

return;

}



if(
!bolehAkses(aksi)
){


btn.disabled=true;


btn.title =
"Akses tidak tersedia";


}



});



console.log(
"Proteksi tombol BBCS selesai"
);


}






// =====================================
// JALANKAN
// =====================================


proteksiTombolBBCS();



console.log(
"Proteksi Fungsi BBCS Siap"
);