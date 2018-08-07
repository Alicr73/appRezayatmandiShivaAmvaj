console.log("register page opened");
var socket = io();

var inputUserName=document.getElementById("registerInputUserName");
var inputPassword=document.getElementById("registerInputPassword");
var inputRePassword=document.getElementById("registerInputRePassword");
var buttonRegister=document.getElementById("registerButtonRegister");


buttonRegister.addEventListener("click", function(){
    if (inputUserName.value == ""){
        alert("نام کاربری را وارد کنید");
        return;
    } else {
        if (inputPassword.value == ""){
            alert("پسورد را وارد کنید");
            return;
        } else {
            if (inputPassword.value != inputRePassword.value){
                alert("پسورد همخوانی ندارد");
                return;
            } else {
                socket.emit('findUser',inputUserName.value);
                }
           }
    }

});

socket.on('checkUserName',(userTekrari)=>{
    if (userTekrari){
        alert("نام کاربری تکراری است");
        return
    } else {
        socket.emit('register',inputUserName.value,inputPassword.value);
        window.location.href = "login";
    }

});