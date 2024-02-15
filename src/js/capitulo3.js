// capitulo3.js

function iniciarCapitulo3() {
    estadoJuego.capituloActual = 3;
    mostrarCapitulo(estadoJuego.capituloActual);
    mostrarSalaPistasOcultas(); // Asegúrate de que esta función esté definida y muestre la Sala de Pistas Ocultas
}

// Asumiendo acceso al estado del juego desde estadoJuego.js

function explorarMansion(nivel) {
    switch (nivel) {
        case 1: // Sala de Pistas Ocultas
            // Usando la llave del Capítulo 1 para revelar la combinación de la habitación sellada.
            if (estadoJuego.capitulo1.llaveEncontrada) {
                alert("Con la llave encontrada, abres el diario de Vidal. La fecha clave del evento que cambió su destino se revela: el día de su última gran inversión.");
                estadoJuego.capitulo3.combinacionDescubierta = "0102"; // Fecha de compra de la Mansión
                estadoJuego.capitulo3.salaPistasResuelta = true;
                actualizarPuntosDeIntuicion(0);
            } else {
                alert("Necesitas algo para abrir este candado. Recuerda la llave encontrada previamente.");
                actualizarPuntosDeIntuicion(-30);

            }
            break;
        case 2: // Habitación Sellada
            if (estadoJuego.capitulo3.salaPistasResuelta) {
                alert("Introduces la combinación en la habitación sellada, desvelando documentos que implican a Vidal en asuntos turbios relacionados con la mansión.");
                estadoJuego.capitulo3.habitacionSelladaAbierta = true;
                actualizarPuntosDeIntuicion(0);
            } else {
                alert("La habitación sellada se mantiene cerrada. La combinación es necesaria.");
            }
            break;
        case 3: // Descubrir al Asesino
            let sospechoso = determinarAsesino();
            alert(`Después de analizar todas las pistas, concluyes que el asesino es ${sospechoso}. Un giro inesperado, pero las pistas no mienten.`);
            break;
    }
}

function determinarAsesino() {
    if (estadoJuego.puntosDeIntuicion > 50) {
        // Un final inesperado basado en las pistas y los interrogatorios del Capítulo 2.
        return "uno de sus amigos, consumido por la envidia hacia el nivel de vida que Vidal había alcanzado con la compra de los terrenos de la mansión";
    } else {
        // Con una intuición baja, el jugador llega a una conclusión errónea.
        return "un socio de negocios, acusado erróneamente debido a la falta de evidencia clara y tu propia intuición insuficiente, dejándote con dudas sobre tu conclusión.";
    }
}

function actualizarPuntosDeIntuicion(puntos) {
    estadoJuego.puntosDeIntuicion += puntos;
    alert(`Puntos de intuición actuales: ${estadoJuego.puntosDeIntuicion}`);
}


function avanzarNivel(nivelActual) {
    if (nivelActual < 3) {
        explorarMansion(nivelActual + 1);
    } else {
        // Lógica para concluir el capítulo o avanzar al siguiente basado en el estado del juego
        alert("El capítulo concluye. ¿Has desvelado todos sus secretos?");
    }
}
function mostrarSalaPistasOcultas() {
    const salaPistasOcultas = document.getElementById('salaPistasOcultas');
    if (salaPistasOcultas) {
        salaPistasOcultas.classList.remove('hidden');
    }
}

function verificarCombinacion() {
    const combinacionHabitacion = document.getElementById('combinacionHabitacion').value;
    const combinacionCorrecta = "0102"; 
    let penalizacion = 0;


    if (combinacionHabitacion === combinacionCorrecta) {
        // Si la combinación es correcta, se abre el candado y se muestra el contenido
        estadoJuego.capitulo3.habitacionSelladaAbierta = true;
        mostrarContenidoHabitacion();
    } else {
        penalizacion = 30;
        estadoJuego.puntosDeIntuicion -= penalizacion;
        alert(`Te sientes menos seguro de tus teorías. Puntos de intuición: ${estadoJuego.puntosDeIntuicion}`);
        // Si la combinación es incorrecta, se muestra un mensaje de error
        alert("La combinación es incorrecta. Intenta de nuevo.");
    }
}


function cerrarNota() {
    // Oculta el modal de la nota
    const modalNota = document.getElementById('modalNota');
    modalNota.classList.add('hidden');

    // Muestra el final correspondiente basado en los puntos de intuición
    if (estadoJuego.puntosDeIntuicion > 50) {
        estadoJuego.capitulo3.finalVerdadero = true;
        mostrarFinalVerdadero();
    } else {
        estadoJuego.capitulo3.finalFalso = true;
        mostrarFinalFalso();
    }
}

function mostrarFinalVerdadero() {
    // Muestra el modal del final verdadero
    const modalFinalVerdadero = document.getElementById('modalFinalVerdadero');
    modalFinalVerdadero.classList.remove('hidden');
}

function mostrarFinalFalso() {
    // Muestra el modal del final falso
    const modalFinalFalso = document.getElementById('modalFinalFalso');
    modalFinalFalso.classList.remove('hidden');
}

function cerrarModalFinal() {
    // Oculta el modal del final
    const modalFinalVerdadero = document.getElementById('modalFinalVerdadero');
    const modalFinalFalso = document.getElementById('modalFinalFalso');
    modalFinalVerdadero.classList.add('hidden');
    modalFinalFalso.classList.add('hidden');
}

function mostrarContenidoHabitacion() {
    // Muestra el modal de la nota
    const modalNota = document.getElementById('modalNota');
    modalNota.classList.remove('hidden');
}

function abrirCandadoDiario() {
    // Muestra el modal del diario
    const modalDiario = document.getElementById('modalDiario');
    modalDiario.classList.remove('hidden');
}

function cerrarModalDiario() {
    // Oculta el modal del diario
    const modalDiario = document.getElementById('modalDiario');
    modalDiario.classList.add('hidden');

    // Muestra el teclado numérico y el botón de verificar combinación
    const habitacionSellada = document.getElementById('habitacionSellada');
    habitacionSellada.classList.remove('hidden');

    const tecladoNumerico = document.getElementById('tecladoNumerico');
    tecladoNumerico.classList.remove('hidden');
    const botonVerificarCombinacion = document.getElementById('botonVerificarCombinacion');
    botonVerificarCombinacion.classList.remove('hidden');
}

function agregarNumero(numero) {
    const combinacionHabitacion = document.getElementById('combinacionHabitacion');
    combinacionHabitacion.value += numero;
}

function borrarUltimoNumero() {
    const combinacionHabitacion = document.getElementById('combinacionHabitacion');
    combinacionHabitacion.value = combinacionHabitacion.value.slice(0, -1);
}

function verificarCombinacionCandado() {
    const combinacionCandado = document.getElementById('combinacionCandado').value;
    const combinacionCorrecta = "0102"; 


    if (combinacionCandado === combinacionCorrecta) {
        // Si la combinación es correcta, se abre el candado y se muestra el contenido
        estadoJuego.capitulo3.combinacionDescubierta = "0102"; // Fecha de compra de la Mansión
        estadoJuego.capitulo3.salaPistasResuelta = true;
        actualizarPuntosDeIntuicion(0);
        mostrarContenidoHabitacion();
    } else {
        // Si la combinación es incorrecta, se muestra un mensaje de error
        alert("La combinación es incorrecta. Intenta de nuevo.");
    }
}