//Selecionando todas as DIVs
let container = document.querySelector("#container");
let mario = document.querySelector("#mario");
let pipe = document.querySelector("#pipe");
let floor = document.querySelector("#floor");
let clouds = document.querySelector("#clouds");
let score = document.querySelector("#score");
let GameOver = document.querySelector("#GameOver");

//Declarando variavéis para o score
let interval = null;
let playerScore = 0;

//Função para o score
let scoreCounter = () => {
    playerScore++;
    score.innerHTML = `Score <b>${playerScore}</b>`; //Definido onde o valor será alterado.
}
window.addEventListener("keydown" , (start) => {
    if(start.code == "Space")
    {
        GameOver.style.display = "none"; //Usado para esconder o Game Over inicial
        pipe.classList.add("pipeAnimate"); //Usado para inicar o Cano
        score.classList.remove("scoreCenter")//Remove score do centro
        floor.firstElementChild.style.animation = "floorAnimate 2.5s linear infinite"; //Usado para iniciar o Chão
        clouds.firstElementChild.style.animation = "cloudsAnimate 20s linear infinite"; //Usado para iniciar as Nuvens

        let playerScore = 0;
        interval = setInterval(scoreCounter,200); // Definido a velocidade que o score sobe
    }
})

//Animação de pulo
window.addEventListener("keydown" , (e) => {
    if(e.key == "ArrowUp")
        if(mario.classList != "jumpActive") 
        {
            mario.classList.add("jumpActive");//Adiciona classe de animação de pulo
            
            setTimeout(() => {
                mario.classList.remove("jumpActive");//Remover classe de animação de pular depois de 0.5 segundos
            },500);
        }
})

//Se bater no cano, fim de jogo
let result = setInterval(() => {
    let marioBottom = parseInt(getComputedStyle(mario).getPropertyValue("bottom"));
    let pipeLeft = parseInt(getComputedStyle(pipe).getPropertyValue("left"));

    if(marioBottom <= 90 && pipeLeft >= 20 && pipeLeft <= 120){ //Calculando a distancia em que o personagem "bate" no cano.
        GameOver.style.display = "block"; //Usado para mostrar a mensagem de Game Over.
        pipe.classList.remove("pipeAnimate"); //Usado para finalizar o Cano
        score.classList.add("scoreCenter")//Adiciona score no centro da tela//
        floor.firstElementChild.style.animation = "none"; //Usado para finalizar o Chão
        clouds.firstElementChild.style.animation = "none"; //Usado para finalizar as Nuvens
        clearInterval(interval);
        playerScore = 0; //Usado para zerar o score.
    }
},10);

