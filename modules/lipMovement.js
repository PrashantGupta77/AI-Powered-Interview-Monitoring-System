let lipStartTime = null;
let lipViolationTriggered = false;

let prevLipDistance = null;
let smoothLipDistance = null;

let lipCooldown = false;

function detectLipMovement(landmarks) {

    if (!monitoringActive) return;

    // ⭐ MediaPipe lip landmarks
    let upperLip = landmarks[13];
    let lowerLip = landmarks[14];

    let lipDistance = Math.abs(upperLip.y - lowerLip.y);

    // ⭐ smoothing filter (reduces jitter)
    if (smoothLipDistance === null) {
        smoothLipDistance = lipDistance;
    }

    smoothLipDistance = (smoothLipDistance * 0.7) + (lipDistance * 0.3);

    // ⭐ movement detection
    if (prevLipDistance !== null) {

        let change = Math.abs(smoothLipDistance - prevLipDistance);

        // ⭐ tuned threshold for real webcam noise
        if (change > 0.0025) {

            document.getElementById("lipStatus").innerText =
                "Lip Activity: Talking ⚠️";

            if (!lipStartTime) {
                lipStartTime = Date.now();
            }

            let duration = (Date.now() - lipStartTime) / 1000;

            // ⭐ continuous talking detection
            if (duration > 10 && !lipViolationTriggered && !lipCooldown) {

                addViolation("Talking Detected");

                lipViolationTriggered = true;
                lipCooldown = true;

                // ⭐ cooldown prevents spam
                setTimeout(() => {
                    lipCooldown = false;
                }, 8000);
            }

        } else {

            document.getElementById("lipStatus").innerText =
                "Lip Activity: Normal";

            lipStartTime = null;
            lipViolationTriggered = false;
        }
    }

    prevLipDistance = smoothLipDistance;
}