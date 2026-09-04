/* =========================================
   PAGE 5 BACKGROUND MUSIC
========================================= */

window.addEventListener("load", () => {

    const music =
        document.getElementById("page5Music");

    music.volume = 0.35;

    music.play().catch(() => {
        console.log(
            "Music playback was blocked by the browser."
        );
    });

});

/* =========================================
   PAGE 5
   3D PLEXUS / SETTLEMENT
========================================= */


/* =========================================
   CANVAS SETUP
========================================= */

const canvas = document.getElementById("plexusCanvas");
const ctx = canvas.getContext("2d");

const labelsContainer = document.getElementById("labels");

const processText = document.getElementById("processText");
const statusText = document.getElementById("statusText");
const settlementText = document.getElementById("settlementText");
const bottomMessage = document.getElementById("bottomMessage");


/* =========================================
   COLORS
========================================= */

const COLORS = [
    "#FFEDB9",
    "#FFCB56",
    "#FFA259",
    "#FF7E7E"
];


/* =========================================
   CANVAS SIZE
========================================= */

let width = 0;
let height = 0;
let centerX = 0;
let centerY = 0;

function resizeCanvas() {

    const rect = canvas.getBoundingClientRect();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = rect.width;
    height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    centerX = width / 2;
    centerY = height / 2;
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();


/* =========================================
   RANDOM ALPHANUMERIC LABEL
========================================= */

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";

function randomLabel() {

    let result = "";

    for (let i = 0; i < 3; i++) {

        if (Math.random() > 0.5) {
            result += letters[
                Math.floor(Math.random() * letters.length)
            ];
        } else {
            result += numbers[
                Math.floor(Math.random() * numbers.length)
            ];
        }
    }

    return result;
}


/* =========================================
   NODE CREATION
========================================= */

const NODE_COUNT = window.innerWidth < 600 ? 25 : 36;

const nodes = [];

for (let i = 0; i < NODE_COUNT; i++) {

    const angle = Math.random() * Math.PI * 2;

    const radius =
        80 +
        Math.random() *
        Math.min(width, height) *
        0.38;

    nodes.push({

        x: Math.cos(angle) * radius,

        y: Math.sin(angle) * radius,

        z: (Math.random() - 0.5) * 500,

        vx: (Math.random() - 0.5) * 0.18,

        vy: (Math.random() - 0.5) * 0.18,

        vz: (Math.random() - 0.5) * 0.5,

        size:
            1.5 +
            Math.random() * 2.3,

        color:
            COLORS[
                Math.floor(
                    Math.random() * COLORS.length
                )
            ],

        label: randomLabel(),

        labelElement: null,

        pulse: Math.random() * Math.PI * 2

    });
}


/* =========================================
   CREATE HTML LABELS
========================================= */

nodes.forEach((node) => {

    const label = document.createElement("div");

    label.className = "node-label";

    label.textContent = node.label;

    label.style.color = node.color;

    labelsContainer.appendChild(label);

    node.labelElement = label;
});


/* =========================================
   3D PROJECTION
========================================= */

function project(node) {

    const camera = 650;

    const scale =
        camera /
        (camera + node.z);

    return {

        x: centerX + node.x * scale,

        y: centerY + node.y * scale,

        scale: scale

    };
}


/* =========================================
   ROTATION
========================================= */

let rotationY = 0;
let rotationX = 0;

function rotateNode(node) {

    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);

    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);


    /* Rotate around Y */

    const x1 =
        node.x * cosY -
        node.z * sinY;

    const z1 =
        node.x * sinY +
        node.z * cosY;


    /* Rotate around X */

    const y2 =
        node.y * cosX -
        z1 * sinX;

    const z2 =
        node.y * sinX +
        z1 * cosX;


    return {
        x: x1,
        y: y2,
        z: z2
    };
}


/* =========================================
   UPDATE NODE POSITIONS
========================================= */

function updateNodes() {

    rotationY += 0.0025;
    rotationX += 0.0011;

    nodes.forEach((node) => {

        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        node.pulse += 0.035;


        const maxX =
            Math.min(width, height) * 0.48;

        const maxY =
            Math.min(width, height) * 0.40;

        const maxZ = 280;


        if (Math.abs(node.x) > maxX) {
            node.vx *= -1;
        }

        if (Math.abs(node.y) > maxY) {
            node.vy *= -1;
        }

        if (Math.abs(node.z) > maxZ) {
            node.vz *= -1;
        }
    });
}


/* =========================================
   DRAW CONNECTIONS
========================================= */

function drawConnections(projectedNodes) {

    for (let i = 0; i < nodes.length; i++) {

        for (let j = i + 1; j < nodes.length; j++) {

            const a = projectedNodes[i];
            const b = projectedNodes[j];

            const dx = a.x - b.x;
            const dy = a.y - b.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            const maxDistance =
                window.innerWidth < 600
                    ? 105
                    : 145;


            if (distance < maxDistance) {

                const opacity =
                    (1 - distance / maxDistance) *
                    0.42;

                const color =
                    nodes[i].color;


                ctx.beginPath();

                ctx.moveTo(
                    a.x,
                    a.y
                );

                ctx.lineTo(
                    b.x,
                    b.y
                );

                ctx.strokeStyle =
                    hexToRgba(
                        color,
                        opacity
                    );

                ctx.lineWidth =
                    0.6 +
                    a.scale * 0.5;

                ctx.stroke();
            }
        }
    }
}


/* =========================================
   DRAW NODES
========================================= */

function drawNodes(projectedNodes) {

    projectedNodes.forEach((point, index) => {

        const node = nodes[index];

        const pulse =
            1 +
            Math.sin(node.pulse) * 0.25;

        const radius =
            node.size *
            point.scale *
            pulse;


        ctx.beginPath();

        ctx.arc(
            point.x,
            point.y,
            radius + 3,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            hexToRgba(
                node.color,
                0.08
            );

        ctx.fill();


        ctx.beginPath();

        ctx.arc(
            point.x,
            point.y,
            radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            node.color;

        ctx.shadowColor =
            node.color;

        ctx.shadowBlur =
            10;

        ctx.fill();

        ctx.shadowBlur = 0;
    });
}


/* =========================================
   UPDATE LABELS
========================================= */

function updateLabels(projectedNodes) {

    projectedNodes.forEach((point, index) => {

        const node = nodes[index];

        const label = node.labelElement;

        const visible =
            point.scale > 0.5;


        label.style.left =
            point.x + "px";

        label.style.top =
            (point.y - 11 * point.scale) + "px";

        label.style.transform =
            `translate(-50%, -50%) scale(${Math.max(
                0.65,
                point.scale
            )})`;

        label.style.opacity =
            visible
                ? Math.min(
                    0.9,
                    point.scale
                )
                : 0;
    });
}


/* =========================================
   CHANGE LABELS WITH GRAPH MOTION
========================================= */

setInterval(() => {

    const amount =
        Math.floor(
            2 +
            Math.random() * 4
        );

    for (let i = 0; i < amount; i++) {

        const index =
            Math.floor(
                Math.random() * nodes.length
            );

        const node =
            nodes[index];

        node.label =
            randomLabel();

        node.color =
            COLORS[
                Math.floor(
                    Math.random() *
                    COLORS.length
                )
            ];

        node.labelElement.textContent =
            node.label;

        node.labelElement.style.color =
            node.color;
    }

}, 420);


/* =========================================
   HEX → RGBA
========================================= */

function hexToRgba(hex, alpha) {

    const r =
        parseInt(
            hex.substring(1, 3),
            16
        );

    const g =
        parseInt(
            hex.substring(3, 5),
            16
        );

    const b =
        parseInt(
            hex.substring(5, 7),
            16
        );

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


/* =========================================
   ANIMATION LOOP
========================================= */

function animate() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    updateNodes();


    const projectedNodes =
        nodes.map((node) => {

            const rotated =
                rotateNode(node);

            return project(rotated);

        });


    drawConnections(
        projectedNodes
    );

    drawNodes(
        projectedNodes
    );

    updateLabels(
        projectedNodes
    );


    requestAnimationFrame(
        animate
    );
}

animate();


/* =========================================
   SETTLEMENT SEQUENCE
========================================= */

const sequence = [

    {
        time: 0,
        text: "PROCEEDING",
        status: "ANALYZING",
        settlement: "IN PROGRESS",
        bottom: "SYNCHRONIZING NODES..."
    },

    {
        time: 1400,
        text: "PROCEEDING",
        status: "VERIFYING",
        settlement: "CALCULATING",
        bottom: "CROSS-REFERENCING DATA..."
    },

    {
        time: 2800,
        text: "PROCEEDING",
        status: "CONFIRMING",
        settlement: "NEAR COMPLETION",
        bottom: "FINALIZING SETTLEMENT..."
    },

    {
        time: 4200,
        text: "SETTLEMENT READY",
        status: "COMPLETE",
        settlement: "SETTLED",
        bottom: "REDIRECTING..."
    }

];


sequence.forEach((step) => {

    setTimeout(() => {

        processText.textContent =
            step.text;

        statusText.textContent =
            step.status;

        settlementText.textContent =
            step.settlement;

        bottomMessage.textContent =
            step.bottom;

    }, step.time);

});


/* =========================================
   MOVE TO PAGE 6
========================================= */

setTimeout(() => {

    window.location.href =
        "page6.html";

}, 5600);
