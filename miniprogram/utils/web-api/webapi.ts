export class Webapi {
    static postRequest(url: string, data: any): Promise<any> {
        const app = getApp<IAppOption>();
        return new Promise((resolve: any, reject: any) => {
            wx.request({
                url: app.globalData.address + url,
                data: JSON.stringify(data || {}),
                method: "POST",
                header: {
                    "content-type": "application/json",
                    Authorization: app.globalData.token,
                },
                success: (res) => resolve(res.data),
                fail: (error) => reject(error),
            });
        });
    }
}
