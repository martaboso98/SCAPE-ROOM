// estadoJuego.js
let estadoJuego = {
    capituloActual:  1,
    evidencias: [],
    progreso: {},
    pistasCap1: {
        escritorio: false,
        biblioteca: false,
        jardin: false
    },
    puntosDeIntuicion:  100, // Todos comienzan con  100 puntos de intuición.
    interaccionesCap2: {
        familia: false,
        amigos: false,
        socios: false
    },
    penalizaciones:  0, // Rastrea el número de penalizaciones para impactar en la narrativa.
    capitulo3: {
        salaPistasOcultas: false,
        habitacionSellada: false,
        finalVerdadero: false,
        finalFalso: false
    },
};

function actualizarIntuicionDisplay() {
    const intuicionDisplay = document.getElementById('intuicionDisplay');
    if (intuicionDisplay) {
        intuicionDisplay.textContent = `Intuición: ${estadoJuego.puntosDeIntuicion}`;
    }
}

function iniciarJuego() {
    estadoJuego.capituloActual = 1;
    estadoJuego.evidencias = [];
    estadoJuego.pistasCap1 = { escritorio: false, biblioteca: false, jardin: false };
    estadoJuego.interaccionesCap2 = { // Reset the interactions for Chapter  2
        familia: false,
        amigos: false,
        socios: false
    };
    estadoJuego.puntosDeIntuicion = 100; // Reset points of intuition
    estadoJuego.penalizaciones = 0; // Reset penalties
    guardarProgreso(); // Save the reset game state
    mostrarCapitulo(estadoJuego.capituloActual); // Show the current chapter
}

function mostrarCapitulo(capitulo) {
    ocultarTodosLosCapitulos(); // Oculta todos los capítulos primero.
    const textoCapitulo = document.getElementById(`capitulo${capitulo}`);
    if (textoCapitulo) {
        textoCapitulo.classList.remove('hidden'); // Muestra el capítulo actual.
    }
}


function ocultarTodosLosCapitulos() {
    document.querySelectorAll('[id^="capitulo"]').forEach(capitulo => capitulo.classList.add('hidden'));
}

// Agrega una función para verificar si es posible avanzar al Capítulo 3
function puedeAvanzarACapitulo3() {
    // Se requiere haber interrogado correctamente a la amigos y a los socios, los amigos son opcionales
    return estadoJuego.interaccionesCap2.amigos && estadoJuego.interaccionesCap2.socios && estadoJuego.puntosDeIntuicion >  50;
}

// Modifica la función seleccionOpcion para incluir la lógica de avance al Capítulo 3
function seleccionOpcion(capituloSiguiente) {
    console.log(estadoJuego); // Agrega esta línea para depurar
    if (capituloSiguiente ===  3 && puedeAvanzarACapitulo3()) {
        estadoJuego.capituloActual =  3;
        estadoJuego.capitulo3.salaPistasOcultas = true; // Inicializa la Sala de Pistas Ocultas como visible
        estadoJuego.capitulo3.habitacionSellada = false; // Inicializa la Habitación Sellada como oculta
        estadoJuego.capitulo3.finalVerdadero = false; // Inicializa el Final Verdadero como oculto
        estadoJuego.capitulo3.finalFalso = false; // Inicializa el Final Falso como oculto
    } else {
        estadoJuego.capituloActual = capituloSiguiente;
    }
    guardarProgreso();
    mostrarCapitulo(estadoJuego.capituloActual);
}



function guardarProgreso() {
    localStorage.setItem('estadoJuego', JSON.stringify(estadoJuego));
}

function cargarProgreso() {
    const progresoGuardado = localStorage.getItem('estadoJuego');
    if (progresoGuardado) {
        estadoJuego = JSON.parse(progresoGuardado);

        if (!estadoJuego.interaccionesCap2) {
            estadoJuego.interaccionesCap2 = {
                familia: false,
                amigos: false,
                socios: false
            };
        }
        if (!estadoJuego.capitulo3) {
            estadoJuego.capitulo3 = {
                salaPistasOcultas: false,
                habitacionSellada: false,
                finalVerdadero: false,
                finalFalso: false
            };
        }
        console.log('Estado del juego cargado desde localStorage:', estadoJuego);
        mostrarCapitulo(estadoJuego.capituloActual);
    } else {
        console.log('No hay progreso guardado en localStorage. Iniciando un nuevo juego.');
        iniciarJuego();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarProgreso();
    document.getElementById('comenzar').addEventListener('click', () => {
        localStorage.clear();
        iniciarJuego(); // Restart the game
    }); document.getElementById('continuar').addEventListener('click', cargarProgreso);
});
