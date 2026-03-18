let tabViolationCoolDown = false;

document.addEventListener("visibilitychange", function () {

    if (document.hidden && !tabViolationCoolDown) {

        addViolation("Tab Switch Detected");

        tabViolationCoolDown = true;

        setTimeout(() => {
            tabViolationCoolDown = false;
        }, 3000);
    }

});