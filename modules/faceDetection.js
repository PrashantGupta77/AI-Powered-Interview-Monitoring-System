let faceDetector;
let mpCamera;

function startFaceDetection(videoElement) {

    faceDetector = new FaceDetection({
        locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`
    });

    faceDetector.setOptions({
        model: "short",
        minDetectionConfidence: 0.5
    });

    faceDetector.onResults(onResults);

    mpCamera = new Camera(videoElement, {
        onFrame: async () => {
            await faceDetector.send({ image: videoElement });
        },
        width: 640,
        height: 480
    });

    mpCamera.start();
}

function onResults(results) {

    let count = 0;

    if (results.detections) {
        count = results.detections.length;
    }

    document.getElementById("faceCount").innerText =
        "Faces detected: " + count;

    if (count != 1) {
        addViolation(count === 0 ? "No Face Detected" : "Multiple Faces Detected");
    }
}