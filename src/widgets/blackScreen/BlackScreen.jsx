import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './blackScreen.css';
import CloseWidget from '../../components/closeWidget/CloseWidget';

const BlackScreen = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const [color, setColor] = useState('black');
  const [textColor, setTextColor] = useState();

  function openFullscreen() {
    let elem = document.querySelector('.blackScreen');

    if (!document.fullscreenElement) {
      elem
        .requestFullscreen()
        .then(() => {})
        .catch((err) => {
          alert(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
    } else {
      document.exitFullscreen();
    }
  }

  document.addEventListener('fullscreenchange', function () {
    var full_screen_element = document.fullscreenElement;

    if (full_screen_element === null) {
      setFullScreen(false);
    } else {
      setFullScreen(true);
    }
  });

  const colorsArr = ['black', 'white', 'yellow', 'red', 'blue', 'green'];
  const textColorsArr = ['grey', 'grey', 'grey', 'white', 'white', 'white'];
  return (
    <Draggable handle="strong">
      <div className="blackScreen" style={{ backgroundColor: color }}>
        <strong className="cursor" style={{ width: 100 + '%' }}></strong>
        <CloseWidget id="blackScreen" />
        {!fullScreen ? (
          <button
            className="blcScrnBtn"
            onClick={(e) => openFullscreen(e)}
            style={{ color: textColor }}
          >
            Click here to enter full screen
          </button>
        ) : (
          <button
            className="blcScrnBtn"
            onClick={(e) => openFullscreen(e)}
            style={{ color: textColor }}
          >
            Press ESC or here to EXIT full screen
          </button>
        )}
        {!fullScreen && (
          <div className="colorsWrap">
            {colorsArr.map((item, index) => {
              return (
                <button
                  className="colorsBtn"
                  style={{ backgroundColor: item }}
                  key={item}
                  onClick={() => {
                    setColor(item);
                    setTextColor(textColorsArr[index]);
                  }}
                ></button>
              );
            })}
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default BlackScreen;
