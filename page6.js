/* =================================
   PAGE 6 — TEACHERS' DAY
================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* ================================
           PAGE 6 BACKGROUND MUSIC
        ================================= */

        const music =
            document.getElementById("page6Music");

        if (music) {

            music.volume = 0.35;

            music.play().catch(() => {

                console.log(
                    "Page 6 music playback was blocked."
                );

            });

        }


        /* ================================
           CONTINUE BUTTON
        ================================= */

        const button =
            document.querySelector(
                ".continue-button"
            );


        /*
           Small interaction when the
           final button is clicked.
        */

        if (button) {

            button.addEventListener(
                "click",
                () => {

                    button.textContent =
                        "OPENING FINAL PAGE...";

                }
            );

        }


        /* ================================
           DECORATIONS
        ================================= */

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
