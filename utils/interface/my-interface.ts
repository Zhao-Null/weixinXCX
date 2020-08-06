export interface Points {
    longitude: string | number;
    latitude: string | number;
}
export interface Polyline {
    points: Points[];
    color: string;
    width: 6;
}
export interface PathRoute {
    [key: string]: any;
    polyline: Polyline;
    duration: string;
    distance?: string;
    cost?: string;
}
export interface PathBack {
    paths: PathRoute[];
    cost?: string;
}

export type PathRouteVoid = (
    origin: string,
    destination: string
) => Promise<PathRoute>;

export type TransitRouteVoid = (
    origin: string,
    destination: string
) => Promise<{ transits: any }>;
export type Regeo = (origin: string) => Promise<any>;

export type DrivingRouteVoid = (
    origin: string,
    destination: string
) => Promise<PathBack>;

export type WalkingRouteVoid = (
    origin: string,
    destination: string
) => Promise<PathRoute[]>;

export type RidingRouteVoid = DrivingRouteVoid;

export interface Instruction {
    road: string;
    instruction: string[];
}
