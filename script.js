document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const startScreen = document.getElementById('start-screen');

    if (startBtn && startScreen) {
        startBtn.addEventListener('click', () => {
            // Synthesize an iconic Mario Coin sound (B5 to E6) - Guaranteed to play without 404s!
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(987.77, audioCtx.currentTime); // B5
            oscillator.frequency.setValueAtTime(1318.51, audioCtx.currentTime + 0.1); // E6

            gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.4);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.5);

            startScreen.classList.add('slide-up');
            document.body.classList.remove('locked');
            
            setTimeout(() => {
                startScreen.style.display = 'none';
            }, 1500);
        });
    }

    // Typewriter effect for About section
    const aboutText = `Part time Gamer, Full time developer. I am a full-stack developer passionate about building scalable, elegant, and pixel-perfect applications. With experience across the MERN stack, I craft software that levels up real-world workflows. Ready to join your guild and conquer the next coding quest!`;
    const speed = 50; // typing speed in milliseconds
    let i = 0;
    const typewriterElement = document.getElementById('typewriter-text');

    function typeWriter() {
        if (i < aboutText.length) {
            typewriterElement.innerHTML += aboutText.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    // Start typewriter only when About section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && i === 0) {
                typeWriter();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
});
