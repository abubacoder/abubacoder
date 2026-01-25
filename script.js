const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const points = [];
const POINTS = 220;
const RADIUS = 180;

for (let i = 0; i < POINTS; i++) {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);

  points.push({
    x: Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  });
}

let angle = 0;

function draw() {
  ctx.clearRect(0, 0, w, h);
  angle += 0.002;

  const cx = w / 2;
  const cy = h / 2;

  for (const p of points) {
    const x = p.x * Math.cos(angle) - p.z * Math.sin(angle);
    const z = p.x * Math.sin(angle) + p.z * Math.cos(angle);

    const scale = RADIUS / (RADIUS + z * 200);
    const px = cx + x * RADIUS * scale;
    const py = cy + p.y * RADIUS * scale;

    ctx.beginPath();
    ctx.arc(px, py, 1.5 * scale, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(88,166,255,${0.8 * scale})`;
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

draw();
