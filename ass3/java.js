const sections = document.querySelectorAll('.container, .container2');

const gradients = [
  'linear-gradient(to bottom, #e6bbdeff, #909c73ff)',
  'linear-gradient(to right, #6b7280ff, #bbcdecff)',
  'linear-gradient(to left, #ff512f, #dd2476)',
  'linear-gradient(to top, #0f2027, #203a43, #2c5364)',
  'linear-gradient(to bottom right, #3a1c71, #d76d77, #ffaf7b)',
  'linear-gradient(to bottom, #1d4350, #a43931)',
  'linear-gradient(to right, #43cea2, #185a9d)'
];

let currentBackground = '';
let isBlending = false;


function updateBackground() {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollY + windowHeight / 2 >= sectionTop &&
      scrollY + windowHeight / 2 < sectionTop + sectionHeight
    ) {
      const newGradient = gradients[index % gradients.length];
      if (newGradient !== currentBackground && !isBlending) {
        blendGradient(newGradient);
      }
    }
  });
}

function blendGradient(newGradient) {
  isBlending = true;
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.zIndex = -1;
  overlay.style.background = newGradient;
  overlay.style.opacity = 0;
  overlay.style.transition = 'opacity 1s ease';
  overlay.style.pointerEvents = 'none';

  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.style.opacity = 1;
    setTimeout(() => {
      document.body.style.background = newGradient;
      document.body.removeChild(overlay);
      currentBackground = newGradient;
      isBlending = false;
    }, 1000);
  });
}

window.addEventListener('scroll', updateBackground);
window.addEventListener('load', () => {
  document.body.style.background = gradients[0];
  currentBackground = gradients[0];
  updateBackground();
});

