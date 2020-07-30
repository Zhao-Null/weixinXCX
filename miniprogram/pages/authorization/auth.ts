import { Webapi } from "../../utils/web-api/webapi";

const appId = wx.getAccountInfoSync().miniProgram.appId;
const app = getApp<IAppOption>();

Page({
    data: {
        hasUserInfo: false,
    },
    onShow() {
        if (typeof this.getTabBar === "function" && this.getTabBar()) {
            let tab = this.getTabBar();
            tab.setData({
                selected: 1,
            });
        }
    },
    leave() {
        wx.navigateBack({
            delta: 1,
        });
    },
    getUserInfo(e: any) {
        console.log(e);
        if (e.detail.errMsg === "getUserInfo:fail auth deny") {
            return;
        }
        app.globalData.userInfo = e.detail.userInfo;
        wx.login({
            success: (res) => {
                if (res.code) {
                    Webapi.postRequest("user/LoginWechat", {
                        appid: appId,
                        encryptedData: e.detail.encryptedData,
                        iv: e.detail.iv,
                        code: res.code,
                    }).then((result: any) => {
                        console.log("LoginWechat", result);
                        if (result.result) {
                            this.setData({
                                hasUserInfo: true,
                            });
                        } else {
                            wx.showToast({
                                title: "授权公开信息失败",
                                icon: "none",
                                duration: 2000,
                            });
                        }
                    });
                } else {
                    wx.showToast({
                        title: "微信登录失败，请重试",
                        icon: "none",
                        duration: 2000,
                    });
                }
            },
            fail: () => {
                wx.showToast({
                    title: "微信登录失败，请重试",
                    icon: "none",
                    duration: 2000,
                });
            },
        });
    },
    getPhoneNumber(e: any) {
        console.log(e);
        if (e.detail.errMsg === "getPhoneNumber:fail user deny") {
            return;
        }
        wx.login({
            success: (res) => {
                if (res.code) {
                    let requestData = {
                        encryptedData: e.detail.encryptedData,
                        appid: appId,
                        iv: e.detail.iv,
                        code: res.code,
                    };
                    console.log(requestData);
                    Webapi.postRequest(
                        "user/OneKeyWechatLogin",
                        requestData
                    ).then((res: any) => {
                        console.log("OneKeyWechatLogin", res);
                        // console.log(res);
                        if (res.result) {
                            app.globalData.phone = res.phone;
                            wx.reLaunch({
                                url: "../main/main",
                            });
                        } else {
                            wx.showToast({
                                title: "授权手机号失败",
                                icon: "none",
                                duration: 2000,
                            });
                        }
                    });
                } else {
                    wx.showToast({
                        title: "微信登录失败，请重试",
                        icon: "none",
                        duration: 2000,
                    });
                }
            },
            fail: () => {
                wx.showToast({
                    title: "微信登录失败，请重试",
                    icon: "none",
                    duration: 2000,
                });
            },
        });
    },
});
