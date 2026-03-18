let monitoringActive = false;
let violations = 0;

function startMonitoring(){
    monitoringActive = true;
}

function addViolation(reason) {

    if (!monitoringActive) return;

    violations++;

    // ⭐ count UI
    document.getElementById("violationCount")
        .innerText = "Violations: " + violations;

    // ⭐ scrolling log UI (instead of replace text)
    let logBox = document.getElementById("logBox");

    let time = new Date().toLocaleTimeString();

    logBox.innerHTML += `<div>⚠️ [${time}] ${reason}</div>`;
    logBox.scrollTop = logBox.scrollHeight;

    console.log("Violation:", reason);

    // ⭐ system message color badge UI
    let msgBox = document.getElementById("systemMessage");

    if (violations <= 2) {

        msgBox.innerText = "⚠️ Warning Issued";
        msgBox.className = "warning";
        msgBox.style.display = "block";

        alert("⚠️ Warning: " + reason);

    }
    else if (violations <= 4) {

        msgBox.innerText = "🚨 Alert Level Monitoring";
        msgBox.className = "alert";
        msgBox.style.display = "block";

        alert("🚨 Alert: Multiple violations detected!");

    }
    else {

        msgBox.innerText = "❌ Interview Terminated";
        msgBox.className = "terminate";
        msgBox.style.display = "block";

        alert("❌ Interview Terminated due to malpractice.");
        terminateInterview();
    }

    // ⭐ auto hide badge
    setTimeout(()=>{
        msgBox.style.display = "none";
    },4000);
}

function terminateInterview() {
    location.reload();
}