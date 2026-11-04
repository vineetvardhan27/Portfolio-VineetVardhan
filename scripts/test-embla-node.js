const EmblaCarousel = require('embla-carousel');

// Let's test in node with jsdom or mock DOM
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><div class="viewport"><div class="container">' +
  '<div class="slide">1</div><div class="slide">2</div><div class="slide">3</div>' +
  '<div class="slide">4</div><div class="slide">5</div><div class="slide">6</div>' +
  '</div></div>');

const { document } = dom.window;
const viewport = document.querySelector('.viewport');
const container = document.querySelector('.container');
const slides = Array.from(document.querySelectorAll('.slide'));

// Mock getBoundingClientRect
viewport.getBoundingClientRect = () => ({ width: 460, height: 400, left: 0, right: 460, top: 0, bottom: 400 });
container.getBoundingClientRect = () => ({ width: 2280, height: 400, left: 0, right: 2280, top: 0, bottom: 400 });
slides.forEach((s, i) => {
  s.getBoundingClientRect = () => ({
    width: 380,
    height: 400,
    left: i * 380,
    right: (i + 1) * 380,
    top: 0,
    bottom: 400
  });
});

const embla = EmblaCarousel(viewport, {
  loop: true,
  align: 'center',
  containScroll: false,
});

console.log('scrollSnaps:', embla.scrollSnapList());
console.log('slide transforms after init:');
slides.forEach((s, i) => console.log(`slide ${i}:`, s.style.transform));

