// =====================================
// BERKAH BERSAMA CORE SYSTEM
// SERVICE WORKER BBCS V2.2
// =====================================

const CACHE_NAME = "bbcs-admin-v1";


// =====================================
// FILE INTI BBCS
// =====================================

const FILES = [

    // ROOT
    "./",
    "./bbcs.html",
    "./login.html",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png",

    // CSS
    "./css/style.css",

    // CORE
    "./js/core/database.js",

    // AUTH
    "./js/auth/admindashboard.js",
    "./js/auth/logout.js",
    "./js/auth/hakakses.js",
    "./js/auth/login.js",

    // SIMPANAN
    "./js/simpanan/simpanan.js",

    // DASHBOARD
    "./js/dashboard/dashboard.js",

    // SECURITY
    "./js/security/loginproteksi.js",
    "./js/security/proteksiAkses.js",
    "./js/security/pengaman.js",
    "./js/security/securityBBCS.js",

    // TRANSAKSI
    "./js/transaksi/transaksi.js",

    // REKENING
    "./js/rekening/rekening.js",
    "./js/rekening/qrcode.min.js",

    // BACKUP
    "./js/backup/backup.js",

    // KAS
    "./js/kas/kas.js",

    // PINJAMAN
    "./js/pinjaman/pinjaman.js",
    "./js/pinjaman/administrasi.js",
    "./js/pinjaman/tunggakan.js",

    // CETAK
    "./js/cetak/cetak.js",
    "./js/cetak/cetak_rekening.js",

    // ANGGOTA
    "./js/anggota/anggota.js",

    // =================================
    // PAGES
    // =================================

    "./pages/anggota.html",
    "./pages/simpanan.html",
    "./pages/cetak _rekening.html",
    "./pages/cetak.html",
    "./pages/kas.html",
    "./pages/rekening.html",
    "./pages/pinjaman.html",
    "./pages/transaksi.html",
    "./pages/backup.html",

    // =================================
    // MESIN ANGSURAN
    // =================================

    "./Mesin/angsuran.html",
    "./Mesin/angsuran.js",
    "./Mesin/eksekusi.js",
    "./Mesin/eksekutor.js",
    "./Mesin/filter.js",
    "./Mesin/kewajiban.js",
    "./Mesin/konektor.js",
    "./Mesin/mesin_v18.js",
    "./Mesin/periode.js",
    "./Mesin/siklus.js",

    // =================================
    // INVESTOR
    // =================================

    "./Investor_BBCS/investor.html",
    "./Investor_BBCS/investor.js",
    "./Investor_BBCS/mesin.js",
    "./Investor_BBCS/konektor.js",

    // =================================
    // LAPORAN
    // =================================

    "./Laporan BBCS/laporan.html",
    "./Laporan BBCS/laporan_anggota.js",
    "./Laporan BBCS/laporan_angsuran.js",
    "./Laporan BBCS/laporan_pinjaman.js",
    "./Laporan BBCS/laporan_cetak.js",
    "./Laporan BBCS/laporan_global.js",
    "./Laporan BBCS/laporan_ringkasan.js",
    "./Laporan BBCS/laporan_pendapatan.js",
    "./Laporan BBCS/laporan_investor.js",
    "./Laporan BBCS/laporan_simpanan.js",
    "./Laporan BBCS/laporan_transaksi.js",
    "./Laporan BBCS/laporan_riwayat_global.js"

];


// =====================================
// INSTALL
// =====================================

self.addEventListener("install", event => {

    console.log(
        "Service Worker BBCS V2.2 sedang install..."
    );

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(async cache => {

                let berhasil = 0;
                let gagal = 0;

                for (const file of FILES) {

                    try {

                        const response =
                            await fetch(file);

                        if (
                            response.ok
                        ) {

                            await cache.put(
                                file,
                                response
                            );

                            berhasil++;

                            console.log(
                                "CACHE OK:",
                                file
                            );

                        } else {

                            gagal++;

                            console.warn(
                                "CACHE GAGAL:",
                                file,
                                response.status
                            );

                        }

                    } catch (error) {

                        gagal++;

                        console.warn(
                            "FILE TIDAK DITEMUKAN:",
                            file
                        );

                    }

                }

                console.log(
                    "===================================="
                );

                console.log(
                    "BBCS V2.2 CACHE SELESAI"
                );

                console.log(
                    "Berhasil:",
                    berhasil
                );

                console.log(
                    "Gagal:",
                    gagal
                );

                console.log(
                    "===================================="
                );

            })

            .then(() => {

                return self.skipWaiting();

            })

    );

});


// =====================================
// ACTIVATE
// =====================================

self.addEventListener("activate", event => {

    console.log(
        "Service Worker BBCS V2.2 aktif"
    );

    event.waitUntil(

        caches.keys()

            .then(cacheNames => {

                return Promise.all(

                    cacheNames

                        .filter(
                            cacheName =>
                                cacheName !== CACHE_NAME
                        )

                        .map(
                            cacheName => {

                                console.log(
                                    "Hapus cache lama:",
                                    cacheName
                                );

                                return caches.delete(
                                    cacheName
                                );

                            }
                        )

                );

            })

            .then(() => {

                return self.clients.claim();

            })

    );

});


// =====================================
// FETCH
// CACHE FIRST
// =====================================

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

            .then(response => {

                if (response) {

                    return response;

                }

                return fetch(event.request)

                    .then(networkResponse => {

                        if (
                            !networkResponse ||
                            networkResponse.status !== 200 ||
                            networkResponse.type === "opaque"
                        ) {

                            return networkResponse;

                        }

                        const clone =
                            networkResponse.clone();

                        caches.open(CACHE_NAME)

                            .then(cache => {

                                cache.put(
                                    event.request,
                                    clone
                                );

                            });

                        return networkResponse;

                    });

            })

    );

});


// =====================================
// PESAN
// =====================================

self.addEventListener("message", event => {

    if (
        event.data &&
        event.data.type === "SKIP_WAITING"
    ) {

        self.skipWaiting();

    }

});


console.log(
    "SERVICE WORKER BBCS V2.2 SIAP"
);