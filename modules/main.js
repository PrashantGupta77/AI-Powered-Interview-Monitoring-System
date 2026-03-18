import { startFaceDetection } from "./faceDetection.js";
import { startEyeTracking } from "./eyeTracking.js";
import { blockClipboardEvents } from "./clipboardBlocker.js";
import { initTabMonitor } from "./tabMonitor.js";

const video = document.getElementById("webcam");
const startBtn = document.getElementById("startBtn");
const cameraStatus = document.getElementById("cameraStatus");
const logBox = document.getElementById("logBox");

startBtn.addEventListener("click", startInterview);

async function startInterview() {
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });

        video.srcObject = stream;
        cameraStatus.innerText = "Camera: ON ✅";

        blockClipboardEvents();
        initTabMonitor();
        startFaceDetection(video);
        startEyeTracking(video);

        logBox.innerText = "Interview Monitoring Started";

        console.log("✅ Monitoring started");

    } catch (err) {
        cameraStatus.innerText = "Camera Permission Denied ❌";
        alert("Allow camera access");
    }
}