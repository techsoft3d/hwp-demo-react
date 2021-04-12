import Communicator from 'communicator';

class MeasureOperator {
    constructor(hwv) {
        this._hwv = hwv;
        this._activeIndication = null;
    }

    onMouseDown(event) {
        var config = new Communicator.PickConfig(Communicator.SelectionMask.Face | Communicator.SelectionMask.Line);
        this._hwv.selectionManager.clear();

        this._hwv.view.pickFromPoint(event.getPosition(), config).then((selectionItem) => {
            if (selectionItem.getNodeId() !== null) {
                var position = selectionItem.getPosition();
                var markupManager = this._hwv.markupManager;

                if (this._activeIndication === null) {
                    this._activeIndication = new DistanceMarkup(
                        this._hwv, 
                        position, 
                        this._hwv.model.getNodeUnitMultiplier(selectionItem.getNodeId()));
                    markupManager.registerMarkup(this._activeIndication);
                } else {
                    this._activeIndication.point2 = position;
                    this._activeIndication.finalize();
                    this._activeIndication = null;
                }
            }
        });
    }

    onMouseMove(event) {
        if (this._activeIndication === null) {
            return;
        }
        var config = new Communicator.PickConfig(Communicator.SelectionMask.Face | Communicator.SelectionMask.Line);
        this._hwv.selectionManager.clear();
        this._hwv.view.pickFromPoint(event.getPosition(), config).then((selectionItem) => {
            if (selectionItem.getNodeId() !== null) {
                var position = selectionItem.getPosition();
                this._activeIndication.point2 = position;
                this._hwv.markupManager.refreshMarkup();
            }
        });
    }
}

class DistanceMarkup extends Communicator.Markup.MarkupItem {
    constructor(hwv, point, unit) {
        super();
        this._hwv = hwv;
        this.point1 = point;
        this.point2 = null;
        this._unit = unit;
        this._isFinalized = false;
    }

    draw() {
        // Draw at the 'click' locations
        var view = this._hwv.view;
        if (this.point1 !== null) {
            // draw the first point
            var circle = new Communicator.Markup.Shape.Circle();
            var point3d = view.projectPoint(this.point1);
            circle.set(Communicator.Point2.fromPoint3(point3d), 2.0);
            this._hwv.markupManager.getRenderer().drawCircle(circle);

            if (this.point2 !== null) {
                // draw the second point
                point3d = view.projectPoint(this.point2);
                circle.set(Communicator.Point2.fromPoint3(point3d), 2.0);
                this._hwv.markupManager.getRenderer().drawCircle(circle);

                // draw a line between the points
                var line = new Communicator.Markup.Shape.Line();
                var point3d1 = view.projectPoint(this.point1);
                var point3d2 = view.projectPoint(this.point2);
                line.setP1(Communicator.Point2.fromPoint3(point3d1));
                line.setP2(Communicator.Point2.fromPoint3(point3d2));
                if (!this._isFinalized) {
                    line.setStrokeWidth(5);
                }
                this._hwv.markupManager.getRenderer().drawLine(line);

                // add a label
                var midpoint = new Communicator.Point3((point3d1.x + point3d2.x) / 2, (point3d1.y + point3d2.y) / 2, (point3d1.z + point3d2.z) / 2);
                var length = Communicator.Point3.subtract(this.point2, this.point1).length() * this._unit;

                var text = new Communicator.Markup.Shape.Text(
                    length.toFixed(2) + "mm",
                    Communicator.Point2.fromPoint3(midpoint));
                text.setFillColor(Communicator.Color.red());
                this._hwv.markupManager.getRenderer().drawText(text);
            }
        }
    }

    finalize() {
        this._isFinalized = true;
        this._hwv.markupManager.refreshMarkup();
    }
}

export default MeasureOperator;