import { createToolsElement } from "./hooks/useTools";
import React, { useContext, useEffect, useState } from "react";
import context from "../../context";
import "./index.less";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  ReadOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import type { SetStateType } from "../../types";

export default function Tools({ setCtxValue }: { setCtxValue: SetStateType }) {
  const ctxValue = useContext(context);
  const [toolElements, setToolElements] = useState<any>();

  useEffect(() => {
    setToolElements(createToolsElement(ctxValue, setCtxValue));
  }, [ctxValue]);

  function onClick(key: string) {
    setCtxValue((oldValue) => ({
      ...oldValue,
      [key]: !oldValue[key],
    }));
  }

  return (
    <div className="mdTools">
      <div>{toolElements}</div>
      <div>
        <span>
          {ctxValue.isView && (
            <ProfileOutlined onClick={() => onClick("isView")} />
          )}
          {!ctxValue.isView && (
            <ReadOutlined onClick={() => onClick("isView")} />
          )}
        </span>
        <span>
          {ctxValue.isFull && (
            <FullscreenExitOutlined onClick={() => onClick("isFull")} />
          )}
          {!ctxValue.isFull && (
            <FullscreenOutlined onClick={() => onClick("isFull")} />
          )}
        </span>
      </div>
    </div>
  );
}
