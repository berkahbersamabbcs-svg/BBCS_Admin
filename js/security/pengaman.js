// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MODUL PENGAMAN DATABASE
// =====================================


console.log(
"Pengaman Database BBCS Aktif"
);


// =====================================
// CEK DATA ARRAY
// =====================================

function cekDatabase(){


if(typeof anggota === "undefined"){
console.log("Database anggota belum dimuat");
return;
}


if(!Array.isArray(anggota)){
console.log("Database anggota bermasalah");
}


if(!Array.isArray(rekening)){
console.log("Database rekening bermasalah");
}


if(!Array.isArray(transaksi)){
console.log("Database transaksi bermasalah");
}


if(!Array.isArray(pinjaman)){
console.log("Database pinjaman bermasalah");
}


if(!Array.isArray(riwayatAngsuran)){
console.log("Database angsuran bermasalah");
}


if(!Array.isArray(kas)){
console.log("Database kas bermasalah");
}


}

// =====================================
// KONFIRMASI SIMPAN
// =====================================

function konfirmasiSimpan(pesan){


return confirm(
pesan
);


}


// =====================================
// FORMAT AMAN ANGKA
// =====================================

function angkaAman(nilai){


let hasil =
Number(nilai);


if(isNaN(hasil)){

return 0;

}


return hasil;


}



cekDatabase();


console.log(
"Proteksi BBCS siap"
);
