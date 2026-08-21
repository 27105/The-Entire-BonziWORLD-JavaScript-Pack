let audio = new Audio("https://www.myinstants.com/media/sounds/inflation-balloon-animation-sound.mp3");
audio.play();
const customStyle101 = document.createElement("style");
customStyle.textContent = `
    .bonzi {
      transition: transform 0.5s ease;
    }
`;
document.head.appendChild(customStyle101);
document.querySelectorAll('.bonzi').forEach(element => {
  element.style.transform = 'scale(2)';
  setTimeout(() => {
    element.style.transform = 'scale(1)';
  }, 10000);
});