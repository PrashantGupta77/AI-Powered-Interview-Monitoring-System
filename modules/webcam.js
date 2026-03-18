let video = document.getElementById("webcam");
let startBtn = document.getElementById("startBtn");
let cameraStatus = document.getElementById("cameraStatus");

startBtn.addEventListener("click", startInterview);

async function startInterview() {

    // ⭐ disable button immediately after click (UI only)
    startBtn.disabled = true;
    startBtn.innerText = "Interview Running";

    try {

        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });

        video.srcObject = stream;

        video.onloadedmetadata = async () => {

            await video.play();
            startMonitoring();

            cameraStatus.innerText = "Camera: ON ✅";

            blockClipboardEvents();

            document.getElementById("logBox").innerText =
                "Initializing AI Models...";

            setTimeout(() => {

                startFaceDetection(video);
                startEyeTracking(video);

                document.getElementById("logBox").innerText =
                    "Interview Monitoring Started";

                console.log("AI Monitoring Pipeline Started");

            }, 1200);

        };

    } catch (error) {

        cameraStatus.innerText = "Camera: Permission Denied ❌";
        console.error("Error accessing webcam:", error);
        alert("Please allow webcam access to start the interview.");

        // ⭐ re-enable button if camera failed (UI safety)
        startBtn.disabled = false;
        startBtn.innerText = "Start Interview";
    }
}