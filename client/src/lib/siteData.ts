export interface MonitoringSite {
  id: number;
  nameCn: string;
  nameEn: string;
  longitude: number;
  latitude: number;
  region: string;
}

export const monitoringSites: MonitoringSite[] = [
  { id: 1, nameCn: "美国华盛顿", nameEn: "Washington, USA", longitude: -122.85, latitude: 46.04, region: "International" },
  { id: 2, nameCn: "河南温县", nameEn: "Wen County, Henan", longitude: 113.14, latitude: 34.90, region: "Central China" },
  { id: 3, nameCn: "河北威县", nameEn: "Wei County, Hebei", longitude: 115.27, latitude: 37.06, region: "North China" },
  { id: 4, nameCn: "宁夏中卫", nameEn: "Zhongwei, Ningxia", longitude: 105.50, latitude: 37.35, region: "Northwest" },
  { id: 5, nameCn: "青海西宁", nameEn: "Xining, Qinghai", longitude: 101.62, latitude: 36.68, region: "Northwest" },
  { id: 6, nameCn: "甘肃张掖", nameEn: "Zhangye, Gansu", longitude: 100.58, latitude: 38.93, region: "Northwest" },
  { id: 7, nameCn: "陕西杨凌", nameEn: "Yangling, Shaanxi", longitude: 108.28, latitude: 34.19, region: "Northwest" },
  { id: 8, nameCn: "山东莘县", nameEn: "Shenxian, Shandong", longitude: 115.50, latitude: 36.32, region: "North China" },
  { id: 9, nameCn: "山东利津", nameEn: "Lijin, Shandong", longitude: 118.29, latitude: 37.58, region: "North China" },
  { id: 10, nameCn: "甘肃天水", nameEn: "Tianshui, Gansu", longitude: 105.91, latitude: 34.55, region: "Northwest" },
  { id: 11, nameCn: "山西祁县", nameEn: "Qi County, Shanxi", longitude: 112.42, latitude: 37.26, region: "North China" },
  { id: 12, nameCn: "山东高唐", nameEn: "Gaotang, Shandong", longitude: 116.10, latitude: 36.81, region: "North China" },
  { id: 13, nameCn: "北京通州", nameEn: "Tongzhou, Beijing", longitude: 116.75, latitude: 39.73, region: "North China" },
  { id: 14, nameCn: "辽宁新民", nameEn: "Xinmin, Liaoning", longitude: 122.75, latitude: 42.01, region: "Northeast" },
  { id: 15, nameCn: "黑龙江齐齐哈尔", nameEn: "Qiqihar, Heilongjiang", longitude: 124.22, latitude: 47.58, region: "Northeast" },
  { id: 16, nameCn: "吉林白城", nameEn: "Baicheng, Jilin", longitude: 122.84, latitude: 45.81, region: "Northeast" },
  { id: 17, nameCn: "河南南阳", nameEn: "Nanyang, Henan", longitude: 112.62, latitude: 33.05, region: "Central China" },
  { id: 18, nameCn: "内蒙古达拉特", nameEn: "Dalate, Inner Mongolia", longitude: 109.85, latitude: 40.37, region: "North China" },
  { id: 19, nameCn: "内蒙古磴口县", nameEn: "Dengkou, Inner Mongolia", longitude: 106.77, latitude: 40.48, region: "North China" },
  { id: 20, nameCn: "江苏宿迁", nameEn: "Suqian, Jiangsu", longitude: 118.31, latitude: 33.33, region: "East China" },
  { id: 21, nameCn: "新疆伊犁", nameEn: "Ili, Xinjiang", longitude: 80.84, latitude: 43.99, region: "Northwest" },
  { id: 22, nameCn: "河南济源", nameEn: "Jiyuan, Henan", longitude: 112.45, latitude: 35.04, region: "Central China" },
];

export const regions = [
  "All",
  "China",
  "North China",
  "Northeast",
  "Northwest",
  "Central China",
  "East China",
  "International",
];

export const regionsCn: Record<string, string> = {
  "All": "全部",
  "China": "中国",
  "North China": "华北",
  "Northeast": "东北",
  "Northwest": "西北",
  "Central China": "华中",
  "East China": "华东",
  "International": "国际",
};

export const stats = [
  { labelEn: "Monitoring Sites", labelCn: "监测站点", value: 22 },
  { labelEn: "Species Monitored", labelCn: "监测树种", value: 12, suffix: "+" },
  { labelEn: "Years of Data", labelCn: "数据年限", value: 15, suffix: "+" },
  { labelEn: "International Partners", labelCn: "国际合作", value: 1, suffix: "" },
];

// Simplified Yellow River Basin boundary polygon (lat/lng pairs)
// This is a simplified representation for visualization purposes
export const yellowRiverBasinCoords: [number, number][] = [
  [35.5, 96.0],
  [36.0, 97.5],
  [36.5, 99.0],
  [37.0, 100.0],
  [37.5, 101.0],
  [37.8, 102.5],
  [38.0, 103.5],
  [38.5, 104.5],
  [39.0, 105.5],
  [39.5, 106.5],
  [40.0, 107.0],
  [40.5, 108.0],
  [40.8, 109.0],
  [40.5, 110.0],
  [40.0, 110.5],
  [39.5, 111.0],
  [39.0, 111.5],
  [38.5, 112.0],
  [38.0, 112.5],
  [37.5, 113.0],
  [37.0, 113.5],
  [36.5, 114.0],
  [36.0, 115.0],
  [35.8, 116.0],
  [36.0, 117.0],
  [37.0, 118.0],
  [37.5, 118.5],
  [38.0, 119.0],
  // Return south
  [37.0, 119.0],
  [36.0, 118.0],
  [35.0, 117.0],
  [34.5, 116.0],
  [34.0, 115.0],
  [33.5, 114.0],
  [33.5, 113.0],
  [33.8, 112.0],
  [34.0, 111.0],
  [34.2, 110.0],
  [34.5, 109.0],
  [34.8, 108.0],
  [35.0, 107.0],
  [35.0, 106.0],
  [35.0, 105.0],
  [34.8, 104.0],
  [34.5, 103.0],
  [34.2, 102.0],
  [34.0, 101.0],
  [34.0, 100.0],
  [34.5, 99.0],
  [35.0, 97.5],
  [35.5, 96.0],
];
