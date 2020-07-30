Component({
    data: {
        selected: 0,
        color: "#B3B3B3",
        selectedColor: "#5EC76C",
        backgroundColor: "#fff",
        list: [
            {
                pagePath: "/pages/my/my",
                iconPath: "../assets/icon/md-school-no-se.png",
                selectedIconPath: "../assets/icon/md-school-se.png",
                text: "my",
            },
            {
                pagePath: "/pages/authorization/auth",
                iconPath: "../assets/icon/donut-small-no-se.png",
                selectedIconPath: "../assets/icon/donut-small-se.png",
                text: "auth",
            },
        ],
    },
    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached: function () {
            this.getTabBar();
        },
    },
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset;
            const url = data.path;
            wx.switchTab({ url });
            this.setData({
                selected: data.index,
            });
        },
    },
});
