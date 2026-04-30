const $output = document.querySelector("#output");

function update() {
  $output.textContent = `userAgent = ${window.navigator.userAgent}

userAgentData = ${window.navigator.userAgent ? JSON.stringify(window.navigator.userAgentData, null, 2) : "Not supported"}
`.trim();
}

update();

export {};
