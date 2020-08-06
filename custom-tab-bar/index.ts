Component({
    data: {
        selected: 0,
        color: "#2D2D2D",
        selectedColor: "#FF8080",
        backgroundColor: "#fff",
        list: [
            {
                pagePath: "/pages/main/main",
                iconPath: "../assets/icon/main-no.png",
                selectedIconPath: "../assets/icon/main.png",
                text: "主页",
            },
            {
                pagePath: "/pages/vote/index",
                iconPath: "../assets/icon/vote-no.png",
                selectedIconPath: "../assets/icon/vote.png",
                text: "例子",
            },
            {
                pagePath: "/pages/dominos/dominos",
                iconPath: "../assets/icon/dominos-no.png",
                selectedIconPath: "../assets/icon/dominos.png",
                text: "看着",
            },
            {
                pagePath: "/pages/my/my",
                iconPath: "../assets/icon/me-no.png",
                selectedIconPath: "../assets/icon/me.png",
                text: "我的",
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
            console.log(data.index);

            this.setData({
                selected: data.index,
            });
        },
    },
});
