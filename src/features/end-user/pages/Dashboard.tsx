import { useEffect, useState } from "react";
import { getDailyConsumption } from "../services/consumptionService";
import type { DailyData } from "../types/consumption";
function Dashboard() {
  const [data, setData] = useState<DailyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getDailyConsumption();
        setData(response.data);
      } catch {
        setError("Unable to fetch daily data consumption");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (data.length == 0) return <div>No consumption data present...</div>;
  return (
    <div>
      <h2>Daily Consumption</h2>
      {data.map((item) => (
        <p key={item.id}>
          {item.date}: {item.units} units
        </p>
      ))}
    </div>
  );
}
export default Dashboard;
