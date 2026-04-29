const $file = document.querySelector("#file");

/**
 * @type {HTMLImageElement}
 */
const $inputImage = document.querySelector("#input");

/**
 * @type {HTMLCanvasElement}
 */
const $canvas = document.querySelector("#canvas");
const ctx = $canvas.getContext("2d");

const $download = document.querySelector("#download");

/**
 * @type {HTMLSelectElement}
 */
const $preset = document.querySelector("#preset");

/**
 * @type {HTMLTextAreaElement}
 */
const $effect = document.querySelector("#effect");

let fileName = "";

$file.addEventListener("change", () => {
  const file = $file.files?.[0];
  if (!file) {
    return;
  }
  fileName = file.name;
  const url = URL.createObjectURL(file);
  $inputImage.src = url;

  $inputImage.onload = () => {
    $canvas.width = $inputImage.naturalWidth;
    $canvas.height = $inputImage.naturalHeight;
    $canvas.style.maxWidth = "100%";
    ctx.drawImage($inputImage, 0, 0);
    update();
  };
});

$preset.addEventListener("change", () => {
  const value = $preset.value;
  $effect.value = value;
  update();
});

$effect.addEventListener("input", () => {
  update();
});

function update() {
  const effect = $effect.value;
  ctx.filter = effect;
  ctx.drawImage($inputImage, 0, 0);
}

$download.addEventListener("click", () => {
  $canvas.toBlob((blob) => {
    if (!blob) {
      return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileNameWithoutExtension(fileName)}_effect.png`;
    a.click();
    URL.revokeObjectURL(url);
  });
});

function fileNameWithoutExtension(fileName) {
  const index = fileName.lastIndexOf(".");
  if (index === -1) {
    return fileName;
  }
  return fileName.slice(0, index);
}

export {};
