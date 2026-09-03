function checkTeacher() {

    const input = document.getElementById("teacherName");
    const message = document.getElementById("message");

    let name = input.value.trim().toLowerCase();

    // Remove spaces, apostrophes and other symbols
    let cleanName = name.replace(/[^a-z]/g, "");

    const allowedTeachers = [
        "sonam",
        "sonammaam",
        "sonammam",

        "ranjana",
        "ranjanamaam",
        "ranjanamam",

        "harsha",
        "harshamaam",
        "harshamam"
    ];

    if (allowedTeachers.includes(cleanName)) {

        message.style.color = "#7dffb2";
        message.textContent = "IDENTITY VERIFIED...";

        input.disabled = true;

        setTimeout(() => {

            // Page 2 will be created next
            window.location.href = "page2.html";

        }, 1200);

    } else {

        message.style.color = "#ff7272";

        message.textContent =
            "Hmm... that name wasn't expected here.";

        input.classList.add("shake");

        setTimeout(() => {
            input.classList.remove("shake");
        }, 400);
    }
}