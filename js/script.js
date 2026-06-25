document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.container');
    container.style.opacity = 0;
    container.style.transition = "opacity 0.8s ease-in-out";
    
    setTimeout(() => {
        container.style.opacity = 1;
    }, 100);
});

document.addEventListener("DOMContentLoaded", () => {
    // Animación de entrada de la Landing
    const container = document.querySelector('.container');
    if (container) {
        container.classList.add('fade-in');
    }

    // LÓGICA DEL POP-UP (MODAL)
    const modal = document.getElementById("cv-modal");
    const openBtn = document.getElementById("open-cv-modal");
    const closeBtn = document.querySelector(".close-btn");

    // Al hacer clic en el botón principal, se muestra el Pop-Up perfectamente centrado
    openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

    // Al hacer clic en la (X), se oculta el Pop-Up
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Al hacer clic fuera de la tarjeta del Pop-Up, también se cierra
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});

const discordBtn = document.getElementById('discord-btn');
if (discordBtn) {
    discordBtn.addEventListener('click', () => {
        const username = discordBtn.getAttribute('data-user');
        
        // Copia el texto al portapapeles
        navigator.clipboard.writeText(username).then(() => {
            const originalContent = discordBtn.innerHTML;
            
            // 1. Cambiamos el texto
            discordBtn.innerHTML = '¡Usuario Copiado al Portapapeles! 📋';
            
            // 2. Centrado
            discordBtn.style.justifyContent = 'center'; 
            discordBtn.style.borderColor = '#10b981'; 
            
            // Regresa a la normalidad después de 2 segundos
            setTimeout(() => {
                discordBtn.innerHTML = originalContent;
                discordBtn.style.borderColor = '';
                discordBtn.style.justifyContent = ''; // <--- Resetea al estilo por defecto del CSS (space-between)
            }, 2000);
        });
    });
}

/* Neon Effect */

const canvas = document.getElementById('neon-canvas'); // Usamos el mismo ID de canvas del HTML
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const numParticles = 120; // Cantidad de puntos flotantes

    // Objeto para registrar la posición del mouse
    let mouse = { x: null, y: null, radius: 120 };
    window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
    window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Clase para crear cada punto de neón
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() * 1) - 0.5;
            this.speedY = (Math.random() * 1) - 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Rebotar en los bordes de la pantalla
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }
        draw() {
            ctx.fillStyle = 'rgba(100, 255, 218, 0.7)'; // Brillo Cian Miku
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particlesArray = [];
        for (let i = 0; i < numParticles; i++) { particlesArray.push(new Particle()); }
    }

    // Dibujar las líneas neón que conectan los puntos
    function connect() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                // Si los puntos están cerca, dibuja una línea translúcida
                if (distance < 100) {
                    let opacity = (1 - (distance / 100)) * 0.15;
                    ctx.strokeStyle = `rgba(100, 255, 218, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        connect();
        requestAnimationFrame(animate);
    }

    init();
    animate();
}