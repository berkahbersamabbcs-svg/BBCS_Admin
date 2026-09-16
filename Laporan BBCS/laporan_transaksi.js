// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MODUL LAPORAN TRANSAKSI
// =====================================

console.log("Laporan Transaksi BBCS mulai");


// =====================================
// FORMAT AMAN
// =====================================

function nilaiLaporanTransaksi(nilai){

    return Number(nilai) || 0;

}


// =====================================
// PILIHAN ANGGOTA
// =====================================

function tampilPilihanLaporanTransaksi(){

    let pilih =
        document.getElementById(
            "pilihLaporanTransaksi"
        );


    if(!pilih){

        console.warn(
            "Elemen pilihLaporanTransaksi tidak ditemukan"
        );

        return;

    }


    pilih.innerHTML = `

        <option value="">
            Semua Anggota
        </option>

    `;


    if(
        !Array.isArray(anggota) ||
        anggota.length === 0
    ){

        return;

    }


    anggota.forEach(function(a){

        pilih.innerHTML += `

            <option value="${a.id}">
                ${a.id} - ${a.nama || "-"}
            </option>

        `;

    });

}


// =====================================
// LAPORAN TRANSAKSI
// =====================================

function tampilLaporanTransaksi(){

    console.log(
        "Laporan Transaksi BBCS diproses"
    );


    let tempat =
        document.getElementById(
            "laporanTransaksi"
        );


    if(!tempat){

        console.warn(
            "Elemen laporanTransaksi tidak ditemukan"
        );

        return;

    }


    let pilih =
        document.getElementById(
            "pilihLaporanTransaksi"
        );


    let filter =
        document.getElementById(
            "filterJenisTransaksi"
        );


    let idAnggota =
        pilih
        ? pilih.value
        : "";


    let jenis =
        filter
        ? filter.value
        : "";


    // =================================
    // CEK TRANSAKSI
    // =================================

    if(
        !Array.isArray(transaksi) ||
        transaksi.length === 0
    ){

        tempat.innerHTML = `

            <div class="info">

                Belum ada transaksi.

            </div>

        `;

        return;

    }


    // =================================
    // FILTER DATA
    // =================================

    let data =
        transaksi.filter(function(t){

            let cocokAnggota =
                !idAnggota ||
                t.idAnggota == idAnggota;


            let cocokJenis =
                !jenis ||
                t.jenis == jenis;


            return (
                cocokAnggota &&
                cocokJenis
            );

        });


    // =================================
    // DATA KOSONG
    // =================================

    if(data.length === 0){

        tempat.innerHTML = `

            <div class="info">

                Tidak ada transaksi
                sesuai filter.

            </div>

        `;

        return;

    }


    // =================================
    // TOTAL
    // =================================

    let totalMasuk = 0;

    let totalKeluar = 0;


    data.forEach(function(t){

        let jumlah =
            nilaiLaporanTransaksi(
                t.jumlah
            );


        if(t.jenis === "Pemasukan"){

            totalMasuk += jumlah;

        }


        if(t.jenis === "Pengeluaran"){

            totalKeluar += jumlah;

        }

    });


    let selisih =
        totalMasuk -
        totalKeluar;


    // =================================
    // URUT TERBARU
    // =================================

    data =
        [...data].reverse();


    // =================================
    // DETAIL
    // =================================

    let isi = "";


    data.forEach(function(t){

        let jumlah =
            nilaiLaporanTransaksi(
                t.jumlah
            );


        isi += `

            <tr>

                <td>
                    ${t.tanggal || "-"}
                </td>

                <td>
                    ${t.id || "-"}
                </td>

                <td>
                    ${t.namaAnggota || "-"}
                </td>

                <td>
                    ${t.jenis || "-"}
                </td>

                <td>
                    ${t.kategori || "-"}
                </td>

                <td>
                    ${t.keterangan || "-"}
                </td>

                <td>
                    ${rupiah(jumlah)}
                </td>

                <td>
                    ${t.referensi || "-"}
                </td>

            </tr>

        `;

    });


    // =================================
    // TAMPIL
    // =================================

    tempat.innerHTML = `

        <div class="info">

            <h3>
                LAPORAN TRANSAKSI
            </h3>

            Total Pemasukan :
            ${rupiah(totalMasuk)}

            <br>

            Total Pengeluaran :
            ${rupiah(totalKeluar)}

            <br>

            <b>
                Selisih :
                ${rupiah(selisih)}
            </b>

        </div>


        <br>


        <div style="overflow-x:auto;">

            <table>

                <thead>

                    <tr>

                        <th>
                            Tanggal
                        </th>

                        <th>
                            ID
                        </th>

                        <th>
                            Anggota
                        </th>

                        <th>
                            Jenis
                        </th>

                        <th>
                            Kategori
                        </th>

                        <th>
                            Keterangan
                        </th>

                        <th>
                            Jumlah
                        </th>

                        <th>
                            Referensi
                        </th>

                    </tr>

                </thead>

                <tbody>

                    ${isi}

                </tbody>

            </table>

        </div>

    `;


    console.log(
        "Laporan Transaksi BBCS selesai"
    );

}


// =====================================
// SELESAI
// =====================================

console.log(
    "Laporan Transaksi BBCS siap"
);