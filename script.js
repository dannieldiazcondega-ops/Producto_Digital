
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const menu = document.getElementById("menu");
    const temaToggle = document.getElementById("temaToggle");
    const progreso = document.getElementById("progreso");
    const botonArriba = document.getElementById("arriba");
    const modal = document.getElementById("modalHistoria");
    const modalTitulo = document.getElementById("modalTitulo");
    const modalTexto = document.getElementById("modalTexto");
    const formulario = document.getElementById("formularioRecuerdo");
    const recuerdosMostrados = document.getElementById("recuerdosMostrados");
    const recuerdosVacios = document.getElementById("recuerdosVacios");
    const textoRecuerdo = document.getElementById("textoRecuerdo");
    const contadorTexto = document.getElementById("contadorTexto");

    const historias = {
        alexander: {
            titulo: "Familia de Alexander Baltazar Alvarez Xona",
            parrafos: [
                "La historia familiar de Alexander incluye raíces vinculadas con Guatemala. Entre los datos recopilados aparecen su madre, Oneyda Xona, y su padre, Manuel Álvarez.",
                "Por la línea materna se mencionan a Brígida y Antonio como parte de las generaciones anteriores. Algunos datos de generaciones más antiguas todavía no están identificados.",
                "En esta historia también aparecen familiares que se trasladaron a Estados Unidos y España. Entre las tradiciones mencionadas se encuentran el Año Nuevo, la Quema del Diablo, los cumpleaños y la preparación de chuchitos."
            ]
        },
        danniel: {
            titulo: "Familia de Dánniel Díaz Condega",
            parrafos: [
                "La historia familiar de Dánniel está vinculada con Ometepe, Nicaragua. En ella se encuentran diferentes ocupaciones, como la docencia, la albañilería, la agricultura, la cocina, el trabajo en el hogar y la supervisión de fibra óptica.",
                "Entre las costumbres mencionadas están las celebraciones de cumpleaños, las prácticas religiosas católicas y las festividades de San Diego de Alcalá en Altagracia.",
                "Estos recuerdos permiten reconocer cómo las ocupaciones, las relaciones familiares y las tradiciones forman parte de la historia de una familia."
            ]
        },
        adan: {
            titulo: "Familia de Wendorlling Adán López Pérez",
            parrafos: [
                "La historia familiar de Adán está vinculada con Ticuantepe, Nicaragua.",
                "Entre los aspectos compartidos destaca la importancia de las costumbres y prácticas religiosas dentro de la familia.",
                "El genograma ayuda a representar los vínculos entre generaciones y a organizar la información disponible sobre la historia familiar."
            ]
        },
        brissia: {
            titulo: "Familia de Brissia Isabel Taleno González",
            parrafos: [
                "En la historia familiar de Brissia aparecen vínculos con distintos lugares de Nicaragua, como Managua, Muelle de los Bueyes y Camoapa.",
                "Se mencionan desplazamientos familiares entre municipios y una experiencia de residencia en Costa Rica. Estas experiencias muestran cómo la movilidad geográfica forma parte de la trayectoria de una familia.",
                "Entre las ocupaciones recordadas se encuentran el trabajo como operadora telefónica en un hospital, la albañilería por cuenta propia y la enfermería.",
                "Las tradiciones mencionadas incluyen la Navidad, el Día de la Madre, los cumpleaños, las Purísimas y la preparación de sopa de gallina para compartir en familia."
            ]
        }
    };

    const frases = [
        "Las raíces nos recuerdan de dónde venimos; la memoria nos ayuda a comprender quiénes somos.",
        "Cada generación deja una huella que puede convertirse en una enseñanza.",
        "Conocer otra historia familiar también es una manera de ampliar nuestra mirada del mundo.",
        "La diversidad no nos separa: nos brinda nuevas formas de aprender unos de otros.",
        "A veces, una pequeña tradición guarda el recuerdo más grande."
    ];

    let ultimaFrase = -1;
    let focoAnterior = null;

    menuToggle.addEventListener("click", function () {
        const abierto = menu.classList.toggle("abierto");
        menuToggle.setAttribute("aria-expanded", String(abierto));
        menuToggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
        menuToggle.textContent = abierto ? "×" : "☰";
    });

    function cerrarMenu() {
        menu.classList.remove("abierto");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
        menuToggle.textContent = "☰";
    }

    menu.querySelectorAll("a").forEach(function (enlace) {
        enlace.addEventListener("click", cerrarMenu);
    });

    document.addEventListener("click", function (evento) {
        if (
            menu.classList.contains("abierto") &&
            !menu.contains(evento.target) &&
            !menuToggle.contains(evento.target)
        ) {
            cerrarMenu();
        }
    });

    temaToggle.addEventListener("click", function () {
        const modoNoche = document.body.classList.toggle("modo-noche");
        temaToggle.textContent = modoNoche ? "☾" : "☼";
        temaToggle.setAttribute(
            "aria-label",
            modoNoche ? "Cambiar a apariencia clara" : "Cambiar a apariencia oscura"
        );
        temaToggle.title = modoNoche ? "Apariencia clara" : "Apariencia oscura";
    });

    document.getElementById("frasePortada").addEventListener("click", function () {
        let indice;

        do {
            indice = Math.floor(Math.random() * frases.length);
        } while (indice === ultimaFrase && frases.length > 1);

        ultimaFrase = indice;

        const elemento = document.getElementById("fraseCambiante");
        elemento.style.opacity = "0";

        window.setTimeout(function () {
            elemento.textContent = frases[indice];
            elemento.style.opacity = "1";
        }, 200);
    });

    function actualizarDesplazamiento() {
        const altura = document.documentElement.scrollHeight - window.innerHeight;
        const porcentaje = altura > 0 ? (window.scrollY / altura) * 100 : 0;

        progreso.style.width = porcentaje + "%";
        botonArriba.classList.toggle("visible", window.scrollY > 400);
    }

    window.addEventListener("scroll", actualizarDesplazamiento, {
        passive: true
    });

    actualizarDesplazamiento();

    botonArriba.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    const elementosRevelar = document.querySelectorAll(".revelar");

    if ("IntersectionObserver" in window) {
        const observadorRevelar = new IntersectionObserver(function (entradas, observador) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    observador.unobserve(entrada.target);
                }
            });
        }, {
            threshold: 0.12
        });

        elementosRevelar.forEach(function (elemento) {
            observadorRevelar.observe(elemento);
        });
    } else {
        elementosRevelar.forEach(function (elemento) {
            elemento.classList.add("visible");
        });
    }

    const enlacesMenu = document.querySelectorAll(".menu a");
    const secciones = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
        const observadorMenu = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    enlacesMenu.forEach(function (enlace) {
                        const activo = enlace.getAttribute("href") === "#" + entrada.target.id;
                        enlace.classList.toggle("activo", activo);
                    });
                }
            });
        }, {
            rootMargin: "-25% 0px -65% 0px"
        });

        secciones.forEach(function (seccion) {
            observadorMenu.observe(seccion);
        });
    }

    function abrirHistoria(nombre, boton) {
        const historia = historias[nombre];

        if (!historia) {
            return;
        }

        focoAnterior = boton;
        modalTitulo.textContent = historia.titulo;
        modalTexto.replaceChildren();

        historia.parrafos.forEach(function (texto) {
            const parrafo = document.createElement("p");
            parrafo.textContent = texto;
            modalTexto.appendChild(parrafo);
        });

        modal.classList.add("visible");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-abierto");

        const botonCerrar = modal.querySelector(".modal-cerrar");
        botonCerrar.focus();
    }

    function cerrarHistoria() {
        if (!modal.classList.contains("visible")) {
            return;
        }

        modal.classList.remove("visible");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-abierto");

        if (focoAnterior) {
            focoAnterior.focus();
        }
    }

    document.querySelectorAll(".boton-historia").forEach(function (boton) {
        boton.addEventListener("click", function () {
            abrirHistoria(boton.dataset.historia, boton);
        });
    });

    modal.querySelectorAll(".cerrar-modal").forEach(function (boton) {
        boton.addEventListener("click", cerrarHistoria);
    });

    document.querySelectorAll(".tradicion-card").forEach(function (tarjeta) {
        tarjeta.addEventListener("click", function () {
            const abierta = tarjeta.classList.toggle("abierta");
            tarjeta.setAttribute("aria-expanded", String(abierta));

            const indicador = tarjeta.querySelector(".tradicion-indicador");
            indicador.textContent = abierta
                ? "Tocá para cerrar −"
                : "Tocá para descubrir +";
        });
    });

    document.querySelectorAll(".pregunta-boton").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const respuesta = boton.nextElementSibling;
            const tarjeta = boton.closest(".pregunta");
            const estabaAbierta = boton.getAttribute("aria-expanded") === "true";

            boton.setAttribute("aria-expanded", String(!estabaAbierta));
            respuesta.hidden = estabaAbierta;
            tarjeta.classList.toggle("abierta", !estabaAbierta);
        });
    });

    const retos = [
        {
            pregunta: "Una persona comparte una tradición familiar diferente a la tuya. ¿Cuál es la mejor manera de responder?",
            opciones: [
                "Decir que mi tradición es la única correcta.",
                "Escuchar, preguntar con respeto y aprender.",
                "Ignorar la historia porque es diferente."
            ],
            correcta: 1,
            explicacion: "¡Correcto! Escuchar con respeto permite conocer otras experiencias y valorar la diversidad cultural."
        },
        {
            pregunta: "¿Qué puede enseñarnos un genograma familiar?",
            opciones: [
                "Únicamente los apellidos de una familia.",
                "Que todas las familias tienen las mismas costumbres.",
                "Los vínculos entre generaciones y parte de la historia familiar."
            ],
            correcta: 2,
            explicacion: "¡Muy bien! Un genograma permite representar relaciones familiares y organizar información sobre distintas generaciones."
        },
        {
            pregunta: "¿Qué puede ocurrir cuando una familia migra a otro lugar?",
            opciones: [
                "Puede conocer nuevas costumbres y conservar algunos vínculos con sus raíces.",
                "Tiene que abandonar necesariamente todas sus tradiciones.",
                "Su identidad cultural deja de tener importancia."
            ],
            correcta: 0,
            explicacion: "¡Exacto! La migración puede transformar experiencias y costumbres, pero también pueden mantenerse recuerdos y vínculos culturales."
        }
    ];

    const retoPregunta = document.getElementById("retoPregunta");
    const retoOpciones = document.getElementById("retoOpciones");
    const retoFeedback = document.getElementById("retoFeedback");
    const siguienteReto = document.getElementById("siguienteReto");
    const retoContador = document.getElementById("retoContador");
    const retoProgreso = document.getElementById("retoProgreso");

    let indiceReto = 0;
    let respuestasCorrectas = 0;
    let retoTerminado = false;

    function mostrarReto() {
        const reto = retos[indiceReto];

        retoPregunta.textContent = reto.pregunta;
        retoOpciones.replaceChildren();
        retoFeedback.textContent = "";
        siguienteReto.hidden = true;
        retoTerminado = false;

        reto.opciones.forEach(function (texto, indice) {
            const opcion = document.createElement("button");
            opcion.type = "button";
            opcion.className = "opcion-reto";
            opcion.textContent = texto;
            opcion.dataset.indice = indice;

            opcion.addEventListener("click", function () {
                responderReto(indice);
            });

            retoOpciones.appendChild(opcion);
        });

        retoContador.textContent = "Pregunta " + (indiceReto + 1) + " de " + retos.length;
        retoProgreso.style.width = ((indiceReto + 1) / retos.length * 100) + "%";
    }

    function responderReto(indiceElegido) {
        if (retoTerminado) {
            return;
        }

        retoTerminado = true;

        const reto = retos[indiceReto];
        const opciones = retoOpciones.querySelectorAll(".opcion-reto");

        opciones.forEach(function (opcion, indice) {
            opcion.disabled = true;

            if (indice === reto.correcta) {
                opcion.classList.add("correcta");
            } else if (indice === indiceElegido) {
                opcion.classList.add("incorrecta");
            }
        });

        if (indiceElegido === reto.correcta) {
            respuestasCorrectas++;
            retoFeedback.textContent = reto.explicacion;
        } else {
            retoFeedback.textContent = "No pasa nada. " + reto.explicacion;
        }

        if (indiceReto < retos.length - 1) {
            siguienteReto.textContent = "Siguiente pregunta ↗";
        } else {
            siguienteReto.textContent = "Ver resultado final ✧";
        }

        siguienteReto.hidden = false;
    }

    siguienteReto.addEventListener("click", function () {
        if (indiceReto < retos.length - 1) {
            indiceReto++;
            mostrarReto();
            retoPregunta.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        } else {
            retoPregunta.textContent = "¡Terminaste el reto intercultural!";
            retoOpciones.replaceChildren();

            retoFeedback.textContent = respuestasCorrectas === retos.length
                ? "¡Excelente! Respondiste correctamente las tres preguntas. Tu mirada intercultural está en marcha."
                : "Obtuviste " + respuestasCorrectas + " de " + retos.length + " respuestas correctas. Podés volver a intentarlo y seguir aprendiendo.";

            siguienteReto.textContent = "Intentar de nuevo ↻";
            siguienteReto.hidden = false;
            siguienteReto.onclick = reiniciarReto;
            retoContador.textContent = "Reto completado";
            retoProgreso.style.width = "100%";
        }
    });

    function reiniciarReto() {
        indiceReto = 0;
        respuestasCorrectas = 0;
        siguienteReto.onclick = null;
        mostrarReto();
    }

    mostrarReto();

    textoRecuerdo.addEventListener("input", function () {
        contadorTexto.textContent = textoRecuerdo.value.length;
    });

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombre = document.getElementById("nombreRecuerdo").value.trim();
        const tipo = document.getElementById("tipoRecuerdo").value;
        const historia = textoRecuerdo.value.trim();

        if (!tipo || !historia) {
            return;
        }

        const tarjeta = document.createElement("article");
        tarjeta.className = "recuerdo-card";

        const titulo = document.createElement("h3");
        titulo.textContent = nombre || "Un recuerdo familiar";

        const categoria = document.createElement("p");
        categoria.className = "tipo-recuerdo";
        categoria.textContent = tipo;

        const contenido = document.createElement("p");
        contenido.textContent = historia;

        tarjeta.append(titulo, categoria, contenido);
        recuerdosMostrados.prepend(tarjeta);

        recuerdosVacios.hidden = true;
        formulario.reset();
        contadorTexto.textContent = "0";

        tarjeta.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });

    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape") {
            cerrarHistoria();
            cerrarMenu();
        }

        if (
            evento.key === "Tab" &&
            modal.classList.contains("visible")
        ) {
            const elementos = modal.querySelectorAll(
                'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled])'
            );

            const primero = elementos[0];
            const ultimo = elementos[elementos.length - 1];

            if (evento.shiftKey && document.activeElement === primero) {
                evento.preventDefault();
                ultimo.focus();
            } else if (!evento.shiftKey && document.activeElement === ultimo) {
                evento.preventDefault();
                primero.focus();
            }
        }
    });
});
