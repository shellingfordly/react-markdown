import { Input } from 'antd';
import { useContext, useEffect, useRef } from 'react';
import context from '../../context';
import styles from './index.less';
import type { SetStoreType } from '../../types';
import useCursort from '../../hooks/useCursort';

export default function Textarea({ setStore }: { setStore: SetStoreType }) {
  const store = useContext(context);
  const textAreaDom = useRef<Element | null>(null);
  const { getCursortPosition } = useCursort();

  useEffect(() => {
    const dom = document.querySelector(`.${styles.mdTextarea}`);
    textAreaDom.current = dom;
  }, []);

  function onSetCaretPos() {
    if (textAreaDom.current) {
      const [start, end] = getCursortPosition(textAreaDom.current);

      setStore((oldStore) => ({
        ...oldStore,
        caretPos: [start, end],
      }));
    }
  }

  function onChange(e: any) {
    setStore((_store) => ({
      ..._store,
      value: e.target.value,
    }));
  }

  return (
    <div className={styles.mdTextareaContainer}>
      <Input.TextArea
        className={styles.mdTextarea}
        value={store.value}
        onChange={onChange}
        onMouseUp={onSetCaretPos}
        onMouseDown={onSetCaretPos}
        onMouseEnter={onSetCaretPos}
      />
    </div>
  );
}
