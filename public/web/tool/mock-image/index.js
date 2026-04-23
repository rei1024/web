const $width = document.querySelector("#width");
const $height = document.querySelector("#height");

/**
 * @type {HTMLCanvasElement}
 */
const $canvas = document.querySelector("#canvas");
const $errorMessage = document.querySelector("#error-message");
const $download = document.querySelector("#download");

let timeoutId = null;

function render() {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    $errorMessage.textContent = "";
    const width = parseInt($width.value, 10);
    const height = parseInt($height.value, 10);
    if (width > 10000 || height > 10000) {
      const ctx = $canvas.getContext("2d");
      if (ctx.reset) {
        ctx.reset();
      }
      $errorMessage.textContent = "幅と高さは10000以下にしてください。";
      return;
    }
    $canvas.width = width;
    $canvas.height = height;
    const ctx = $canvas.getContext("2d");
    ctx.fillStyle = "#CCCCCC";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#000000";
    ctx.font = `${Math.max(8, Math.min(width, height) / 10)}px sans-serif`;
    const text = `${width} x ${height}`;
    const mesure = ctx.measureText(text);
    ctx.fillText(
      `${width} x ${height}`,
      $canvas.width / 2 - mesure.width / 2,
      $canvas.height / 2 + mesure.actualBoundingBoxAscent / 2 - 2,
      $canvas.width,
    );
    timeoutId = null;
  }, 50);
}

$width.addEventListener("input", render);
$height.addEventListener("input", render);

render();

$download.addEventListener("click", () => {
  const ctx = $canvas.getContext("2d");
  $canvas.toBlob((blob) => {
    if (!blob) {
      return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mock-image-${$canvas.width}x${$canvas.height}.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, "image/png");
});

export {};
