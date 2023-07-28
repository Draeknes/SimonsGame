var coloriBottone = ["red", "blue", "green", "yellow"];

var sequenzaGioco = [];

var sequenzaUtente = [];

var level = 0;

var start = false;

$("body").on("keydown", function(){
    if(start !== true){
        nuovaSequenza();
        start = true;
    }
});

function nuovaSequenza(){

    sequenzaUtente = [];

    //ALL INIZIO DELLA NUOVA SEQUENZA CREO UN NUMERO CASUALE E LO POSIZIONO NELL'ARRAY SEQUENZA DI GIOCO
    var numeroCasuale = Math.floor(Math.random() * 4);
    var coloreCasuale = coloriBottone[numeroCasuale];
    sequenzaGioco.push(coloreCasuale);

    //AL PARTIRE DELLA NUOVA SEQUENZA FACCIO ANIMARE IL QUADRATO E GLI FACCIO PRODURRE IL SUONO
    $("#" + coloreCasuale).animate({opacity: 0.3}).animate({opacity: 1});
    effettoAudio(coloreCasuale);
    //
    level ++;
    $("h1").html("level " + level);
    
}
//CONTROLLO SE L'UTENTE HA PREMUTO UN QUADRATO CON IL MOUSE E LO METTO NELL'ELENCO SEQUENZA UTENTE
$(".btn").on("click", function(){
    var coloreUtente = $(this).attr("id");
    sequenzaUtente.push(coloreUtente);
    effettoAudio(coloreUtente);
    animazioneClick(coloreUtente);
    verificaRisposta(sequenzaUtente.length -1);

})

function effettoAudio(nome){
    var suono = new Audio("./sounds/" + nome + ".mp3");
    suono.play();
}

function animazioneClick(colore){
    $("#" + colore).addClass("pressed");
    //MI PERMETTE DI RIMUOVERE LA CLASSE DOPO UN TIMEOUT DI 100MS
    setTimeout(function(){
     $("#" + colore).removeClass("pressed");
    }, 100);
}

//LOGICA DEL GIOCO
function verificaRisposta(livelloCorrente){
    if(sequenzaUtente[livelloCorrente] === sequenzaGioco[livelloCorrente]){
        if(sequenzaUtente.length === sequenzaGioco.length){
            setTimeout(function(){
                nuovaSequenza();
               }, 1000);
        }
    }else{  

        var suono = new Audio("./sounds/wrong.mp3");
        suono.play();
        $("h1").html("GAME OVER press any key to restart");
        $("body").css("background-color", "red");
        setTimeout(function(){
            $("body").css("background-color", "#011F3F");
           }, 200);

        ricomincia();
    }
}

function ricomincia(){
    level = 0;
    sequenzaGioco = [];
    start = false;
}
   