let analysisComplete = false;
let processingStarted = false;


/* ================================
   KNOWLEDGE PERCENTAGE
================================ */

function startKnowledgeStopwatch() {

    setInterval(() => {

        const value =
            Math.floor(50 + Math.random() * 49);

        document.getElementById(
            "knowledgePercent"
        ).textContent = value;

    }, 55);

}


/* ================================
   CULPRIT ANALYSIS
================================ */

function startCulpritAnalysis() {

    const duration = 6000;

    const startTime = Date.now();


    function analyze() {

        const elapsed =
            Date.now() - startTime;

        const progress =
            Math.min(elapsed / duration, 1);


        /* =========================
           PATIENCE
        ========================= */

        const patience =
            Math.floor(
                60 +
                Math.sin(progress * 15) * 3
            );

        const patienceValue =
            Math.max(1, Math.min(63, patience));


        document.getElementById(
            "patiencePercent"
        ).textContent = patienceValue;


        document.getElementById(
            "patienceMeter"
        ).style.width =
            patienceValue + "%";


        /* =========================
           ANALYSIS FINISHED
        ========================= */

        if (progress < 1) {

            requestAnimationFrame(analyze);

        } else {

            finishCulpritAnalysis();

        }

    }


    analyze();

}


/* ================================
   ANALYSIS COMPLETE
================================ */

function finishCulpritAnalysis() {

    analysisComplete = true;


    const button =
        document.getElementById(
            "punishmentButton"
        );


    const message =
        document.getElementById(
            "processingMessage"
        );


    button.disabled = false;

    button.textContent =
        "READY FOR PUNISHMENT →";


    message.textContent =
        "Culprit analysis complete.";

}


/* ================================
   START 8 SECOND PROCESSING
================================ */

function startFinalProcessing() {

    if (!analysisComplete || processingStarted) {
        return;
    }


    processingStarted = true;


    const button =
        document.getElementById(
            "punishmentButton"
        );


    const processingArea =
        document.getElementById(
            "processingArea"
        );


    const processingText =
        document.getElementById(
            "processingText"
        );


    const progress =
        document.getElementById(
            "progress"
        );


    const progressText =
        document.getElementById(
            "progressText"
        );


    const message =
        document.getElementById(
            "processingMessage"
        );


    /* Hide button */

    button.style.display = "none";

    processingArea.style.display = "block";

    message.textContent =
        "FINAL PROCESSING INITIATED...";


    const duration = 8000;

    const startTime = Date.now();


    function processCase() {

        const elapsed =
            Date.now() - startTime;


        const percent =
            Math.min(
                100,
                Math.floor(
                    (elapsed / duration) * 100
                )
            );


        progress.style.width =
            percent + "%";


        progressText.textContent =
            percent + "%";


        /* =========================
           CHANGING MESSAGES
        ========================= */

        if (percent < 20) {

            processingText.textContent =
                "VERIFYING FINAL DECISION...";

        }

        else if (percent < 45) {

            processingText.textContent =
                "PROCESSING CASE FILE...";

        }

        else if (percent < 70) {

            processingText.textContent =
                "CALCULATING CONSEQUENCES...";

        }

        else if (percent < 100) {

            processingText.textContent =
                "READY FOR PUNISHMENT...";

        }

        else {

            /* =====================
               FINAL JOKE
            ===================== */

            processingText.textContent =
                "HA HA HA.....";


            progressText.textContent =
                "100%";


            setTimeout(() => {

                window.location.href =
                    "page5.html";

            }, 1000);


            return;

        }


        requestAnimationFrame(processCase);

    }


    processCase();

}


/* ================================
   PAGE LOAD
================================ */

window.addEventListener("load", () => {

    startCulpritAnalysis();

    startKnowledgeStopwatch(); 

   const music = document.getElementById("page4Music");

    if (
       music &&
       sessionStorage.getItem("startPage4Music") === "true") {

        music.volume = 0.35;

        music.play().catch(() => {
            console.log("Music playback was blocked by the browser.");
        });

        sessionStorage.removeItem("startPage4Music");
    }

});

});
