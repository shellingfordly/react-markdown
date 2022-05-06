import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function AssistTool() {
  const [isFull, setIsFull] = useState(false);

  function onFullscreen() {
    setIsFull((bool) => {
      return !bool;
    });
  }

  return (
    <div>
      {isFull && <FullscreenExitOutlined onClick={onFullscreen} />}
      {!isFull && <FullscreenOutlined onClick={onFullscreen} />}
    </div>
  );
}
