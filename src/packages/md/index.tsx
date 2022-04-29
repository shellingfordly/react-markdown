import Textarea from "./component/Textarea";
import Preview from "./component/Preview";
import "./index.less";
import { ContextStore, Provider } from "./context";
import { useState } from "react";
import Tools from "./component/Tools";

export default function Markdown() {
  const [store, setStore] = useState<ContextStore>({
    value: "",
    caretPos: [0, 0],
  });

  return (
    <Provider value={store}>
      <div className="mdContainer">
        <Tools setStore={setStore} />
        <div className="mdContent">
          <Textarea setStore={setStore} />
          <div className="line" />
          <Preview />
        </div>
      </div>
    </Provider>
  );
}
