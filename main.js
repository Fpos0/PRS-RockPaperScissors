
//Faz a jogada do pc
//Randomicamente uma das 3 opcoes
//Pedra Papel ou tesoura
//Pedra = 0 / Papel = 1 / Tesoura = 2/
function computerPlay(){
    //let res = Math.floor(Math.random() * 2);
   switch (Math.floor(Math.random() * 3)) {
       case 0:
           return "Rock";//"//Pedra = 0 
           
           break;
        
        case 1:
            
           return "Paper";
            break;
        
        case 2:
            return "Scissors";
            break;

   }  
}
//Pedra = 0 / Papel = 1 / Tesoura = 2/
// 0 = PC Venceu ; 1 = Player venceu ; 2 = Empate
function playRound(playerSelection, computerSelection) {
    
	if (playerSelection=="Paper" && computerSelection=="Rock" ) {
        return ["Player win Paper beats Rock",1];
    }else if(playerSelection==="Rock" && computerSelection==="Scissors" ){
        return ["Player win Rock beats Scissors",1];
    }else if(playerSelection=="Scissors" && computerSelection=="Paper" ){
        return ["Player win Scissors beats Paper",1];
    }else if (computerSelection=="Paper" && playerSelection=="Rock" ) {
        return ["You Lose! Paper beats Rock",0];
    }else if(computerSelection==="Rock" && playerSelection==="Scissors" ){
        return ["You Lose! Rock beats Scissors",0];
    }else if(computerSelection=="Scissors" && playerSelection=="Paper" ){
        return ["You Lose! Scissors beats Paper",0];
    }else{
        return ["EMPATE! TRY AGAIN",2];
    }
    
    
       
}
/*
    Ver qual foi a jogada e coloca a respectiva foto no respectivo local
    <img src="imgs/Papel.png" class="img-JogadaAtual">
*/
function showPlayersPlay(jogada)
{
    let spanPai = document.querySelector('.JogadaAtualPlayer')
    let jogadaAnterior = document.querySelector('.PlayerPlayClear')

    if(jogadaAnterior){
        console.log(`valor da var jogadaAnterior do player ${jogadaAnterior} `)
        jogadaAnterior.parentNode.removeChild(jogadaAnterior)
    }

    const playIMG = document.createElement('img');
    playIMG.classList.add('PlayerPlayClear')
    playIMG.classList.add('img-JogadaAtual')
    switch (jogada) {
        case 'Rock':
            playIMG.setAttribute('src','imgs/Pedra.png')
            break;
        case 'Scissors':
            playIMG.setAttribute('src','imgs/Tesoura.png')
            break;
        case 'Paper':
            playIMG.setAttribute('src','imgs/Papel.png')
            break;
    }
    spanPai.appendChild(playIMG)
}

/*
    Ver qual foi a jogada e coloca a respectiva foto no respectivo local
   <img src="imgs/Papel.png" class="img-JogadaAtual">
*/
function showPcPlay(jogada)
{
    let spanPai = document.querySelector('.JogadaAtualPC')
    let jogadaAnterior = document.querySelector('.PCPlayClear')

    if(jogadaAnterior){
        console.log(`valor da var jogadaAnterior do pc ${jogadaAnterior} `)
        jogadaAnterior.parentNode.removeChild(jogadaAnterior)
    }

    const playIMG = document.createElement('img');
    playIMG.classList.add('PCPlayClear')
    playIMG.classList.add('img-JogadaAtual')
    switch (jogada) {
        case 'Rock':
            playIMG.setAttribute('src','imgs/Pedra.png')
            break;
        case 'Scissors':
            playIMG.setAttribute('src','imgs/Tesoura.png')
            break;
        case 'Paper':
            playIMG.setAttribute('src','imgs/Papel.png')
            break;
    }
    spanPai.appendChild(playIMG)
}
//Atualiza o h3 responsavel por dizer resultado do rounbd
//texto verde = player ganhou
// texto vermelho = player perdeu
function RoundResultMsg(msg){
    let msgResultadoHTML = document.querySelector('.msgResultado');
    msgResultadoHTML.textContent = msg;
    msgResultadoHTML.setAttribute('color','green')
}

function PlayRoundEvent(event){
    console.log("button ====>" + event)
    //console.log(button)
    console.log(event)
    console.log(event.target.id);

    let pcWinsHTML = document.querySelector('.VictorysPC');
    let userWinsHTML = document.querySelector('.VictorysPlayer');
    let QroundAtual = document.querySelector('#RoundCounter');
    let msgResultadoHTML = document.querySelector('.msgResultado');
    let roundsHTML = document.querySelector('#RoundCounter')
    let roundAtual = QroundAtual.textContent;
    

    let JogadaDoPlayer = event.target.id;
    showPlayersPlay(event.target.id);
    console.log("Round " + roundAtual + " jogada do jogador => " + JogadaDoPlayer)
    //Faz jogada do PC e mostra na tela
    const computerSelection = computerPlay()
    showPcPlay(computerSelection)
    console.log("Round " + roundAtual + " pc choice =>  " + computerSelection)
    //Fim jogada PC

    let StringResultado = playRound(JogadaDoPlayer, computerSelection)
    console.log(StringResultado)
    let resRodadaString;
    roundsHTML.textContent = ++roundAtual;
    switch (StringResultado[1]) {
        case 0:
            let pcW = pcWinsHTML.textContent
            console.log("variavel pcW")
            console.log(pcW)
            pcWinsHTML.textContent = ++pcW
            //++pcWins
            console.log(StringResultado[0])
            resRodadaString = StringResultado[0];
            break;
        case 1:
            //++userWins
             console.log(`text content antes ${userWinsHTML.textContent} `)
            let userW = userWinsHTML.textContent
            console.log("variavel userW")
            console.log(userW)
            userWinsHTML.textContent = ++userW
            console.log(`text content dps ${userWinsHTML.textContent} `)

            resRodadaString = StringResultado[0];
            console.log(StringResultado[0])
            break;

        default:
            //Deu empate,segue o jogo
            resRodadaString = 'Tie...No points awarded this round';
            console.log('Tie...No points awarded this round');
            break;
    }

    RoundResultMsg(resRodadaString);
    //roundsHTML.textContent = ++roundAtual;

  
   
    
}
function removeButtonEvents() {
    let plays = Array.from(document.querySelectorAll('button.PlayButtons'));
        plays.forEach((button) =>{
            button.removeEventListener('click', PlayRoundEvent);
        });
}
function GameOverCheck(event) {
    console.log("GameCheckEvent Function")
    let roundsHTML = document.querySelector('#RoundCounter')
    let pcWinsHTML = document.querySelector('.VictorysPC');
    let userWinsHTML = document.querySelector('.VictorysPlayer');

    if(roundsHTML.textContent >=5){
        userWins = userWinsHTML.textContent;
        pcWins = pcWinsHTML.textContent;
        if (userWins > pcWins) {
            RoundResultMsg("Usuario venceu,wp porra");
            removeButtonEvents()
            return ;
        }if (userWins < pcWins) {
            RoundResultMsg("lmao loser limao");
            removeButtonEvents()
            return ;

        } else {
            RoundResultMsg("its a fking bowtie everybodsy lost");
            removeButtonEvents()
            return ;

        }

        

    }
    
}
//pega jogada do usuario e joga 5 vezes contra o pc
// e ve quem ganhou


function game(){
    let pcWins = 0,userWins = 0 ,rounds = 0
    let pcWinsHTML = document.querySelector('.VictorysPC')
    pcWinsHTML.textContent = `${pcWins}`
    console.log(`testando se aparecer userwins = ${userWins}`)

    let userWinsHTML = document.querySelector('.VictorysPlayer')
    userWinsHTML.textContent = `${userWins}`

    let roundsHTML = document.querySelector('#RoundCounter')
    roundsHTML.textContent = `${rounds}`

    let msgResultadoHTML = document.querySelector('.msgResultado');
    msgResultadoHTML.textContent = `Jogo Iniciado , prepare to battle`


    let plays = Array.from(document.querySelectorAll('button.PlayButtons'));
    console.log(plays);

        plays.forEach((button) => {      
            console.log("inicializando cada evento dos botoes ====>" + button.id)

            // and for each one we add a 'click' listener
            button.addEventListener('click',PlayRoundEvent);
            button.addEventListener('click',GameOverCheck);

    });
    
//tenho q acionar um evento que vai ser acionado toda vez q o id correpende ao h3 do NUMERO DE ROUND for trocado
//esse evento vai fazer a verificacao do numero de rounds e para o jogo,remorvendo a funcao do eventlistener
// Cada vez q o span de Id RoundCounter mudar,aciona a checagem 

    
    roundsHTML.addEventListener('change',GameOverCheck);


    //PARA jogo qunado rounds = 5
    console.log("end game() function")
    
    

    //window.addEventListener('click', () =>{
        //plyer = JogadaDoPlayer;
        //console.log(JogadaDoPlayer)
    //});
/* 
    while(rounds<6){
        

    }
*/

    
    /* 
    
    for (let index = 0; index  < 5; index++) {
        //Jogada do PLAYER
        console.log("game iniciado");
        let plyer;
        let JogadaDoPlayer;
        
        

        
          
          
        


        //const playerSelection = prompt("Rock Paper or Scissors ?")   
        //plyer = playerSelection.toLowerCase()
        
        //
        
        

        
        // 0 = PC Venceu ; 1 = Player venceu ; 2 = Empate
        console.log(`Round number : ${index+1}`)

       switch (StringResultado[1]) {
            case 0:
                ++pcWins
                console.log(StringResultado[0])
                break;
            case 1:
                ++userWins
                console.log(StringResultado[0])
                break;
    
            default:
                //Deu empate,segue o jogo
                console.log('Tie...No points awarded this round');
                break;
        }
        console.log(`Player : ${userWins} / PC : ${pcWins}`)
    }
    if (userWins > pcWins) {
        console.log("Users Wins!! lucky bastard")
    }else if(userWins < pcWins){
        console.log("PC Wins, FUCK YEAH MACHINES RULES!!")   
    }else{
        console.log("its a tie, i.e everybody lost")   
    }
    */
}

const btnStartGame = document.querySelector('#StartGame');
btnStartGame.addEventListener('click',game);






