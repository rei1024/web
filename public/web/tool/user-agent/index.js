const $output = document.querySelector("#output");

function update() {
  // window.navigator.;
  $output.textContent = `userAgent = ${window.navigator.userAgent}

userAgentData = ${window.navigator.userAgent ? JSON.stringify(window.navigator.userAgentData, null, 2) : "Not supported"}
`.trim();

  if (
    window.navigator.userAgentData &&
    window.navigator.userAgentData.getHighEntropyValues
  ) {
    navigator.userAgentData
      .getHighEntropyValues([
        "architecture",
        "bitness",
        "formFactor",
        "fullVersionList",
        "model",
        "platformVersion",
        "wow64",
      ])
      .then((values) => {
        $output.textContent += `\n
High entropy values = ${JSON.stringify(values, null, 2)}
`.trimEnd();
      });
  }
}

update();

export {};
