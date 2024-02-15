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
                actualizarPuntosDeIntuicion(10);
            } else {
                alert("Necesitas algo para abrir este candado. Recuerda la llave encontrada previamente.");
                actualizarPuntosDeIntuicion(-30);

            }
            break;
        case 2: // Habitación Sellada
            if (estadoJuego.capitulo3.salaPistasResuelta) {
                alert("Introduces la combinación en la habitación sellada, desvelando documentos que implican a Vidal en asuntos turbios relacionados con la mansión.");
                estadoJuego.capitulo3.habitacionSelladaAbierta = true;
                actualizarPuntosDeIntuicion(20);
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

// capitulo3.js

function verificarCombinacion() {
    const combinacionHabitacion = document.getElementById('combinacionHabitacion').value;
    const combinacionCorrecta = "0102"; // Asumiendo que esta es la combinación correcta


    if (combinacionHabitacion === combinacionCorrecta) {
        // Si la combinación es correcta, se abre el candado y se muestra el contenido
        estadoJuego.capitulo3.habitacionSelladaAbierta = true;
        mostrarContenidoHabitacion();
    } else {
        // Si la combinación es incorrecta, se muestra un mensaje de error
        alert("La combinación es incorrecta. Intenta de nuevo.");
    }
}

function mostrarContenidoHabitacion() {
    // Oculta la Habitación Sellada
    const habitacionSellada = document.getElementById('habitacionSellada');
    habitacionSellada.classList.add('hidden');


    // Muestra el contenido de la Habitación Sellada
    const contenidoHabitacion = document.getElementById('contenidoHabitacion');
    contenidoHabitacion.classList.remove('hidden');
}

function abrirCandadoDiario() {
    // Muestra la combinación para el siguiente nivel
    const contenidoDiario = document.getElementById('contenidoDiario');
    contenidoDiario.classList.remove('hidden');
}