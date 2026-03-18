function blockClipboardEvents() {

    document.addEventListener("copy", function (e) {
        e.preventDefault();
        addViolation("Copy Attempt Detected");
    });

    document.addEventListener("paste", function (e) {
        e.preventDefault();
        addViolation("Paste Attempt Detected");
    });

    document.addEventListener("cut", function (e) {
        e.preventDefault();
        addViolation("Cut Attempt Detected");
    });

    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        addViolation("Right Click Blocked");
    });

    document.addEventListener("selectstart", function (e) {
        e.preventDefault();
    });

}