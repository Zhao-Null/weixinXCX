import * as dayjs from "dayjs";

export const formatTime = (
    date: Date,
    type: string = "YYYY/MM/DD HH:mm:ss"
) => {
    return dayjs(date).format(type);
};

export const getDateList = (year?: number, month?: number) => {
    let dm = dayjs(new Date());
    if (year && month) {
        dm = dayjs(`${year}-${month}-1}`);
    }
    const dayCount = dm.daysInMonth();
    const weeks = ["一", "二", "三", "四", "五", "六", "日"];

    return Array.from({ length: dayCount }, (_v: any, i: number) => {
        return {
            day: i + 1,
            week:
                weeks[dayjs(`${dm.year()}-${dm.month() + 1}-${i}}`).get("day")],
            month: dm.month() + 1,
            year: dm.year(),
        };
    });
};
// 找最小，fn为true
export const foundSml = <T, F extends keyof T>(
    data: T[],
    attr: F,
    fn?: (a: any, b: any) => boolean
) => {
    let sml = data[0][attr];
    let index = 0;
    if (!fn) {
        fn = (a: any, b: any) => {
            return a > b;
        };
    }
    for (let i = 1; i < data.length; i++) {
        let boo = fn(sml, data[i][attr]);
        boo && ((sml = data[i][attr]), (index = i));
    }
    return { sml, index };
};
// 数字转化为中文数字
// 方案一 传入为下标
export const toZhDigit = (num: number | string, isadd: boolean = true) => {
    num = isadd ? +num + 1 : +num;
    let n = num + "";
    let len = n.length;
    let str = "";
    if (len >= 5) {
        return "超限";
    }
    const zh = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    const unit = ["千", "百", "十", ""];
    unit.splice(0, unit.length - len);
    for (let i = 0; i < len; i++) {
        str += zh[+n[i]] + unit[i];
    }
    return str;
};
