import Textarea from './component/Textarea';
import Preview from './component/Preview';
import styles from './index.less';
import { Provider } from './context';
import { useState } from 'react';
import Tools from './component/Tools';

export default function Markdown() {
  const [store, setStore] = useState('');

  return (
    <Provider value={store}>
      <div className={styles.mdContainer}>
        <Tools setStore={setStore} />
        <div className={styles.mdContent}>
          <Textarea setStore={setStore} />
          <div className={styles.line} />
          <Preview />
        </div>
      </div>
    </Provider>
  );
}
