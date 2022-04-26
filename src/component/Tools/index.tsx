import { icons, handleIcons } from './consts';
import styles from './index.less';
import { useContext } from 'react';
import context from '../../context';

export default function Tools({ setStore }: any) {
  const store = useContext(context);
  return <div className={styles.mdTools}>{handleIcons(icons, store, setStore)}</div>;
}
