/// <reference path="./types/index.d.ts" />

interface IAppOption {
    globalData: {
        userInfo?: WechatMiniprogram.UserInfo;
        address: string;
        token: string;
        phone: number;
        authorization: boolean;
        GDKEY: string;
    };
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
}
