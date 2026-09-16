// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MODUL LAPORAN PINJAMAN
// =====================================

console.log("Laporan Pinjaman BBCS mulai");


// =====================================
// FORMAT AMAN
// =====================================

function nilaiLaporanPinjaman(nilai){

    return Number(nilai) || 0;

}


// =====================================
// LAPORAN PINJAMAN
// =====================================

function tampilLaporanPinjaman(){

    console.log(
        "Laporan Pinjaman BBCS diproses"
    );


    // =================================
    // CEK DATABASE
    // =================================

    if(
        !Array.isArray(pinjaman)
    ){

        console.warn(
            "Database pinjaman tidak tersedia"
        );

        return;

    }


    // =================================
    // TOTAL
    // =================================

    let totalPinjaman = 0;

    let aktif = 0;

    let lunas = 0;

    let totalPokok = 0;

    let totalJasa = 0;

    let totalDenda = 0;

    let totalAngsuran = 0;

    let totalSisa = 0;


    // =================================
    // HITUNG PINJAMAN
    // =================================

    pinjaman.forEach(function(p){

        totalPinjaman +=
            nilaiLaporanPinjaman(
                p.jumlah
            );


        totalSisa +=
            nilaiLaporanPinjaman(
                p.sisaPokok
            );


        if(p.status === "Aktif"){

            aktif++;

        }


        if(p.status === "Lunas"){

            lunas++;

        }

    });


    // =================================
    // HITUNG RIWAYAT ANGSURAN
    // =================================

    if(
        Array.isArray(
            riwayatAngsuran
        )
    ){

        riwayatAngsuran.forEach(
            function(a){

                totalPokok +=
                    nilaiLaporanPinjaman(
                        a.pokok
                    );


                const jasaWajib =
                    nilaiLaporanPinjaman(
                        a.jasaWajib ??
                        0
                    );

                const jasaBerjalan =
                    nilaiLaporanPinjaman(
                        a.jasaBerjalan ??
                        0
                    );

                const jasaLama =
                    nilaiLaporanPinjaman(
                        a.jasa ??
                        0
                    );

                totalJasa +=
                    jasaWajib +
                    jasaBerjalan +
                    (
                        a.jasaWajib === undefined &&
                        a.jasaBerjalan === undefined
                            ? jasaLama
                            : 0
                    );


                totalDenda +=
                    nilaiLaporanPinjaman(
                        a.denda
                    );


                totalAngsuran +=
                    nilaiLaporanPinjaman(
                        a.total
                    );

            }
        );

    }


    // =================================
    // TAMPIL RINGKASAN
    // =================================

    let el;


    el =
        document.getElementById(
            "laporanTotalPinjaman"
        );

    if(el){

        el.innerText =
            rupiah(totalPinjaman);

    }


    el =
        document.getElementById(
            "laporanPinjamanAktif"
        );

    if(el){

        el.innerText =
            aktif;

    }


    el =
        document.getElementById(
            "laporanPinjamanLunas"
        );

    if(el){

        el.innerText =
            lunas;

    }


    el =
        document.getElementById(
            "laporanTotalPokok"
        );

    if(el){

        el.innerText =
            rupiah(totalPokok);

    }


    el =
        document.getElementById(
            "laporanTotalJasa"
        );

    if(el){

        el.innerText =
            rupiah(totalJasa);

    }


    el =
        document.getElementById(
            "laporanTotalAngsuran"
        );

    if(el){

        el.innerText =
            rupiah(totalAngsuran);

    }


    el =
        document.getElementById(
            "laporanSisaPinjaman"
        );

    if(el){

        el.innerText =
            rupiah(totalSisa);

    }


    // =================================
    // TOTAL DENDA
    // =================================

    el =
        document.getElementById(
            "laporanTotalDenda"
        );

    if(el){

        el.innerText =
            rupiah(totalDenda);

    }


    // =================================
    // DETAIL PINJAMAN
    // =================================

    let tempat =
        document.getElementById(
            "isiLaporanPinjaman"
        );


    if(!tempat){

        console.warn(
            "Elemen isiLaporanPinjaman tidak ditemukan"
        );

        return;

    }


    if(pinjaman.length === 0){

        tempat.innerHTML = `

            <tr>

                <td colspan="7">

                    Belum ada data pinjaman.

                </td>

            </tr>

        `;

        return;

    }


    let isi = "";


    pinjaman.forEach(function(p){

        let bayarPokok = 0;

        let bayarJasa = 0;

        let bayarDenda = 0;

        let totalBayar = 0;


        // -----------------------------
        // RIWAYAT PER PINJAMAN
        // -----------------------------

        if(
            Array.isArray(
                riwayatAngsuran
            )
        ){

            riwayatAngsuran.forEach(
                function(a){

                    if(
                        a.idPinjaman ==
                        p.id
                    ){

                        bayarPokok +=
                            nilaiLaporanPinjaman(
                                a.pokok
                            );


                        const jasaWajib =
                            nilaiLaporanPinjaman(
                                a.jasaWajib ?? 0
                            );

                        const jasaBerjalan =
                            nilaiLaporanPinjaman(
                                a.jasaBerjalan ?? 0
                            );

                        bayarJasa +=
                            jasaWajib +
                            jasaBerjalan;


                        bayarDenda +=
                            nilaiLaporanPinjaman(
                                a.denda
                            );


                        totalBayar +=
                            nilaiLaporanPinjaman(
                                a.total
                            );

                    }

                }
            );

        }


        // -----------------------------
        // TABEL
        // -----------------------------

        isi += `

            <tr>

                <td>
                    ${p.id || "-"}
                </td>

                <td>
                    ${p.nama || "-"}
                </td>

                <td>
                    ${rupiah(
                        nilaiLaporanPinjaman(
                            p.jumlah
                        )
                    )}
                </td>

                <td>
                    ${rupiah(bayarPokok)}
                </td>

                <td>
                    ${rupiah(bayarJasa)}
                </td>

                <td>
                    ${rupiah(bayarDenda)}
                </td>

                <td>
                    ${rupiah(totalBayar)}
                </td>

                <td>
                    ${rupiah(
                        nilaiLaporanPinjaman(
                            p.sisaPokok
                        )
                    )}
                </td>

                <td>
                    ${p.status || "-"}
                </td>

            </tr>

        `;

    });


    tempat.innerHTML =
        isi;


    console.log(
        "Laporan Pinjaman BBCS selesai"
    );

}


// =====================================
// SELESAI
// =====================================

console.log(
    "Laporan Pinjaman BBCS siap"
);