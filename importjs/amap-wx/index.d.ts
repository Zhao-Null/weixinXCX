interface key {
    key: string;
}
export declare class AMapp {
    constructor(key: key);
    getDrivingRoute: any;
    getWalkingRoute: any;
    getTransitRoute: any;
    getRidingRoute: any;
    getRegeo(arg0: {
        location: string;
        success: (data: any) => void;
        fail: (info: any) => void;
    }): any;
}
