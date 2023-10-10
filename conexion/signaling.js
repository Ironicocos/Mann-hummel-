let connectedUsers = {};
const loginData = localStorage.getItem("loginData");
const configuration = {'iceServers':[{'urls':'https://glitch.com/~dorian-rigorous-brazil'}]}
const signalingServerUrl = 'wss://glitch.com/~dorian-rigorous-brazil';
const signalingChannel = new WebSocket(signalingServerUrl);
const peerConnection = new RTCPeerConnection(configuration);

function handleLogin(){
    if(loginData) {
        const userData = JSON.parse(loginData);
        connectedUsers[user] = {
          username : userData.username,
          rol : userData.rol
        };
        console.log("El usuario ", connectedUsers[user].username + "ha iniciado sesión.");
      } else {
        console.log("Datos de inicio de sesión no encontrados.");
      }
}
async function handleOffer() {
    signalingChannel.addEventListener('message', async message => {
        if(message.answer) {
        const remoteDesc = new RTCSessionDescription(message.answer)
        await peerConnection.setRemoteDescription(remoteDesc)
    }
})
const offer = await peerConnection.createOffer()
await peerConnection.setLocalDescription(offer)
signalingChannel.send({'offer':offer})
}

function handleAnswer() {
    signalingChannel.addEventListener('message', async message =>{
        if(message.offer){
            peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer))
            const answer = await peerConnection.createAnswer()
            await peerConnection.setLocalDescription(answer)
            signalingChannel.send({'answer': answer})
        }
    })
}

function handleCandidate() {
    peerConnection.addEventListener('icecandidate', event =>{
        if(event.candidate){
          signalingChannel.send({'new-ice-candidate': event.candidate});
        }
      })
      signalingChannel.addEventListener('message', async message => {
        if (message.iceCandidate) {
            try {
                await peerConnection.addIceCandidate(message.iceCandidate);
            } catch (e) {
                console.error('Error adding received ice candidate', e);
            }
        }
    });
      peerConnection.addEventListener('connectiononstatechange', event =>{
        if (peerConnection.connectionState === 'connected') {

        }
      })
}

export default {
    handleLogin,
    handleAnswer,
    handleOffer,
    handleCandidate
};