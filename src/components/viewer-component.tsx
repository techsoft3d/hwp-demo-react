import React from 'react';
import { v4 as uuidv4 } from 'uuid';

type ViewerProps = {
  modelUri: string,
  onHwvReady: (newHWV: Communicator.WebViewer) => void,
};

class ViewerComponent extends React.Component<ViewerProps, {}> {
  readonly viewerId = uuidv4();

  componentDidMount() {
    const hwv = new Communicator.WebViewer({
      containerId: this.viewerId,
      endpointUri: this.props.modelUri,
    });
    hwv.setCallbacks({
      sceneReady: () => {
        hwv.view.setBackgroundColor(Communicator.Color.white(), Communicator.Color.white());
      },
    });
    hwv.start();
    window.addEventListener('resize', () => {
      hwv.resizeCanvas();
    });
    this.props.onHwvReady(hwv);
  }

  render() {
    return (
      <div className="bg-light w-100 h-100 position-relative" id={this.viewerId}></div>
    );
  }
}

export default ViewerComponent;