import Textarea from "./component/Textarea";
import Preview from "./component/Preview";
import "./index.less";
import { Provider, ctxValue } from "./context";
import React, { useState } from "react";
import type { ContextStore } from "./context";
import Tools from "./component/Tools";
import { useFullScroll } from "./hooks/useFullScroll";

export default function Markdown() {
  const [value, setCtxValue] = useState<ContextStore>(ctxValue);
  const { styles: boxStyles } = useFullScroll();
  const stylesComputed = () => (value.isFull ? boxStyles.max : boxStyles.org);

  return (
    <Provider value={value}>
      <div className="mdContainer" style={stylesComputed()}>
        <Tools setCtxValue={setCtxValue} />
        <div className="mdContent">
          <Textarea
            setCtxValue={setCtxValue}
            style={{ width: value.isView ? "50%" : "100%" }}
          />
          <div className="line" />
          {value.isView && <Preview style={{ width: "50%" }} />}
        </div>
      </div>
    </Provider>
  );
}
