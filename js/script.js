document.addEventListener("DOMContentLoaded", () => {

    // Obtener elementos
    const menuToggle = document.getElementById('menuToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const menuLinks = document.querySelectorAll('.nav_links');
    const overlay = document.getElementById('overlay');
    const audioElement = document.getElementById('audioElement'); 
    const audioControlIcon = document.getElementById('audioControlIcon');

    // 🔥 RECUPERAR estado del audio al cargar la página
    const wasPlaying = localStorage.getItem('audioPlaying') === 'true';
    const audioTime = parseFloat(localStorage.getItem('audioTime')) || 0;

    if (wasPlaying && audioElement) {
        audioElement.currentTime = audioTime;
        audioElement.play();
        audioControlIcon.src = 'public/images/audioStop.svg';
    }

    // 🔥 GUARDAR estado antes de cambiar de página
    window.addEventListener('beforeunload', () => {
        if (audioElement && !audioElement.paused) {
            localStorage.setItem('audioPlaying', 'true');
            localStorage.setItem('audioTime', audioElement.currentTime);
        } else {
            localStorage.setItem('audioPlaying', 'false');
        }
    });

    // Menú hamburguesa - abrir/cerrar
    menuToggle.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
        overlay.classList.toggle('show');
        document.body.classList.toggle('no-scroll');
    });

    // Cerrar menú al hacer clic en un enlace
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            dropdownMenu.classList.remove('show');
            overlay.classList.remove('show');
            document.body.classList.remove('no-scroll');
        });
    });

    // Cerrar menú al tocar overlay
    overlay.addEventListener('click', () => {
        dropdownMenu.classList.remove('show'); 
        overlay.classList.remove('show');
        document.body.classList.remove('no-scroll');
    });

    // 🔥 CONTROL DE AUDIO - LÓGICA CORREGIDA
    let isPlaying = wasPlaying; // 🔥 Inicializa según localStorage, no en false

    audioControlIcon.addEventListener("click", () => {
        if (isPlaying) {
            // Pausar audio (SIN reiniciar a 0)
            audioElement.pause();
            audioControlIcon.src = 'public/images/audioPlay.svg';
            localStorage.setItem('audioPlaying', 'false'); // 🔥 Guardar estado
        } else {
            // Reproducir audio
            audioElement.play();
            audioControlIcon.src = 'public/images/audioStop.svg';
            localStorage.setItem('audioPlaying', 'true'); // 🔥 Guardar estado
        }
        isPlaying = !isPlaying;
    });

    // 🔥 ACTUALIZAR currentTime continuamente mientras suena
    if (audioElement) {
        audioElement.addEventListener('timeupdate', () => {
            if (!audioElement.paused) {
                localStorage.setItem('audioTime', audioElement.currentTime);
            }
        });
    }

});