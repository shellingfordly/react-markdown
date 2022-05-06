export default function useCursort() {
  function getCursortPosition(dom: any) {
    const doc: any = document;
    //获取光标位置函数
    const caretPos: [number, number] = [0, 0];

    // IE Support
    if (doc.selection) {
      // dom.focus(); // 获取焦点
      // const Sel = doc.selection.createRange(); // 创建选定区域
      // Sel.moveStart('character', -dom.value.length); // 移动开始点到最左边位置
      // CaretPos = Sel.text.length; // 获取当前选定区的文本内容长度
      console.warn("Don't get caret position.");
    }
    // Firefox support (非ie)
    else if (dom.selectionStart || dom.selectionStart == '0') {
      caretPos[0] = dom.selectionStart as number; // 获取选定区的开始点
      caretPos[1] = dom.selectionEnd as number; // 获取选定区的开始点
    }
    return caretPos;
  }

  function setCaretPosition(dom: any, pos: number) {
    //设置光标位置函数
    if (dom.setSelectionRange) {
      //非ie
      dom.focus(); // 获取焦点
      dom.setSelectionRange(pos, pos); // 设置选定区的开始和结束点
    } else if (dom.createTextRange) {
      const range = dom.createTextRange(); // 创建选定区
      range.collapse(true); // 设置为折叠,即光标起点和结束点重叠在一起
      range.moveEnd('character', pos); // 移动结束点
      range.moveStart('character', pos); // 移动开始点
      range.select(); // 选定当前区域
    }
  }

  return { getCursortPosition, setCaretPosition };
}
