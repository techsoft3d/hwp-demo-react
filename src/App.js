import { Component } from 'react';
import './App.css';
import microengine from './assets/microengine.scs';
import logo from './assets/ts3d_logo.png';
import ViewerComponent from './components/viewer-component';

class App extends Component {
  constructor(props) {
    super(props);
    this.hwvReady = this.hwvReady.bind(this);
    this.state = {
      hwv: null,
    };
  }

  hwvReady(newHWV) {
    this.setState({
      hwv: newHWV,
    });
    console.log("hwv ready");
  }

  render() {
    return (
      <div>
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
              
            </div>
          </div >
        </div >
      </div >
    );
  }
}

export default App;
