// @ts-check

/**
 * @param {number} lower
 * @param {number} upper
 * @returns {number}
 */
function randomInteger(lower, upper) {
  return lower + Math.floor(Math.random() * (upper - lower + 1));
}

/**
 * @template T
 * @param {T[]} array
 * @returns {T | undefined}
 */
function sample(array) {
  const length = array.length;
  return length ? array[randomInteger(0, length - 1)] : undefined;
}

/**
 * @param {number} n
 * @param {{ includeDigit: boolean, includeSpecial: boolean, includeUpper: boolean, includeLower: boolean, }} options
 */
function gen(n, options) {
  if (Number.isNaN(n)) {
    throw new Error("長さを入力してください。");
  }
  if (
    options.includeDigit === false &&
    options.includeSpecial === false &&
    options.includeUpper === false &&
    options.includeLower === false
  ) {
    throw new Error("1つ以上の文字種類を含めてください。");
  }
  const alpha = "abcdefghijklmnopqrstuvwxyz";
  return Array(n)
    .fill(0)
    .map(() =>
      sample([
        ...(options.includeLower ? alpha : []),
        ...(options.includeUpper ? alpha.toUpperCase() : []),
        ...(options.includeDigit ? "0123456789" : []),
        // https://docs.aws.amazon.com/cognito/latest/developerguide/managing-users-passwords.html
        ...(options.includeSpecial
          ? `^ $ * . [ ] { } ( ) ? " ! @ # % & / \ , > < ' : ; | _ ~ \` = + - `
              .split(" ")
              .join("")
          : []),
      ]),
    )
    .join("");
}

function getLength() {
  return Number(document.getElementById("len").value);
}

const $out = document.querySelector("#out");

function update() {
  try {
    $out.textContent = gen(getLength(), {
      includeDigit: document.querySelector("#digit").checked,
      includeSpecial: document.querySelector("#special").checked,
      includeUpper: document.querySelector("#upper").checked,
      includeLower: document.querySelector("#lower").checked,
    });
  } catch (error) {
    $out.textContent = `Error: ${error.message}`;
  }
}

update();

document.querySelector("#gen").addEventListener("click", () => {
  update();
});

const $copy = document.querySelector("#copy");
let id;
$copy.addEventListener("click", () => {
  navigator.clipboard
    .writeText(document.querySelector("#out").textContent)
    .then(() => {
      $copy.textContent = "コピー済み";
      clearTimeout(id);
      id = setTimeout(() => {
        $copy.textContent = "コピー";
      }, 900);
    });
});

const $clearClipboard = document.querySelector("#clear_clipboard");
$clearClipboard.addEventListener("click", () => {
  navigator.clipboard.writeText("").then(() => {
    $clearClipboard.disabled = true;
    setTimeout(() => {
      $clearClipboard.disabled = false;
    }, 150);
  });
});

export {};
