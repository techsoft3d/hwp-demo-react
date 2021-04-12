import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
// import Communicator from "https://cdn.jsdelivr.net/gh/techsoft3d/hoops-web-viewer@2020.0.0/hoops_web_viewer.js?v=2021.0.0";

class ViewerComponent extends Component {
    constructor(props) {
        super(props);
        // this.hwp = new Communicator.WebViewer({
        //     containerId: this.viewerId,
        //     endpointUri: this.modelPath,
        //   });
    }

    render() {
        return (
            <div>Web Viewer {uuidv4()}</div>
        );
    }
}

// function ViewerComponent() {
//     return (
//         <div>Web Viewer</div>
//     );
// }

export default ViewerComponent;