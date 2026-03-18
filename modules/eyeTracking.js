let faceMesh;
let eyeAwayStart = null;
let eyeViolationTriggered = false;

function startEyeTracking(videoElement) {

    faceMesh = new FaceMesh({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
        }
    });

    faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6
    });

    faceMesh.onResults(onEyeResults);

    eyeLoop(videoElement);
}

async function eyeLoop(videoElement) {

    if (videoElement.readyState >= 2) {
        await faceMesh.send({ image: videoElement });
    }

    requestAnimationFrame(() => eyeLoop(videoElement));
}

function onEyeResults(results) {

    if (!results.multiFaceLandmarks) return;

    let landmarks = results.multiFaceLandmarks[0];

    detectLipMovement(landmarks);

    let leftEye = landmarks[33];
    let rightEye = landmarks[263];
    let nose = landmarks[1];

    let avgEyeX = (leftEye.x + rightEye.x) / 2;

    let diff = Math.abs(avgEyeX - nose.x);

    if (diff > 0.07) {

        document.getElementById("eyeStatus").innerText =
            "Eye Focus: Looking Away ⚠️";

        if (!eyeAwayStart) {
            eyeAwayStart = Date.now();
        }

        let duration = (Date.now() - eyeAwayStart) / 1000;

        if (duration > 5 && !eyeViolationTriggered) {

            addViolation("Looking Away From Screen");

            eyeViolationTriggered = true;
        }

    } else {

        document.getElementById("eyeStatus").innerText =
            "Eye Focus: Normal";

        eyeAwayStart = null;
        eyeViolationTriggered = false;
    }
}