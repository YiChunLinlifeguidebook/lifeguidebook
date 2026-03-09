import { jsonResponse } from "../../utils/response.js";

/**
 * GET /api/guide
 * Returns the LifeGuide topic categories that users can explore.
 */
const TOPICS = [
  {
    id: "emotion",
    label: "情緒管理",
    description: "認識並調節自己的情緒，建立心理韌性。",
  },
  {
    id: "relationship",
    label: "人際關係",
    description: "家庭、友情、愛情與職場關係的溝通技巧。",
  },
  {
    id: "career",
    label: "職涯發展",
    description: "找到人生方向、設定目標，並持續成長。",
  },
  {
    id: "health",
    label: "身心健康",
    description: "睡眠、運動、飲食與正念，照顧整體健康。",
  },
  {
    id: "finance",
    label: "財務規劃",
    description: "記帳、儲蓄、投資的基本觀念與入門指引。",
  },
];

export async function onRequestGet() {
  return jsonResponse(
    { topics: TOPICS },
    { cacheControl: "public, max-age=3600" }
  );
}
