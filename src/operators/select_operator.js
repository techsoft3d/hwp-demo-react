import Communicator from 'communicator';

class SelectOperator {
    constructor(hwv) {
        this._hwv = hwv;
    }

    onMouseDown(event) {
        var config = new Communicator.PickConfig(Communicator.SelectionMask.Face | Communicator.SelectionMask.Line);
        this._hwv.selectionManager.clear();
        this._hwv.view.pickFromPoint(event.getPosition(), config).then((selection) => {
            if (selection.getNodeId() != null) {
                this._hwv.selectionManager.set(selection);
            }
        });
    }
}

export default SelectOperator;