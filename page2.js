function openComplaint() {

    const message = document.getElementById("message");
    const button = document.querySelector("button");

    button.disabled = true;

    button.textContent = "ACCESSING CASE FILE...";

    message.textContent = "Verifying authorization...";

    setTimeout(() => {

        message.textContent = "Complaint retrieved successfully.";

    }, 800);

    setTimeout(() => {

        window.location.href = "page3.html";

    }, 1800);
}