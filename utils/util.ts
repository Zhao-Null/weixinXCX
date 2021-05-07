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

/**
 * 取出可选参数
 */
export type NullableKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];

/**
 * 返回函数首个参数类型
 */
export type Parameter<T extends (...args: any) => any> = Required<Parameters<T>>[0];

export type wxBackType = "success" | "complete" | "fail";
/**
 * 是否含有 success
 */
export type OptionalParameter<T extends (...args: any) => any> = NullableKeys<
  Parameter<T>
> &
  "success" extends never
  ? never
  : T;

/**
 * 使用promise的方式调用原本wx接口
 * 必须含有options参数的接口  同时会丢弃如wx.downloadFile返回的DownloadTask
 * @returns 返回值为原微信api的success函数参数
 * @param fn 微信接口 若推断为never 则此微信接口不能使用该方法
 * @param args 函数参数
 * @example 1. WxAsync(wx.xxx,{options})
 * @example 2. WxAsync(wx.saveFile,{}).then(res)
 */
export const WxAsync = <T extends (args: any) => any, U extends Parameter<T>>(
  fn: OptionalParameter<T>,
  args: Omit<U, wxBackType> 
): Promise<Parameter<Parameter<T>["success"]>> => {
  return new Promise((resolve, reject) => {
    let cb = [{ success: 1 }, { complete: 2 }, { fail: 3 }].map((item) => {
      let key = Object.keys(item)[0] as wxBackType;
      return {
        [key]: (res: any) => {
          key === "success" ? resolve(res) : reject(res);
        },
      };
    });
    args = Object.assign(args || {}, ...cb);
    fn(args);
  });
};

