export interface CameraStatus {
    position: {
        x: number,
        y: number,
        z: number
    },
    target: {
        x: number,
        y: number,
        z: number
    },
    up: {
        x: number,
        y: number,
        z: number
    },
    width: number,
    height: number,
    projection: number,
    nearLimit: number,
    className: string
}