const $output = document.querySelector("#output");
function update() {
  $output.textContent = `Window
  幅  : ${window.innerWidth}px
  高さ: ${window.innerHeight}px

Screen
  利用可能幅   : ${window.screen.availWidth}
  利用可能高さ : ${window.screen.availHeight}
  幅           : ${window.screen.width}
  高さ         : ${window.screen.height}
  
  色深度: ${window.screen.colorDepth}
  ビット深度: ${window.screen.pixelDepth}
  向き: ${window.screen.orientation.type}
  角度: ${window.screen.orientation.angle}`;
}
// window.screen.addEventListener("");
window.addEventListener("resize", () => {
  update();
});
window.screen.addEventListener("change", () => {
  update();
});
window.screen.orientation.addEventListener("change", () => {
  update();
});
update();

export {};
