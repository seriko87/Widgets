import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './blackScreen.css';
import CloseWidget from '../closeWidget/CloseWidget';

const BlackScreen = () => {
  const [fullScreen, setFullScreen] = useState(true);

  function openFullscreen(e) {
    if (e.target.requestFullscreen) {
      e.target.requestFullscreen();
    } else if (e.target.webkitRequestFullscreen) {
      /* Safari */
      e.target.webkitRequestFullscreen();
    } else if (e.target.msRequestFullscreen) {
      /* IE11 */
      e.target.msRequestFullscreen();
    }
    setFullScreen(false);
  }

  /* Close fullscreen */
  function closeFullscreen(e) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }

  document.addEventListener('fullscreenchange', function () {
    var full_screen_element = document.fullscreenElement;

    if (full_screen_element === null) {
      setFullScreen(true);
    }
  });

  return (
    <Draggable handle="strong">
      <div className="blackScreen ">
        <strong className="cursor" style={{ width: 100 + '%' }}></strong>
        <CloseWidget id="blackScreen" />
        {fullScreen ? (
          <button className="blcScrnBtn" onClick={(e) => openFullscreen(e)}>
            Click here to enter full screen
          </button>
        ) : (
          <button className="blcScrnBtn" onClick={(e) => closeFullscreen(e)}>
            Press ESC or here to EXIT full screen
          </button>
        )}
      </div>
    </Draggable>
  );
};

export default BlackScreen;
