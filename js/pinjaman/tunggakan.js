// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MESIN TUNGGAKAN BBCS V15
// =====================================
//
// PATOKAN UTAMA:
//
// Pinjam Agustus
// -> Jasa Agustus
// -> jatuh tempo September
//
// Transaksi September
// -> membayar jasa Agustus
//
// Transaksi Oktober
// -> membayar jasa September
//
// Transaksi November
// -> membayar jasa Oktober
//
// Jika transaksi membawa:
// jasaTertunggak = 15.000
// jasaBerjalan   = 5.000
//
// dan jasa/periode = 5.000
//
// maka transaksi tersebut dianggap
// membayar 4 periode jasa.
//
// Pembayaran jasa saja tetap SAH.
// Pembayaran pokok saja TIDAK dianggap
// membayar kewajiban jasa.
//
// =====================================

console.log(
    "Mesin Tunggakan BBCS V15 Aktif"
);


// =====================================
// TANGGAL BBCS
// =====================================

function tanggalMesinBBCS(){

    if(
        typeof tanggalBBCS === "function"
    ){

        let hasil =
            tanggalBBCS();

        if(hasil){

            if(
                hasil instanceof Date
            ){

                return new Date(
                    hasil.getTime()
                );

            }

            let d =
                new Date(
                    hasil + "T00:00:00"
                );

            if(
                !isNaN(
                    d.getTime()
                )
            ){

                return d;

            }

        }

    }

    return new Date();

}


// =====================================
// PERIODE YYYY-MM
// =====================================

function periodeMesinBBCS(
    tanggal
){

    return (
        tanggal.getFullYear() +
        "-" +
        String(
            tanggal.getMonth() + 1
        ).padStart(2,"0")
    );

}


// =====================================
// TAMBAH BULAN
// =====================================

function tambahBulanMesinBBCS(
    periode,
    jumlah
){

    let bagian =
        String(
            periode
        ).split("-");

    let tahun =
        Number(
            bagian[0]
        );

    let bulan =
        Number(
            bagian[1]
        );

    let d =
        new Date(
            tahun,
            bulan - 1 + jumlah,
            1
        );

    return periodeMesinBBCS(d);

}


// =====================================
// JUMLAH JASA SATU PERIODE
// =====================================

function jasaPeriodeMesinBBCS(data){

    /*
     * Gunakan fungsi BBCS yang sudah terbukti
     * menghasilkan Rp5.000 untuk PJ00005.
     */

    if(
        typeof jasaSatuPeriodeBBCS === "function"
    ){

        let hasil =
            Number(
                jasaSatuPeriodeBBCS(data)
            );

        if(
            !isNaN(hasil) &&
            hasil > 0
        ){

            return hasil;

        }

    }


    /*
     * Cadangan jika fungsi utama tidak tersedia.
     */

    let pokok =
        Number(
            data.jumlahPinjaman ??
            data.jumlah ??
            data.nominal ??
            data.pokok ??
            data.sisaPokok ??
            0
        );


    let jasa =
        Number(
            data.jasa ??
            data.bunga ??
            0
        );


    return (
        pokok *
        jasa /
        100
    );

}

// =====================================
// PERIODE JASA PERTAMA
// =====================================

function jasaPertamaMesinBBCS(
    data
){

    if(
        data.periodeJasaPertama
    ){

        return String(
            data.periodeJasaPertama
        ).substring(0,7);

    }


    if(
        data.tanggalPinjaman
    ){

        return String(
            data.tanggalPinjaman
        ).substring(0,7);

    }


    if(
        data.tanggal
    ){

        return String(
            data.tanggal
        ).substring(0,7);

    }


    return "";

}


// =====================================
// CARI RIWAYAT PINJAMAN
// =====================================

function riwayatPinjamanBBCS(
    data
){

    if(
        !Array.isArray(
            riwayatAngsuran
        )
    ){

        return [];

    }


    return riwayatAngsuran.filter(
        function(item){

            return (
                String(
                    item.idPinjaman
                )
                ===
                String(
                    data.id
                )
            );

        }
    );

}


// =====================================
// URUTKAN RIWAYAT
// =====================================

function urutkanRiwayatBBCS(
    data
){

    let hasil =
        riwayatPinjamanBBCS(
            data
        );


    hasil.sort(
        function(a,b){

            let pa =
                String(
                    a.periode || ""
                );

            let pb =
                String(
                    b.periode || ""
                );

            return pa.localeCompare(pb);

        }
    );


    return hasil;

}


// =====================================
// HITUNG BERAPA JASA PERIODE
// YANG DIBAYAR TRANSAKSI
// =====================================

function jumlahJasaDibayarBBCS(
    transaksi,
    jasaPeriode
){

    if(
        jasaPeriode <= 0
    ){

        return 0;

    }


    let jasaTunggak =
        Number(
            transaksi.jasaTertunggak ||
            0
        );


    let jasaBerjalan =
        Number(
            transaksi.jasaBerjalan ||
            0
        );


    /*
     * Jangan menggunakan field "jasa"
     * sebagai tambahan otomatis karena
     * pada struktur lama "jasa" bisa
     * merupakan total komponen jasa.
     *
     * Kita gunakan komponen yang jelas.
     */

    let total =
        jasaTunggak +
        jasaBerjalan;


    return Math.floor(
        total /
        jasaPeriode
    );

}


// =====================================
// HITUNG TOTAL DENDA YANG SUDAH DIBAYAR
// =====================================

function totalDendaDibayarBBCS(
    data
){

    let riwayat =
        urutkanRiwayatBBCS(
            data
        );


    let total = 0;


    riwayat.forEach(
        function(item){

            total +=
                Number(
                    item.denda ||
                    0
                );

        }
    );


    return total;

}


// =====================================
// HITUNG JUMLAH JASA YANG SUDAH DIBAYAR
// =====================================

function totalPeriodeJasaDibayarBBCS(
    data
){

    let jasaPeriode =
        jasaPeriodeMesinBBCS(
            data
        );


    if(
        jasaPeriode <= 0
    ){

        return 0;

    }


    let riwayat =
        urutkanRiwayatBBCS(
            data
        );


    let totalPeriode = 0;


    riwayat.forEach(
        function(item){

            totalPeriode +=
                jumlahJasaDibayarBBCS(
                    item,
                    jasaPeriode
                );

        }
    );


    return totalPeriode;

}

// =====================================
// DENDA SATU PERIODE
// BBCS V15
// =====================================

function dendaPeriodeMesinBBCS(data){

    /*
     * Patokan BBCS:
     *
     * denda = persentase dari pokok pinjaman
     *
     * Contoh:
     * Pokok       = Rp100.000
     * Denda       = 2%
     * Denda/periode = Rp2.000
     */

    let nilaiDenda =
        Number(
            data.denda ??
            data.dendaPerBulan ??
            data.dendaPeriode ??
            0
        );


    /*
     * Cari pokok awal pinjaman.
     */

    let pokok =
        Number(
            data.jumlahPinjaman ??
            data.jumlah ??
            data.nominal ??
            data.pokok ??
            0
        );


    /*
     * Jika denda berupa persentase
     * misalnya 2 berarti 2%.
     */

    if(
        nilaiDenda > 0 &&
        nilaiDenda <= 100 &&
        pokok > 0
    ){

        return (
            pokok *
            nilaiDenda /
            100
        );

    }


    /*
     * Jika denda sudah berupa nominal.
     */

    if(
        nilaiDenda > 100
    ){

        return nilaiDenda;

    }


    /*
     * Patokan default BBCS:
     * Rp2.000 per periode.
     */

    return 2000;

}
// =====================================
// HITUNG TUNGGAKAN V15
// =====================================

function hitungTunggakanBBCS(
    data
){

    if(!data){

        return {

            bulanTertunggak: 0,

            jasaTertunggak: 0,

            dendaTertunggak: 0,

            wajibBayar: false,

            periodeTertunggak: []

        };

    }


    // =================================
    // TANGGAL
    // =================================

    let sekarang =
        tanggalMesinBBCS();


    let periodeSekarang =
        periodeMesinBBCS(
            sekarang
        );


    let hari =
        sekarang.getDate();


    // =================================
    // JASA PERTAMA
    // =================================

    let periodePertama =
        jasaPertamaMesinBBCS(
            data
        );


    if(!periodePertama){

        return {

            bulanTertunggak: 0,

            jasaTertunggak: 0,

            dendaTertunggak: 0,

            wajibBayar: false,

            periodeTertunggak: []

        };

    }


    // =================================
    // JASA PER PERIODE
    // =================================

    let jasaPeriode =
        jasaPeriodeMesinBBCS(
            data
        );


    if(
        jasaPeriode <= 0
    ){

        return {

            bulanTertunggak: 0,

            jasaTertunggak: 0,

            dendaTertunggak: 0,

            wajibBayar: false,

            periodeTertunggak: []

        };

    }


    // =================================
    // BERAPA PERIODE SUDAH DIBAYAR
    // =================================

    let sudahDibayar =
        totalPeriodeJasaDibayarBBCS(
            data
        );


    /*
     * Periode kewajiban jasa:
     *
     * Agustus
     * September
     * Oktober
     * November
     * dst.
     *
     * Tetapi bulan berjalan belum
     * dianggap terlambat.
     */

    let periodeTersedia = [];


    let cursor =
        periodePertama;


    while(
        cursor
        <
        periodeSekarang
    ){

        periodeTersedia.push(
            cursor
        );


        cursor =
            tambahBulanMesinBBCS(
                cursor,
                1
            );

    }


    // =================================
    // POTONG PERIODE YANG SUDAH DIBAYAR
    // =================================

    let jumlahSudahDibayar =
        Math.min(
            sudahDibayar,
            periodeTersedia.length
        );


    let periodeBelumBayar =
        periodeTersedia.slice(
            jumlahSudahDibayar
        );


    // =================================
    // JASA TERTUNGGAK
    // =================================

    let jumlahTunggakan =
        periodeBelumBayar.length;


    let jasaTertunggak =
        jumlahTunggakan *
        jasaPeriode;


    // =================================
    // DENDA
    // =================================
    //
    // Denda dihitung per kewajiban jasa
    // yang sudah melewati tanggal 10.
    //
    // Contoh:
    //
    // Jasa Agustus
    // jatuh tempo September.
    //
    // 11 September:
    // denda Agustus.
    //
    // Jika dibayar pada Oktober:
    // denda Agustus berhenti.
    //
    // =================================

    let dendaTertunggak = 0;


    if(
        hari >= 11
    ){

        periodeBelumBayar.forEach(
            function(periodeJasa){

                let jatuhTempo =
                    tambahBulanMesinBBCS(
                        periodeJasa,
                        1
                    );


                /*
                 * Jatuh tempo harus sudah
                 * berada pada atau sebelum
                 * periode sekarang.
                 */

                if(
                    jatuhTempo
                    <=
                    periodeSekarang
                ){

                    dendaTertunggak +=
                        dendaPeriodeMesinBBCS(
                            data
                        );

                }

            }
        );

    }


    // =================================
    // WAJIB TRANSAKSI
    // =================================

    let wajibBayar =
        jumlahTunggakan > 0;


    // =================================
    // HASIL
    // =================================

    return {

        bulanTertunggak:
            jumlahTunggakan,

        jasaTertunggak:
            jasaTertunggak,

        dendaTertunggak:
            dendaTertunggak,

        wajibBayar:
            wajibBayar,

        periodeTertunggak:
            periodeBelumBayar

    };

}


// =====================================
// SINKRON DATABASE
// =====================================

function sinkronTunggakanBBCS(){

    if(
        !Array.isArray(
            pinjaman
        )
    ){

        return;

    }


    pinjaman.forEach(
        function(data){

            let hasil =
                hitungTunggakanBBCS(
                    data
                );


            data.bulanTertunggak =
                hasil.bulanTertunggak;


            data.jasaTertunggak =
                hasil.jasaTertunggak;


            data.dendaTertunggak =
                hasil.dendaTertunggak;


            data.wajibBayar =
                hasil.wajibBayar;


            data.periodeTertunggak =
                hasil.periodeTertunggak;

        }
    );


    if(
        typeof simpanDatabaseAman
        ===
        "function"
    ){

        simpanDatabaseAman();

    }

}


// =====================================
// INFO TUNGGAKAN
// =====================================

function infoTunggakan(
    data
){

    if(!data){

        console.log(
            "Pinjaman tidak ditemukan"
        );

        return null;

    }


    let sekarang =
        tanggalMesinBBCS();


    let hasil =
        hitungTunggakanBBCS(
            data
        );


    let periodeSekarang =
        periodeMesinBBCS(
            sekarang
        );


    let periodePertama =
        jasaPertamaMesinBBCS(
            data
        );


    let jasaPeriode =
        jasaPeriodeMesinBBCS(
            data
        );


    console.log(
        "================================="
    );

    console.log(
        "TUNGGAKAN BBCS V15"
    );

    console.log(
        "Pinjaman :",
        data.id
    );

    console.log(
        "Nama :",
        data.nama
    );

    console.log(
        "Tanggal pinjaman :",
        data.tanggalPinjaman ||
        data.tanggal ||
        "-"
    );

    console.log(
        "Periode jasa pertama :",
        periodePertama
    );

    console.log(
        "Jasa per periode :",
        rupiah(
            jasaPeriode
        )
    );

    console.log(
        "Tanggal BBCS :",
        periodeSekarang,
        sekarang.getDate()
    );

    console.log(
        "Hari :",
        sekarang.getDate()
    );

    console.log(
        "Periode sekarang :",
        periodeSekarang
    );

    console.log(
        "Jumlah periode jasa dibayar :",
        totalPeriodeJasaDibayarBBCS(
            data
        )
    );

    console.log(
        "Bulan tertunggak :",
        hasil.bulanTertunggak
    );

    console.log(
        "Jasa tertunggak :",
        rupiah(
            hasil.jasaTertunggak
        )
    );

    console.log(
        "Denda tertunggak :",
        rupiah(
            hasil.dendaTertunggak
        )
    );

    console.log(
        "Wajib transaksi :",
        hasil.wajibBayar
    );

    console.log(
        "Periode belum dibayar :",
        hasil.periodeTertunggak
    );

    console.log(
        "================================="
    );


    return hasil;

}


// =====================================
// JALANKAN MESIN
// =====================================

console.log(
    "Menjalankan Mesin Tunggakan BBCS V15"
);


sinkronTunggakanBBCS();


console.log(
    "Database BBCS tersinkronisasi"
);


console.log(
    "Tunggakan BBCS V15 berhasil disinkronkan"
);


console.log(
    "Pemeriksaan tunggakan BBCS V15 selesai"
);


console.log(
    "Mesin Tunggakan BBCS V15 Siap"
);