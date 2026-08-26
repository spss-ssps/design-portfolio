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

// Gallery
const gallerySets = [
    {
        name: 'Yi Chen', slides: [
            'src/Issue%2013/Yi%20Chen/Yi%20Chen1.jpeg',
            'src/Issue%2013/Yi%20Chen/Yi%20Chen2.jpeg',
            'src/Issue%2013/Yi%20Chen/Yi%20Chen3.jpeg',
            'src/Issue%2013/Yi%20Chen/Yi%20Chen4.jpeg',
            'src/Issue%2013/Yi%20Chen/Yi%20Chen5.jpeg',
            'src/Issue%2013/Yi%20Chen/Yi%20Chen6.jpeg'

        ]
    },
    {
        name: 'YeonsooLee', slides: [
            'src/Issue%2013/YeonsooLee/YeonsooLee1.jpg',
            'src/Issue%2013/YeonsooLee/YeonsooLee2.jpg',
            'src/Issue%2013/YeonsooLee/YeonsooLee3.jpg',
            'src/Issue%2013/YeonsooLee/YeonsooLee4.jpg',
            'src/Issue%2013/YeonsooLee/YeonsooLee5.jpg',
            'src/Issue%2013/YeonsooLee/YeonsooLee6.jpg'
        ]
    },
    {
        name: 'Motion', slides: [
            'src/Issue%2013/IsaSabraw/IsaSabraw1.jpg',
            'src/Issue%2013/IsaSabraw/IsaSabraw2.jpg',
            'src/Issue%2013/IsaSabraw/IsaSabraw3.jpg',
            'src/Issue%2013/IsaSabraw/IsaSabraw4.jpg',
            'src/Issue%2013/IsaSabraw/IsaSabraw5.jpg',
            'src/Issue%2013/IsaSabraw/IsaSabraw6.jpg'
        ]
    }
];

const project2Sets = [
    {
        name: 'At The End', slides: [
            'src/Issue%2012/atTheEnd.jpg'
        ]
    },
    {
        name: 'Isa Sabraw', slides: [
            'src/Issue%2012/BeingWithoutBrains.jpg',
        ]
    },
    {
        name: 'Isa Sabraw', slides: [
            'src/Issue%2012/EatingSpring.jpg',
        ]
    },
    {
        name: 'MIZU', slides: [
            'src/Issue%2012/MIZU.jpg',
        ]
    }
];

function setupGallery(gallery, sets) {
    const slide = gallery.querySelector('.gallery-slide');
    const dots = gallery.querySelector('.gallery-dots');
    const tabs = gallery.querySelectorAll('.gallery-tab');
    const previous = gallery.querySelector('.gallery-arrow.prev');
    const next = gallery.querySelector('.gallery-arrow.next');
    const state = { set: 0, slide: 0 };

    function render() {
        const set = sets[state.set];
        let track = slide.firstElementChild;

        if (!track || track.dataset.set !== String(state.set)) {
            track = document.createElement('div');
            track.className = 'gallery-track';
            track.dataset.set = state.set;
            set.slides.forEach((src, index) => {
                const image = document.createElement('img');
                image.src = src;
                image.alt = `${set.name} project image ${index + 1}`;
                track.appendChild(image);
            });
            slide.replaceChildren(track);
        }

        track.style.transform = `translateX(-${state.slide * 100}%)`;
        dots.replaceChildren();
        set.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            const isActive = index === state.slide;
            dot.className = 'gallery-dot' + (isActive ? ' active' : '');
            dot.type = 'button';
            dot.setAttribute('aria-label', `Go to image ${index + 1}`);
            dot.setAttribute('aria-current', String(isActive));
            dot.addEventListener('click', () => {
                state.slide = index;
                render();
            });
            dots.appendChild(dot);
        });

        previous.disabled = state.slide === 0;
        next.disabled = state.slide === set.slides.length - 1;
        tabs.forEach((tab, index) => {
            const isActive = index === state.set;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-pressed', String(isActive));
        });
    }

    tabs.forEach((tab) => {
        tab.type = 'button';
        tab.addEventListener('click', () => {
            state.set = Number(tab.dataset.set);
            state.slide = 0;
            render();
        });
    });

    previous.addEventListener('click', () => {
        if (state.slide > 0) {
            state.slide -= 1;
            render();
        }
    });

    next.addEventListener('click', () => {
        if (state.slide < sets[state.set].slides.length - 1) {
            state.slide += 1;
            render();
        }
    });

    render();
}

setupGallery(document.querySelectorAll('.has-gallery')[0], gallerySets);
setupGallery(document.querySelectorAll('.has-gallery')[1], project2Sets);