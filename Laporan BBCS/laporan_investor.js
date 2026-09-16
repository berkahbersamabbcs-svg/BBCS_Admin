// =====================================
// BERKAH BERSAMA CORE SYSTEM
// LAPORAN INVESTOR BBCS
// =====================================
//
// PEMBACA DATA INVESTOR
//
// Sumber data:
// Investor_BBCS/mesin.js
//
// Laporan ini TIDAK mengubah:
// - modal
// - jasa
// - saldo
// - status
//
// =====================================

console.log("Laporan Investor BBCS mulai");


// =====================================
// FORMAT NILAI AMAN
// =====================================

function nilaiLaporanInvestor(nilai){

    if(
        nilai === null ||
        nilai === undefined ||
        nilai === ""
    ){
        return 0;
    }

    if(typeof nilai === "string"){

        nilai =
            nilai
                .replace(/\./g, "")
                .replace(/,/g, ".");

    }

    const angka = Number(nilai);

    return Number.isFinite(angka)
        ? angka
        : 0;

}


// =====================================
// FORMAT RUPIAH
// =====================================

function rupiahLaporanInvestor(nilai){

    return "Rp " +
        nilaiLaporanInvestor(nilai)
            .toLocaleString("id-ID");

}


// =====================================
// AMBIL DATA INVESTOR DARI LOCALSTORAGE
// =====================================
//
// Laporan hanya membaca hasil database.
// MESIN INVESTOR TIDAK DIUBAH.
// =====================================

function dataRekeningInvestor(){

    try {

        const data =
            localStorage.getItem(
                "rekeningInvestor"
            );

        if(!data){

            return [];

        }

        const hasil =
            JSON.parse(data);

        return Array.isArray(hasil)
            ? hasil
            : [];

    }
    catch(error){

        console.error(
            "Gagal membaca rekeningInvestor:",
            error
        );

        return [];

    }

}


// =====================================
// AMBIL RIWAYAT INVESTOR
// =====================================

function dataRiwayatInvestor(){

    try {

        const data =
            localStorage.getItem(
                "riwayatInvestor"
            );

        if(!data){

            return [];

        }

        const hasil =
            JSON.parse(data);

        return Array.isArray(hasil)
            ? hasil
            : [];

    }
    catch(error){

        console.error(
            "Gagal membaca riwayatInvestor:",
            error
        );

        return [];

    }

}


// =====================================
// MODAL INVESTOR
// =====================================

function ambilModalInvestor(){

    let total = 0;

    dataRekeningInvestor().forEach(
        function(rekening){

            total +=
                nilaiLaporanInvestor(
                    rekening.modal
                );

        }
    );

    return total;

}


// =====================================
// JASA INVESTOR
// =====================================
//
// Mengambil hasil jasa dari mesin Investor.
// Tidak menghitung ulang persentase.
// =====================================

function ambilJasaInvestor(){

    let total = 0;

    dataRekeningInvestor().forEach(
        function(rekening){

            total +=
                nilaiLaporanInvestor(
                    rekening.jasaTersedia
                );

        }
    );

    return total;

}


// =====================================
// PENARIKAN MODAL
// =====================================
//
// Dibaca dari riwayat Investor.
// =====================================

function ambilPenarikanModalInvestor(){

    let total = 0;

    const riwayatInvestor =
        dataRiwayatInvestor();


    riwayatInvestor.forEach(
        function(riwayat){

            const tipe =
                String(
                    riwayat.tipe ||
                    riwayat.jenis ||
                    riwayat.aksi ||
                    riwayat.kode ||
                    ""
                ).toUpperCase();


            const keterangan =
                String(
                    riwayat.keterangan ||
                    riwayat.deskripsi ||
                    ""
                ).toUpperCase();


            const penarikan =
                tipe.includes("TARIK") ||
                tipe.includes("PENARIKAN") ||
                tipe.includes("WITHDRAW") ||
                keterangan.includes("PENARIKAN MODAL") ||
                keterangan.includes("TARIK MODAL");


            if(!penarikan){

                return;

            }


            total +=
                nilaiLaporanInvestor(
                    riwayat.jumlah ||
                    riwayat.nominal ||
                    riwayat.nilai ||
                    riwayat.amount
                );

        }
    );

    return total;

}


// =====================================
// SALDO MODAL INVESTOR
// =====================================

function ambilSaldoModalInvestor(){

    let total = 0;

    dataRekeningInvestor().forEach(
        function(rekening){

            total +=
                nilaiLaporanInvestor(
                    rekening.saldoModal
                );

        }
    );

    return total;

}


// =====================================
// STATUS INVESTOR
// =====================================

function ambilStatusInvestor(){

    const data =
        dataRekeningInvestor();


    if(data.length === 0){

        return "BELUM ADA INVESTOR";

    }


    let aktif = 0;
    let tidakAktif = 0;


    data.forEach(
        function(rekening){

            if(
                rekening.jasaAktif === true ||
                String(
                    rekening.statusJasa || ""
                ).toUpperCase() === "AKTIF"
            ){

                aktif++;

            }else{

                tidakAktif++;

            }

        }
    );


    if(
        aktif > 0 &&
        tidakAktif === 0
    ){

        return aktif +
            " INVESTOR AKTIF";

    }


    if(aktif > 0){

        return aktif +
            " AKTIF / " +
            tidakAktif +
            " TIDAK AKTIF";

    }


    return "TIDAK AKTIF";

}


// =====================================
// TAMPIL LAPORAN INVESTOR
// =====================================

function tampilLaporanInvestor(){

    console.log(
        "Laporan Investor BBCS diproses"
    );


    const modalInvestor =
        ambilModalInvestor();


    const jasaInvestor =
        ambilJasaInvestor();


    const penarikanModal =
        ambilPenarikanModalInvestor();


    const saldoModalInvestor =
        ambilSaldoModalInvestor();


    const statusInvestor =
        ambilStatusInvestor();


    // =================================
    // MODAL
    // =================================

    const elModal =
        document.getElementById(
            "globalModalInvestor"
        );


    if(elModal){

        elModal.textContent =
            rupiahLaporanInvestor(
                modalInvestor
            );

    }


    // =================================
    // JASA
    // =================================

    const elJasa =
        document.getElementById(
            "globalJasaInvestor"
        );


    if(elJasa){

        elJasa.textContent =
            rupiahLaporanInvestor(
                jasaInvestor
            );

    }


    // =================================
    // PENARIKAN
    // =================================

    const elPenarikan =
        document.getElementById(
            "globalPenarikanModalInvestor"
        );


    if(elPenarikan){

        elPenarikan.textContent =
            rupiahLaporanInvestor(
                penarikanModal
            );

    }


    // =================================
    // SALDO MODAL
    // =================================

    const elSaldo =
        document.getElementById(
            "globalSaldoModalInvestor"
        );


    if(elSaldo){

        elSaldo.textContent =
            rupiahLaporanInvestor(
                saldoModalInvestor
            );

    }


    // =================================
    // STATUS
    // =================================

    const elStatus =
        document.getElementById(
            "globalStatusInvestor"
        );


    if(elStatus){

        elStatus.textContent =
            statusInvestor;

    }


    // =================================
    // AUDIT CONSOLE
    // =================================

    console.log(
        "================================="
    );

    console.log(
        "LAPORAN INVESTOR BBCS"
    );

    console.log(
        "Jumlah Investor :",
        dataRekeningInvestor().length
    );

    console.log(
        "Modal Investor :",
        modalInvestor
    );

    console.log(
        "Jasa Investor :",
        jasaInvestor
    );

    console.log(
        "Penarikan Modal :",
        penarikanModal
    );

    console.log(
        "Saldo Modal Investor :",
        saldoModalInvestor
    );

    console.log(
        "Status Investor :",
        statusInvestor
    );

    console.log(
        "================================="
    );

}


// =====================================
// GLOBAL
// =====================================

window.tampilLaporanInvestor =
    tampilLaporanInvestor;

window.ambilModalInvestor =
    ambilModalInvestor;

window.ambilJasaInvestor =
    ambilJasaInvestor;

window.ambilPenarikanModalInvestor =
    ambilPenarikanModalInvestor;

window.ambilSaldoModalInvestor =
    ambilSaldoModalInvestor;

window.ambilStatusInvestor =
    ambilStatusInvestor;


console.log(
    "Laporan Investor BBCS aktif"
);

console.log(
    "AUDIT LOCALSTORAGE INVESTOR",
    {
        rekeningInvestor:
            dataRekeningInvestor(),

        riwayatInvestor:
            dataRiwayatInvestor()
    }
);
