import React from "react";
import '../styles/caret.css';

type MTCProps = {
  hwv: Communicator.WebViewer
};

class ModelTreeComponent extends React.Component<MTCProps, {}> {
  readonly rootNodeId = this.props.hwv.model.getAbsoluteRootNode();
  itemList: { [nodeId: number]: ModelTreeItemComponent } = {};  // A record of all the items in this tree

  componentDidMount() {
    for (const nodeId in this.itemList) {
      this.itemList[nodeId].setSelect(false);
    }
    this.props.hwv.setCallbacks({
      // Selection event from the web viewer
      selectionArray: (selectionEvents) => {
        for (const key in this.itemList) {
          this.itemList[key].setSelect(false);
        }
        selectionEvents.forEach(selectionEvent => {
          const nodeId = selectionEvent.getSelection().getNodeId();
          if (nodeId != null) {
            this.itemList[nodeId].setSelect(true);
          }
        });
      },
    });
  }

  updateItemList = (nodeId: Communicator.NodeId, treeItemComponent: ModelTreeItemComponent) => {
    this.itemList[nodeId] = treeItemComponent;
  }

  render() {
    return (
      <div className="list-group">
        <div className="d-none"></div>
        <ModelTreeItemComponent hwv={this.props.hwv} nodeId={this.rootNodeId} level={0} updateItemList={this.updateItemList}></ModelTreeItemComponent>
      </div>
    );
  }
}

/// props
/// hwv: The web viewer
/// nodeId: ID of the model node
/// level: Depth in the tree
/// updateItemList: callback to update the record of items
type MTICProps = {
  hwv: Communicator.WebViewer,
  nodeId: Communicator.NodeId,
  level: number,
  updateItemList: (nodeId: Communicator.NodeId, treeItemComponent: ModelTreeItemComponent) => void,
};

type MTICStates = {
  isSelected: boolean,
  isCollapsed: boolean,
};

class ModelTreeItemComponent extends React.Component<MTICProps, MTICStates> {
  childrenId: Communicator.NodeId[] = [];
  nodeName = "";
  state: MTICStates = {
    isSelected: false,
    isCollapsed: false,
  };

  constructor(props: MTICProps) {
    super(props);
    
    switch (props.hwv.model.getNodeType(props.nodeId)) {
      case Communicator.NodeType.Part:
      case Communicator.NodeType.PartInstance:
      case Communicator.NodeType.BodyInstance:
      case Communicator.NodeType.AssemblyNode: {
        let temp_nodeName = props.hwv.model.getNodeName(props.nodeId);
        this.nodeName = temp_nodeName ? temp_nodeName : "";
        this.childrenId = props.hwv.model.getNodeChildren(props.nodeId);
        props.updateItemList(props.nodeId, this);
        break;
      }
      default:
        break;
    }
  }

  setSelect = (isSelected: boolean) => {
    this.setState({
      isSelected: isSelected,
    });
  }

  selectClick = (event: React.MouseEvent) => {
    this.props.hwv.selectPart(
      !this.state.isSelected ? this.props.nodeId : null
    );
  }

  collapseClick = (event: React.MouseEvent) => {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  }

  render() {
    const paddingStyle = {
      paddingLeft: this.props.level * 20 + 10,
      marginBottom: -1,
    };
    const childrenItems = this.childrenId.map(childId => {
      return <ModelTreeItemComponent key={childId}
        hwv={this.props.hwv}
        nodeId={childId}
        level={this.props.level + 1}
        updateItemList={this.props.updateItemList}>
      </ModelTreeItemComponent>;
    });
    // Styles
    const caretClass =
      (this.childrenId.length > 0 ? 'caret ' : '') +
      (this.state.isCollapsed ? '' : 'caret-down');
    const selectionClass =
      this.state.isSelected ? 'bg-primary text-white ' : '';
    const nameDisplayClass = this.nodeName.length <= 0 ? 'd-none ' : 'd-flex ';
    return (
      <React.Fragment>
        <div className={'list-group-item list-group-item-action py-1 ' + selectionClass + nameDisplayClass} style={paddingStyle}>
          <div className={'py-1 ' + caretClass} onClick={this.collapseClick}></div>
          <div className="py-1 flex-fill cursor-pointer user-select-none" onClick={this.selectClick}>{this.nodeName}</div>
        </div>
        <div className={this.state.isCollapsed ? 'd-none' : ''}>{childrenItems}</div>
      </React.Fragment>
    );
  }
}

export default ModelTreeComponent;