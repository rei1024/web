import { getViewportPx } from "./viewport.js";

const $output = document.querySelector("#output");

function update() {
  const viewport = getViewportPx("");
  const viewportS = getViewportPx("s");
  const viewportL = getViewportPx("l");

  $output.textContent = `Window
  幅  : ${window.innerWidth}px
  高さ: ${window.innerHeight}px

Viewport:
  幅  : ${viewport.width.toFixed(2)}px
  高さ: ${viewport.height.toFixed(2)}px

Viewport Small:
  幅  : ${viewportS.width.toFixed(2)}px
  高さ: ${viewportS.height.toFixed(2)}px

Viewport Large:
  幅  : ${viewportL.width.toFixed(2)}px
  高さ: ${viewportL.height.toFixed(2)}px

Screen
  利用可能幅   : ${window.screen.availWidth}
  利用可能高さ : ${window.screen.availHeight}
  幅           : ${window.screen.width}
  高さ         : ${window.screen.height}
  
  色深度: ${window.screen.colorDepth}
  ビット深度: ${window.screen.pixelDepth}
  向き: ${window.screen.orientation.type}
  角度: ${window.screen.orientation.angle}
  
devicePixelRatio: ${window.devicePixelRatio}
  `.trim();
}

window.addEventListener("resize", () => {
  update();
});
window.screen.addEventListener("change", () => {
  update();
});
window.screen.orientation.addEventListener("change", () => {
  update();
});
document.querySelector("#input").addEventListener("focus", () => {
  setTimeout(() => {
    update();
  }, 4);
});
update();

export {};
