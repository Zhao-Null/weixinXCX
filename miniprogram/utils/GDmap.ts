import {
    Points,
    PathRoute,
    PathRouteVoid,
    TransitRouteVoid,
    AMap,
    Regeo,
    DrivingRouteVoid,
    PathBack,
    WalkingRouteVoid,
    RidingRouteVoid,
    Instruction,
} from "./interface/GO-interface";
import { foundSml, toZhDigit } from "./util";

var AMapp: AMap = require("../utils/amap-wx.js");
// 驾车
export const drivingRoute: DrivingRouteVoid = (
    origin: string,
    destination: string
) => {
    const app = getApp<IAppOption>();
    let myAmapFun = new AMapp.AMapWX({ key: app.globalData.GDKEY });
    return new Promise((res, rej) => {
        myAmapFun.getDrivingRoute({
            origin,
            destination,
            success: function (data: any) {
                console.log("drivingRoute-data", data);
                const value = (path: any) => {
                    var points: Points[] = [];
                    let roaddetails: Instruction[] = [
                        { road: "当前位置", instruction: [] },
                    ];
                    var steps = path.steps;
                    if (path.steps) {
                        let road = "";
                        for (var i = 0; i < steps.length; i++) {
                            if (
                                !steps[i].road ||
                                !steps[i].road.length ||
                                road == steps[i].road
                            ) {
                                roaddetails[
                                    roaddetails.length - 1
                                ].instruction.push(steps[i].instruction);
                            } else {
                                road = steps[i].road;
                                roaddetails.push({
                                    road,
                                    instruction: [steps[i].instruction],
                                });
                            }
                            var poLen = steps[i].polyline.split(";");
                            for (var j = 0; j < poLen.length; j++) {
                                points.push({
                                    longitude: parseFloat(
                                        poLen[j].split(",")[0]
                                    ),
                                    latitude: parseFloat(
                                        poLen[j].split(",")[1]
                                    ),
                                });
                            }
                        }
                    }
                    let obj: PathRoute = {
                        polyline: {
                            points: points,
                            color: "#0091ff",
                            width: 6,
                        },
                        duration: "",
                    };

                    if (roaddetails.length > 0) obj.roaddetails = roaddetails;
                    if (path.distance) obj.distance = path.distance + "米";
                    if (path.duration)
                        obj.duration =
                            parseInt(path.duration / 60 + "") + "分钟";
                    if (path.strategy) obj.strategy = path.strategy;
                    if (path.traffic_lights)
                        obj.traffic_lights = path.traffic_lights;

                    return obj;
                };
                let obj: PathBack = {
                    paths: [],
                };
                if (data.paths && data.paths.length >= 1) {
                    data.paths.forEach((item: any) => {
                        obj.paths.push(value(item));
                    });
                }
                if (data.taxi_cost) {
                    obj.cost = "打车约" + parseInt(data.taxi_cost) + "元";
                }
                res(obj);
            },
            fail: function (info: any) {
                rej(info);
            },
        });
    });
};
// 走路
export const WalkingRoute: WalkingRouteVoid = (
    origin: string,
    destination: string
) => {
    const app = getApp<IAppOption>();
    let myAmapFun = new AMapp.AMapWX({ key: app.globalData.GDKEY });
    return new Promise((res, rej) => {
        myAmapFun.getWalkingRoute({
            origin,
            destination,
            success: function (data: any) {
                console.log("WalkingRoute-data", data);
                const value = (path: any) => {
                    var points = [];
                    let roaddetails: Instruction[] = [
                        { road: "当前位置", instruction: [] },
                    ];
                    if (path.steps) {
                        let road = "";
                        var steps = path.steps;
                        for (var i = 0; i < steps.length; i++) {
                            if (
                                !steps[i].road ||
                                !steps[i].road.length ||
                                road == steps[i].road
                            ) {
                                roaddetails[
                                    roaddetails.length - 1
                                ].instruction.push(steps[i].instruction);
                            } else {
                                road = steps[i].road;
                                roaddetails.push({
                                    road,
                                    instruction: [steps[i].instruction],
                                });
                            }
                            var poLen = steps[i].polyline.split(";");
                            for (var j = 0; j < poLen.length; j++) {
                                points.push({
                                    longitude: parseFloat(
                                        poLen[j].split(",")[0]
                                    ),
                                    latitude: parseFloat(
                                        poLen[j].split(",")[1]
                                    ),
                                });
                            }
                        }
                    }
                    let obj: PathRoute = {
                        polyline: {
                            points: points,
                            color: "#0091ff",
                            width: 6,
                        },
                        duration: "",
                    };

                    if (roaddetails.length > 0) obj.roaddetails = roaddetails;
                    if (path.distance) obj.distance = path.distance + "米";
                    if (path.duration)
                        obj.duration =
                            parseInt(path.duration / 60 + "") + "分钟";
                    return obj;
                };
                let obj: PathRoute[] = [];
                if (data.paths && data.paths.length >= 1) {
                    data.paths.forEach((item: any) => {
                        obj.push(value(item));
                    });
                }
                res(obj);
            },
            fail: function (info: any) {
                rej(info);
            },
        });
    });
};
// 公交
export const TransitRoute: TransitRouteVoid = (
    origin: string,
    destination: string
) => {
    const app = getApp<IAppOption>();
    let myAmapFun = new AMapp.AMapWX({ key: app.globalData.GDKEY });
    return new Promise((res, rej) => {
        myAmapFun.getTransitRoute({
            origin,
            destination,
            city: "北京",
            success: function (data: any) {
                console.log("TransitRoute-data", data);
                if (data && data.transits) {
                    var transits = data.transits;
                    for (var i = 0; i < transits.length; i++) {
                        var segments = transits[i].segments;
                        transits[i].transport = [];
                        for (var j = 0; j < segments.length; j++) {
                            if (
                                segments[j].bus &&
                                segments[j].bus.buslines &&
                                segments[j].bus.buslines[0] &&
                                segments[j].bus.buslines[0].name
                            ) {
                                var name = segments[j].bus.buslines[0].name;
                                if (j !== 0) {
                                    name = "--" + name;
                                }
                                transits[i].transport.push(name);
                            }
                        }
                    }
                }
                res(transits);
            },
            fail: function (info: any) {
                rej(info);
            },
        });
    });
};
// 骑行
export const RidingRoute: RidingRouteVoid = (
    origin: string,
    destination: string
) => {
    const app = getApp<IAppOption>();
    let myAmapFun = new AMapp.AMapWX({ key: app.globalData.GDKEY });
    return new Promise((res, rej) => {
        myAmapFun.getRidingRoute({
            origin,
            destination,
            city: "北京",
            success: function (data: any) {
                console.log("RidingRoute-data", data);
                const value = (path: any) => {
                    var points = [];
                    let roaddetails: Instruction[] = [
                        { road: "当前位置", instruction: [] },
                    ];
                    if (path.steps) {
                        let road = "";
                        var steps = path.steps;
                        for (var i = 0; i < steps.length; i++) {
                            if (
                                !steps[i].road ||
                                !steps[i].road.length ||
                                road == steps[i].road
                            ) {
                                roaddetails[
                                    roaddetails.length - 1
                                ].instruction.push(steps[i].instruction);
                            } else {
                                road = steps[i].road;
                                roaddetails.push({
                                    road,
                                    instruction: [steps[i].instruction],
                                });
                            }
                            var poLen = steps[i].polyline.split(";");
                            for (var j = 0; j < poLen.length; j++) {
                                points.push({
                                    longitude: parseFloat(
                                        poLen[j].split(",")[0]
                                    ),
                                    latitude: parseFloat(
                                        poLen[j].split(",")[1]
                                    ),
                                });
                            }
                        }
                    }
                    let obj: PathRoute = {
                        polyline: {
                            points: points,
                            color: "#0091ff",
                            width: 6,
                        },
                        duration: "",
                    };

                    if (roaddetails.length > 0) obj.roaddetails = roaddetails;
                    if (path.distance) obj.distance = path.distance + "米";
                    if (path.duration)
                        obj.duration =
                            parseInt(path.duration / 60 + "") + "分钟";

                    return obj;
                };
                let obj: PathBack = {
                    paths: [],
                };
                if (data.paths && data.paths.length >= 1) {
                    data.paths.forEach((item: any) => {
                        obj.paths.push(value(item));
                    });
                }
                res(obj);
            },
            fail: function (info: any) {
                rej(info);
            },
        });
    });
};
// 获取地址描述信息
export const regeo: Regeo = (location: string) => {
    const app = getApp<IAppOption>();
    let myAmapFun = new AMapp.AMapWX({ key: app.globalData.GDKEY });
    return new Promise((res, rej) => {
        myAmapFun.getRegeo({
            location: location,
            success: function (data: any) {
                console.log(data);
                res(data);
            },
            fail: function (info: any) {
                console.log(info);
                rej(info);
            },
        });
    });
};
// 依照duration查找推荐
export const recommended_program = (data: PathRoute[]): PathRoute[] => {
    let recommend = [];
    let fn = (a: any, b: any) => {
        a = parseFloat(a);
        b = parseFloat(b);
        return a > b;
    };
    let sml = foundSml(data, "duration", fn);
    recommend[0] = data[sml.index];
    let filter = data.filter((item, index) => {
        item.name = toZhDigit(index);
        if (index != sml.index) {
            item.polyline.color = "#B9C9E6";
        }
        return index != sml.index;
    });
    console.log("recommended_program", [...recommend, ...filter]);
    return [...recommend, ...filter];
};
