// miniprogram/pages/vote/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {},

    onShow: function () {
        if (typeof this.getTabBar === "function" && this.getTabBar()) {
            let tab = this.getTabBar();
            tab.setData({
                selected: 1,
            });
        }
    },
});
