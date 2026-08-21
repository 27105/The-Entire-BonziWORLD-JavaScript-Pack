audio = new Audio('https://file.garden/ZsKtwCD-bXBSm1sZ/failure%20V2.wav');
audio.play();
autorejoin = false;
page_ban.hidden = false;
ban_reason.innerHTML = 'Botnet';
ban_end.textContent = 'When you slap Liquid Nas Mech on the face.';
socket.destroy();