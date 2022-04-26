import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  UnorderedListOutlined,
  LinkOutlined,
  CodeOutlined,
  FileJpgOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';
import { createElement } from 'react';

export const icons = [
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  UnorderedListOutlined,
  LinkOutlined,
  CodeOutlined,
  FileJpgOutlined,
  OrderedListOutlined,
];

export function handleIcons(iconList: typeof icons, store: string, setStore: any) {
  return iconList.map((icon) => {
    const props = handleProps(icon, store, setStore);
    return createElement(icon, props);
  });
}

function handleProps(icon: any, store: string, setStore: any) {
  let _store = '';
  const index = store.lastIndexOf('\n');
  const value = store.slice(index);
  switch (icon) {
    case BoldOutlined:
      _store = `${store.slice(0, index)}\n**${value.trim()}**`;
      break;
    default:
      break;
  }
  return {
    onClick() {
      setStore(_store);
    },
  };
}
