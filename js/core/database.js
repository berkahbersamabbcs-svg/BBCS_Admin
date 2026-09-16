// =====================================
// BERKAH BERSAMA CORE SYSTEM
// DATABASE CORE V3.0
// BAGIAN 1/4
// LOAD + SAVE DATABASE
// =====================================

// =====================================
// LOAD DATABASE AMAN
// =====================================

function ambilDatabase(nama){

try{  

    let data =  
        localStorage.getItem(nama);  


    if(!data){  

        return [];  

    }  


    let hasil =  
        JSON.parse(data);  


    return Array.isArray(hasil)  
        ? hasil  
        : [];  

}  
catch(error){  

    console.log(  
        "Database " +  
        nama +  
        " error, reset aman"  
    );  

    return [];  

}

}

// =====================================
// DATABASE GLOBAL BBCS
// =====================================

var anggota =
window.anggota =
ambilDatabase("anggota");

var rekening =
window.rekening =
ambilDatabase("rekening");

var simpanan =
window.simpanan =
ambilDatabase("simpanan");

var transaksi =
window.transaksi =
ambilDatabase("transaksi");

var pinjaman =
window.pinjaman =
ambilDatabase("pinjaman");

var riwayatAngsuran =
window.riwayatAngsuran =
ambilDatabase("angsuran");

var kas =
window.kas =
ambilDatabase("kas");

// =====================================
// STATUS DATABASE
// =====================================

console.log(
"Database BBCS V3.0 Aktif"
);

// =====================================
// SIMPAN DATABASE SATU PINTU
// =====================================

function simpanDatabase(){

try{  

    localStorage.setItem(  
        "anggota",  
        JSON.stringify(anggota)  
    );  


    localStorage.setItem(  
        "rekening",  
        JSON.stringify(rekening)  
    );  


    localStorage.setItem(  
        "simpanan",  
        JSON.stringify(simpanan)  
    );  


    localStorage.setItem(  
        "transaksi",  
        JSON.stringify(transaksi)  
    );  


    localStorage.setItem(  
        "pinjaman",  
        JSON.stringify(pinjaman)  
    );  


    localStorage.setItem(  
        "angsuran",  
        JSON.stringify(  
            riwayatAngsuran  
        )  
    );  


    localStorage.setItem(  
        "kas",  
        JSON.stringify(kas)  
    );  


    console.log(  
        "Database BBCS tersimpan"  
    );  


    return true;  

}  
catch(error){  

    console.log(  
        "Gagal menyimpan database",  
        error  
    );  


    return false;  

}

}

// =====================================
// =====================================
// SIMPAN DATABASE AMAN
// =====================================
function simpanDatabaseAman(){

    try{

        if(typeof simpanDatabase !== "function"){

            console.error("Fungsi simpanDatabase tidak tersedia");
            return false;

        }

        let hasil = simpanDatabase();

        if(hasil !== true){

            console.error("Database BBCS gagal disimpan");
            return false;

        }

        console.log("Database BBCS tersimpan aman");
        return true;

    }
    catch(error){

        console.error("simpanDatabaseAman gagal:", error);
        return false;

    }

}


// FORMAT RUPIAH
// =====================================

function rupiah(angka){

angka =  
    Number(angka) || 0;  


return "Rp " +  
    angka.toLocaleString(  
        "id-ID"  
    );

}

// =====================================
// FORMAT ANGKA
// =====================================

function angkaNilai(teks){

if(  
    teks === null ||  
    teks === ""  
){  

    return 0;  

}  


return Number(  
    teks  
        .toString()  
        .replace(/\./g,"")  
) || 0;

}

// =====================================
// STATUS BAGIAN 1
// =====================================

console.log(
"Database Core V3.0 Bagian 1/4 siap"
);
// =====================================
// BERKAH BERSAMA CORE SYSTEM
// DATABASE CORE V3.0
// BAGIAN 2/4
// NOMOR OTOMATIS + PENCARIAN
// =====================================

// =====================================
// NOMOR ANGGOTA
// =====================================

function nomorAnggotaBaru(){

let nomor = 1;  


anggota.forEach(function(item){  

    if(  
        item &&  
        item.id &&  
        item.id.startsWith("BB")  
    ){  

        let angka =  
            Number(  
                item.id.replace("BB","")  
            );  


        if(  
            !isNaN(angka) &&  
            angka >= nomor  
        ){  

            nomor =  
                angka + 1;  

        }  

    }  

});  


return "BB" +  
    String(nomor)  
        .padStart(6,"0");

}

// =====================================
// NOMOR PINJAMAN
// =====================================

function nomorPinjamanBaru(){

let nomor = 1;  


pinjaman.forEach(function(item){  

    if(  
        item &&  
        item.id &&  
        item.id.startsWith("PJ")  
    ){  

        let angka =  
            Number(  
                item.id.replace("PJ","")  
            );  


        if(  
            !isNaN(angka) &&  
            angka >= nomor  
        ){  

            nomor =  
                angka + 1;  

        }  

    }  

});  


return "PJ" +  
    String(nomor)  
        .padStart(5,"0");

}

// =====================================
// NOMOR TRANSAKSI
// =====================================

function nomorTransaksiBaru(){

let nomor = 1;  


transaksi.forEach(function(item){  

    if(  
        item &&  
        item.id &&  
        item.id.startsWith("TR")  
    ){  

        let angka =  
            Number(  
                item.id.replace("TR","")  
            );  


        if(  
            !isNaN(angka) &&  
            angka >= nomor  
        ){  

            nomor =  
                angka + 1;  

        }  

    }  

});  


return "TR" +  
    String(nomor)  
        .padStart(6,"0");

}

// =====================================
// NOMOR KAS
// =====================================

function nomorKasBaru(){

let nomor = 1;  


kas.forEach(function(item){  

    if(  
        item &&  
        item.id &&  
        item.id.startsWith("KS")  
    ){  

        let angka =  
            Number(  
                item.id.replace("KS","")  
            );  


        if(  
            !isNaN(angka) &&  
            angka >= nomor  
        ){  

            nomor =  
                angka + 1;  

        }  

    }  

});  


return "KS" +  
    String(nomor)  
        .padStart(6,"0");

}

// =====================================
// PENCARIAN ANGGOTA
// =====================================

function cariAnggota(id){

return anggota.find(function(item){  

    return item &&  
           item.id == id;  

});

}

// =====================================
// PENCARIAN REKENING
// =====================================

function cariRekening(id){

return rekening.find(function(item){  

    return item &&  
           item.id == id;  

});

}

// =====================================
// PENCARIAN PINJAMAN
// =====================================

function cariPinjaman(id){

return pinjaman.find(function(item){  

    return item &&  
           item.id == id;  

});

}

// =====================================
// STATUS BAGIAN 2
// =====================================

console.log(
"Database Core V3.0 Bagian 2/4 siap"
);
// =====================================
// BERKAH BERSAMA CORE SYSTEM
// DATABASE CORE V3.0
// BAGIAN 3/4
// SINKRONISASI DATA
// =====================================

// =====================================
// SINKRON REKENING ← ANGGOTA
// =====================================

function sinkronNamaRekening(){

let berubah = false;  


rekening.forEach(function(r){  

    if(  
        !r ||  
        !r.id  
    ){  

        return;  

    }  


    let dataAnggota =  
        anggota.find(function(a){  

            return a &&  
                   a.id == r.id;  

        });  


    if(!dataAnggota){  

        return;  

    }  


    if(  
        r.nama !==  
        dataAnggota.nama  
    ){  

        r.nama =  
            dataAnggota.nama;  

        berubah = true;  

    }  

});  


return berubah;

}

// =====================================
// SINKRON SIMPANAN ← ANGGOTA
// =====================================

function sinkronNamaSimpanan(){

let berubah = false;  


simpanan.forEach(function(s){  

    if(!s){  

        return;  

    }  


    let idAnggota =  
        s.idAnggota ||  
        s.anggota ||  
        "";  


    if(!idAnggota){  

        return;  

    }  


    let dataAnggota =  
        anggota.find(function(a){  

            return a &&  
                   a.id == idAnggota;  

        });  


    if(!dataAnggota){  

        return;  

    }  


    if(  
        s.idAnggota !==  
        dataAnggota.id  
    ){  

        s.idAnggota =  
            dataAnggota.id;  

        berubah = true;  

    }  


    if(  
        s.anggota !==  
        dataAnggota.id  
    ){  

        s.anggota =  
            dataAnggota.id;  

        berubah = true;  

    }  


    if(  
        s.namaAnggota !==  
        dataAnggota.nama  
    ){  

        s.namaAnggota =  
            dataAnggota.nama;  

        berubah = true;  

    }  


    if(  
        s.nama !==  
        dataAnggota.nama  
    ){  

        s.nama =  
            dataAnggota.nama;  

        berubah = true;  

    }  

});  


return berubah;

}

// =====================================
// SINKRON PINJAMAN ← ANGGOTA
// =====================================

function sinkronNamaPinjaman(){

let berubah = false;  


pinjaman.forEach(function(p){  

    if(!p){  

        return;  

    }  


    let idAnggota =  
        p.idAnggota ||  
        p.anggota ||  
        p.idMember ||  
        "";  


    if(!idAnggota){  

        return;  

    }  


    let dataAnggota =  
        anggota.find(function(a){  

            return a &&  
                   a.id == idAnggota;  

        });  


    if(!dataAnggota){  

        return;  

    }  


    if(  
        p.idAnggota !==  
        dataAnggota.id  
    ){  

        p.idAnggota =  
            dataAnggota.id;  

        berubah = true;  

    }  


    if(  
        p.nama !==  
        dataAnggota.nama  
    ){  

        p.nama =  
            dataAnggota.nama;  

        berubah = true;  

    }  


    if(  
        p.namaAnggota !==  
        dataAnggota.nama  
    ){  

        p.namaAnggota =  
            dataAnggota.nama;  

        berubah = true;  

    }  

});  


return berubah;

}

// =====================================
// SINKRON RIWAYAT ANGSURAN
// ← PINJAMAN
// =====================================

function sinkronNamaAngsuran(){

let berubah = false;  


riwayatAngsuran.forEach(function(a){  

    if(!a){  

        return;  

    }  


    let dataPinjaman =  
        pinjaman.find(function(p){  

            return p &&  
                   p.id == a.idPinjaman;  

        });  


    if(!dataPinjaman){  

        return;  

    }  


    let idAnggota =  
        dataPinjaman.idAnggota ||  
        dataPinjaman.anggota ||  
        "";  


    let namaAnggota =  
        dataPinjaman.nama ||  
        dataPinjaman.namaAnggota ||  
        "";  


    if(  
        a.idAnggota !==  
        idAnggota  
    ){  

        a.idAnggota =  
            idAnggota;  

        berubah = true;  

    }  


    if(  
        a.namaAnggota !==  
        namaAnggota  
    ){  

        a.namaAnggota =  
            namaAnggota;  

        berubah = true;  

    }  


    if(  
        a.nama !==  
        namaAnggota  
    ){  

        a.nama =  
            namaAnggota;  

        berubah = true;  

    }  

});  


return berubah;

}

// =====================================
// SINKRON TRANSAKSI
// ← ANGGOTA / PINJAMAN
// =====================================

function sinkronNamaTransaksi(){

let berubah = false;  


transaksi.forEach(function(t){  

    if(!t){  

        return;  

    }  


    // -----------------------------  
    // DARI ANGGOTA  
    // -----------------------------  

    if(t.idAnggota){  

        let dataAnggota =  
            anggota.find(function(a){  

                return a &&  
                       a.id == t.idAnggota;  

            });  


        if(dataAnggota){  

            if(  
                t.namaAnggota !==  
                dataAnggota.nama  
            ){  

                t.namaAnggota =  
                    dataAnggota.nama;  

                berubah = true;  

            }  

        }  

    }  


    // -----------------------------  
    // DARI PINJAMAN  
    // -----------------------------  

    if(t.idPinjaman){  

        let dataPinjaman =  
            pinjaman.find(function(p){  

                return p &&  
                       p.id == t.idPinjaman;  

            });  


        if(dataPinjaman){  

            let idAnggota =  
                dataPinjaman.idAnggota ||  
                dataPinjaman.anggota ||  
                "";  


            let namaAnggota =  
                dataPinjaman.nama ||  
                dataPinjaman.namaAnggota ||  
                "";  


            if(  
                t.idAnggota !==  
                idAnggota  
            ){  

                t.idAnggota =  
                    idAnggota;  

                berubah = true;  

            }  


            if(  
                t.namaAnggota !==  
                namaAnggota  
            ){  

                t.namaAnggota =  
                    namaAnggota;  

                berubah = true;  

            }  

        }  

    }  

});  


return berubah;

}

// =====================================
// SINKRON KAS
// ← ANGGOTA
// =====================================

function sinkronNamaKas(){

let berubah = false;  


kas.forEach(function(k){  

    if(!k){  

        return;  

    }  


    if(!k.idAnggota){  

        return;  

    }  


    let dataAnggota =  
        anggota.find(function(a){  

            return a &&  
                   a.id == k.idAnggota;  

        });  


    if(!dataAnggota){  

        return;  

    }  


    if(  
        k.namaAnggota !==  
        dataAnggota.nama  
    ){  

        k.namaAnggota =  
            dataAnggota.nama;  

        berubah = true;  

    }  

});  


return berubah;

}

// =====================================
// SINKRON SEMUA DATA
// =====================================

function sinkronSemuaData(){

    console.log(
        "Sinkronisasi BBCS dimulai"
    );


    let berubah = false;


    if(
        sinkronNamaRekening()
    ){

        berubah = true;

    }


    if(
        sinkronNamaSimpanan()
    ){

        berubah = true;

    }


    if(
        sinkronNamaPinjaman()
    ){

        berubah = true;

    }


    if(
        sinkronNamaAngsuran()
    ){

        berubah = true;

    }


    if(
        sinkronNamaTransaksi()
    ){

        berubah = true;

    }


    if(
        sinkronNamaKas()
    ){

        berubah = true;

    }


    if(berubah){

    let tersimpan =
        simpanDatabaseAman();

    if(!tersimpan){

        console.error(
            "Transaksi + Kas gagal disimpan ke database"
        );

        return null;

    }

    }


    console.log(
        "Sinkronisasi BBCS V3.0 selesai"
    );


    return true;

}


// =====================================
// STATUS BAGIAN 3
// =====================================

console.log(
    "Database Core V3.0 Bagian 3/4 siap"
);
// =====================================
// BERKAH BERSAMA CORE SYSTEM
// DATABASE CORE V3.0
// BAGIAN 4/4
// MESIN TRANSAKSI + KAS OTOMATIS
// =====================================


// =====================================
// FORMAT JUMLAH INPUT
// =====================================

function formatJumlah(input){

    if(!input){

        return;

    }


    let angka =
        input.value
            .toString()
            .replace(/\D/g,"");


    if(angka === ""){

        input.value = "";

        return;

    }


    input.value =
        Number(angka)
            .toLocaleString("id-ID");

}


// =====================================
// TAMBAH TRANSAKSI CORE
// =====================================

function tambahTransaksi(

    jenis,
    kategori,
    keterangan,
    jumlah,
    idAnggota,
    namaAnggota,
    referensi

){

    jumlah =
        Number(jumlah) || 0;


    // ---------------------------------
    // VALIDASI JUMLAH
    // ---------------------------------

    if(jumlah <= 0){

        console.warn(
            "Transaksi tidak ditambahkan: jumlah tidak valid"
        );

        return null;

    }


    // ---------------------------------
    // REFERENSI OTOMATIS
    // ---------------------------------

    if(!referensi){

        referensi =
            "TR-" + Date.now();

    }


    // ---------------------------------
    // CEK TRANSAKSI GANDA
    // ---------------------------------

    let sudahAda =
        transaksi.some(function(item){

            return item &&
                   item.referensi ===
                   referensi;

        });


    if(sudahAda){

        console.warn(
            "Transaksi sudah ada:",
            referensi
        );


        return transaksi.find(function(item){

            return item &&
                   item.referensi ===
                   referensi;

        });

    }


    // ---------------------------------
    // TANGGAL
    // ---------------------------------

    let tanggal;


    if(
        typeof tanggalBBCSIndonesia ===
        "function"
    ){

        tanggal =
            tanggalBBCSIndonesia();

    }
    else{

        tanggal =
            new Date()
                .toLocaleDateString("id-ID");

    }


    // ---------------------------------
    // DATA TRANSAKSI
    // ---------------------------------

    let data = {

        id:
            nomorTransaksiBaru(),

        tanggal:
            tanggal,

        jenis:
            jenis,

        kategori:
            kategori,

        keterangan:
            keterangan || "",

        jumlah:
            jumlah,

        idAnggota:
            idAnggota || "",

        namaAnggota:
            namaAnggota || "",

        referensi:
            referensi

    };


    // ---------------------------------
    // MASUK TRANSAKSI
    // ---------------------------------

    transaksi.push(
        data
    );


    console.log(
        "Transaksi BBCS ditambahkan",
        data
    );


    return data;

}


// =====================================
// TAMBAH DATA KAS CORE
// =====================================

function tambahKasCore(

    jenis,
    kategori,
    keterangan,
    jumlah,
    idAnggota,
    namaAnggota,
    referensi

){

    jumlah =
        Number(jumlah) || 0;


    if(jumlah <= 0){

        console.warn(
            "Kas tidak ditambahkan: jumlah tidak valid"
        );

        return null;

    }


    // ---------------------------------
    // CEK REFERENSI
    // MENCEGAH KAS GANDA
    // ---------------------------------

    if(referensi){

        let sudahAda =
            kas.some(function(item){

                return item &&
                       item.referensi ===
                       referensi;

            });


        if(sudahAda){

            console.warn(
                "Kas sudah ada:",
                referensi
            );


            return kas.find(function(item){

                return item &&
                       item.referensi ===
                       referensi;

            });

        }

    }


    // ---------------------------------
    // TANGGAL
    // ---------------------------------

    let tanggal;


    if(
        typeof tanggalBBCSIndonesia ===
        "function"
    ){

        tanggal =
            tanggalBBCSIndonesia();

    }
    else{

        tanggal =
            new Date()
                .toLocaleDateString("id-ID");

    }


    // ---------------------------------
    // DATA KAS
    // ---------------------------------

    let dataKas = {

        id:
            nomorKasBaru(),

        tanggal:
            tanggal,

        jenis:
            jenis,

        kategori:
            kategori,

        keterangan:
            keterangan || "",

        jumlah:
            jumlah,

        idAnggota:
            idAnggota || "",

        namaAnggota:
            namaAnggota || "",

        referensi:
            referensi || ""

    };


    // ---------------------------------
    // MASUK KAS
    // ---------------------------------

    kas.push(
        dataKas
    );


    console.log(
        "Kas BBCS ditambahkan",
        dataKas
    );


    return dataKas;

}


// =====================================
// TAMBAH TRANSAKSI + KAS SEKALIGUS
// =====================================
//
// SATU PINTU UANG BBCS:
//
// MODUL
//   ↓
// catatTransaksiKas()
//   ↓
// TRANSAKSI
//   ↓
// KAS
//
// =====================================

function catatTransaksiKas(

    jenis,
    kategori,
    keterangan,
    jumlah,
    idAnggota,
    namaAnggota,
    referensi

){

    jumlah =
        Number(jumlah) || 0;


    // ---------------------------------
    // VALIDASI
    // ---------------------------------

    if(jumlah <= 0){

        console.warn(
            "Transaksi + Kas tidak dicatat: jumlah tidak valid"
        );

        return null;

    }


    // ---------------------------------
    // REFERENSI OTOMATIS
    // ---------------------------------

    if(!referensi){

        referensi =
            "TR-" + Date.now();

    }


    // ---------------------------------
    // TRANSAKSI
    // ---------------------------------

    let dataTransaksi =
        tambahTransaksi(

            jenis,

            kategori,

            keterangan,

            jumlah,

            idAnggota,

            namaAnggota,

            referensi

        );


    // ---------------------------------
    // KAS
    // ---------------------------------

    let dataKas =
        tambahKasCore(

            jenis,

            kategori,

            keterangan,

            jumlah,

            idAnggota,

            namaAnggota,

            referensi

        );


    // ---------------------------------
    // SIMPAN DATABASE
    // ---------------------------------

    let tersimpan =
        simpanDatabaseAman();

    if(!tersimpan){

        console.error(
            "Transaksi + Kas gagal disimpan ke database"
        );

        return null;

    }


    console.log(
        "Transaksi + Kas BBCS berhasil dicatat"
    );


    return {

        transaksi:
            dataTransaksi,

        kas:
            dataKas

    };

}


// =====================================
// HITUNG SALDO KAS
// =====================================

function hitungSaldoKas(){

    let pemasukan = 0;

    let pengeluaran = 0;


    kas.forEach(function(item){

        if(!item){

            return;

        }


        let jumlah =
            Number(item.jumlah) || 0;


        if(
            item.jenis ===
            "Pemasukan"
        ){

            pemasukan +=
                jumlah;

        }


        if(
            item.jenis ===
            "Pengeluaran"
        ){

            pengeluaran +=
                jumlah;

        }

    });


    return (
        pemasukan -
        pengeluaran
    );

}


// =====================================
// TOTAL PEMASUKAN KAS
// =====================================

function totalPemasukanKas(){

    let total = 0;


    kas.forEach(function(item){

        if(
            item &&
            item.jenis ===
            "Pemasukan"
        ){

            total +=
                Number(item.jumlah) || 0;

        }

    });


    return total;

}


// =====================================
// TOTAL PENGELUARAN KAS
// =====================================

function totalPengeluaranKas(){

    let total = 0;


    kas.forEach(function(item){

        if(
            item &&
            item.jenis ===
            "Pengeluaran"
        ){

            total +=
                Number(item.jumlah) || 0;

        }

    });


    return total;

}


// =====================================
// TAMPIL RINGKASAN KAS
// =====================================

function tampilRingkasanKasCore(){

    let pemasukan =
        totalPemasukanKas();


    let pengeluaran =
        totalPengeluaranKas();


    let saldo =
        pemasukan -
        pengeluaran;


    console.log(
        "===== RINGKASAN KAS BBCS ====="
    );


    console.log(
        "Total Pemasukan :",
        rupiah(pemasukan)
    );


    console.log(
        "Total Pengeluaran :",
        rupiah(pengeluaran)
    );


    console.log(
        "Saldo Kas :",
        rupiah(saldo)
    );


    return {

        pemasukan:
            pemasukan,

        pengeluaran:
            pengeluaran,

        saldo:
            saldo

    };

}


// =====================================
// CEK REFERENSI TRANSAKSI & KAS
// =====================================

function cekSinkronTransaksiKas(){

    let transaksiTanpaKas = 0;

    let kasTanpaTransaksi = 0;


    transaksi.forEach(function(t){

        if(!t){

            return;

        }


        if(!t.referensi){

            return;

        }


        let adaKas =
            kas.some(function(k){

                return k &&
                       k.referensi ===
                       t.referensi;

            });


        if(!adaKas){

            transaksiTanpaKas++;

            console.warn(
                "Transaksi belum memiliki Kas:",
                t.referensi,
                t.keterangan
            );

        }

    });


    kas.forEach(function(k){

        if(!k){

            return;

        }


        if(!k.referensi){

            return;

        }


        let adaTransaksi =
            transaksi.some(function(t){

                return t &&
                       t.referensi ===
                       k.referensi;

            });


        if(!adaTransaksi){

            kasTanpaTransaksi++;

            console.warn(
                "Kas belum memiliki Transaksi:",
                k.referensi,
                k.keterangan
            );

        }

    });


    console.log(
        "Transaksi tanpa Kas :",
        transaksiTanpaKas
    );


    console.log(
        "Kas tanpa Transaksi :",
        kasTanpaTransaksi
    );


    return {

        transaksiTanpaKas:
            transaksiTanpaKas,

        kasTanpaTransaksi:
            kasTanpaTransaksi

    };

}


// =====================================
// MIGRASI TRANSAKSI LAMA KE KAS
// =====================================

function migrasiTransaksiKeKas(){

    let jumlahDitambahkan = 0;


    transaksi.forEach(function(t){

        if(!t){

            return;

        }


        let jumlah =
            Number(t.jumlah) || 0;


        if(jumlah <= 0){

            return;

        }


        let referensi =
            t.referensi || "";


        // ---------------------------------
        // TRANSAKSI TANPA REFERENSI
        // ---------------------------------

        if(!referensi){

            referensi =
                "MIG-" +
                t.id;

        }


        // ---------------------------------
        // CEK KAS
        // ---------------------------------

        let sudahAda =
            kas.some(function(k){

                return k &&
                       k.referensi ===
                       referensi;

            });


        if(sudahAda){

            return;

        }


        tambahKasCore(

            t.jenis,

            t.kategori,

            t.keterangan,

            jumlah,

            t.idAnggota,

            t.namaAnggota,

            referensi

        );


        jumlahDitambahkan++;

    });


    if(
        jumlahDitambahkan > 0
    ){

    let tersimpan =
        simpanDatabaseAman();

    if(!tersimpan){

        console.error(
            "Transaksi + Kas gagal disimpan ke database"
        );

        return null;

    }

    }


    console.log(
        "Migrasi transaksi → kas selesai:",
        jumlahDitambahkan
    );


    return jumlahDitambahkan;

}


// =====================================
// PROTEKSI KAS CORE
// =====================================

function proteksiKasCore(){

    if(
        !Array.isArray(kas)
    ){

        kas = [];

        window.kas =
            kas;

    }


    kas =
        kas.filter(function(item){

            return item &&
                   item.id;

        });


    window.kas =
        kas;


    let tersimpan =
        simpanDatabaseAman();

    if(!tersimpan){

        console.error(
            "Transaksi + Kas gagal disimpan ke database"
        );

        return null;

    }


    console.log(
        "Proteksi Kas Core selesai"
    );

}


// =====================================
// STATUS DATABASE CORE
// =====================================

console.log(
    "Database Core V3.0 Bagian 4/4 siap"
);


// =====================================
// DATABASE CORE SELESAI
// =====================================

console.log(
    "Database Core V3.0 LENGKAP"
);