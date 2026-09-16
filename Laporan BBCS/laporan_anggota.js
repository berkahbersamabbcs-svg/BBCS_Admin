// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MODUL LAPORAN DETAIL ANGGOTA
// =====================================

console.log("Laporan Detail Anggota BBCS mulai");


// =====================================
// FORMAT AMAN
// =====================================

function nilaiLaporanAnggota(nilai){

    return Number(nilai) || 0;

}


// =====================================
// LAPORAN DETAIL ANGGOTA
// =====================================

function tampilDetailAnggota(){

    console.log(
        "Laporan Detail Anggota BBCS diproses"
    );


    let tempat =
        document.getElementById(
            "detailAnggota"
        );


    if(!tempat){

        console.warn(
            "Elemen detailAnggota tidak ditemukan"
        );

        return;

    }


    // =================================
    // CEK DATABASE ANGGOTA
    // =================================

    if(
        !Array.isArray(anggota) ||
        anggota.length === 0
    ){

        tempat.innerHTML = `

        <div class="info">

            Belum ada data anggota.

        </div>

        `;

        return;

    }


    let isi = "";


    // =================================
    // PROSES SETIAP ANGGOTA
    // =================================

    anggota.forEach(function(a){

        let rek = null;


        // ---------------------------------
        // CARI REKENING
        // ---------------------------------

        if(
            typeof cariRekening ===
            "function"
        ){

            rek =
                cariRekening(a.id);

        }


        // ---------------------------------
        // REKENING KOSONG
        // ---------------------------------

        if(!rek){

            rek = {

                simpananPokok: 0,
                simpananWajib: 0,
                simpananSukarela: 0,
                pinjamanAktif: 0,
                sisaPokok: 0

            };

        }


        // =================================
        // SIMPANAN
        // =================================

        let simpananPokok =
            nilaiLaporanAnggota(
                rek.simpananPokok
            );


        let simpananWajib =
            nilaiLaporanAnggota(
                rek.simpananWajib
            );


        let simpananSukarela =
            nilaiLaporanAnggota(
                rek.simpananSukarela
            );


        let totalSimpanan =
            simpananPokok +
            simpananWajib +
            simpananSukarela;


        // =================================
        // PINJAMAN
        // =================================

        let pinjamanAktif =
            nilaiLaporanAnggota(
                rek.pinjamanAktif
            );


        let sisaPokok =
            nilaiLaporanAnggota(
                rek.sisaPokok
            );


        // =================================
        // TAMPIL
        // =================================

        isi += `

        <div class="info">

            <h3>
                ${a.id}
            </h3>

            <b>
                ${a.nama || "-"}
            </b>

            <br><br>

            Status :
            ${a.status || "-"}

            <br><br>

            Simpanan Pokok :
            ${rupiah(simpananPokok)}

            <br>

            Simpanan Wajib :
            ${rupiah(simpananWajib)}

            <br>

            Simpanan Sukarela :
            ${rupiah(simpananSukarela)}

            <br>

            <b>
                Total Simpanan :
                ${rupiah(totalSimpanan)}
            </b>

            <br><br>

            Pinjaman Aktif :
            ${rupiah(pinjamanAktif)}

            <br>

            Sisa Pinjaman :
            ${rupiah(sisaPokok)}

        </div>

        `;

    });


    // =================================
    // MASUKKAN KE HTML
    // =================================

    tempat.innerHTML =
        isi;


    console.log(
        "Laporan Detail Anggota BBCS selesai"
    );

}


// =====================================
// SELESAI
// =====================================

console.log(
    "Laporan Detail Anggota BBCS siap"
);