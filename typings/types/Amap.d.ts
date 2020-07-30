declare namespace AMapp {
    interface key {
        key: string;
    }
    export class AMapWX {
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
}
