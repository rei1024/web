const showEyeDropper = document.querySelector("#show_eye_dropper");
const resultElement = document.querySelector("#result");
const resultHex = document.querySelector("#result_hex");
const resultDec = document.querySelector("#result_dec");
if (!window.EyeDropper) {
  const message = "ブラウザーがEyeDropper APIをサポートしていません。";
  resultHex.textContent = message;
  resultHex.style.color = "#BC1E23";
  showEyeDropper.disabled = true;
  throw Error(message);
}

const eyeDropper = new EyeDropper();

showEyeDropper.addEventListener("click", async () => {
  try {
    /** @type {{ sRGBHex: string }} */
    const result = await eyeDropper.open();
    resultHex.textContent = result.sRGBHex.toUpperCase();
    const r = parseInt(result.sRGBHex.slice(1, 3), 16).toString(10);
    const g = parseInt(result.sRGBHex.slice(3, 5), 16).toString(10);
    const b = parseInt(result.sRGBHex.slice(5, 7), 16).toString(10);
    resultDec.textContent = `rgb(${r}, ${g}, ${b})`;
    resultElement.style.backgroundColor = result.sRGBHex;
  } catch (e) {
    resultHex.textContent = e.message;
  }
});

export {};
