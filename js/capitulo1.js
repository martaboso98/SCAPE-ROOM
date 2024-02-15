function explorarPista(pista) {
    if (pista === 'jardin') {
        alert("El jardín es un remanso de paz, un contraste marcado con la tensión de la investigación. No encuentras pistas aquí, pero el aire fresco te da un nuevo enfoque.");
        return; // El jardín no es una pista relevante para avanzar.
    }

    // Marcar la pista como encontrada.
    estadoJuego.pistasCap1[pista] = true;
    let mensaje = "";

    switch (pista) {
        case 'escritorio':
            mensaje = "Al revolver los papeles en el escritorio de Vidal, encuentras una serie de recibos y documentos legales que apuntan hacia una gran inversión realizada el 1 de febrero en una propiedad desconocida. Una dirección específica llama tu atención: la de una antigua mansión en las afueras de la ciudad.";
            break;
        case 'biblioteca':
            mensaje = "Mientras examinas la biblioteca, un libro mal colocado revela un compartimento secreto detrás de la estantería. Dentro, hallas un mapa de la ciudad con una ubicación marcada: la misma mansión mencionada en los documentos del escritorio. Junto al mapa, hay una llave antigua y una nota que dice: 'La verdad yace bajo las sombras de la vieja Monteluz'.";
            break;
    }

    alert(mensaje);

    // Verificar si se han encontrado las pistas relevantes para avanzar al Capítulo 2.
    if (estadoJuego.pistasCap1.escritorio && estadoJuego.pistasCap1.biblioteca) {
        alert("Has recolectado suficientes pistas. Es hora de avanzar al Capítulo 2.");
        seleccionOpcion(2); // Función para avanzar al siguiente capítulo.
    }
}
