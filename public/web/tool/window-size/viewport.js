// @ts-check

/**
 * 指定したViewport単位のpx値を取得する
 * @param {'s' | 'l' | 'd' | ''} size - 's'(Small), 'l'(Large), 'd'(Dynamic)
 * @returns {{ width: number, height: number }} - px単位の数値
 */
export const getViewportPx = (size) => {
  const tempDiv = document.createElement("div");
  tempDiv.style.position = "fixed";
  tempDiv.style.visibility = "hidden";

  tempDiv.style.width = `100${size}vw`;
  tempDiv.style.height = `100${size}vh`;

  document.body.appendChild(tempDiv);

  const rect = tempDiv.getBoundingClientRect();

  document.body.removeChild(tempDiv);

  return {
    width: rect.width,
    height: rect.height,
  };
};
