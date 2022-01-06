import Draggable from 'react-draggable';
import { useState } from 'react';

const Example = () => {
  //     const [deltaPosition, setDeltaPosition] = useState({x: 0, y: 0})
  //     const [controlledPosition, setControlledPosition] = useState({
  //       x: -400,
  //       y: 200,
  //     })

  //  const handleDrag = (e, ui) => {
  //     const { x, y } = deltaPosition;
  //     setDeltaPosition({
  //         x: x + ui.deltaX,
  //         y: y + ui.deltaY,
  //       }
  //     );
  //   };

  //   const onDrop = (e) => {

  //     if (e.target.classList.contains('drop-target')) {
  //       alert('Dropped!');
  //       e.target.classList.remove('hovered');
  //     }
  //   };

  //   const onDropAreaMouseEnter = (e) => {
  //     if (this.state.activeDrags) {
  //       e.target.classList.add('hovered');
  //     }
  //   };
  //  const  onDropAreaMouseLeave = (e) => {
  //     e.target.classList.remove('hovered');
  //   };

  //  const onControlledDrag = (e, position) => {
  //     const { x, y } = position;
  //     this.setState({ controlledPosition: { x, y } });
  //   };

  //   const onControlledDragStop = (e, position) => {
  //     this.onControlledDrag(e, position);
  //     this.onStop();
  //   };

  return (
    <div>
      <h1>React Draggable</h1>

      <p>
        <a href="https://github.com/STRML/react-draggable/blob/master/example/example.js">
          Demo Source
        </a>
      </p>

      <Draggable handle="strong">
        <div className="box no-cursor">
          <strong className="cursor">
            <div>Drag here</div>
          </strong>
          <div>You must click my handle to drag me</div>
        </div>
      </Draggable>
    </div>
  );
};
export default Example;
