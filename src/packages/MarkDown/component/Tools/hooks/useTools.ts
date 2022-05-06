import { createElement } from 'react';
import type { ContextStore } from '../../../context';
import type { SetStateType } from '../../../types';
import * as toolElementMap from './constants';

export function createToolsElement(ctxValue: ContextStore, setCtxValue: SetStateType) {
  return Object.values(toolElementMap).map((tool) => {
    const props = createProps(tool, ctxValue, setCtxValue);
    return createElement(tool, props);
  });
}

const toolValueMap = {
  BoldOutlined(value: string) {
    return `**${value}**`;
  },
  ItalicOutlined(value: string) {
    return `*${value}*`;
  },
  UnderlineOutlined(value: string) {
    return `<u>${value}</u>`;
  },
  StrikethroughOutlined(value: string) {
    return `~~${value}~~`;
  },
  LinkOutlined(value: string) {
    return `[](${value})`;
  },
  CodeOutlined(value: string) {
    return `\`\`\`\n${value}\n\`\`\``;
  },
  PictureOutlined(value: string) {
    return `![](${value})`;
  },
  TableOutlined() {
    return `\n| head | head |\n| ---  | ---  |\n|      |      |`;
  },
  UnorderedListOutlined(value: string) {
    return `- ${value}`;
  },
  OrderedListOutlined(value: string) {
    return `1. ${value}`;
  },
  FormOutlined(value: string) {
    return `${value}`;
  },
};

function handlerStoreValue(store: ContextStore, handler: (value: string) => string) {
  const {
    value,
    caretPos: [start, end],
  } = store;
  return value.slice(0, start + 1) + handler(value.slice(start, end)) + value.slice(end + 1);
}

function handlerSelectValue(store: ContextStore, handler: (value: string) => string) {
  const {
    value,
    caretPos: [start, end],
  } = store;
  let result = value;

  if (start !== end) {
    result = value.slice(0, start) + handler(value.slice(start, end)) + value.slice(end + 1);
  }

  return result;
}

function createProps(tool: any, ctxValue: ContextStore, setCtxValue: SetStateType) {
  const [start, end] = ctxValue.caretPos;
  let value = '';
  let onToolClick = () => {};

  Object.entries(toolValueMap).forEach(([key, func]) => {
    if (tool.render.displayName === key) {
      onToolClick = () => {
        console.log('start,', start, end);

        if (start !== end) {
          value = handlerSelectValue(ctxValue, func);
        } else {
          value = handlerStoreValue(ctxValue, func);
        }
      };
    }
  });

  return {
    key: tool.render.displayName,
    onClick() {
      onToolClick();
      setCtxValue((oldValue) => ({
        ...oldValue,
        value,
      }));
    },
  };
}
