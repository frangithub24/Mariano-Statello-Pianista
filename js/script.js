document.addEventListener("DOMContentLoaded",() => {

// Obtener el ícono de audio y el audio
const menuToggle = document.getElementById('menuToggle');
const dropdownMenu = document.getElementById('dropdownMenu');
const menuLinks = document.querySelectorAll('.nav_links');
const overlay = document.getElementById('overlay'); // NUEVO: overlay
const audioElement = document.getElementById('audioElement'); 
const audioControlIcon = document.getElementById('audioControlIcon');

// Función para abrir/cerrar el menú
menuToggle.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
    overlay.classList.toggle('show');
    document.body.classList.toggle('no-scroll');
});

// Evento para cerrar el menú al hacer clic en un enlace
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      dropdownMenu.classList.remove('show'); // Cierra el menú
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



    let isPlaying = false; //estado inicial, no suena

    //al hacer click, si está reproduciéndose el audio, pausarlo y cambiar el ícono a play
    //se reinicia con currenTime=0 y se cambia el ícono a play
audioControlIcon.addEventListener("click", () => {
    if (isPlaying) {
        audioElement.pause();
        audioElement.currentTime = 0; //si no coloco esto, cuando vuelvo a tocar play sigue la canción desde donde estaba 
        audioControlIcon.src = 'public/images/audioPlay.svg';
    } else {
    //si el audio está detenido, al hacer click que suene y cambiar el ícono a stop
        audioElement.play();
        audioControlIcon.src = 'public/images/audioStop.svg'; //cambia el ícono de stop
    }
    isPlaying = !isPlaying; //alterna los estados ! es operador de negación
    });  

    
})

