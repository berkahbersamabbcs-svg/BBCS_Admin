// =====================================
// BBCS LOGIN PROTEKSI V3.0
// =====================================

console.log(
"Login Proteksi BBCS Aktif"
);


let statusLogin =
localStorage.getItem("loginAktif");


console.log(
"Status Login :",
statusLogin
);


if(
statusLogin !== "YA"
){

alert(
"Silakan Login Terlebih Dahulu"
);


location.href =
"login.html";

}