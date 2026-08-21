let audio = new Audio("https://file.garden/ZsKtwCD-bXBSm1sZ/(SFX)%20Lighting%20Effect%20%5BMario%20Kart%2064%5D.mp3");
audio.play();
function flashScreen() {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = '#ffffff';
  overlay.style.zIndex = '999999';
  overlay.style.pointerEvents = 'none';
  document.body.appendChild(overlay);
  const animation = overlay.animate(
    [
      { opacity: 1 },
      { opacity: 0 }
    ],
    {
      duration: 500,
      easing: 'ease-out'
    }
  );
  animation.onfinish = () => overlay.remove();
}
flashScreen();
const customStyle101 = document.createElement("style");
customStyle.textContent = `
    .bonzi {
      transition: transform 0.5s ease;
    }
`;
document.head.appendChild(customStyle101);
document.querySelectorAll('.bonzi').forEach(element => {
  element.style.transform = 'scale(0.5)';
  setTimeout(() => {
    element.style.transform = 'scale(1)';
  }, 10000);
});