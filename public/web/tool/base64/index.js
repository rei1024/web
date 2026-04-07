// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
/**
 * https://github.com/denoland/deno_std/blob/4df10f6b54e8078da66fa16c6d8b645705aaddee/encoding/base64.ts
 * Decodes a given RFC4648 base64 encoded string
 * @param {string} b64
 * @returns {Uint8Array}
 */
function decodeBase64(b64) {
  const binString = atob(b64);
  const size = binString.length;
  const bytes = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    bytes[i] = binString.charCodeAt(i);
  }
  return bytes;
}

const base64abc = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "/",
];

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
/**
 * Converts data into a base64-encoded string.
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc4648#section-4}
 *
 * @example
 * ```ts
 * import { encodeBase64 } from "https://deno.land/std@$STD_VERSION/encoding/base64.ts";
 *
 * encodeBase64("foobar"); // "Zm9vYmFy"
 * ```
 * @param {Uint8Array} data
 * @returns {string}
 */
function encodeBase64(data) {
  // CREDIT: https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727
  const uint8 = data;
  let result = "",
    i;
  const l = uint8.length;
  for (i = 2; i < l; i += 3) {
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[((uint8[i - 2] & 0x03) << 4) | (uint8[i - 1] >> 4)];
    result += base64abc[((uint8[i - 1] & 0x0f) << 2) | (uint8[i] >> 6)];
    result += base64abc[uint8[i] & 0x3f];
  }
  if (i === l + 1) {
    // 1 octet yet to write
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[(uint8[i - 2] & 0x03) << 4];
    result += "==";
  }
  if (i === l) {
    // 2 octets yet to write
    result += base64abc[uint8[i - 2] >> 2];
    result += base64abc[((uint8[i - 2] & 0x03) << 4) | (uint8[i - 1] >> 4)];
    result += base64abc[(uint8[i - 1] & 0x0f) << 2];
    result += "=";
  }
  return result;
}

/**
 * Some variants allow or require omitting the padding '=' signs:
 * https://en.wikipedia.org/wiki/Base64#The_URL_applications
 *
 * @param {string} base64url
 */
function addPaddingToBase64url(base64url) {
  if (base64url.length % 4 === 2) return base64url + "==";
  if (base64url.length % 4 === 3) return base64url + "=";
  if (base64url.length % 4 === 1) {
    throw new TypeError("Illegal base64url string!");
  }
  return base64url;
}

/**
 *
 * @param {string} b64url
 * @returns
 */
function convertBase64urlToBase64(b64url) {
  if (!/^[-_A-Z0-9]*?={0,2}$/i.test(b64url)) {
    // Contains characters not part of base64url spec.
    throw new TypeError("Failed to decode base64url: invalid character");
  }
  return addPaddingToBase64url(b64url).replace(/\-/g, "+").replace(/_/g, "/");
}

/**
 *
 * @param {string} b64
 * @returns {string}
 */
function convertBase64ToBase64url(b64) {
  return b64.endsWith("=")
    ? b64.endsWith("==")
      ? b64.replace(/\+/g, "-").replace(/\//g, "_").slice(0, -2)
      : b64.replace(/\+/g, "-").replace(/\//g, "_").slice(0, -1)
    : b64.replace(/\+/g, "-").replace(/\//g, "_");
}

const $types = document.querySelectorAll('input[name="type"]');

let type = "decode";

const $outputTypesWrapper = document.querySelector(".js-output-types-wrapper");

$types.forEach(($t) => {
  $t.addEventListener("change", () => {
    type = $t.value;
    update();
  });
});

const $outputTypes = [
  ...document.querySelectorAll('input[name="output-type"]'),
];
let outputType = "text";

$outputTypes.forEach((e) => {
  e.addEventListener("change", () => {
    outputType = e.value;
    update();
  });
});

const $encodeTypesWrapper = document.querySelector(".js-encode-types-wrapper");

const $encodeTypes = [
  ...document.querySelectorAll('input[name="encode-type"]'),
];
let encodeType = "base64";

$encodeTypes.forEach((e) => {
  e.addEventListener("change", () => {
    encodeType = e.value;
    update();
  });
});

const $input = document.querySelector("#input");
const $output = document.querySelector("#output");

$input.addEventListener("input", update);
$output.addEventListener("input", update);

function update() {
  $outputTypesWrapper.style.display = type === "decode" ? "" : "none";
  $encodeTypesWrapper.style.display = type === "decode" ? "none" : "";
  if (type === "decode") {
    $input.placeholder = "Base64";
    $output.placeholder = outputType === "text" ? "Text" : "Hex";
  } else {
    $input.placeholder = "Text";
    $output.placeholder = "Base64";
  }

  $output.disabled = false;
  switch (type) {
    case "decode": {
      try {
        const array = decodeBase64($input.value);
        if (outputType === "text") {
          $output.value = new TextDecoder().decode(array);
        } else {
          const hex = [...array].map((x) => x.toString(16).padStart(2, "0"));
          const hexString = hex.join("");
          $output.value = hexString;
        }
      } catch (error) {
        $output.disabled = true;
        $output.value = "[デコードに失敗しました。]";
      }
      break;
    }
    case "encode": {
      try {
        const utf8 = new TextEncoder().encode($input.value);
        const base64 = (
          encodeType === "base64url" ? convertBase64ToBase64url : (x) => x
        )(encodeBase64(utf8));
        $output.value = base64;
      } catch (error) {
        $output.disabled = true;
        $output.value = "[エンコードに失敗しました。]";
      }
      break;
    }
  }
}

update();

const $copy = document.querySelector("#copy");
let id;
$copy.addEventListener("click", () => {
  navigator.clipboard.writeText($output.value).then(() => {
    $copy.textContent = "コピー済み";
    clearTimeout(id);
    id = setTimeout(() => {
      $copy.textContent = "コピー";
    }, 900);
  });
});
