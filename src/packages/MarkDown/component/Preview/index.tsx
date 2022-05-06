import context from "../../context";
import { createRef, useContext } from "react";
import * as Showdown from "showdown";
import React, { useEffect } from "react";
import "./index.less";
import "./markdown.less";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export default function Preview(props: any) {
  const store = useContext(context);
  const previewRef = createRef<HTMLElement>();

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = converter.makeHtml(store.value);
    }
  }, [store.value]);

  return <div className="markdown-body" ref={previewRef as any} {...props} />;
}
