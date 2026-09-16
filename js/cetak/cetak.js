// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MESIN CETAK UNIVERSAL
// =====================================


console.log(
"Mesin Cetak BBCS Aktif"
);



// =====================================
// TAMPILKAN DATA CETAK
// =====================================

function tampilCetak(){


let dataString =
localStorage.getItem("dataCetak");


let data =
dataString ?
JSON.parse(dataString)
:
null;



// =====================================
// DATA TEST
// =====================================

if(!data){

data = {

referensi:"TEST001",

tanggal:
new Date()
.toLocaleDateString("id-ID"),

anggota:"BB000001",

nama:"BBCS TEST",

jenis:"SIMPANAN",

kategori:"Pengujian",

jumlah:10000,

status:"BERHASIL"

};

}




// =====================================
// JUDUL OTOMATIS
// =====================================

let judul =
"BUKTI TRANSAKSI";


let jenis =
(data.jenis || "")
.toUpperCase();



if(jenis.includes("PINJAMAN")){

judul =
"BUKTI PINJAMAN";

}


else if(jenis.includes("ANGSURAN")){

judul =
"BUKTI ANGSURAN";

}


else if(jenis.includes("SIMPANAN")){

judul =
"BUKTI SIMPANAN";

}


else if(jenis.includes("KAS")){

judul =
"BUKTI KAS";

}




// =====================================
// DATA UMUM
// =====================================


document.getElementById("ref").textContent =
data.referensi || "-";


document.getElementById("tanggal").textContent =
data.tanggal || "-";


document.getElementById("anggota").textContent =
data.anggota || "-";


document.getElementById("nama").textContent =
data.nama || "-";


document.getElementById("jenis").textContent =
data.jenis || "-";


document.getElementById("kategori").textContent =
data.kategori || "-";



document.getElementById("jumlah").textContent =
rupiah(data.jumlah || 0);



document.getElementById("status").textContent =
data.status || "BERHASIL";




// =====================================
// JUDUL HTML
// =====================================


let kepala =
document.getElementById(
"judulCetak"
);


if(kepala){

kepala.textContent =
judul;

}




// =====================================
// ELEMENT DETAIL
// =====================================


let barisPokok =
document.getElementById("barisPokok");


let barisJasa =
document.getElementById("barisJasa");


let barisSisa =
document.getElementById("barisSisa");


let barisPinjaman =
document.getElementById("barisPinjaman");


let barisJasaPinjaman =
document.getElementById("barisJasaPinjaman");




// SEMBUNYIKAN SEMUA

if(barisPokok)
barisPokok.style.display="none";


if(barisJasa)
barisJasa.style.display="none";


if(barisSisa)
barisSisa.style.display="none";


if(barisPinjaman)
barisPinjaman.style.display="none";


if(barisJasaPinjaman)
barisJasaPinjaman.style.display="none";




// =====================================
// ANGSURAN
// =====================================


if(jenis.includes("ANGSURAN")){


if(barisPokok)
barisPokok.style.display="block";


if(barisJasa)
barisJasa.style.display="block";


if(barisSisa)
barisSisa.style.display="block";


}



// =====================================
// PINJAMAN
// =====================================


if(jenis.includes("PINJAMAN")){


if(barisPinjaman)
barisPinjaman.style.display="block";


if(barisJasaPinjaman)
barisJasaPinjaman.style.display="block";


if(barisSisa)
barisSisa.style.display="block";


}




// =====================================
// DETAIL ANGSURAN
// =====================================


let pokok =
document.getElementById("pokok");


let jasa =
document.getElementById("jasa");


let sisa =
document.getElementById("sisaPokok");



if(pokok){

pokok.textContent =
rupiah(data.pokok || 0);

}



if(jasa){

jasa.textContent =
rupiah(data.jasa || 0);

}



if(sisa){

sisa.textContent =
rupiah(data.sisaPokok || 0);

}





// =====================================
// DETAIL PINJAMAN
// =====================================


let jumlahPinjaman =
document.getElementById(
"jumlahPinjaman"
);



if(jumlahPinjaman){

jumlahPinjaman.textContent =
rupiah(data.jumlah || 0);

}



let jasaPinjaman =
document.getElementById(
"jasaPinjaman"
);



if(jasaPinjaman){

jasaPinjaman.textContent =
(data.jasa || 0) + "%";

}



}



// =====================================
// AKTIF SAAT HALAMAN DIBUKA
// =====================================


window.onload =
tampilCetak;