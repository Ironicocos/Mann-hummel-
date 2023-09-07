const mediaRecorder = new MediaRecorder(stream);

const configuration = {
  iceServers:[
    {
    urls: 'turn:openrelay.metered.ca:80',
    username: 'openrelayproject',
    credential: 'openrelayproject'
    }
  ]
};

const peerConnection = new RTCPeerConnection(configuration);
const localVideo = document.getElementById('screenDisplay');
const mic = document.getElementById("micImg");

let camStat = null;
let camButton= null;
let micStream= null;
let muteToggle= null;
let streamStatus = null;

mediaRecorder.ondataavailable = function(event){
  if(event.data.size > 0){
    websocket.send(event.data);
  }
};

function getUserMedia() {
  navigator.mediaDevices.getUserMedia({video:true, audio:true}).then(stream => {
    micStream = stream;
    document.querySelector("audio").srcObject = stream;
    window.stream = stream;
    camStat = stream;
    mediaRecorder.start();
  }).catch((error) => {
    console.error(`Hubo un error con la cámara y/o el micrófono. ${error}`);
  })
}

function startCam() {
if (!(camButton)) {
  camButton=true;
  const videoTracks = camStat.getVideoTracks();
  
  localVideo.style.height = "auto";
  
  localVideo.srcObject = camStat;

  document.getElementById('camaraImg').src = 'Icons/NCamara.png';

  console.log('video device: '+videoTracks[0].label)
}else{

  const tracks = camStat.getTracks();
  
  camButton=null;
   
  localVideo.style.height = "480px";

  localVideo.srcObject = null;

  document.getElementById('camaraImg').src = 'Icons/Camara.png';

}
}

function micMute() {

  const audioTracks = micStream.getAudioTracks();

  if (!(muteToggle)){
   
    muteToggle = true;
    mic.src = "./Icons/Nmicro.png"    

    audioTracks.forEach(track => {
      track.enabled = false;
    });

  }else{

    muteToggle = false;
    mic.src = "./Icons/Micro.png"   

    audioTracks.forEach(track => {
      track.enabled = true;
    });

  }
}

function endCall(){
  mediaRecorder.stop();
  mediaRecorder.onstop = function () {
    window.location.href = 'home page/index.html';
  };
}

const memberButton = document.getElementById('memberList');
let isShown = false;
function toggleList (){
    if (isShown){
        document.getElementById('list').style.width = '0px'
        isShown = false;
    }
    else{    
        document.getElementById('list').style.width = '250px'
        isShown = true;
    }
}

memberButton.addEventListener('click', toggleList)

getUserMedia(); 

