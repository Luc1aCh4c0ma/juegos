let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial= 30;
let tiempoRegresivoId = null;

let winAudio = new Audio ('./sounds/win.wav');
let loseAudio = new Audio ('./sounds/lose.wav');
let clickAudio = new Audio ('./sounds/click.wav');
let rightAudio = new Audio ('./sounds/right.wav');
let wrongAudio = new Audio ('./sounds/wrong.wav');

let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById ('aciertos');
let mostrarTiempo = document.getElementById ('t-restante'); 

let numeros = [ 1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()- 0.5});
console.log(numeros);

function contarTiempo (){
    tiempoRegresivoId = setInterval(()=>{
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        timer--;
        if (timer < 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas(numeros);
            loseAudio.play();
        }
    },1000, timer);
}

function bloquearTarjetas(){
    for (let i= 0; i<= 15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML =`<img src="./images/${numeros[i]}.png" alt="">`;
        clickAudio.play();
        tarjetaBloqueada.disabled = true;
    }
}

function destapar (id) {

    if (temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png" alt="">`;

        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas == 2){
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png" alt="">`;

        tarjeta2.disabled = true;

        movimientos++; 

        mostrarMovimientos.innerHTML = `movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado){
            tarjetasDestapadas = 0;

            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            rightAudio.play();

            if (aciertos == 8){
                winAudio.play();
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos}🤯 `;
                mostrarTiempo.innerHTML = `Increible! 🎉 Solo tardaste ${timerInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `movimientos: ${movimientos} 😎🤟`;
                
            }
        }else{
            wrongAudio.play();
            setTimeout (()=> {
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;

            },800);
        }
    }
}