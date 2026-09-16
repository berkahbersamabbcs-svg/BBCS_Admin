// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MODUL BACKUP DATABASE BBCS
// =====================================


console.log(
"Backup BBCS Aktif"
);



// =====================================
// SIMPAN BACKUP
// =====================================

function backupData(){


let data = {


anggota: anggota || [],


rekening: rekening || [],


simpanan: simpanan || [],


transaksi: transaksi || [],


pinjaman: pinjaman || [],


angsuran: riwayatAngsuran || [],


kas: kas || [],


investor:
typeof investor !== "undefined"
    ? investor
    : [],


rekeningInvestor:
typeof rekeningInvestor !== "undefined"
    ? rekeningInvestor
    : [],


riwayatInvestor:
typeof riwayatInvestor !== "undefined"
    ? riwayatInvestor
    : []


};



let hasil =
JSON.stringify(
data,
null,
2
);



let area =
document.getElementById(
"hasilBackup"
);



if(area){

area.value =
hasil;

}



let info =
document.getElementById(
"infoBackup"
);



if(info){

info.innerHTML =
"Backup berhasil dibuat : " +
new Date()
.toLocaleString(
"id-ID"
);

}



console.log(
"Backup berhasil dibuat"
);



}



// =====================================
// SALIN BACKUP
// =====================================

function salinBackup(){


let area =
document.getElementById(
"hasilBackup"
);



if(!area || area.value==""){


alert(
"Belum ada backup"
);


return;


}



area.select();


document.execCommand(
"copy"
);



alert(
"Backup berhasil disalin"
);



}



// =====================================
// DOWNLOAD FILE BACKUP
// =====================================

function downloadBackup(){



let area =
document.getElementById(
"hasilBackup"
);



if(!area || area.value==""){


alert(
"Buat backup terlebih dahulu"
);


return;


}



let file =
new Blob(

[
area.value
],

{
type:
"application/json"
}

);



let link =
document.createElement(
"a"
);



link.href =
URL.createObjectURL(
file
);



link.download =
"backup_BBCS_" +

new Date()
.toISOString()
.replace(
/:/g,
"-"
)

+

".json";



document.body.appendChild(
link
);



link.click();



document.body.removeChild(
link
);



alert(
"File Backup BBCS berhasil dibuat"
);



console.log(
"Download Backup Selesai"
);



}





// =====================================
// TAMPIL NAMA FILE
// =====================================

function tampilNamaFile(){



let file =
document.getElementById(
"fileBackup"
)
.files[0];



if(file){


document.getElementById(
"namaFile"
)
.innerHTML =
file.name;


}



}





// =====================================
// RESTORE DATABASE
// =====================================

function restoreData(){



let file =
document.getElementById(
"fileBackup"
)
.files[0];



if(!file){


alert(
"Pilih file backup terlebih dahulu"
);


return;


}



if(
!confirm(
"Pulihkan data BBCS dari file ini?"
)

){

return;

}



let baca =
new FileReader();



baca.onload =
function(e){



try{


let data =
JSON.parse(
e.target.result
);



anggota =
data.anggota || [];

rekening =
data.rekening || [];

simpanan =
data.simpanan || [];

transaksi =
data.transaksi || [];

pinjaman =
data.pinjaman || [];

riwayatAngsuran =
data.angsuran || [];

kas =
data.kas || [];


// DATABASE INVESTOR
if(typeof investor !== "undefined"){

    investor =
        data.investor || [];

}

if(typeof rekeningInvestor !== "undefined"){

    rekeningInvestor =
        data.rekeningInvestor || [];

}

if(typeof riwayatInvestor !== "undefined"){

    riwayatInvestor =
        data.riwayatInvestor || [];

}


// SIMPAN DATABASE CORE
simpanDatabaseAman();


// SIMPAN DATABASE INVESTOR
if(typeof simpanDatabaseInvestor === "function"){

    simpanDatabaseInvestor();

}



alert(
"Restore BBCS berhasil"
);



location.reload();



}

catch(err){


alert(
"File backup tidak valid"
);



console.error(
err
);


}



};



baca.readAsText(
file
);



}





console.log(
"Modul Backup BBCS Siap"
);

// =====================================
// RESET DATA UJI BISNIS BBCS
// =====================================

function bersihkanDatabase(){

    // CEK LOGIN + HAK AKSES ADMIN
    const loginAktifBBCS =
        localStorage.getItem("loginAktif");

    const levelAdminBBCS =
        localStorage.getItem("levelAdmin");


    if(
        loginAktifBBCS !== "YA" ||
        levelAdminBBCS !== "ADMIN"
    ){

        alert(
            "⛔ AKSES DITOLAK\n\n" +
            "Reset Data Uji BBCS hanya dapat dilakukan oleh ADMIN."
        );

        return;
    }


    // KONFIRMASI PERTAMA
    let yakin = confirm(
        "⚠️ RESET DATA UJI BBCS\n\n" +
        "Semua DATA BISNIS akan dikosongkan:\n\n" +
        "• Anggota\n" +
        "• Rekening\n" +
        "• Simpanan\n" +
        "• Transaksi\n" +
        "• Pinjaman\n" +
        "• Angsuran\n" +
        "• Kas\n" +
        "• Investor\n" +
        "• Rekening Investor\n" +
        "• Riwayat Investor\n\n" +
        "Login dan keamanan TIDAK dihapus.\n\n" +
        "Lanjutkan?"
    );


    if(!yakin){

        return;

    }


    // KONFIRMASI KEDUA
    let sekaliLagi = confirm(
        "🚨 KONFIRMASI TERAKHIR\n\n" +
        "Data bisnis uji BBCS akan dibuat kosong.\n\n" +
        "Pastikan backup sudah dibuat.\n\n" +
        "RESET SEKARANG?"
    );


    if(!sekaliLagi){

        return;

    }


    try{

        // DATABASE CORE BBCS
        anggota = [];
        rekening = [];
        simpanan = [];
        transaksi = [];
        pinjaman = [];
        riwayatAngsuran = [];
        kas = [];


        // SIMPAN DATABASE CORE
        if(typeof simpanDatabaseAman === "function"){

            simpanDatabaseAman();

        }
        else if(typeof simpanDatabase === "function"){

            simpanDatabase();

        }
        else{

            localStorage.setItem(
                "anggota",
                JSON.stringify([])
            );

            localStorage.setItem(
                "rekening",
                JSON.stringify([])
            );

            localStorage.setItem(
                "simpanan",
                JSON.stringify([])
            );

            localStorage.setItem(
                "transaksi",
                JSON.stringify([])
            );

            localStorage.setItem(
                "pinjaman",
                JSON.stringify([])
            );

            localStorage.setItem(
                "angsuran",
                JSON.stringify([])
            );

            localStorage.setItem(
                "kas",
                JSON.stringify([])
            );

        }


        // DATABASE INVESTOR
        localStorage.setItem(
            "investor",
            JSON.stringify([])
        );

        localStorage.setItem(
            "rekeningInvestor",
            JSON.stringify([])
        );

        localStorage.setItem(
            "riwayatInvestor",
            JSON.stringify([])
        );


        console.log(
            "RESET DATA UJI BBCS BERHASIL"
        );


        alert(
            "✅ RESET DATA UJI BERHASIL\n\n" +
            "Seluruh data bisnis BBCS telah dikosongkan.\n\n" +
            "Login dan keamanan tetap dipertahankan."
        );


        // MUAT ULANG APLIKASI
        location.reload();


    }
    catch(error){

        console.error(
            "Gagal reset data BBCS:",
            error
        );


        alert(
            "❌ Reset gagal.\n\n" +
            "Silakan cek Console."
        );

    }

}
