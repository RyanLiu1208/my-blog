const canvas = document.querySelector("#opticsCanvas");
const ctx = canvas.getContext("2d");

const lensTitle = document.querySelector("#lensTitle");
const lensDesc = document.querySelector("#lensDesc");
const focalSlider = document.querySelector("#focalSlider");
const focalValue = document.querySelector("#focalValue");
const objectDistanceSlider = document.querySelector("#objectDistanceSlider");
const objectDistanceValue = document.querySelector("#objectDistanceValue");
const objectHeightSlider = document.querySelector("#objectHeightSlider");
const objectHeightValue = document.querySelector("#objectHeightValue");
const imageDistance = document.querySelector("#imageDistance");
const magnification = document.querySelector("#magnification");
const scatterDensitySlider = document.querySelector("#scatterDensitySlider");
const scatterDensityValue = document.querySelector("#scatterDensityValue");
const showGrid = document.querySelector("#showGrid");
const showLabels = document.querySelector("#showLabels");
const showScatter = document.querySelector("#showScatter");
const typeButtons = document.querySelectorAll(".type-btn");

document.querySelector("#year").textContent = new Date().getFullYear();

const state = {
  type: "convex-lens",
  focal: Number(focalSlider.value),
  objectDistance: Number(objectDistanceSlider.value),
  objectHeight: Number(objectHeightSlider.value),
  lensX: 610,
  axisY: 310,
  scatterSeed: 7,
  scatterDensity: Number(scatterDensitySlider.value)
};

const lensInfo = {
  "convex-lens": { title: "凸透镜光路模拟", desc: "凸透镜汇聚光线，可形成实像或虚像。拖动控制条观察变化。" },
  "concave-lens": { title: "凹透镜光路模拟", desc: "凹透镜发散光线，总是形成正立缩小的虚像。" },
  "convex-mirror": { title: "凸面镜光路模拟", desc: "凸面镜发散光线，形成正立缩小的虚像，常用于后视镜。" },
  "concave-mirror": { title: "凹面镜光路模拟", desc: "凹面镜汇聚光线，可形成实像或虚像，常用于望远镜。" }
};

const mm = (value) => `${Math.round(value)} mm`;
const px = (value) => `${Math.round(value)} px`;
const formatMagnification = (m) => {
  if (Math.abs(m) < 0.001) return "—";
  const sign = m < 0 ? "-" : "+";
  return `${sign}${Math.abs(m).toFixed(2)}×`;
};

function drawLine(x1, y1, x2, y2, color, width = 2, glow = 0) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.shadowColor = color;
  ctx.shadowBlur = glow;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

function drawArrow(x1, y1, x2, y2, color) {
  drawLine(x1, y1, x2, y2, color, 2.4, 8);
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - size * Math.cos(angle - Math.PI / 7), y2 - size * Math.sin(angle - Math.PI / 7));
  ctx.lineTo(x2 - size * Math.cos(angle + Math.PI / 7), y2 - size * Math.sin(angle + Math.PI / 7));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawLabel(text, x, y, color = "#edf6ff") {
  if (!showLabels.checked) return;
  ctx.save();
  ctx.font = "600 17px Inter";
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawConvexLens() {
  const { lensX, axisY } = state;
  const height = 390;
  const top = axisY - height / 2;
  const bottom = axisY + height / 2;
  const gradient = ctx.createLinearGradient(lensX - 35, 0, lensX + 35, 0);
  gradient.addColorStop(0, "rgba(98, 215, 255, .12)");
  gradient.addColorStop(.5, "rgba(178, 231, 255, .46)");
  gradient.addColorStop(1, "rgba(98, 215, 255, .12)");
  ctx.save();
  ctx.fillStyle = gradient;
  ctx.strokeStyle = "rgba(150, 226, 255, .8)";
  ctx.lineWidth = 2;
  ctx.shadowColor = "#62d7ff";
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.moveTo(lensX, top);
  ctx.bezierCurveTo(lensX + 58, axisY - 120, lensX + 58, axisY + 120, lensX, bottom);
  ctx.bezierCurveTo(lensX - 58, axisY + 120, lensX - 58, axisY - 120, lensX, top);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  drawLabel("凸透镜", lensX - 30, bottom + 32, "#9fdcff");
}

function drawConcaveLens() {
  const { lensX, axisY } = state;
  const height = 390;
  const top = axisY - height / 2;
  const bottom = axisY + height / 2;
  const gradient = ctx.createLinearGradient(lensX - 35, 0, lensX + 35, 0);
  gradient.addColorStop(0, "rgba(167, 139, 250, .12)");
  gradient.addColorStop(.5, "rgba(192, 178, 254, .46)");
  gradient.addColorStop(1, "rgba(167, 139, 250, .12)");
  ctx.save();
  ctx.fillStyle = gradient;
  ctx.strokeStyle = "rgba(192, 178, 254, .8)";
  ctx.lineWidth = 2;
  ctx.shadowColor = "#a78bfa";
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.moveTo(lensX, top);
  ctx.bezierCurveTo(lensX - 58, axisY - 120, lensX - 58, axisY + 120, lensX, bottom);
  ctx.bezierCurveTo(lensX + 58, axisY + 120, lensX + 58, axisY - 120, lensX, top);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  drawLabel("凹透镜", lensX - 30, bottom + 32, "#c4b5fd");
}

function drawConvexMirror() {
  const { lensX, axisY } = state;
  const height = 390;
  const top = axisY - height / 2;
  const bottom = axisY + height / 2;
  const gradient = ctx.createLinearGradient(lensX - 35, 0, lensX + 35, 0);
  gradient.addColorStop(0, "rgba(251, 146, 60, .12)");
  gradient.addColorStop(.5, "rgba(253, 186, 116, .46)");
  gradient.addColorStop(1, "rgba(251, 146, 60, .12)");
  ctx.save();
  ctx.fillStyle = gradient;
  ctx.strokeStyle = "rgba(253, 186, 116, .8)";
  ctx.lineWidth = 2;
  ctx.shadowColor = "#fb923c";
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.moveTo(lensX, top);
  ctx.bezierCurveTo(lensX - 80, axisY - 150, lensX - 80, axisY + 150, lensX, bottom);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  drawLabel("凸面镜", lensX - 30, bottom + 32, "#fdba74");
}

function drawConcaveMirror() {
  const { lensX, axisY } = state;
  const height = 390;
  const top = axisY - height / 2;
  const bottom = axisY + height / 2;
  const gradient = ctx.createLinearGradient(lensX - 35, 0, lensX + 35, 0);
  gradient.addColorStop(0, "rgba(142, 246, 199, .12)");
  gradient.addColorStop(.5, "rgba(167, 250, 215, .46)");
  gradient.addColorStop(1, "rgba(142, 246, 199, .12)");
  ctx.save();
  ctx.fillStyle = gradient;
  ctx.strokeStyle = "rgba(167, 250, 215, .8)";
  ctx.lineWidth = 2;
  ctx.shadowColor = "#8ef6c7";
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.moveTo(lensX, top);
  ctx.bezierCurveTo(lensX + 80, axisY - 150, lensX + 80, axisY + 150, lensX, bottom);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  drawLabel("凹面镜", lensX - 30, bottom + 32, "#a7ffd5");
}

function drawScatterAlong(x1, y1, x2, y2, amount) {
  if (!showScatter.checked) return;
  let seed = state.scatterSeed;
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  ctx.save();
  for (let i = 0; i < amount; i += 1) {
    const t = random();
    const x = x1 + (x2 - x1) * t + (random() - .5) * 18;
    const y = y1 + (y2 - y1) * t + (random() - .5) * 18;
    const radius = 1 + random() * 2.2;
    ctx.fillStyle = `rgba(255, 223, 128, ${0.25 + random() * 0.42})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawObject(x, height) {
  const { axisY } = state;
  drawArrow(x, axisY, x, axisY - height, "#8ef6c7");
  drawLabel("物体", x - 18, axisY - height - 18, "#8ef6c7");
}

function drawImage(imageX, imageHeight, isVirtual = false) {
  const { axisY } = state;
  const color = isVirtual ? "#fca5a5" : "#a78bfa";
  const label = isVirtual ? "虚像" : "实像";
  const direction = imageHeight < 0 ? -1 : 1;
  drawArrow(imageX, axisY, imageX, axisY + Math.abs(imageHeight) * direction, color);
  drawLabel(label, imageX - 20, axisY + Math.abs(imageHeight) * direction + (direction > 0 ? 28 : -30), color);
}

function drawConvexLensScene() {
  const width = canvas.width;
  const height = canvas.height;
  const { focal, lensX, axisY, objectDistance, objectHeight, scatterDensity } = state;
  const objectX = lensX - objectDistance;
  const objectTop = axisY - objectHeight;
  const rightFocusX = lensX + focal;
  const leftFocusX = lensX - focal;

  let imageDistanceValue, imageX, imageHeight;
  if (objectDistance > focal) {
    imageDistanceValue = 1 / (1 / focal - 1 / objectDistance);
    imageX = lensX + imageDistanceValue;
    imageHeight = -objectHeight * imageDistanceValue / objectDistance;
  } else {
    imageDistanceValue = -1 / (1 / objectDistance - 1 / focal);
    imageX = lensX + imageDistanceValue;
    imageHeight = objectHeight * Math.abs(imageDistanceValue) / objectDistance;
  }

  ctx.clearRect(0, 0, width, height);
  
  const bg = ctx.createRadialGradient(lensX, axisY, 20, lensX, axisY, 560);
  bg.addColorStop(0, "rgba(98, 215, 255, .13)");
  bg.addColorStop(1, "rgba(7, 11, 22, .12)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  if (showGrid.checked) {
    for (let x = 60; x < width; x += 70) drawLine(x, 60, x, height - 60, "rgba(98,215,255,.055)", 1);
    for (let y = 70; y < height; y += 70) drawLine(50, y, width - 50, y, "rgba(98,215,255,.055)", 1);
  }

  drawLine(70, axisY, width - 70, axisY, "rgba(98, 215, 255, .8)", 1.7, 5);
  drawLabel("主光轴", 82, axisY - 14, "#9fdcff");

  drawConvexLens();
  drawObject(objectX, objectHeight);

  [leftFocusX, rightFocusX].forEach((x, index) => {
    ctx.save();
    ctx.fillStyle = "#ffd166";
    ctx.shadowColor = "#ffd166";
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(x, axisY, 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    drawLabel(index === 0 ? "F" : "F'", x - 9, axisY + 28, "#ffd166");
  });

  drawLine(lensX, axisY - 205, lensX, axisY + 205, "rgba(255,255,255,.18)", 1.2);
  drawLine(leftFocusX, axisY - 16, leftFocusX, axisY + 16, "rgba(255,209,102,.5)", 1);
  drawLine(rightFocusX, axisY - 16, rightFocusX, axisY + 16, "rgba(255,209,102,.5)", 1);

  const rayColor = "#ffd166";
  
  if (objectDistance > focal) {
    const exitX = Math.min(width - 90, imageX);
    drawArrow(95, objectTop, lensX, objectTop, rayColor);
    const ray1Y = axisY + (exitX - lensX) * ((axisY - objectTop) / focal);
    drawArrow(lensX, objectTop, exitX, ray1Y, rayColor);
    drawScatterAlong(95, objectTop, lensX, objectTop, scatterDensity);
    drawScatterAlong(lensX, objectTop, exitX, ray1Y, scatterDensity);
  } else {
    drawArrow(95, objectTop, lensX, objectTop, rayColor);
    const ray1Y = axisY - (lensX - 95) * ((axisY - objectTop) / focal);
    drawArrow(lensX, objectTop, 95, ray1Y, rayColor);
    drawScatterAlong(95, objectTop, lensX, objectTop, scatterDensity);
    drawScatterAlong(lensX, objectTop, 95, ray1Y, scatterDensity);
  }

  const centerEndY = axisY + (width - 90 - lensX) * ((axisY - objectTop) / (lensX - objectX));
  drawArrow(objectX, objectTop, width - 90, centerEndY, "#fff2a8");
  drawScatterAlong(objectX, objectTop, width - 90, centerEndY, scatterDensity - 5);

  if (objectDistance > focal) {
    const slopeToLeftFocus = (axisY - objectTop) / (leftFocusX - objectX);
    const yAtLens = objectTop + (lensX - objectX) * slopeToLeftFocus;
    drawArrow(objectX, objectTop, lensX, yAtLens, "#fbbf24");
    drawArrow(lensX, yAtLens, width - 90, yAtLens, "#fbbf24");
    drawScatterAlong(objectX, objectTop, lensX, yAtLens, scatterDensity - 8);
    drawScatterAlong(lensX, yAtLens, width - 90, yAtLens, scatterDensity - 5);
  } else {
    const virtualFocusX = lensX - focal;
    const slopeToVirtualFocus = (axisY - objectTop) / (virtualFocusX - lensX);
    const extendY = objectTop + (lensX - objectX) * slopeToVirtualFocus;
    drawLine(lensX, extendY, virtualFocusX, axisY, "rgba(255, 191, 36, .4)");
    drawArrow(objectX, objectTop, lensX, extendY, "#fbbf24");
    drawArrow(lensX, extendY, 95, extendY, "#fbbf24");
    drawScatterAlong(objectX, objectTop, lensX, extendY, scatterDensity - 8);
  }

  const isVirtual = objectDistance <= focal;
  drawImage(imageX, imageHeight, isVirtual);
  if (!isVirtual) {
    drawLine(imageX, axisY - Math.abs(imageHeight) - 18, imageX, axisY + Math.abs(imageHeight) + 18, "rgba(167,139,250,.38)", 1.4, 4);
  } else {
    drawLine(imageX, axisY - imageHeight - 18, imageX, axisY + imageHeight + 18, "rgba(252,165,165,.38)", 1.4, 4);
  }

  drawLine(lensX, axisY + 185, rightFocusX, axisY + 185, "rgba(255,209,102,.65)", 2);
  drawLabel(`f = ${mm(focal)}`, lensX + focal / 2 - 34, axisY + 215, "#ffd166");
  
  if (!isVirtual) {
    drawLine(lensX, axisY + 230, imageX, axisY + 230, "rgba(167,139,250,.55)", 2);
    drawLabel(`v = ${mm(imageDistanceValue)}`, lensX + imageDistanceValue / 2 - 42, axisY + 260, "#c4b5fd");
  }

  focalValue.textContent = mm(focal);
  objectDistanceValue.textContent = mm(objectDistance);
  objectHeightValue.textContent = px(objectHeight);
  imageDistance.textContent = isVirtual ? `虚 ${mm(Math.abs(imageDistanceValue))}` : mm(imageDistanceValue);
  magnification.textContent = formatMagnification(imageHeight / objectHeight);
}

function drawConcaveLensScene() {
  const width = canvas.width;
  const height = canvas.height;
  const { focal, lensX, axisY, objectDistance, objectHeight, scatterDensity } = state;
  const objectX = lensX - objectDistance;
  const objectTop = axisY - objectHeight;
  const rightFocusX = lensX + focal;
  const leftFocusX = lensX - focal;

  const imageDistanceValue = -1 / (1 / focal + 1 / objectDistance);
  const imageX = lensX + imageDistanceValue;
  const imageHeight = objectHeight * Math.abs(imageDistanceValue) / objectDistance;

  ctx.clearRect(0, 0, width, height);
  
  const bg = ctx.createRadialGradient(lensX, axisY, 20, lensX, axisY, 560);
  bg.addColorStop(0, "rgba(167, 139, 250, .13)");
  bg.addColorStop(1, "rgba(7, 11, 22, .12)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  if (showGrid.checked) {
    for (let x = 60; x < width; x += 70) drawLine(x, 60, x, height - 60, "rgba(167,139,250,.055)", 1);
    for (let y = 70; y < height; y += 70) drawLine(50, y, width - 50, y, "rgba(167,139,250,.055)", 1);
  }

  drawLine(70, axisY, width - 70, axisY, "rgba(167, 139, 250, .8)", 1.7, 5);
  drawLabel("主光轴", 82, axisY - 14, "#c4b5fd");

  drawConcaveLens();
  drawObject(objectX, objectHeight);

  [leftFocusX, rightFocusX].forEach((x, index) => {
    ctx.save();
    ctx.fillStyle = "#c4b5fd";
    ctx.shadowColor = "#c4b5fd";
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(x, axisY, 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    drawLabel(index === 0 ? "F" : "F'", x - 9, axisY + 28, "#c4b5fd");
  });

  drawLine(lensX, axisY - 205, lensX, axisY + 205, "rgba(255,255,255,.18)", 1.2);
  drawLine(leftFocusX, axisY - 16, leftFocusX, axisY + 16, "rgba(167,139,250,.5)", 1);
  drawLine(rightFocusX, axisY - 16, rightFocusX, axisY + 16, "rgba(167,139,250,.5)", 1);

  const rayColor = "#a78bfa";

  drawArrow(95, objectTop, lensX, objectTop, rayColor);
  const slope = (axisY - objectTop) / focal;
  drawArrow(lensX, objectTop, width - 90, axisY + (width - 90 - lensX) * slope, rayColor);
  drawLine(lensX, objectTop, lensX - focal, axisY, "rgba(167,139,250,.4)");
  drawScatterAlong(95, objectTop, lensX, objectTop, scatterDensity);
  drawScatterAlong(lensX, objectTop, width - 90, axisY + (width - 90 - lensX) * slope, scatterDensity);

  const centerEndY = axisY + (width - 90 - lensX) * ((axisY - objectTop) / (lensX - objectX));
  drawArrow(objectX, objectTop, width - 90, centerEndY, "#e9d5ff");
  drawScatterAlong(objectX, objectTop, width - 90, centerEndY, scatterDensity - 5);

  const slopeToFocus = (axisY - objectTop) / (rightFocusX - lensX);
  const extendY = objectTop + (lensX - objectX) * slopeToFocus;
  drawLine(lensX, extendY, rightFocusX, axisY, "rgba(167,139,250,.4)");
  drawArrow(objectX, objectTop, lensX, extendY, "#c4b5fd");
  drawArrow(lensX, extendY, 95, extendY, "#c4b5fd");
  drawScatterAlong(objectX, objectTop, lensX, extendY, scatterDensity - 8);

  drawImage(imageX, imageHeight, true);
  drawLine(imageX, axisY - imageHeight - 18, imageX, axisY + imageHeight + 18, "rgba(252,165,165,.38)", 1.4, 4);

  drawLine(lensX, axisY + 185, rightFocusX, axisY + 185, "rgba(167,139,250,.65)", 2);
  drawLabel(`f = ${mm(focal)}`, lensX + focal / 2 - 34, axisY + 215, "#c4b5fd");

  focalValue.textContent = mm(focal);
  objectDistanceValue.textContent = mm(objectDistance);
  objectHeightValue.textContent = px(objectHeight);
  imageDistance.textContent = `虚 ${mm(Math.abs(imageDistanceValue))}`;
  magnification.textContent = formatMagnification(imageHeight / objectHeight);
}

function drawConvexMirrorScene() {
  const width = canvas.width;
  const height = canvas.height;
  const { focal, lensX, axisY, objectDistance, objectHeight, scatterDensity } = state;
  const objectX = lensX - objectDistance;
  const objectTop = axisY - objectHeight;
  const focusX = lensX - focal;

  const imageDistanceValue = -1 / (1 / focal + 1 / objectDistance);
  const imageX = lensX + imageDistanceValue;
  const imageHeight = objectHeight * Math.abs(imageDistanceValue) / objectDistance;

  ctx.clearRect(0, 0, width, height);
  
  const bg = ctx.createRadialGradient(lensX, axisY, 20, lensX, axisY, 560);
  bg.addColorStop(0, "rgba(251, 146, 60, .13)");
  bg.addColorStop(1, "rgba(7, 11, 22, .12)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  if (showGrid.checked) {
    for (let x = 60; x < width; x += 70) drawLine(x, 60, x, height - 60, "rgba(251,146,60,.055)", 1);
    for (let y = 70; y < height; y += 70) drawLine(50, y, width - 50, y, "rgba(251,146,60,.055)", 1);
  }

  drawLine(70, axisY, width - 70, axisY, "rgba(251, 146, 60, .8)", 1.7, 5);
  drawLabel("主光轴", 82, axisY - 14, "#fdba74");

  drawConvexMirror();
  drawObject(objectX, objectHeight);

  ctx.save();
  ctx.fillStyle = "#fb923c";
  ctx.shadowColor = "#fb923c";
  ctx.shadowBlur = 16;
  ctx.beginPath();
  ctx.arc(focusX, axisY, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  drawLabel("F", focusX - 9, axisY + 28, "#fb923c");

  drawLine(lensX, axisY - 205, lensX, axisY + 205, "rgba(255,255,255,.18)", 1.2);
  drawLine(focusX, axisY - 16, focusX, axisY + 16, "rgba(251,146,60,.5)", 1);

  const rayColor = "#fb923c";

  drawArrow(objectX, objectTop, lensX, objectTop, rayColor);
  drawLine(lensX, objectTop, lensX - focal, axisY, "rgba(251,146,60,.4)");
  const reflectAngle = Math.atan2(axisY - objectTop, lensX - (lensX - focal));
  const endX = objectX - 50;
  const endY = objectTop + (objectX - endX) * Math.tan(reflectAngle);
  drawArrow(lensX, objectTop, endX, endY, rayColor);
  drawScatterAlong(objectX, objectTop, lensX, objectTop, scatterDensity);
  drawScatterAlong(lensX, objectTop, endX, endY, scatterDensity);

  const centerEndY = axisY - (objectX - 50 - lensX) * ((axisY - objectTop) / (lensX - objectX));
  drawArrow(objectX, objectTop, 50, centerEndY, "#ffedd5");
  drawScatterAlong(objectX, objectTop, 50, centerEndY, scatterDensity - 5);

  const slopeToFocus = (axisY - objectTop) / (focusX - lensX);
  const reflectY = objectTop + (lensX - objectX) * slopeToFocus;
  drawLine(lensX, reflectY, focusX, axisY, "rgba(251,146,60,.4)");
  drawArrow(objectX, objectTop, lensX, reflectY, "#fdba74");
  drawArrow(lensX, reflectY, 50, reflectY, "#fdba74");
  drawScatterAlong(objectX, objectTop, lensX, reflectY, scatterDensity - 8);

  drawImage(imageX, imageHeight, true);
  drawLine(imageX, axisY - imageHeight - 18, imageX, axisY + imageHeight + 18, "rgba(252,165,165,.38)", 1.4, 4);

  drawLine(lensX, axisY + 185, focusX, axisY + 185, "rgba(251,146,60,.65)", 2);
  drawLabel(`f = ${mm(focal)}`, lensX - focal / 2 - 20, axisY + 215, "#fb923c");

  focalValue.textContent = mm(focal);
  objectDistanceValue.textContent = mm(objectDistance);
  objectHeightValue.textContent = px(objectHeight);
  imageDistance.textContent = `虚 ${mm(Math.abs(imageDistanceValue))}`;
  magnification.textContent = formatMagnification(imageHeight / objectHeight);
}

function drawConcaveMirrorScene() {
  const width = canvas.width;
  const height = canvas.height;
  const { focal, lensX, axisY, objectDistance, objectHeight, scatterDensity } = state;
  const objectX = lensX - objectDistance;
  const objectTop = axisY - objectHeight;
  const focusX = lensX - focal;
  const centerX = lensX - 2 * focal;

  let imageDistanceValue, imageX, imageHeight;
  if (objectDistance > focal) {
    imageDistanceValue = 1 / (1 / focal - 1 / objectDistance);
    imageX = lensX - imageDistanceValue;
    imageHeight = -objectHeight * imageDistanceValue / objectDistance;
  } else {
    imageDistanceValue = -1 / (1 / objectDistance - 1 / focal);
    imageX = lensX + Math.abs(imageDistanceValue);
    imageHeight = objectHeight * Math.abs(imageDistanceValue) / objectDistance;
  }

  ctx.clearRect(0, 0, width, height);
  
  const bg = ctx.createRadialGradient(lensX, axisY, 20, lensX, axisY, 560);
  bg.addColorStop(0, "rgba(142, 246, 199, .13)");
  bg.addColorStop(1, "rgba(7, 11, 22, .12)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  if (showGrid.checked) {
    for (let x = 60; x < width; x += 70) drawLine(x, 60, x, height - 60, "rgba(142,246,199,.055)", 1);
    for (let y = 70; y < height; y += 70) drawLine(50, y, width - 50, y, "rgba(142,246,199,.055)", 1);
  }

  drawLine(70, axisY, width - 70, axisY, "rgba(142, 246, 199, .8)", 1.7, 5);
  drawLabel("主光轴", 82, axisY - 14, "#a7ffd5");

  drawConcaveMirror();
  drawObject(objectX, objectHeight);

  ctx.save();
  ctx.fillStyle = "#8ef6c7";
  ctx.shadowColor = "#8ef6c7";
  ctx.shadowBlur = 16;
  ctx.beginPath();
  ctx.arc(focusX, axisY, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  drawLabel("F", focusX - 9, axisY + 28, "#8ef6c7");

  ctx.save();
  ctx.fillStyle = "#6ee7b7";
  ctx.shadowColor = "#6ee7b7";
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.arc(centerX, axisY, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  drawLabel("C", centerX - 8, axisY + 28, "#6ee7b7");

  drawLine(lensX, axisY - 205, lensX, axisY + 205, "rgba(255,255,255,.18)", 1.2);
  drawLine(focusX, axisY - 16, focusX, axisY + 16, "rgba(142,246,199,.5)", 1);
  drawLine(centerX, axisY - 12, centerX, axisY + 12, "rgba(110,231,183,.5)", 1);

  const rayColor = "#8ef6c7";

  if (objectDistance > focal) {
    drawArrow(objectX, objectTop, lensX, objectTop, rayColor);
    const reflectY = axisY - (lensX - focusX) * ((axisY - objectTop) / (lensX - objectX));
    const endX = Math.max(50, imageX);
    drawArrow(lensX, objectTop, endX, reflectY, rayColor);
    drawLine(lensX, objectTop, focusX, axisY, "rgba(142,246,199,.4)");
    drawScatterAlong(objectX, objectTop, lensX, objectTop, scatterDensity);
    drawScatterAlong(lensX, objectTop, endX, reflectY, scatterDensity);
  } else {
    drawArrow(objectX, objectTop, lensX, objectTop, rayColor);
    const reflectY = axisY - (lensX - focusX) * ((axisY - objectTop) / (lensX - objectX));
    const extendY = objectTop + (lensX - objectX) * ((axisY - objectTop) / (focusX - lensX));
    drawLine(lensX, extendY, focusX, axisY, "rgba(142,246,199,.4)");
    drawArrow(lensX, objectTop, width - 90, extendY, rayColor);
    drawScatterAlong(objectX, objectTop, lensX, objectTop, scatterDensity);
    drawScatterAlong(lensX, objectTop, width - 90, extendY, scatterDensity);
  }

  const centerEndY = axisY - (50 - lensX) * ((axisY - objectTop) / (lensX - objectX));
  drawArrow(objectX, objectTop, 50, centerEndY, "#d1fae5");
  drawScatterAlong(objectX, objectTop, 50, centerEndY, scatterDensity - 5);

  if (objectDistance > focal) {
    const slopeToCenter = (axisY - objectTop) / (centerX - objectX);
    const yAtLens = objectTop + (lensX - objectX) * slopeToCenter;
    drawArrow(objectX, objectTop, lensX, yAtLens, "#6ee7b7");
    drawArrow(lensX, yAtLens, objectX, yAtLens, "#6ee7b7");
    drawScatterAlong(objectX, objectTop, lensX, yAtLens, scatterDensity - 8);
  } else {
    const slopeToFocus = (axisY - objectTop) / (focusX - lensX);
    const reflectY = objectTop + (lensX - objectX) * slopeToFocus;
    drawLine(lensX, reflectY, focusX, axisY, "rgba(142,246,199,.4)");
    drawArrow(objectX, objectTop, lensX, reflectY, "#6ee7b7");
    drawArrow(lensX, reflectY, width - 90, reflectY, "#6ee7b7");
    drawScatterAlong(objectX, objectTop, lensX, reflectY, scatterDensity - 8);
  }

  const isVirtual = objectDistance <= focal;
  drawImage(imageX, imageHeight, isVirtual);
  if (!isVirtual) {
    drawLine(imageX, axisY - Math.abs(imageHeight) - 18, imageX, axisY + Math.abs(imageHeight) + 18, "rgba(167,139,250,.38)", 1.4, 4);
  } else {
    drawLine(imageX, axisY - imageHeight - 18, imageX, axisY + imageHeight + 18, "rgba(252,165,165,.38)", 1.4, 4);
  }

  drawLine(lensX, axisY + 185, focusX, axisY + 185, "rgba(142,246,199,.65)", 2);
  drawLabel(`f = ${mm(focal)}`, lensX - focal / 2 - 20, axisY + 215, "#8ef6c7");

  if (!isVirtual && imageX > 50) {
    drawLine(lensX, axisY + 230, imageX, axisY + 230, "rgba(167,139,250,.55)", 2);
    drawLabel(`v = ${mm(imageDistanceValue)}`, (lensX + imageX) / 2 - 35, axisY + 260, "#c4b5fd");
  }

  focalValue.textContent = mm(focal);
  objectDistanceValue.textContent = mm(objectDistance);
  objectHeightValue.textContent = px(objectHeight);
  imageDistance.textContent = isVirtual ? `虚 ${mm(Math.abs(imageDistanceValue))}` : mm(imageDistanceValue);
  magnification.textContent = formatMagnification(imageHeight / objectHeight);
}

function drawScene() {
  switch (state.type) {
    case "convex-lens":
      drawConvexLensScene();
      break;
    case "concave-lens":
      drawConcaveLensScene();
      break;
    case "convex-mirror":
      drawConvexMirrorScene();
      break;
    case "concave-mirror":
      drawConcaveMirrorScene();
      break;
  }
}

function updateScatterDensity(value) {
  state.scatterDensity = value;
  const densityText = value < 20 ? "稀疏" : value < 40 ? "中等" : "密集";
  scatterDensityValue.textContent = densityText;
}

typeButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    typeButtons.forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    state.type = e.target.dataset.type;
    lensTitle.textContent = lensInfo[state.type].title;
    lensDesc.textContent = lensInfo[state.type].desc;
    drawScene();
  });
});

focalSlider.addEventListener("input", (e) => {
  state.focal = Number(e.target.value);
  drawScene();
});

objectDistanceSlider.addEventListener("input", (e) => {
  state.objectDistance = Number(e.target.value);
  drawScene();
});

objectHeightSlider.addEventListener("input", (e) => {
  state.objectHeight = Number(e.target.value);
  drawScene();
});

scatterDensitySlider.addEventListener("input", (e) => {
  updateScatterDensity(Number(e.target.value));
  drawScene();
});

showGrid.addEventListener("change", drawScene);
showLabels.addEventListener("change", drawScene);
showScatter.addEventListener("change", drawScene);

updateScatterDensity(state.scatterDensity);
drawScene();
