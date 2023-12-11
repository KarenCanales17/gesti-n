const buttonStartCall = document.getElementById("startCall");
const inputRoomId = document.getElementById("inputRoomId");
const form = document.getElementById("form");

buttonStartCall.addEventListener("click", () => {
  window.location.href = "/videollamada/room/";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  window.location.href = `/videollamada/room/${inputRoomId.value}`;
});
