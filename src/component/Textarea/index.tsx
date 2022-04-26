import { Input } from 'antd';
import type { Dispatch, SetStateAction } from 'react';
import { useContext } from 'react';
import context from '../../context';
import styles from './index.less';

interface PropsType {
  setStore: Dispatch<SetStateAction<string>>;
}
export default function Textarea({ setStore }: PropsType) {
  const store = useContext(context);

  return (
    <Input.TextArea
      className={styles.mdTextarea}
      value={store}
      onChange={(e) => setStore(e.target.value)}
    />
  );
}
