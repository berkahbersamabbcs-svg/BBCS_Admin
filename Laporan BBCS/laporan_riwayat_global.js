// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MODUL RIWAYAT GLOBAL BBCS
// =====================================

console.log("Laporan Riwayat Global BBCS mulai");


// =====================================
// FORMAT AMAN
// =====================================

function nilaiRiwayatGlobal(nilai){

    return Number(nilai) || 0;

}


// =====================================
// RIWAYAT GLOBAL
// SUMBER UTAMA:
// transaksi
//
// Tidak mengambil riwayatAngsuran
// agar angsuran tidak muncul dua kali.
// =====================================

function tampilRiwayatGlobalBBCS(){

    console.log(
        "Laporan Riwayat Global BBCS diproses"
    );


    let tempat =
        document.getElementById(
            "isiRiwayatGlobal"
        );


    if(!tempat){

        console.warn(
            "Elemen isiRiwayatGlobal tidak ditemukan"
        );

        return;

    }


    // =================================
    // CEK DATABASE
    // =================================

    if(
        !Array.isArray(transaksi) ||
        transaksi.length === 0
    ){

        tempat.innerHTML = `

            <tr>

                <td colspan="4">

                    Belum ada riwayat global.

                </td>

            </tr>

        `;

        console.log(
            "Riwayat Global BBCS kosong"
        );

        return;

    }


    // =================================
    // SALIN DATA
    // =================================

    let data =
        transaksi.map(function(t){

            return {

                id:
                    t.id || "-",

                tanggal:
                    t.tanggal || "-",

                jenis:
                    t.jenis || "-",

                kategori:
                    t.kategori || "-",

                nama:
                    t.namaAnggota || "-",

                keterangan:
                    t.keterangan || "-",

                jumlah:
                    nilaiRiwayatGlobal(
                        t.jumlah
                    ),

                referensi:
                    t.referensi || "-"

            };

        });


    // =================================
    // TERBARU DI ATAS
    // =================================

    data.reverse();


    // =================================
    // TAMPIL DATA
    // =================================

    let isi = "";


    data.forEach(function(r){

        isi += `

            <tr>

                <td>
                    ${r.tanggal}
                </td>

                <td>
                    ${r.jenis}
                </td>

                <td>
                    ${r.kategori}
                </td>

                <td>
                    ${r.nama}
                </td>

                <td>
                    ${r.keterangan}
                </td>

                <td>
                    ${rupiah(r.jumlah)}
                </td>

                <td>
                    ${r.referensi}
                </td>

            </tr>

        `;

    });


    tempat.innerHTML =
        isi;


    console.log(
        "Laporan Riwayat Global BBCS selesai"
    );

}


// =====================================
// SELESAI
// =====================================

console.log(
    "Laporan Riwayat Global BBCS siap"
);