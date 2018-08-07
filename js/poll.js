//add question

var questionaddformmodal = document.getElementById('questionaddform');

var questionaddbutton = document.getElementById('questionadd');

var closeBtn2 = document.getElementsByClassName('closeBtn2')[0];

questionaddbutton.addEventListener('click', openModal);

closeBtn2.addEventListener('click', closeModal);

window.addEventListener('click', outsideClick);

function openModal(){
    questionaddform.style.display = 'block';
}

function closeModal(){
    questionaddform.style.display = 'none';
}

function outsideClick(e){
    if(e.target == questionaddform){
    questionaddform.style.display = 'none';
    }
}