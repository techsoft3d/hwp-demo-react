import { Component } from 'react';
import './App.css';
import microengine from './assets/microengine.scs';
import logo from './assets/ts3d_logo.png';
import ViewerComponent from './components/viewer-component';

class App extends Component {
  constructor(props) {
    super(props);
    this.hwvReady = this.hwvReady.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.state = {
      hwv: null,
      currentTab: 1, // 1: Home, 2: ModelTree
      cameraStatus: null,
    };
  }

  hwvReady(newHWV) {
    this.setState({
      hwv: newHWV,
    }, () => {
      this.state.hwv.setCallbacks({
        sceneReady: () => {
          this.setState({
            cameraStatus: this.state.hwv.view.getCamera().toJson(),
          });
        },
        modelStructureReady: () => {
          // this.modelStructureIsReady = true;
          // this.rootNodeId = newHwv.model.getAbsoluteRootNode();
        },
        camera: () => {
          this.setState({
            cameraStatus: this.state.hwv.view.getCamera().toJson(),
          });
        }
      });
    });
    console.log("hwv ready");
  }

  changeTab(newTab) {
    this.setState({
      currentTab: newTab,
    });
  }

  render() {
    const navItem = (value, content) => {
      return <li className="nav-item">
        <button
          className={'nav-link ' + (this.state.currentTab === value ? 'active' : '')}
          onClick={() => { this.changeTab(value) }}
          type="button">{content}</button></li>;
    };
    const cameraStatusContent = this.state.cameraStatus == null ? <p>Unavailable</p> :
      <div>
        <p className="mb-0"><strong>Position:</strong>
          {this.state.cameraStatus.position.x.toFixed(2)}, {this.state.cameraStatus.position.y.toFixed(2)}, {this.state.cameraStatus.position.z.toFixed(2)}
        </p>
        <p className="mb-0"><strong>Target:</strong>
          {this.state.cameraStatus.target.x.toFixed(2)}, {this.state.cameraStatus.target.y.toFixed(2)}, {this.state.cameraStatus.target.z.toFixed(2)}
        </p>
        <p className="mb-0"><strong>Up:</strong>
          {this.state.cameraStatus.up.x.toFixed(2)}, {this.state.cameraStatus.up.y.toFixed(2)}, {this.state.cameraStatus.up.z.toFixed(2)}
        </p>
        <p className="mb-0">
          <strong>Width:</strong> {this.state.cameraStatus.width.toFixed(2)} &nbsp;
        <strong>Height:</strong> {this.state.cameraStatus.height.toFixed(2)}
        </p>
        <p className="mb-0">
          <strong>Projection:</strong> {this.state.cameraStatus.projection.toFixed(2)} &nbsp;
        <strong>NearLimit:</strong> {this.state.cameraStatus.nearLimit.toFixed(2)}
        </p>
        <p className="mb-0"><strong>Class Name:</strong> {this.state.cameraStatus.className}</p>
      </div>;
    const homeTabContent = <div className={'tab-pane fade show ' + (this.state.currentTab === 1 ? 'active' : '')}>
      {/* Operator Selection */}
      <h5>Operator</h5>
      <select className="form-select mb-3">
        <option value="Orbit">Orbit</option>
        <option value="Area Select">Area Select</option>
        <option value="Select">Select</option>
        <option value="Measure">Measure</option>
      </select>
      {/* Camera Status */}
      <h5>Camera Status</h5>
      {cameraStatusContent}
    </div>;
    const modelStructureTabContent = <div className={'tab-pane fade show ' + (this.state.currentTab === 2 ? 'active' : '')}>
      <h5>Model Structure</h5>
      <p >Model structure is not ready"</p>
    </div>;

    return (
      <div className="container-fluid p-0 m-0">
        <div className="row p-0 m-0" style={{ height: "100vh" }}>
          {/* HWP WebViewer with Custom Component */}
          <div className="col-6 p-0 m-0 border-end">
            <ViewerComponent modelUri={microengine} hwvReady={this.hwvReady}></ViewerComponent>
          </div>
          {/* Control panel on the right side */}
          <div className="col-6 p-0 m-0 overflow-scroll" style={{ height: "100vh" }}>
            {/* Logo */}
            <img src={logo} className="img-fluid m-3" style={{ maxHeight: "100px" }} alt="TechSoft 3D LOGO"></img>
            {/* NavBar */}
            <ul className="nav nav-tabs px-3">
              {navItem(1, "Home")}
              {navItem(2, "ModelStructure")}
            </ul>
            {/* Tab Contents */}
            <div className="tab-content p-3">
              {homeTabContent}{modelStructureTabContent}
            </div > {/* Tab Contents End */}
          </div > {/* Right Panel End */}
        </div > {/* Row End */}
      </div >
    );
  }
}

export default App;
