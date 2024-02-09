// Variables globales para gestionar el estado del juego
let estadoJuego = {
    capituloActual: 1,
    evidencias: [],
    progreso: {}

};
estadoJuego.pistasCap1 = {
    escritorio: false,
    biblioteca: false,
    jardin: false
};

// Función para manejar la exploración de pistas
// Función ajustada para manejar la exploración de pistas con contexto
function explorarPista(pista) {
    if (pista === 'jardin') {
        // El jardín ofrece contexto adicional pero no avanza la trama
        alert("El jardín es un remanso de paz, un contraste marcado con la tensión de la investigación. No encuentras pistas aquí, pero el aire fresco te da un nuevo enfoque.");
        return; // No marca la pista como explorada ni avanza la historia
    }

    estadoJuego.pistasCap1[pista] = true;
    let mensaje = "";

    switch (pista) {
        case 'escritorio':
            mensaje = "Revuelves los papeles y encuentras una nota sospechosa con una cifra y una fecha. Definitivamente, vale la pena investigar.";
            break;
        case 'biblioteca':
            mensaje = "Detrás de un libro falso, descubres una caja fuerte oculta. Falta la combinación, pero has hallado un importante secreto.";
            break;
    }

    alert(mensaje);

    // Comprobar si todas las pistas relevantes han sido exploradas
    if (estadoJuego.pistasCap1.escritorio && estadoJuego.pistasCap1.biblioteca) {
        alert("Has recolectado suficientes pistas. Es hora de avanzar al Capítulo 2.");
        seleccionOpcion(2); // Avanzar al siguiente capítulo
    }
}


// Actualizar la función iniciarJuego para resetear también las pistas del Capítulo 1
function iniciarJuego() {
    estadoJuego.capituloActual = 1;
    estadoJuego.evidencias = [];
    estadoJuego.pistasCap1 = { escritorio: false, biblioteca: false, jardin: false };
    mostrarCapitulo(estadoJuego.capituloActual);
}

// Función para mostrar el texto y opciones del capítulo actual
function mostrarCapitulo(capitulo) {
    const textoCapitulo = document.getElementById(`capitulo${capitulo}`);
    if (!textoCapitulo) return;
    ocultarTodosLosCapitulos();
    textoCapitulo.classList.remove('hidden');

    // Lógica para mostrar opciones interactivas específicas del capítulo aquí
}

// Función para ocultar todos los capítulos y mostrar solo el actual
function ocultarTodosLosCapitulos() {
    const capitulos = document.querySelectorAll('[id^="capitulo"]');
    capitulos.forEach(capitulo => capitulo.classList.add('hidden'));
}

// Función para manejar la selección de opciones interactivas
function seleccionOpcion(capituloSiguiente) {
    estadoJuego.capituloActual = capituloSiguiente;
    mostrarCapitulo(capituloSiguiente);
    guardarProgreso();
}

// Función para cargar el mapa de Monteluz
function cargarMapaMonteluz() {
    // Implementación específica para cargar y mostrar el mapa interactivo
    // Esta función puede incluir la inicialización de eventos para seleccionar ubicaciones en el mapa
}

// Función para manejar la selección de ubicaciones en el mapa
function seleccionarUbicacion(ubicacion) {
    // Mostrar información de la ubicación seleccionada y permitir la exploración
    // Dependiendo de la ubicación, se pueden revelar nuevas evidencias o avanzar en la trama
}

// Función para añadir evidencias al inventario
function añadirEvidenciaInventario(evidencia) {
    estadoJuego.evidencias.push(evidencia);
    guardarProgreso();
}

// Función para mostrar las evidencias recogidas
function mostrarEvidenciasRecogidas() {
    // Implementación para mostrar en la interfaz las evidencias recogidas
    // Podría ser una modal o una sección específica en la página
}

// Funciones para guardar y cargar el progreso del juego usando localStorage
function guardarProgreso() {
    localStorage.setItem('estadoJuego', JSON.stringify(estadoJuego));
}

function cargarProgreso() {
    const progresoGuardado = localStorage.getItem('estadoJuego');
    if (progresoGuardado) {
        estadoJuego = JSON.parse(progresoGuardado);
        mostrarCapitulo(estadoJuego.capituloActual);
    }
}

// Añadir escuchas de eventos para botones de inicio y opciones interactivas
document.getElementById('comenzar').addEventListener('click', iniciarJuego);
document.getElementById('continuar').addEventListener('click', cargarProgreso);

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    cargarMapaMonteluz(); // Asegúrate de que el mapa se carga al inicio
    // Intentar cargar progreso al iniciar la página, si existe
    cargarProgreso();
});
