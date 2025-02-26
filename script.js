// Handle album flipping
let album = document.querySelector('.album');
let isFlipped = false;
album.addEventListener('click', function (event) {
    // Prevent flipping if clicking on a track title (inside .album-back li)
    if (event.target.closest(".album-back li")) return;
    isFlipped = !isFlipped;  // Toggle flip state
    album.classList.toggle('flipped', isFlipped);
});

// Modal functions with transitions
function openModal(trackNumber) {
    const modal = document.getElementById('modal' + trackNumber);
    modal.style.display = 'flex';
    
    // Trigger reflow for transition to work
    void modal.offsetWidth;
    
    // Add active class to trigger transition
    modal.classList.add('active');
}

function closeModal(trackNumber) {
    const modal = document.getElementById('modal' + trackNumber);
    
    // Remove active class to trigger transition
    modal.classList.remove('active');
    
    // Hide modal after transition completes
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300); // Match this to the CSS transition duration
}

// Close modal when clicking outside of modal content
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function (event) {
        if (event.target.classList.contains('modal')) {
            // Get the modal number from the id
            const trackNumber = this.id.replace('modal', '');
            closeModal(trackNumber);
        }
    });
});

// Create additional shooting stars at random
function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    
    // Random position
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    
    shootingStar.style.cssText = `
        position: fixed;
        top: ${startY}vh;
        left: ${startX}vw;
        width: 2px;
        height: 2px;
        background: white;
        border-radius: 50%;
        box-shadow: 0 0 3px 2px rgba(255, 255, 255, 0.4);
        z-index: -1;
        opacity: 0;
        transform: rotate(${Math.random() * 360}deg);
    `;
    
    document.body.appendChild(shootingStar);
    
    // Animate the shooting star
    setTimeout(() => {
        shootingStar.style.animation = `shootingStarCustom 3s linear`;
        
        // Remove after animation completes
        setTimeout(() => {
            shootingStar.remove();
        }, 3000);
    }, Math.random() * 1000);
}

// Add a CSS rule for the shooting star animation
const style = document.createElement('style');
style.textContent = `
@keyframes shootingStarCustom {
    0% {
        transform: translateX(0) translateY(0) scale(1);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    100% {
        transform: translateX(150px) translateY(150px) scale(0.2);
        opacity: 0;
    }
}`;
document.head.appendChild(style);

// Create shooting stars periodically
setInterval(createShootingStar, 5000);