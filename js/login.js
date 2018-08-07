console.log("logIn.js");

var socket = io();

var buttonLogIn = document.getElementById("logInButtonLogIn");
var inputUserName = document.getElementById("logInInputUserName");
var inputPassword = document.getElementById("logInInputPassword");



    buttonLogIn.addEventListener("click", function(){
     if (inputUserName.value == ""){
         alert("نام کاربری را وارد کنید");
         return;
     } else {
         if (inputPassword.value == ""){
             alert("پسورد را وارد کنید");
             return;
         } else {
                socket.emit('logIn',inputUserName.value,inputPassword.value);
         }
     }

});


socket.on('checkEnterAcount',(enterUser)=>{
    if (enterUser){
        window.location.href = "main";
       // socket.emit('saveUserWhenLogInSqlite',inputUserName.value,inputPassword.value);

    } else {
        alert('نام کاربری یا رمز عبور اشتباه است')
        return;
    }

});




