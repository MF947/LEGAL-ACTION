/* =================================
   PAGE 6 — TEACHERS' DAY
================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const button =
            document.querySelector(
                ".continue-button"
            );


        /*
           Small interaction when the
           final button is clicked.
        */

        button.addEventListener(
            "click",
            () => {

                button.textContent =
                    "OPENING FINAL PAGE...";

            }
        );


        /*
           Add a gentle floating effect
           to the decorative symbols.
        */

        const decorations =
            document.querySelectorAll(
                ".decor"
            );


        decorations.forEach(
            (item, index) => {

                item.style.animationDelay =
                    `${index * 0.7}s`;

            }
        );

    }
);