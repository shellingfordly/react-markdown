import { createToolsElement } from "./hooks/useTools";
import { useContext, useEffect, useState } from "react";
import context from "../../context";
import "./index.less";

export default function Tools({ setStore }: any) {
  const store = useContext(context);
  const [toolElements, setToolElements] = useState<any>();

  useEffect(() => {
    setToolElements(createToolsElement(store, setStore));
  }, [store]);
  return <div className="mdTools">{toolElements}</div>;
}
