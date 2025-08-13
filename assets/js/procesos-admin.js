(function () {
    "use strict";

    /**
     * Clase para manejar cada carrusel individual
     */
    class Carrusel {
        constructor(contenedor) {
            this.contenedor = contenedor;
            this.imagenes = Array.from(contenedor.querySelectorAll('.carrusel-img'));
            this.indiceActual = 0;
            this.intervalo = null;
            this.tiempoIntervalo = 5000; // 5 segundos

            // Inicializar
            this.iniciar();
            this.configurarEventos();
        }

        iniciar() {
            // Mostrar primera imagen
            this.mostrarImagen(this.indiceActual);

            // Iniciar intervalo automático
            this.iniciarIntervalo();
        }

        mostrarImagen(index) {
            // Ocultar todas las imágenes
            this.imagenes.forEach(img => {
                img.classList.remove('active');
                img.style.opacity = '0';
            });

            // Mostrar imagen actual
            this.imagenes[index].classList.add('active');
            this.imagenes[index].style.opacity = '1';

            this.indiceActual = index;
        }

        siguiente() {
            const nuevoIndice = (this.indiceActual + 1) % this.imagenes.length;
            this.mostrarImagen(nuevoIndice);
        }

        anterior() {
            const nuevoIndice = (this.indiceActual - 1 + this.imagenes.length) % this.imagenes.length;
            this.mostrarImagen(nuevoIndice);
        }

        iniciarIntervalo() {
            this.intervalo = setInterval(() => this.siguiente(), this.tiempoIntervalo);
        }

        reiniciarIntervalo() {
            clearInterval(this.intervalo);
            this.iniciarIntervalo();
        }

        configurarEventos() {
            // Botones de navegación
            this.contenedor.querySelector('.prev').addEventListener('click', (e) => {
                e.preventDefault();
                this.anterior();
                this.reiniciarIntervalo();
            });

            this.contenedor.querySelector('.next').addEventListener('click', (e) => {
                e.preventDefault();
                this.siguiente();
                this.reiniciarIntervalo();
            });

            // Pausar al interactuar
            this.contenedor.addEventListener('mouseenter', () => {
                clearInterval(this.intervalo);
            });

            this.contenedor.addEventListener('mouseleave', () => {
                this.reiniciarIntervalo();
            });
        }
    }

    // Inicializar todos los carruseles al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.carrusel').forEach(carrusel => {
            new Carrusel(carrusel);
        });
    });

    /**
     * Funcionalidad de acordeones con efectos mejorados
     */
    function configurarAcordeones() {
        // Acordeones principales
        document.querySelectorAll('.resources-header').forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentNode;
                const content = item.querySelector('.resources-content');
                const isActive = item.classList.contains('resources-active');

                // Cerrar todos los demás ítems primero
                document.querySelectorAll('.resources-item').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('resources-active');
                        otherItem.querySelector('.resources-content').style.maxHeight = '0';
                    }
                });

                // Alternar estado del ítem actual
                if (!isActive) {
                    item.classList.add('resources-active');
                    // Usamos scrollHeight para una transición precisa
                    content.style.maxHeight = content.scrollHeight + 'px';

                    // Ajustar después de que termine la transición
                    setTimeout(() => {
                        content.style.maxHeight = 'none';
                    }, 500);
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    setTimeout(() => {
                        content.style.maxHeight = '0';
                    }, 10);
                    setTimeout(() => {
                        item.classList.remove('resources-active');
                    }, 300);
                }
            });
        });

        // Sub-acordeones
        document.querySelectorAll('.resources-subheader').forEach(subheader => {
            subheader.addEventListener('click', (e) => {
                e.stopPropagation();
                const subitem = subheader.parentNode;
                const subcontent = subitem.querySelector('.resources-subcontent');
                const isSubActive = subitem.classList.contains('resources-subactive');

                if (!isSubActive) {
                    subitem.classList.add('resources-subactive');
                    subcontent.style.maxHeight = subcontent.scrollHeight + 'px';

                    setTimeout(() => {
                        subcontent.style.maxHeight = 'none';
                    }, 300);
                } else {
                    subcontent.style.maxHeight = subcontent.scrollHeight + 'px';
                    setTimeout(() => {
                        subcontent.style.maxHeight = '0';
                    }, 10);
                    setTimeout(() => {
                        subitem.classList.remove('resources-subactive');
                    }, 300);
                }
            });
        });

        // Abrir primer ítem por defecto con animación
        const primerItem = document.querySelector('.resources-item');
        if (primerItem) {
            primerItem.classList.add('resources-active');
            const content = primerItem.querySelector('.resources-content');
            content.style.maxHeight = content.scrollHeight + 'px';

            setTimeout(() => {
                content.style.maxHeight = 'none';
            }, 500);
        }
    }

    /**
     * Inicializar todos los carruseles
     */
    function inicializarCarruseles() {
        const elementosCarrusel = document.querySelectorAll('.carrusel');
        elementosCarrusel.forEach(contenedor => {
            new Carrusel(contenedor);
        });
    }

    /**
     * Inicializar todo cuando el DOM esté listo
     */
    document.addEventListener('DOMContentLoaded', function () {
        // Inicializar carruseles
        inicializarCarruseles();

        // Configurar acordeones con efectos
        configurarAcordeones();

        // Configurar eventos de hover para efectos visuales
        document.querySelectorAll('.resources-header, .resources-subheader').forEach(header => {
            header.addEventListener('mouseenter', () => {
                header.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
            });

            header.addEventListener('mouseleave', () => {
                header.style.backgroundColor = '';
            });
        });
    });

})();