// 1. Create audio object
const audio = new Audio('https://github.com/ivorydevrimoalt/BONZIWORLDKRULTRAJAVASCRIPTLIST/raw/refs/heads/main/asdadasdasdas.wav');

// 2. Timing constants
const startTime = 6.76;
const endTime = 54.08;
const beatDuration = 0.42; // Seconds per bounce (142 BPM)

// Frequency derived directly from beat duration
const frequency = (2 * Math.PI) / beatDuration; 

// Selector targeting .bonzi, requested IDs, AND li.context-menu-item
const targetSelector = '.bonzi, #chat_log_button, #chat_log, #chat_bar, #room_info, #page_error, li.context-menu-item';

let animationFrameId = null;

function animateElements() {
  const currentTime = audio.currentTime;

  // Active bounce window: between 6.76s and 54.08s
  if (currentTime >= startTime && currentTime < endTime && !audio.paused) {
    const elapsed = currentTime - startTime;

    // Calculate sine wave based on beat timing
    const wave = Math.sin(elapsed * frequency);
    
    // Normalized 0 to 1 value for rhythmic bouncing
    const bounceProgress = Math.abs(Math.sin((elapsed / beatDuration) * Math.PI));

    // Dynamic transformation values
    const posX = wave * 20;                          // Horizontal sway (-20px to 20px)
    const posY = -bounceProgress * 30;               // Vertical bounce up to 30px
    const skewX = wave * 12;                         // Skew X (-12deg to 12deg)
    const skewY = Math.cos(elapsed * frequency) * 6;  // Skew Y
    const scaleY = 1 + bounceProgress * 0.15;        // Squash/stretch on bounce

    // Apply transformation to all targeted elements
    const elements = document.querySelectorAll(targetSelector);
    elements.forEach(el => {
      el.style.transform = `translate(${posX}px, ${posY}px) skew(${skewX}deg, ${skewY}deg) scaleY(${scaleY})`;
    });
  } 
  // Outside active window: reset transformations
  else if (currentTime >= endTime || currentTime < startTime) {
    resetTransformations();
  }

  // Continue animation loop while playing before end threshold
  if (!audio.paused && !audio.ended && currentTime < endTime) {
    animationFrameId = requestAnimationFrame(animateElements);
  }
}

function resetTransformations() {
  const elements = document.querySelectorAll(targetSelector);
  elements.forEach(el => {
    el.style.transform = 'none';
  });
}

function stopAnimation() {
  resetTransformations();
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
}

// Event Listeners
audio.addEventListener('play', () => {
  animationFrameId = requestAnimationFrame(animateElements);
});

audio.addEventListener('pause', stopAnimation);
audio.addEventListener('ended', stopAnimation);

// Start audio
audio.play().catch(err => {
  console.warn('Autoplay prevented. Trigger audio.play() via a user click event.', err);
});
