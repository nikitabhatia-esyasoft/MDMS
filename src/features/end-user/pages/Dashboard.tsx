import { useEffect, useState } from "react";

import { Zap, Gauge, CalendarDays, RefreshCw } from "lucide-react";

import {
  PageHeader,
  StatCard,
  Loader,
  EmptyState,
  Button,
} from "../../../shared/components";

import { getDailyConsumption } from "../services/consumptionService";

import type { DailyData } from "../types/consumption";
import { ChartCard } from "../../../shared/components";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function Dashboard() {
  const [data, setData] = useState<DailyData[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const response = await getDailyConsumption();

        if (active) {
          setData(response.data);
        }
      } catch {
        if (active) {
          setError("Unable to load consumption data.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void fetchData();

    return () => {
      active = false;
    };
  }, [refreshKey]);

  const totalConsumption = data.reduce((total, item) => total + item.units, 0);

  const averageConsumption =
    data.length > 0 ? totalConsumption / data.length : 0;

  function refreshData() {
    setRefreshKey((previous) => previous + 1);
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Monitor your energy consumption"
        actions={
          <Button
            variant="secondary"
            icon={<RefreshCw size={16} />}
            onClick={refreshData}
            disabled={loading}
          >
            Refresh
          </Button>
        }
      />

      {loading ? (
        <Loader message="Loading consumption data..." />
      ) : error ? (
        <EmptyState
          title="Unable to load data"
          description={error}
          action={<Button onClick={refreshData}>Try again</Button>}
        />
      ) : data.length === 0 ? (
        <EmptyState
          title="No consumption data"
          description="Meter readings will appear here."
        />
      ) : (
        <>
          <div className="stats-grid">
            <StatCard
              label="Total consumption"
              value={`${totalConsumption.toFixed(1)} kWh`}
              icon={<Zap size={22} />}
            />

            <StatCard
              label="Average daily usage"
              value={`${averageConsumption.toFixed(1)} kWh`}
              icon={<Gauge size={22} />}
            />

            <StatCard
              label="Recorded days"
              value={data.length}
              icon={<CalendarDays size={22} />}
            />
          </div>

          <div style={{ marginTop: 24 }}>
            <ChartCard
              title="Daily energy consumption"
              subtitle="Energy usage recorded by your meter"
              empty={data.length === 0}
            >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
            <LineChart data={data}>
            <CartesianGrid
              stroke="var(--color-chart-grid)"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="date"
              stroke="var(--color-text-muted)"
            />

            <YAxis
              stroke="var(--color-text-muted)"
            />

            <Tooltip
              contentStyle={{
                backgroundColor:
                  "var(--color-surface)",
                borderColor:
                  "var(--color-border)",
                color: "var(--color-text)",
              }}
              labelStyle={{
                color: "var(--color-text)",
              }}
            />

            <Line
              type="monotone"
              dataKey="units"
              name="Consumption (kWh)"
              stroke="var(--color-chart-primary)"
              strokeWidth={2}
            />
            </LineChart>
            </ResponsiveContainer>
            </ChartCard>
          </div>

          <section className="stat-card" style={{ marginTop: 24 }}>
            <h2>Daily consumption</h2>

            {data.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <span>{item.date}</span>

                <span>{item.units} kWh</span>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
}

export default Dashboard;
