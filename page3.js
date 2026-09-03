function continueProcess() {

    const button = document.querySelector("button");
    const status = document.getElementById("status");

    button.disabled = true;

    button.textContent = "VERIFYING...";

    status.textContent =
        "Authorization confirmed.";

    setTimeout(() => {

        button.textContent =
            "RETRIEVING CASE FILE...";

        status.textContent =
            "Connecting to review division...";

    }, 700);


    setTimeout(() => {

        window.location.href = "page4.html";

    }, 1800);
}