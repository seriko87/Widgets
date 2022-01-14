import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './blackScreen.css';

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
        <strong className="cursor" style={{ color: 'white ' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            width="20px"
          >
            <path d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v5a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z" />
          </svg>
        </strong>
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
