localStorage.setItem("test", 1);
//ужасное кол-во переменных
const dialog = document.querySelector("dialog");
const leftbtn = document.getElementById("leftbtn");
const rightbtn = document.getElementById("rightbtn");
const upbtn = document.getElementById("upbtn");
const downbtn = document.getElementById("downbtn");
let rec = document.getElementById("record");
let score = document.getElementById("score");
let scorell = 3;
let recs = 0;
var lftwo;
let con_let_right = -2;
let con_let = -1;
const array = [];
let x_down = -1; 
let word_down;
const arr_word = ["A","B","C","D","E","F","G","H","I"];
let eat;
let lengthh = 3;
let speed = 300;
let intervalId;
let right_act = false;
let up_act = false;
let game = false;
let word = "A";
let i = 0;
let iii = 0;
document.addEventListener('keydown', function (event) {
    if (event.key === 'D' || event.key === 'd'  || event.key === 'В' || event.key === 'в') {
        if(right_act === false){
            if(game !== false){
                clearInterval(intervalId);
                intervalId = setInterval(right, speed);
                right_act = true;
                up_act = false;
            }

        }

    } else if (event.key === 'S' || event.key === 's'  || event.key === 'Ы' || event.key === 'ы' ) {
        if(up_act === false){
            clearInterval(intervalId);
            intervalId = setInterval(down, speed);
            up_act = true;
            right_act = false;
            game = true;
        }

    } else if (event.key === 'A' || event.key === 'a'  || event.key === 'Ф' || event.key === 'ф' ) {
        if(right_act === false){
            if(game !== false){
                clearInterval(intervalId);
                intervalId = setInterval(left, speed);
                right_act = true;
                up_act = false;
            }
        }

    } else if (event.key === 'W' || event.key === 'w'  || event.key === 'Ц' || event.key === 'ц' ) {
        if(up_act === false){
            clearInterval(intervalId);
            intervalId = setInterval(up, speed);
            up_act = true;
            right_act = false;
            game = true;

        }

    }
});
leftbtn.addEventListener('click', function() {
    if(right_act === false){
        if(game !== false){
            clearInterval(intervalId);
            intervalId = setInterval(left, speed);
            right_act = true;
            up_act = false;
        }
    }
});

rightbtn.addEventListener('click', function() {
    if(right_act === false){
        if(game !== false){
            clearInterval(intervalId);
            intervalId = setInterval(right, speed);
            right_act = true;
            up_act = false;
        }
    }
});

upbtn.addEventListener('click', function() {
    if(up_act === false){
        clearInterval(intervalId);
        intervalId = setInterval(up, speed);
        up_act = true;
        right_act = false;
        game = true;
    }
});

downbtn.addEventListener('click', function() {
    if(up_act === false){
        clearInterval(intervalId);
        intervalId = setInterval(down, speed);
        up_act = true;
        right_act = false;
        game = true;
    }
});

function down(){
    if(iii == 0){iii = 1;}
    while(true){
        if(x_down >= 8){x_down = -1;}
        x_down++;word_down = arr_word[x_down];
        document.getElementById(word_down + iii).style.background = "lime";
        word = word_down;clear_move(1);break;   

    }  
}
function right(){
    while(true){
        if(iii >= 9){iii = 0;}
        iii = iii+1;
        if(iii == 0){iii = 1;}
        document.getElementById(word + iii).style.background = "lime";
        clear_move(2);break;
    }
}
function left(){
    while(true){
        if(iii <= 1){iii = 10;}
        iii = iii-1;
        if(iii == 0){iii = 1;}
        document.getElementById(word + iii).style.background = "lime";

        clear_move(3);break;
    }
}
function up(){
    if(iii == 0){iii = 1;}
    while(true){
        if(x_down <= 0){x_down = 9;}
        x_down--;word_down = arr_word[x_down];
        document.getElementById(word_down + iii).style.background = "lime";
        word = word_down;clear_move(4);break;   
    }  
}
function clear_move(x) {
    let header;
    switch (x) {
        case 1:
            header = "snakee_down";
            break;
        case 2:
            header = "snakee_right";
            break;
        case 3:
            header = "snakee_left";
            break;
        case 4:
            header = "snakee_top";
            break;
    }
    let con = word + iii;
    if (con == eat) {
        con_let_right = con_let_right - 1;
        scorell++;
        if(scorell >= localStorage.getItem('r')){
            localStorage.setItem('r', scorell);
        }
        console.log(scorell);
        eat = 0;
        rand_eat();
    }
    array.push(con);
    if (array.length >= lengthh) {
        con_let_right++;
        if (array[con_let_right] !== eat) {
            var element = document.getElementById(array[con_let_right]);
            if (element !== null) {
                element.style.background = "rgb(236,236,236)";
                delete array[con_let_right];
            }
        }
    }
    let hea = array.length - 1;
    let hea2 = array.length - 2;
    let head = array[hea];
    let head2 = array[hea2];
    var element = document.getElementById(head);
    if (element !== null) {
        element.classList.add(header);
    }
    var lf = array.length - con_let_right - 1;
    var a = 2;
    while (a <= lf) {
        con_let = array.length - a;
        lftwo = array[con_let];
        var element = document.getElementById(lftwo);
        if (element !== null) {
            element.classList.remove('snakee_top');
            element.classList.remove('snakee_left');
            element.classList.remove('snakee_down');
            element.classList.remove('snakee_right');
            if (lftwo == eat) {
                
                document.getElementById(eat).style.background = "lime";
                eat = 0;
                rand_eat();
            }
            if (con == lftwo) {
                var element = document.getElementById(con);
                if (element !== null) {
                    dialog.showModal();
                    score.innerHTML = scorell;
                    rec.innerHTML = localStorage.getItem('r');
                }
            }
        }
        a++;
    }
}

function rand_eat(){
    eat = arr_word[Math.floor(Math.random() * 8) + 1] + Math.floor(Math.random() * 9 + 1);
    document.getElementById(eat).style.background = "orange";  
}
rand_eat();
