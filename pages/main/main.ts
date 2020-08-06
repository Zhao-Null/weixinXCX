// miniprogram/pages/main/main.js
Page({
    data: {},
    onShow() {
        if (typeof this.getTabBar === "function" && this.getTabBar()) {
            let tab = this.getTabBar();
            tab.setData({
                selected: 0,
            });
        }
    },
    onLoad() {
        console.log(12);
    },
});
