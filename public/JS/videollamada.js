const remoteStreamsContainer = document.getElementById("remoteStreams");
const startCallButton = document.getElementById("startCallButton");

let localStream;
let rtcPeerConnection;
let socket = io("http://localhost:3000");

async function getMedia() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
  } catch (error) {
    console.error("Error accessing media devices:", error);
  }
}

async function startCall() {
  await getMedia();

  const localVideo = document.createElement("video");
  localVideo.srcObject = localStream;
  localVideo.autoplay = true;
  localVideo.playsinline = true;
  localVideo.style.width = "100%";
  localVideo.style.maxWidth = "400px";
  localVideo.style.height = "auto";
  localVideo.style.margin = "10px";
  localVideo.style.border = "1px solid #ccc";
  localVideo.style.borderRadius = "8px";

  // Agrega el video local al contenedor
  remoteStreamsContainer.appendChild(localVideo);

  if (rtcPeerConnection) {
    rtcPeerConnection.close();
  }

  rtcPeerConnection = new RTCPeerConnection();

  localStream
    .getTracks()
    .forEach((track) => rtcPeerConnection.addTrack(track, localStream));

  rtcPeerConnection.onicecandidate = handleICECandidateEvent;
  rtcPeerConnection.ontrack = handleTrackEvent;

  const offer = await rtcPeerConnection.createOffer();
  await rtcPeerConnection.setLocalDescription(offer);

  socket.emit("offer", offer);
}

function handleICECandidateEvent(event) {
  if (event.candidate) {
    socket.emit("ice-candidate", event.candidate);
  }
}

function handleTrackEvent(event) {
  const remoteVideoElement = document.createElement("video");
  remoteVideoElement.srcObject = event.streams[0];
  remoteVideoElement.autoplay = true;
  remoteVideoElement.playsinline = true;
  remoteVideoElement.style.width = "100%";
  remoteVideoElement.style.maxWidth = "400px";
  remoteVideoElement.style.height = "auto";
  remoteVideoElement.style.margin = "10px";
  remoteVideoElement.style.border = "1px solid #ccc";
  remoteVideoElement.style.borderRadius = "8px";

  // Agrega el video remoto al contenedor
  remoteStreamsContainer.appendChild(remoteVideoElement);
}

socket.on("offer", async (offer) => {
  try {
    if (rtcPeerConnection) {
      rtcPeerConnection.close();
    }

    rtcPeerConnection = new RTCPeerConnection();

    rtcPeerConnection.onicecandidate = handleICECandidateEvent;
    rtcPeerConnection.ontrack = handleTrackEvent;

    await rtcPeerConnection.setRemoteDescription(
      new RTCSessionDescription(offer)
    );
    const answer = await rtcPeerConnection.createAnswer();
    await rtcPeerConnection.setLocalDescription(answer);

    socket.emit("answer", answer);
  } catch (error) {
    console.error("Error handling offer:", error);
  }
});

socket.on("answer", async (answer) => {
  await rtcPeerConnection.setRemoteDescription(
    new RTCSessionDescription(answer)
  );
});

socket.on("ice-candidate", (candidate) => {
  try {
    rtcPeerConnection
      .addIceCandidate(new RTCIceCandidate(candidate))
      .catch((error) => console.error("Error adding ice candidate:", error));
  } catch (error) {
    console.error("Error handling ice candidate:", error);
  }
});

startCallButton.addEventListener("click", startCall);

window.addEventListener("beforeunload", () => {
  socket.close();
  if (rtcPeerConnection) {
    rtcPeerConnection.close();
  }
});
