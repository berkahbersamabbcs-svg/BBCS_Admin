// =====================================
// BBCS LOGIN V3.0
// =====================================

console.log(
"BBCS LOGIN AKTIF"
);

// PIN default

if(
!localStorage.getItem("pinAdmin")
){

localStorage.setItem(
"pinAdmin",
"123456"
);

}

// Session default

if(
!localStorage.getItem("loginAktif")
){

localStorage.setItem(
"loginAktif",
"TIDAK"
);

}
function loginBBCS(){

let pin =
document.getElementById(
"pin"
).value;

let pinDatabase =
localStorage.getItem(
"pinAdmin"
);

if(pin===pinDatabase){

localStorage.setItem(
"loginAktif",
"YA"
);

localStorage.setItem(
"levelAdmin",
"ADMIN"
);


localStorage.setItem(
"namaAdmin",
"Administrator BBCS"
);

localStorage.setItem(
"levelAdmin",
"ADMIN"
);

localStorage.setItem(
"waktuLogin",
new Date().toLocaleString("id-ID")
);


alert(
"Login Berhasil"
);


location.href=
"bbcs.html";


return;

}

alert(
"PIN Salah"
);

}
function logoutBBCS(){

localStorage.setItem(
"loginAktif",
"TIDAK"
);

location.href=
"login.html";

}