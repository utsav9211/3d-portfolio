// 3D CHARACTER CURSOR FOLLOWER
const cursorCharacter = document.createElement('div');
cursorCharacter.id = 'cursor-animal';
cursorCharacter.innerHTML = '<img src="assets/images/3d-cursor.png" alt="3D Cursor Character" style="width: 60px; height: 60px; object-fit: contain; filter: drop-shadow(0 0 12px #64ffda); transition: transform 0.12s; transform-origin: center;">';
document.body.appendChild(cursorCharacter);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let charX = mouseX;
let charY = mouseY;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursorCharacter() {
    // Hide on mobile
    if (window.innerWidth <= 1024) {
        cursorCharacter.style.display = 'none';
        requestAnimationFrame(animateCursorCharacter);
        return;
    } else {
        cursorCharacter.style.display = 'block';
    }

    // Target position (with scroll offset)
    let targetX = mouseX;
    let targetY = mouseY + window.scrollY;

    // Easing for trailing effect
    let dx = targetX - charX;
    let dy = targetY - charY;
    charX += dx * 0.08;
    charY += dy * 0.08;

    // 3D tilt and flip
    let rotateX = Math.max(Math.min(dy * 0.12, 18), -18); // Clamp for realism
    let scaleX = dx < 0 ? -1 : 1;
    let rotateZ = dx * 0.04;

    cursorCharacter.style.transform = `translate3d(${charX + 20}px, ${charY + 20}px, 0) scaleX(${scaleX}) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`;

    requestAnimationFrame(animateCursorCharacter);
}

animateCursorCharacter();
