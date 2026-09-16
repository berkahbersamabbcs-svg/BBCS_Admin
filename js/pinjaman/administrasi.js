// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MESIN ADMINISTRASI PINJAMAN
// =====================================

console.log(
    "Mesin Administrasi Pinjaman BBCS dimuat"
);


// =====================================
// TARIF ADMINISTRASI DEFAULT
// =====================================
//
// Default : 1%
//
// Tarif mesin dapat diubah melalui:
// setTarifAdministrasiPinjamanBBCS()
//
// =====================================

window.tarifAdministrasiPinjamanBBCS = 1;


// =====================================
// UBAH TARIF ADMINISTRASI MESIN
// =====================================

window.setTarifAdministrasiPinjamanBBCS =
function(tarif){

    const nilai =
        Number(tarif);


    if(
        !Number.isFinite(nilai) ||
        nilai < 0
    ){

        console.warn(
            "Tarif administrasi tidak valid"
        );

        return false;

    }


    window.tarifAdministrasiPinjamanBBCS =
        nilai;


    console.log(
        "Tarif Administrasi BBCS diubah menjadi:",
        nilai + "%"
    );


    return true;

};


// =====================================
// HITUNG ADMINISTRASI DARI TARIF MESIN
// =====================================

window.hitungAdministrasiPinjamanBBCS =
function(jumlah){

    const pokok =
        Number(jumlah) || 0;


    const tarif =
        Number(
            window.tarifAdministrasiPinjamanBBCS
        ) || 0;


    const biayaAdministrasi =
        Math.floor(
            pokok *
            tarif /
            100
        );


    const uangDiterima =
        pokok -
        biayaAdministrasi;


    return {

        pokok:
            pokok,

        tarifAdministrasi:
            tarif,

        biayaAdministrasi:
            biayaAdministrasi,

        uangDiterima:
            uangDiterima

    };

};


// =====================================
// HITUNG ADMINISTRASI DARI TARIF FORM
// =====================================
//
// Fungsi ini dipakai halaman Pinjaman.
// Tarif yang diketik di kolom form
// tidak mengubah tarif mesin global.
//
// =====================================

window.hitungAdministrasiDenganTarifBBCS =
function(jumlah, tarif){

    const pokok =
        Number(jumlah) || 0;


    const nilaiTarif =
        Number(tarif);


    if(
        !Number.isFinite(nilaiTarif) ||
        nilaiTarif < 0
    ){

        return {

            pokok:
                pokok,

            tarifAdministrasi:
                0,

            biayaAdministrasi:
                0,

            uangDiterima:
                pokok

        };

    }


    const biayaAdministrasi =
        Math.floor(
            pokok *
            nilaiTarif /
            100
        );


    const uangDiterima =
        pokok -
        biayaAdministrasi;


    return {

        pokok:
            pokok,

        tarifAdministrasi:
            nilaiTarif,

        biayaAdministrasi:
            biayaAdministrasi,

        uangDiterima:
            uangDiterima

    };

};


// =====================================
// STATUS MESIN
// =====================================

console.log(
    "Mesin Administrasi Pinjaman BBCS siap"
);

console.log(
    "Tarif Administrasi :",
    window.tarifAdministrasiPinjamanBBCS + "%"
);

console.log(
    "Fungsi Administrasi :",
    typeof window.hitungAdministrasiPinjamanBBCS
);

console.log(
    "Fungsi Tarif Form :",
    typeof window.hitungAdministrasiDenganTarifBBCS
);

console.log(
    "Fungsi Ubah Tarif :",
    typeof window.setTarifAdministrasiPinjamanBBCS
);