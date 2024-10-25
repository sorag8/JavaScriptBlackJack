/**
 * 2C = Two of Clubs
 * 2D = Two of Diamods
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

//? Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');



// Crea un nuevo deck
const crearDeck = () => {

    for( i = 2; i <= 10; i++ ){
        for( let tipo of tipos ){
            deck.push( i + tipo);
        }
    }
    for( let tipo of tipos ){
        for( let especial of especiales ){
            deck.push( especial + tipo );
        }
    }
    // console.log( deck );
    deck = _.shuffle(deck);
    console.log( deck );

    return deck;
}

crearDeck();


// Tomar una carta
const pedirCarta = () => {

    if( deck.length === 0 ){
        throw 'No hay cartas en el deck';
    }
    const carta = deck.shift();
    return carta;

}


const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor ) )
        ? ( valor === 'A' ) ? 11 : 10 
        : valor * 1;
}

// Turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {

    do{

    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta( carta );
    puntosHTML[1].innerText = puntosComputadora;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasComputadora.append( imgCarta );

    if( puntosMinimos > 21 ){
        break;
    }

    } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout( () => {
        if( puntosComputadora === puntosMinimos ){
                alert('Empate, nadie gana');
        } else if ( puntosMinimos > 21 ){
            alert('Computadora gana');
        } else if ( puntosComputadora > 21 ){
            alert('Jugador 1 gana');
        } else if ( puntosComputadora > puntosMinimos ){
            alert('Computadora gana');
        }
    }, 500 );


}



// Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;

    //? Insertar la carta
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ){
        console.warn('Perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    } else if ( puntosJugador === 21 ) {
        console.warn('21, genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora ( puntosJugador );
    }

});

btnDetener.addEventListener('click', () => {
    console.log( puntosJugador );
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugador );
});

btnNuevo.addEventListener('click', () => {

    console.clear();

    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';
    
    btnPedir.disabled = false;
    btnDetener.disabled = false;
});

