🎯 AI-Powered Interview Monitoring System

A lightweight browser-based AI proctoring prototype designed to improve fairness, integrity, and behavioural supervision during remote technical interviews.

The system performs real-time candidate behaviour analysis using client-side computer vision and triggers rule-based actions when suspicious activities such as tab switching, looking away, talking, or multiple face presence are detected.

This project was developed as part of the Sure4Job AI Technical Assignment to demonstrate practical system design, real-time AI inference, and intelligent monitoring workflow implementation.

🚀 Key Highlights

✔ Real-time AI inference (~20–30 ms per frame)
✔ Fully client-side architecture (zero backend dependency)
✔ Modular behaviour detection engine
✔ Event-driven violation monitoring system
✔ Interactive real-time monitoring dashboard

🧠 Problem Statement

Remote technical interviews often lack behavioural supervision mechanisms, making it difficult for recruiters to ensure candidate authenticity and focus.

This system demonstrates how lightweight browser-side AI models can be used to monitor candidate engagement and detect suspicious behavioural patterns without requiring heavy infrastructure or server-side processing.

✨ Features

✅ Live webcam monitoring
✅ Multiple face detection
✅ Eye gaze tracking (looking away detection)
✅ Lip movement monitoring (speaking detection)
✅ Tab switching / window blur detection
✅ Clipboard activity blocking
✅ Centralized violation counter
✅ Rule-based warning / alert / termination workflow
✅ Real-time monitoring dashboard UI

🧰 Tech Stack

Frontend:
HTML • CSS • JavaScript

AI / Computer Vision:
MediaPipe Face Detection
MediaPipe Face Mesh

Browser APIs Used:
WebRTC (getUserMedia)
Page Visibility API
Clipboard Event Listeners

🏗️ System Architecture

The project follows a modular client-side AI monitoring architecture where each behaviour detection capability is implemented as an independent module.

🔹 Monitoring Workflow

Candidate clicks Start Interview

Webcam stream initializes using WebRTC

Monitoring state becomes active

AI detection modules start processing video frames

Behaviour modules generate violation events

Violation engine evaluates rule thresholds

Dashboard updates system status in real-time

🔹 Detection Pipeline
User → Browser UI → Webcam Stream → Frame Processing
     → Behaviour Detection Modules → Violation Engine
     → Real-Time Dashboard Alerts
🔹 Design Principles

Modular and scalable detection structure

Real-time browser-side AI inference

Event-driven behaviour monitoring

Rule-based decision engine

Clean separation of UI and detection logic

📁 Project Folder Structure
AI-Interview-Monitoring-System
│
├── index.html
├── style.css
│
├── modules
│   ├── webcam.js
│   ├── faceDetection.js
│   ├── eyeTracking.js
│   ├── lipMovement.js
│   ├── tabMonitor.js
│   ├── clipboardBlocker.js
│   └── violationEngine.js
│
└── README.md
⚙️ Behaviour Detection Strategy
👥 Multiple Face Detection

Uses MediaPipe Face Detection model to estimate number of visible faces.
A violation event is triggered if more than one face appears in the frame.

👀 Eye Gaze Tracking

Uses Face Mesh landmark-based gaze estimation by measuring relative iris displacement and temporal smoothing across consecutive frames.
Violation is triggered if the candidate looks away continuously for more than 5 seconds.

🗣️ Lip Movement Monitoring

Tracks variation in vertical lip landmark distance over time.
Continuous oscillation beyond defined threshold for 10 seconds is treated as potential speaking behaviour.

🔁 Tab Switching Detection

Uses visibilitychange and window blur browser events.
Violation is triggered when candidate switches tab, minimizes browser, or navigates away.

📋 Clipboard Activity Blocking

Prevents copy, paste, cut, and context-menu actions to discourage unfair assistance.

⚠️ Violation Rule Engine
Violation Count	System Action
1 – 2	Warning
3 – 4	Alert
5+	Interview Terminated
⚡ Performance Considerations

Runs entirely on client device (no network inference delay)

Average frame processing latency ~20–30 ms

Optimized for Chromium-based browsers

Works best under adequate lighting conditions

Performance depends on camera resolution and CPU capability

⚠️ Current Limitations

Eye gaze estimation accuracy may drop in low-light environments

Lip detection sensitive to camera positioning and resolution

No identity verification or face recognition mechanism

Behaviour rules are heuristic-based (not ML-trained classifiers)

No persistent backend violation logging

💼 Potential Real-World Use Cases

Remote hiring and coding interview platforms

Online certification and examination systems

EdTech proctoring solutions

Corporate remote assessment workflows

▶️ How to Run Locally

Clone repository

git clone https://github.com/PrashantGupta77/AI-Powered-Interview-Monitoring-System

Open project folder

Launch index.html in browser

Click Start Interview

Allow webcam permission

🔮 Product Roadmap (Future Improvements)

Head pose estimation module

Mobile phone / object detection

Audio anomaly detection

Backend violation logging API

Behaviour analytics dashboard

ML-based behavioural classification

👨‍💻 Author

Prashant Gupta
AI / Machine Learning Engineer (Aspiring)