/* =================================
   PAGE 7 — THE FINAL QUESTION
================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const yesButton =
            document.getElementById("yesButton");

        const noButton =
            document.getElementById("noButton");

        const questionScreen =
            document.getElementById("questionScreen");

        const successScreen =
            document.getElementById("successScreen");

        const escapeMessage =
            document.getElementById("escapeMessage");

        const buttonsArea =
            document.querySelector(".buttons-area");


        /* =================================
           VARIABLES
        ================================= */

        let yesSize = 1;

        let escapeCount = 0;


        const messages = [

            "Choose wisely...",

            "Are you sure?",

            "The NO button seems nervous...",

            "Hmm... NO is trying to escape.",

            "You really want to press NO?",

            "That button is getting suspicious...",

            "NO has left the building.",

            "Maybe YES is the better option."

        ];


        /* =================================
           NO BUTTON ESCAPES
        ================================= */

        noButton.addEventListener(
            "mouseenter",
            escapeNo
        );


        noButton.addEventListener(
            "touchstart",
            (event) => {

                event.preventDefault();

                escapeNo();

            },
            { passive: false }
        );


        noButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                escapeNo();

            }
        );


        function escapeNo() {

            escapeCount++;


            /* -----------------------------
               MAKE YES BIGGER
            ----------------------------- */

            yesSize += 0.18;


            const newWidth =
                Math.min(
                    360,
                    130 * yesSize
                );


            const newHeight =
                Math.min(
                    150,
                    58 * yesSize
                );


            const newFont =
                Math.min(
                    38,
                    16 * yesSize
                );


            yesButton.style.width =
                newWidth + "px";


            yesButton.style.height =
                newHeight + "px";


            yesButton.style.fontSize =
                newFont + "px";


            yesButton.style.transform =
                "scale(1.02)";


            setTimeout(
                () => {

                    yesButton.style.transform =
                        "scale(1)";

                },
                150
            );


            /* -----------------------------
               MOVE NO BUTTON
            ----------------------------- */

            const areaWidth =
                buttonsArea.clientWidth;

            const areaHeight =
                buttonsArea.clientHeight;


            const buttonWidth =
                noButton.offsetWidth;

            const buttonHeight =
                noButton.offsetHeight;


            const maxX =
                Math.max(
                    10,
                    areaWidth - buttonWidth - 10
                );


            const maxY =
                Math.max(
                    10,
                    areaHeight - buttonHeight - 10
                );


            const randomX =
                Math.random() * maxX
                - areaWidth / 2
                + buttonWidth / 2;


            const randomY =
                Math.random() * maxY
                - areaHeight / 2
                + buttonHeight / 2;


            noButton.style.position =
                "absolute";


            noButton.style.left =
                "50%";


            noButton.style.top =
                "50%";


            noButton.style.transform =
                `translate(
                    calc(-50% + ${randomX}px),
                    calc(-50% + ${randomY}px)
                )
                rotate(${Math.random() * 20 - 10}deg)`;


            /* -----------------------------
               CHANGE MESSAGE
            ----------------------------- */

            const index =
                Math.min(
                    escapeCount,
                    messages.length - 1
                );


            escapeMessage.textContent =
                messages[index];


            /* -----------------------------
               AFTER MANY ATTEMPTS
            ----------------------------- */

            if (escapeCount >= 7) {

                escapeMessage.textContent =
                    "At this point, YES is clearly winning.";

            }

        }


        /* =================================
           YES BUTTON
        ================================= */

        yesButton.addEventListener(
            "click",
            showSuccess
        );


        function showSuccess() {

            questionScreen.style.display =
                "none";


            successScreen.style.display =
                "flex";


            createConfetti();

        }


        /* =================================
           CONFETTI
        ================================= */

        function createConfetti() {

            const container =
                document.getElementById(
                    "confetti"
                );


            const pieces = 70;


            for (
                let i = 0;
                i < pieces;
                i++
            ) {

                const piece =
                    document.createElement(
                        "div"
                    );


                piece.className =
                    "confetti-piece";


                piece.style.left =
                    Math.random() * 100 + "%";


                piece.style.animationDelay =
                    Math.random() * 1.5 + "s";


                piece.style.transform =
                    `rotate(
                        ${Math.random() * 360}deg
                    )`;


                const colors = [

                    "#ff719a",
                    "#ffc857",
                    "#8f81ff",
                    "#68c9ff",
                    "#ff9f68",
                    "#79d6a3"

                ];


                piece.style.background =
                    colors[
                        Math.floor(
                            Math.random()
                            * colors.length
                        )
                    ];


                container.appendChild(
                    piece
                );

            }

        }

    }
);