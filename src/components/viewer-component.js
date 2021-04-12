import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import microengine from '../assets/microengine.scs';
import Communicator from "communicator";
// import Communicator from "https://cdn.jsdelivr.net/gh/techsoft3d/hoops-web-viewer@2020.0.0/hoops_web_viewer.js?v=2021.0.0";

class ViewerComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(microengine);
        var hwv = new Communicator.WebViewer({
            containerId: "viewerId",
            endpointUri: microengine,
        });

        hwv.setCallbacks({
            sceneReady: () => {
                hwv.view.setBackgroundColor(Communicator.Color.blue(), Communicator.Color.blue());
            },
        });

        hwv.start();
    }

    render() {
        return (
            <div className="bg-light position-relative" id="viewerId" style={{width: "500px", height: "500px"}}></div>
        );
    }
}

// function ViewerComponent() {
//     return (
//         <div>Web Viewer</div>
//     );
// }

export default ViewerComponent;