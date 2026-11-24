import API from "../../../services/http";
import type { DailyData, MonthlyData, WeeklyData } from "../types/consumption";

export const getDailyConsumption = () => API.get<DailyData[]>("/dailyData");
export const getWeeklyConsumption = () => API.get<WeeklyData[]>("/weeklyData");
export const getMonthlyConsumption = () => API.get<MonthlyData[]>("/monthlyData");
