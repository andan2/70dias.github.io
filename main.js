document.addEventListener('DOMContentLoaded', function () {
    // Control de visibilidad basado en fechas para cada post
    const posts = document.querySelectorAll('.gallery-item');
    const fechaActual = new Date();

    posts.forEach(function (post) {
        const fechaPublicacion = new Date(post.getAttribute('data-publish-date'));

        // Establecer la visibilidad basada en la fecha
        if (fechaActual >= fechaPublicacion) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }

        // Añadir evento de clic para abrir el popup correspondiente
        post.addEventListener('click', function (e) {
            // Obtener el ID del popup desde el atributo de datos
            const popupId = post.getAttribute('data-popup-id');
            if (popupId && post.style.display === 'block') {
                e.preventDefault(); // Prevenir la navegación si el enlace es "#" o similar
                togglePopup(`#${popupId}`, true); // Mostrar el popup
            }
        });
    });

    // Función para alternar la visibilidad de los popups
    function togglePopup(popupId, show) {
        const popup = document.querySelector(popupId);
        if (popup) {
            popup.style.display = show ? 'block' : 'none';
            document.body.classList.toggle("active-popup", show);
        }
    }

    // Eventos para cerrar popups
    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', function () {
            const popup = this.closest('.lightbox');
            if (popup) {
                // Intentar pausar un video o audio cuando se cierra el popup
                const media = popup.querySelector('video, audio'); // Buscar un elemento de video o audio dentro del popup
                if (media) {
                    media.pause(); // Pausar la reproducción
                    media.currentTime = 0; // Opcional: Reiniciar el tiempo a 0
                }

                // Continuar con el cierre del popup
                togglePopup(`#${popup.id}`, false);
            }
        });
    });

    // Cerrar el popup al hacer clic fuera de su contenido
    window.addEventListener('click', function (e) {
        document.querySelectorAll('.lightbox').forEach(lightbox => {
            if (e.target === lightbox) {
                // Intentar pausar un video o audio cuando se cierra el popup
                const media = lightbox.querySelector('video, audio'); // Buscar un elemento de video o audio dentro del popup
                if (media) {
                    media.pause(); // Pausar la reproducción
                    media.currentTime = 0; // Opcional: Reiniciar el tiempo a 0
                }
                
                togglePopup(`#${lightbox.id}`, false);
            }
        });
    });
});
