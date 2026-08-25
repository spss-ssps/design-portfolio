//starfield

const sf = document.getElementById('starfield');
for (let i = 0; i < 200; i++) {
    const d = document.createElement('div');
    d.className = 'twinkle';
    const sz = Math.random() * 2.5 + 0.6;
    d.style.cssText = `width:${sz}px;height:${sz}px;top:${Math.random() * 100}%;left:${Math.random() * 100}%;--dur:${(Math.random() * 3.8 + 2.4).toFixed(1)}s;--del:${(Math.random() * 5.5).toFixed(1)}s;--op:${(Math.random() * 0.55 + 0.3).toFixed(2)};`;
    sf.appendChild(d);
}


//cursor drift effect
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

//Projecy Gallery
const proj1Galleries = [
    {
        name: 'Yi Chen', layer: 'Yi Chen', slides: [
            'src/Issue%2013/Yi%20Chen/Yi%20Chen1.jpeg',
            'src/Issue%2013/Yi%20Chen/Yi%20Chen2.jpeg',
            'src/Issue%2013/Yi%20Chen/Yi%20Chen3.jpeg',
            'src/Issue%2013/Yi%20Chen/Yi%20Chen4.jpeg',
            'src/Issue%2013/Yi%20Chen/Yi%20Chen5.jpeg',
            'src/Issue%2013/Yi%20Chen/Yi%20Chen6.jpeg'

        ]
    },
    {
        name: 'UI', layer: 'Product', slides: [
            'src/Issue%2013/Yi%20Chen/Yi%20Chen4.jpeg',
            'src/Issue%2013/Yi%20Chen/Yi%20Chen5.jpeg',
            'src/Issue%2013/Yi%20Chen/Yi%20Chen6.jpeg'
        ]
    },
    {
        name: 'Motion', layer: 'Motion', slides: [
            'src/Issue%2013/Yi%20Chen/Yi%20Chen1.jpeg',
            'src/Issue%2013/Yi%20Chen/Yi%20Chen2.jpeg',
            'src/Issue%2013/Yi%20Chen/Yi%20Chen3.jpeg'
        ]
    }
];

let proj1State = { set: 0, slide: 0 };

function renderProj1(direction = 1) {
    const g = proj1Galleries[proj1State.set];
    const slideEl = document.getElementById('proj1-slide');
    const outgoingClass = direction > 0 ? 'slide-out-left' : 'slide-out-right';
    const incomingClass = direction > 0 ? 'slide-in-right' : 'slide-in-left';

    slideEl.classList.add(outgoingClass);
    setTimeout(() => {
        slideEl.style.transition = 'none';
        slideEl.classList.remove(outgoingClass);
        slideEl.classList.add(incomingClass);
        slideEl.replaceChildren();

        const image = document.createElement('img');
        image.src = g.slides[proj1State.slide];
        image.alt = `${g.name} project image ${proj1State.slide + 1}`;
        slideEl.appendChild(image);

        slideEl.offsetWidth;
        slideEl.style.transition = '';
        slideEl.classList.remove(incomingClass);
    }, 350);

    document.getElementById('proj1-layer').textContent = 'Layer / ' + g.layer;

    const dotsWrap = document.getElementById('proj1-dots');
    dotsWrap.innerHTML = '';
    g.slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'gallery-dot' + (i === proj1State.slide ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to image ' + (i + 1));
        if (i === proj1State.slide) dot.setAttribute('aria-current', 'true');
        dot.addEventListener('click', () => {
            const direction = i >= proj1State.slide ? 1 : -1;
            proj1State.slide = i;
            renderProj1(direction);
        });
        dotsWrap.appendChild(dot);
    });

    document.querySelectorAll('#proj1-tabs .gallery-tab').forEach((btn, i) => {
        btn.classList.toggle('active', i === proj1State.set);
    });
}

document.querySelectorAll('#proj1-tabs .gallery-tab').forEach(btn => {
    btn.addEventListener('click', () => {
        proj1State.set = parseInt(btn.dataset.set, 10);
        proj1State.slide = 0;
        renderProj1(1);
    });
});

document.querySelector('#proj1-art .gallery-arrow.prev').addEventListener('click', () => {
    const len = proj1Galleries[proj1State.set].slides.length;
    proj1State.slide = (proj1State.slide - 1 + len) % len;
    renderProj1(-1);
});
document.querySelector('#proj1-art .gallery-arrow.next').addEventListener('click', () => {
    const len = proj1Galleries[proj1State.set].slides.length;
    proj1State.slide = (proj1State.slide + 1) % len;
    renderProj1(1);
});

renderProj1();