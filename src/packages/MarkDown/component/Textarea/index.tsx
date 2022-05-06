import { useContext, useEffect, useRef } from "react";
import context from "../../context";
import "./index.less";
import type { SetStateType } from "../../types";
import useCursort from "../../hooks/useCursort";
import React from "react";

interface PropsType extends Indexable {
  setCtxValue: SetStateType;
}

export default function Textarea({ setCtxValue, ...props }: PropsType) {
  const store = useContext(context);
  const textAreaDom = useRef<Element | null>(null);
  const { getCursortPosition } = useCursort();

  useEffect(() => {
    const dom = document.querySelector(`.mdTextarea`);
    textAreaDom.current = dom;
  }, []);

  function onSetCaretPos() {
    if (textAreaDom.current) {
      const [start, end] = getCursortPosition(textAreaDom.current);

      setCtxValue((oldValue) => ({
        ...oldValue,
        caretPos: [start, end],
      }));
    }
  }

  function onChange(e: any) {
    setCtxValue((_store) => ({
      ..._store,
      value: e.target.value,
    }));
  }

  return (
    <div className="mdTextareaContainer" {...props}>
      <textarea
        className="mdTextarea"
        value={store.value}
        onChange={onChange}
        onMouseUp={onSetCaretPos}
        onMouseDown={onSetCaretPos}
        onMouseEnter={onSetCaretPos}
      />
    </div>
  );
}
