import './App.css';
import microengine from './assets/microengine.scs';
import logo from './assets/ts3d_logo.png';
import ViewerComponent from './components/viewer-component';

function App() {
  return (
    <div>
      <div className="container-fluid p-0 m-0">
        <div className="row p-0 m-0" style={{ height: "100vh" }}>
          {/* HWP WebViewer with Custom Component */}
          <div className="col-6 p-0 m-0 border-end">
            <ViewerComponent modelUri={microengine}></ViewerComponent>
          </div>
          <div className="col-6 p-0 m-0 overflow-scroll" style={{ height: "100vh" }}>
            <img src={logo} className="img-fluid m-3" style={{ maxHeight: "100px" }} alt="TechSoft 3D LOGO"></img>
            {/* <img src="assets/ts3d_logo.png" class="img-fluid m-3" style="max-height: 100px;" alt="TechSoft 3D LOGO">
            <!-- Nav Bar -->
      <ul class="nav nav-tabs px-3">
              <li class="nav-item">
                <button class="nav-link" [{'active': currentTab == Tab.home}" (click)="changeTab(Tab.home)" type="button">Home</button>
        </li>
            <li class="nav-item">
              <button class="nav-link" [{'active': currentTab == Tab.modelStructure}" (click)="changeTab(Tab.modelStructure)" type="button">ModelStructure</button>
        </li>
      </ul>
        <!-- Tab Contents -->
      <div class="tab-content p-3">
          <!-- Home Tab -->
        <div class="tab-pane fade show" [{'active': currentTab == Tab.home}">
          <!-- Operator Selection -->
          <h5>Operator</h5>
          <select class="form-select mb-3" (change)="changeOperator($event)">
            <option value="Orbit">Orbit</option>
          <option value="Area Select">Area Select</option>
          <option value="Select">Select</option>
          <option value="Measure">Measure</option>
          </select>
        <!-- Camera Status -->
          <h5>Camera Status</h5>
        <p *ngIf="!cameraStatus">unavailable</p>
      <div *ngIf="cameraStatus">
      <p class="mb-0"><strong>Position:</strong>
              ({{ cameraStatus.position.x.toFixed(2) }}, {{ cameraStatus.position.y.toFixed(2) }},
              {{ cameraStatus.position.z.toFixed(2) }})
            </p>
      <p class="mb-0"><strong>Target:</strong>
              ({{ cameraStatus.target.x.toFixed(2) }}, {{ cameraStatus.target.y.toFixed(2) }},
              {{ cameraStatus.target.z.toFixed(2) }})
            </p>
      <p class="mb-0"><strong>Up:</strong>
              ({{ cameraStatus.up.x.toFixed(2) }}, {{ cameraStatus.up.y.toFixed(2) }}, {{ cameraStatus.up.z.toFixed(2) }})
            </p>
      <p class="mb-0"><strong>Width:</strong> {{ cameraStatus.width.toFixed(2) }} &nbsp; <strong>Height:</strong>
        {{ cameraStatus.height.toFixed(2) }}</p>
      <p class="mb-0"><strong>Projection:</strong> {{ cameraStatus.projection.toFixed(2) }} &nbsp;
              <strong>NearLimit:</strong> {{ cameraStatus.nearLimit.toFixed(2) }}
      </p>
      <p class="mb-0"><strong>Class Name:</strong> {{ cameraStatus.className }}</p>
    </div>
        </div >
        < !--ModelStructure Tab-- >
    <div class="tab-pane fade show" [ngClass] = "{'active': currentTab == Tab.modelStructure}" >
          <h5>Model Structure</h5>
          <p * ngIf="!modelStructureIsReady" > Model structure is not ready"</p>
    < app - model - tree * ngIf="modelStructureIsReady"[hwv] = "hwv" ></app - model - tree >
        </div >
      </div >
    </div > */}
          </div>
        </div >
      </div >
    </div >
  );
}

export default App;
