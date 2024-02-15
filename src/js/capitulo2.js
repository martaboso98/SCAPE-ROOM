// capitulo2.js

function iniciarCapitulo2() {
    estadoJuego.capituloActual = 2;
    mostrarCapitulo(estadoJuego.capituloActual);
}

function interrogarSospechoso(grupo) {
    if (estadoJuego.interaccionesCap2[grupo]) {
        alert("Ya has conversado con este grupo, sus palabras resuenan en tu mente buscando inconsistencias.");
        return;
    }

    let mensaje = "";
    let correcto = false;
    let penalizacion = 0;

    switch (grupo) {
        case 'familia':
            mensaje = "Al presionar a la familia sobre las finanzas de Vidal, mencionan su reciente adquisición de una mansión con reluctancia. Un miembro murmura, 'Ese lugar... tiene que guardar secretos oscuros por la obsesión que tenía Vidal.' Su nerviosismo es palpable, especialmente cuando se menciona la llave encontrada";
            penalizacion = 30;
            break;
        case 'amigos':
            mensaje = "Los amigos de Vidal, visiblemente incómodos, recuerdan sus últimas semanas con detalles dispersos. 'Se obsesionó con esa mansión, como si algo o alguien lo llamara allí', dice uno, evadiendo tu mirada. El tono sugiere que algo más que la búsqueda de paz atormentaba a Vidal.";
            correcto = true;

            break;
        case 'socios':
            mensaje = "Los socios hablan de la 'inversión final' de Vidal con una mezcla de confusión y miedo. 'Esa mansión... decía que cambiaría su vida', comparten. Uno añade, 'Pero no de la manera que pensábamos ya que su codicia lo ha matado.' Su tono implica que la mansión era más que una simple inversión.";
            correcto = true;
            break;
    }

    alert(mensaje);
    estadoJuego.interaccionesCap2[grupo] = true;

    if (!correcto) {
        estadoJuego.puntosDeIntuicion -= penalizacion;
        alert(`Te sientes menos seguro de tus teorías. Puntos de intuición: ${estadoJuego.puntosDeIntuicion}`);
    }
    // Verificar si se han interrogado correctamente a la familia y a los socios
    if (estadoJuego.interaccionesCap2.amigos && estadoJuego.interaccionesCap2.socios) {
        // Aquí debería avanzar al Capítulo   3
        seleccionOpcion(3); // Función para avanzar al siguiente capítulo.
    }
    if (estadoJuego.puntosDeIntuicion <= 0) {
        alert("Tu habilidad para discernir la verdad se ha nublado completamente. ¿Cómo podrás resolver el caso ahora?");
    } else if (estadoJuego.interaccionesCap2.amigos && estadoJuego.interaccionesCap2.socios) {
        alert("Has recopilado suficiente información. ¿Qué será lo próximo?");
    }

}

function actualizarPuntosDeIntuicion(puntos) {
    estadoJuego.puntosDeIntuicion += puntos;
    alert(`Puntos de intuición actuales: ${estadoJuego.puntosDeIntuicion}`);
}

function verificarProgresoInterrogatorios() {
    // Verificar si se han interrogado todos los grupos necesarios para avanzar.
    if (estadoJuego.interaccionesCap2.amigos && estadoJuego.interaccionesCap2.socios) {
        alert("Has recopilado suficiente información. ¿Qué será lo próximo?");
    }
}
