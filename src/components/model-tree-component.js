import React, { Component } from "react";
import Communicator from 'communicator';
import '../styles/caret.css';

/// props
/// hwv: The web viewer
class ModelTreeComponent extends Component {
  constructor(props) {
    super(props);
    this.updateItemList = this.updateItemList.bind(this);
    this.rootNodeId = this.props.hwv.model.getAbsoluteRootNode();
    this.itemList = {};  // A record of all the items in this tree
  }

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
          this.itemList[nodeId].setSelect(true);
        });
      },
    });
  }

  updateItemList(nodeId, treeItemComponent) {
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
class ModelTreeItemComponent extends Component {
  constructor(props) {
    super(props);
    this.setSelect = this.setSelect.bind(this);
    this.selectClick = this.selectClick.bind(this);
    this.collapseClick = this.collapseClick.bind(this);
    this.childrenId = [];
    this.nodeName = "";
    this.state = {
      isSelected: false,
      isCollapsed: false,
    };

    switch (this.props.hwv.model.getNodeType(this.props.nodeId)) {
      case Communicator.NodeType.Part:
      case Communicator.NodeType.PartInstance:
      case Communicator.NodeType.BodyInstance:
      case Communicator.NodeType.AssemblyNode: {
        this.nodeName = this.props.hwv.model.getNodeName(this.props.nodeId);
        this.childrenId = this.props.hwv.model.getNodeChildren(this.props.nodeId);
        this.props.updateItemList(this.props.nodeId, this);
        break;
      }
      default:
        break;
    }
  }

  setSelect(isSelected) {
    this.setState({
      isSelected: isSelected,
    });
  }

  selectClick(event) {
    this.props.hwv.selectPart(
      !this.state.isSelected ? this.props.nodeId : null
    );
  }

  collapseClick(event) {
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
    return (
      <React.Fragment>
        <div className={'list-group-item list-group-item-action d-flex py-1 ' + selectionClass} style={paddingStyle}>
          <div className={'py-1 ' + caretClass} onClick={this.collapseClick}></div>
          <div className="py-1 flex-fill cursor-pointer user-select-none" onClick={this.selectClick}>{this.nodeName}</div>
        </div>
        <div className={this.state.isCollapsed ? 'd-none' : ''}>{childrenItems}</div>
      </React.Fragment>
    );
  }
}

export default ModelTreeComponent;