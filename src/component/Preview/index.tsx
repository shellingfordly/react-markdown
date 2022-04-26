import context from '../../context';
import { createRef, useContext } from 'react';
import * as Showdown from 'showdown';
import { useEffect } from 'react';
import './index.less';
import './markdown.less';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export default function Preview() {
  const value = useContext(context);
  const previewRef = createRef<HTMLElement>();

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = converter.makeHtml(value);
    }
  }, [value]);

  return <div className="markdown-body" ref={previewRef as any} />;
}
