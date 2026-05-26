const canvas = document.querySelector("#opticsCanvas");
const ctx = canvas.getContext("2d");
const slider = document.querySelector("#focalSlider");
const focalValue = document.querySelector("#focalValue");
const heroFocal = document.querySelector("#heroFocal");
const imageDistance = document.querySelector("#imageDistance");
document.querySelector("#year").textContent = new Date().getFullYear();

const state = { focal: Number(slider.value), objectDistance: 330, lensX: 610, axisY: 310, scatterSeed: 7 };
const mm = (value) => `${Math.round(value)} mm`;

function drawLine(x1, y1, x2, y2, color, width = 2, glow = 0) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = "round"; ctx.shadowColor = color; ctx.shadowBlur = glow;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore();
}
function drawArrow(x1, y1, x2, y2, color) {
  drawLine(x1, y1, x2, y2, color, 2.4, 8);
  const angle = Math.atan2(y2 - y1, x2 - x1); const size = 9;
  ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - size * Math.cos(angle - Math.PI / 7), y2 - size * Math.sin(angle - Math.PI / 7));
  ctx.lineTo(x2 - size * Math.cos(angle + Math.PI / 7), y2 - size * Math.sin(angle + Math.PI / 7));
  ctx.closePath(); ctx.fill(); ctx.restore();
}
function drawLabel(text, x, y, color = "#edf6ff") {
  ctx.save(); ctx.font = "600 17px Inter"; ctx.fillStyle = color; ctx.fillText(text, x, y); ctx.restore();
}
function drawLens() {
  const { lensX, axisY } = state; const height = 390; const top = axisY - height / 2; const bottom = axisY + height / 2;
  const gradient = ctx.createLinearGradient(lensX - 35, 0, lensX + 35, 0);
  gradient.addColorStop(0, "rgba(98, 215, 255, .12)"); gradient.addColorStop(.5, "rgba(178, 231, 255, .46)"); gradient.addColorStop(1, "rgba(98, 215, 255, .12)");
  ctx.save(); ctx.fillStyle = gradient; ctx.strokeStyle = "rgba(150, 226, 255, .8)"; ctx.lineWidth = 2; ctx.shadowColor = "#62d7ff"; ctx.shadowBlur = 20;
  ctx.beginPath(); ctx.moveTo(lensX, top); ctx.bezierCurveTo(lensX + 58, axisY - 120, lensX + 58, axisY + 120, lensX, bottom); ctx.bezierCurveTo(lensX - 58, axisY + 120, lensX - 58, axisY - 120, lensX, top); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
  drawLabel("凸透镜", lensX - 30, bottom + 32, "#9fdcff");
}
function drawScatterAlong(x1, y1, x2, y2, amount) {
  let seed = state.scatterSeed; const random = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  ctx.save();
  for (let i = 0; i < amount; i += 1) {
    const t = random(); const x = x1 + (x2 - x1) * t + (random() - .5) * 18; const y = y1 + (y2 - y1) * t + (random() - .5) * 18; const radius = 1 + random() * 2.2;
    ctx.fillStyle = `rgba(255, 223, 128, ${0.25 + random() * 0.42})`; ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}
function drawObjectAndImage(imageX, imageHeight) {
  const objectX = state.lensX - state.objectDistance; const objectHeight = 145;
  drawArrow(objectX, state.axisY, objectX, state.axisY - objectHeight, "#8ef6c7"); drawLabel("物体", objectX - 18, state.axisY - objectHeight - 18, "#8ef6c7");
  drawArrow(imageX, state.axisY, imageX, state.axisY + Math.abs(imageHeight), "#a78bfa"); drawLabel("倒立实像", imageX - 34, state.axisY + Math.abs(imageHeight) + 28, "#c4b5fd");
}
function drawScene() {
  const width = canvas.width; const height = canvas.height; const { focal, lensX, axisY, objectDistance } = state;
  const objectX = lensX - objectDistance; const objectTop = axisY - 145; const rightFocusX = lensX + focal; const leftFocusX = lensX - focal;
  const imageDistanceValue = 1 / (1 / focal - 1 / objectDistance); const imageX = lensX + imageDistanceValue; const imageHeight = 145 * imageDistanceValue / objectDistance;
  ctx.clearRect(0, 0, width, height);
  const bg = ctx.createRadialGradient(lensX, axisY, 20, lensX, axisY, 560); bg.addColorStop(0, "rgba(98, 215, 255, .13)"); bg.addColorStop(1, "rgba(7, 11, 22, .12)"); ctx.fillStyle = bg; ctx.fillRect(0, 0, width, height);
  for (let x = 60; x < width; x += 70) drawLine(x, 60, x, height - 60, "rgba(98,215,255,.055)", 1);
  for (let y = 70; y < height; y += 70) drawLine(50, y, width - 50, y, "rgba(98,215,255,.055)", 1);
  drawLine(70, axisY, width - 70, axisY, "rgba(98, 215, 255, .8)", 1.7, 5); drawLabel("主光轴", 82, axisY - 14, "#9fdcff");
  drawLens(); drawObjectAndImage(imageX, imageHeight);
  [leftFocusX, rightFocusX].forEach((x, index) => { ctx.save(); ctx.fillStyle = "#ffd166"; ctx.shadowColor = "#ffd166"; ctx.shadowBlur = 16; ctx.beginPath(); ctx.arc(x, axisY, 5.5, 0, Math.PI * 2); ctx.fill(); ctx.restore(); drawLabel(index === 0 ? "F" : "F'", x - 9, axisY + 28, "#ffd166"); });
  drawLine(lensX, axisY - 205, lensX, axisY + 205, "rgba(255,255,255,.18)", 1.2);
  drawLine(leftFocusX, axisY - 16, leftFocusX, axisY + 16, "rgba(255,209,102,.5)", 1); drawLine(rightFocusX, axisY - 16, rightFocusX, axisY + 16, "rgba(255,209,102,.5)", 1);
  const rayColor = "#ffd166"; const exitX = Math.min(width - 90, imageX);
  drawArrow(95, objectTop, lensX, objectTop, rayColor); const ray1Y = axisY + (exitX - lensX) * ((axisY - objectTop) / focal); drawArrow(lensX, objectTop, exitX, ray1Y, rayColor); drawScatterAlong(95, objectTop, lensX, objectTop, 32); drawScatterAlong(lensX, objectTop, exitX, ray1Y, 32);
  const centerEndY = axisY + (width - 90 - lensX) * ((axisY - objectTop) / (lensX - objectX)); drawArrow(objectX, objectTop, width - 90, centerEndY, "#fff2a8"); drawScatterAlong(objectX, objectTop, width - 90, centerEndY, 30);
  const slopeToLeftFocus = (axisY - objectTop) / (leftFocusX - objectX); const yAtLens = objectTop + (lensX - objectX) * slopeToLeftFocus; drawArrow(objectX, objectTop, lensX, yAtLens, "#fbbf24"); drawArrow(lensX, yAtLens, width - 90, yAtLens, "#fbbf24"); drawScatterAlong(objectX, objectTop, lensX, yAtLens, 22); drawScatterAlong(lensX, yAtLens, width - 90, yAtLens, 24);
  drawLine(imageX, axisY - Math.abs(imageHeight) - 18, imageX, axisY + Math.abs(imageHeight) + 18, "rgba(167,139,250,.38)", 1.4, 4);
  drawLine(lensX, axisY + 185, rightFocusX, axisY + 185, "rgba(255,209,102,.65)", 2); drawLabel(`f = ${mm(focal)}`, lensX + focal / 2 - 34, axisY + 215, "#ffd166");
  drawLine(lensX, axisY + 230, imageX, axisY + 230, "rgba(167,139,250,.55)", 2); drawLabel(`v ≈ ${mm(imageDistanceValue)}`, lensX + imageDistanceValue / 2 - 42, axisY + 260, "#c4b5fd");
  focalValue.textContent = mm(focal); heroFocal.textContent = mm(focal); imageDistance.textContent = mm(imageDistanceValue);
}
slider.addEventListener("input", (event) => { state.focal = Number(event.target.value); drawScene(); });
drawScene();
