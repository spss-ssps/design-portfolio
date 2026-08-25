const sf = document.getElementById('starfield');
for (let i = 0; i < 240; i++) {
    const d = document.createElement('div');
    d.className = 'twinkle';
    const sz = Math.random() * 2.2 + 0.6;
    d.style.cssText = `width:${sz}px;height:${sz}px;top:${Math.random() * 100}%;left:${Math.random() * 100}%;--dur:${(Math.random() * 3.8 + 2.4).toFixed(1)}s;--del:${(Math.random() * 5.5).toFixed(1)}s;--op:${(Math.random() * 0.55 + 0.3).toFixed(2)};`;
    sf.appendChild(d);
}

const cursorGlow = document.querySelector('.cursor-glow');
const cursorRing = document.querySelector('.cursor-ring');
const driftTargets = document.querySelectorAll('.orbit, .planet, .starfield');
const hoverTargets = document.querySelectorAll('a, button, .project-art, .brand-mark, .project-link');

window.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth) - 0.5;
    const y = (event.clientY / window.innerHeight) - 0.5;

    cursorGlow.style.opacity = '1';
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;

    cursorRing.style.left = `${event.clientX}px`;
    cursorRing.style.top = `${event.clientY}px`;
    cursorRing.style.opacity = '1';

    driftTargets.forEach((el, index) => {
        const intensity = index < 3 ? 10 : 16;
        const offsetX = x * intensity;
        const offsetY = y * intensity;
        el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
});

window.addEventListener('pointerleave', () => {
    cursorGlow.style.opacity = '0';
    cursorRing.style.opacity = '0';
    driftTargets.forEach((el) => {
        el.style.transform = 'translate(0, 0)';
    });
});

hoverTargets.forEach((target) => {
    target.addEventListener('pointerenter', () => cursorRing.classList.add('is-hovering'));
    target.addEventListener('pointerleave', () => cursorRing.classList.remove('is-hovering'));
});