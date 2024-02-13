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
            mensaje = "Presionando a la familia Vidal sobre las recientes actividades financieras de Arturo, mencionan a regañadientes la compra de una mansión antigua. Su nerviosismo aumenta cuando mencionas la llave encontrada. 'Ese lugar...', murmura uno, 'esconde más que simples secretos de familia.'";
            correcto = true;
            break;
        case 'amigos':
            mensaje = "Los amigos de Vidal, al ser cuestionados sobre sus últimas semanas, hablan de cambios en su comportamiento y mencionan visitas frecuentes a una mansión. 'Era como si buscara algo... o alguien', comenta uno, evitando tu mirada.";
            penalizacion = 30;
            break;
        case 'socios':
            mensaje = "Los socios de negocios comparten detalles sobre la tensión financiera de Vidal, vinculada a una 'inversión final'. Al indagar más, descubres que esta inversión era la mansión. 'Decía que esa casa cambiaría todo', revelan, claramente desconcertados por la obsesión de Vidal.";
            correcto = true;
            break;
    }

    alert(mensaje);
    estadoJuego.interaccionesCap2[grupo] = true;

    if (!correcto) {
        estadoJuego.puntosDeIntuicion -= penalizacion;
        alert(`Te sientes menos seguro de tus teorías. Puntos de intuición: ${estadoJuego.puntosDeIntuicion}`);
    }

    if (estadoJuego.puntosDeIntuicion <= 0) {
        alert("Tu habilidad para discernir la verdad se ha nublado completamente. ¿Cómo podrás resolver el caso ahora?");
    } else if (estadoJuego.interaccionesCap2.familia && estadoJuego.interaccionesCap2.socios) {
        alert("Has recopilado suficiente información. ¿Qué será lo próximo?");
    }
}


function actualizarPuntosDeIntuicion(puntos) {
    estadoJuego.puntosDeIntuicion += puntos;
    alert(`Puntos de intuición actuales: ${estadoJuego.puntosDeIntuicion}`);
}

function verificarProgresoInterrogatorios() {
    // Verificar si se han interrogado todos los grupos necesarios para avanzar.
    if (estadoJuego.interaccionesCap2.familia && estadoJuego.interaccionesCap2.socios) {
        alert("Has recopilado suficiente información. ¿Qué será lo próximo?");
    }
}
