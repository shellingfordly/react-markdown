import { useState } from "react";
import type { CSSProperties } from "react";

const defaultHeight = 500;

export function useFullScroll() {
  const bodyHeight = document.body.clientHeight;
  const styles: Record<string, CSSProperties> = {
    org: {
      position: "relative",
    },
    max: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: bodyHeight,
      backgroundColor: "white",
      zIndex: 999,
      overflow: "auto",
    },
  };
  const [boxStyle, setBoxStyle] = useState(styles.box);
  const [height, setheight] = useState(defaultHeight);

  function onFullScroll(isFull: boolean) {
    if (isFull) {
      setBoxStyle(styles.box);
      setheight(defaultHeight);
    } else {
      setBoxStyle(styles.boxMax);
      setheight(bodyHeight);
    }
  }

  return { boxStyle, height, onFullScroll, styles };
}
