import { writeFileSync } from "node:fs";

let seed = 42;

function random() {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}

function randomInt(min, max) {
  return Math.floor(
    random() * (max - min + 1)
  ) + min;
}

function round(value) {
  return Math.round(value * 100) / 100;
}

function makeId(prefix, number) {
  return `${prefix}-${String(number).padStart(3, "0")}`;
}

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function pick(array) {
  return array[randomInt(0, array.length - 1)];
}

const referenceDate = new Date(
  "2026-11-26T12:00:00Z"
);

const zones = [];
const users = [];
const meters = [];
const bills = [];
const billDays = [];
const chartSeries = [];
const alerts = [];
const notifications = [];
const auditLogs = [];
const settings = [];

users.push({
  id: "ENT-001",
  name: "Enterprise Administrator",
  email: "enterprise@mdms.example",
  phone: "9000000000",
  role: "enterprise",
  zoneId: null,
  status: "Active",
  meterCount: 0,
});

const zoneNames = [
  "Mangalore",
  "Udupi",
  "Surathkal",
  "Mulki",
];

const firstNames = [
  "Rahul",
  "Kiran",
  "Priya",
  "Amit",
  "Neha",
  "Arjun",
  "Rohan",
  "Sneha",
  "Vikram",
  "Ananya",
  "Aditya",
  "Pooja",
];

const lastNames = [
  "Sharma",
  "Kumar",
  "Singh",
  "Gupta",
  "Rao",
  "Patel",
];

let customerCounter = 1;
let meterCounter = 1;

for (let z = 0; z < zoneNames.length; z++) {
  const zoneId = makeId("ZONE", z + 1);
  const adminId = makeId("ADM", z + 1);
  const adminName = `${zoneNames[z]} Administrator`;

  const zone = {
    id: zoneId,
    name: zoneNames[z],
    adminId,
    adminName,
    location: `${zoneNames[z]} Distribution Area`,
    pincode: String(110001 + z),
    description: `Electricity distribution for ${zoneNames[z]}`,
    status: "Active",
    totalMeters: 0,
  };

  zones.push(zone);

  users.push({
    id: adminId,
    name: adminName,
    email: `zone${z + 1}@mdms.example`,
    phone: String(9100000000 + z),
    role: "zone",
    zoneId,
    status: "Active",
    meterCount: 0,
  });

  for (let c = 0; c < 12; c++) {
    const userId = makeId(
      "USR",
      customerCounter
    );

    const name =
      `${firstNames[c]} ${lastNames[(c + z) % lastNames.length]}`;

    const meterCount = c < 3 ? 2 : 1;

    users.push({
      id: userId,
      name,
      email: `customer${customerCounter}@mdms.example`,
      phone: String(
        9200000000 + customerCounter
      ),
      role: "user",
      zoneId,
      status: "Active",
      meterCount,
    });

    for (let m = 0; m < meterCount; m++) {
      const commercial = randomInt(1, 5) === 1;

      meters.push({
        id: makeId("MTR", meterCounter),
        ownerId: userId,
        ownerName: name,
        zoneId,
        zoneName: zone.name,
        address: `House ${customerCounter}, ${zone.name}`,
        status:
          meterCounter % 10 === 0
            ? "Deactivated"
            : "Active",
        installedDate: "2024-01-15",
        tariffCategory: commercial
          ? "Commercial"
          : "Residential",
        tariffRate: commercial ? 9 : 6.5,
        lastReading: randomInt(1000, 5000),
        lastSynced: referenceDate.toISOString(),
      });

      meterCounter++;
      zone.totalMeters++;
    }

    customerCounter++;
  }
}

let billCounter = 1;
let billDayCounter = 1;

for (const meter of meters) {
  let reading = meter.lastReading;

  for (let m = 0; m < 12; m++) {
    const monthStart = new Date(
      Date.UTC(2025, 10 + m, 1)
    );

    const year = monthStart.getUTCFullYear();
    const month = monthStart.getUTCMonth();

    const daysInMonth = new Date(
      Date.UTC(year, month + 1, 0)
    ).getUTCDate();

    const billId = makeId(
      "BILL",
      billCounter++
    );

    let totalConsumption = 0;
    let totalAmount = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const consumption = round(
        randomInt(40, 180) / 10
      );

      reading = round(
        reading + consumption
      );

      const cost = round(
        consumption * meter.tariffRate
      );

      totalConsumption += consumption;
      totalAmount += cost;

      billDays.push({
        id: makeId(
          "DAY",
          billDayCounter++
        ),
        billId,
        meterId: meter.id,
        date: formatDate(
          new Date(
            Date.UTC(year, month, day)
          )
        ),
        reading,
        consumption,
        cost,
        notes:
          consumption > 16
            ? "High consumption"
            : "Normal reading",
      });
    }

    const generatedDate = formatDate(
      new Date(
        Date.UTC(year, month + 1, 1)
      )
    );

    const dueDate = formatDate(
      new Date(
        Date.UTC(year, month + 1, 28)
      )
    );

    const status =
      m < 10
        ? "Paid"
        : m === 10
          ? "Overdue"
          : pick(["Paid", "Pending"]);

    bills.push({
      id: billId,
      meterId: meter.id,
      userId: meter.ownerId,
      zoneId: meter.zoneId,
      month: formatDate(monthStart).slice(0, 7),
      generatedDate,
      dueDate,
      consumption: round(totalConsumption),
      amount: round(totalAmount),
      status,
      paidDate:
        status === "Paid"
          ? formatDate(
              new Date(
                Date.UTC(year, month + 1, 10)
              )
            )
          : null,
    });
  }

  meter.lastReading = reading;
}

const monthLabels = [
  "Jan", "Feb", "Mar", "Apr",
  "May", "Jun", "Jul", "Aug",
  "Sep", "Oct", "Nov", "Dec",
];

function sumConsumption(rows) {
  return round(
    rows.reduce(
      (sum, row) => sum + row.consumption,
      0
    )
  );
}

function addSeries(scope, scopeId, rows) {
  const latestMonth = "2026-10";
  const latestDate = "2026-10-31";

  const monthlyRows = rows.filter(
    (row) => row.date.startsWith(latestMonth)
  );

  const dayTotal = sumConsumption(
    rows.filter(
      (row) => row.date === latestDate
    )
  );

  const dayPoints = [];

  let remaining = dayTotal;

  for (let hour = 0; hour < 24; hour++) {
    const units =
      hour === 23
        ? round(remaining)
        : round(dayTotal / 24);

    const safeUnits = Math.min(
      Math.max(remaining, 0),
      units
    );

    dayPoints.push({
      label: `${String(hour).padStart(2, "0")}:00`,
      units: round(safeUnits),
    });

    remaining = round(
      remaining - safeUnits
    );
  }

  const weekPoints = [];

  for (let day = 25; day <= 31; day++) {
    const date = `2026-10-${day}`;

    const previousDate = `2026-10-${day - 7}`;

    weekPoints.push({
      label: date.slice(5),
      units: sumConsumption(
        rows.filter(
          (row) => row.date === date
        )
      ),
      previousUnits: sumConsumption(
        rows.filter(
          (row) => row.date === previousDate
        )
      ),
    });
  }

  const monthPoints = [];

  for (let week = 0; week < 5; week++) {
    const start = week * 7 + 1;
    const end = Math.min(start + 6, 31);

    monthPoints.push({
      label: `Week ${week + 1}`,
      units: sumConsumption(
        monthlyRows.filter((row) => {
          const day = Number(
            row.date.slice(-2)
          );

          return day >= start && day <= end;
        })
      ),
    });
  }

  const yearPoints = [];

  for (let m = 0; m < 12; m++) {
    const date = new Date(
      Date.UTC(2025, 10 + m, 1)
    );

    const key = formatDate(date).slice(0, 7);

    yearPoints.push({
      label: monthLabels[date.getUTCMonth()],
      units: sumConsumption(
        rows.filter(
          (row) => row.date.startsWith(key)
        )
      ),
    });
  }

  const ranges = {
    day: dayPoints,
    week: weekPoints,
    month: monthPoints,
    year: yearPoints,
  };

  for (const [range, points] of Object.entries(ranges)) {
    chartSeries.push({
      id: `${scope}-${scopeId}-${range}`,
      scope,
      scopeId,
      range,
      points,
    });
  }
}

for (const meter of meters) {
  const rows = billDays.filter(
    (row) => row.meterId === meter.id
  );

  addSeries("meter", meter.id, rows);
}

for (const user of users) {
  if (user.role !== "user") continue;

  const meterIds = new Set(
    meters
      .filter(
        (meter) => meter.ownerId === user.id
      )
      .map((meter) => meter.id)
  );

  const rows = billDays.filter(
    (row) => meterIds.has(row.meterId)
  );

  addSeries("user", user.id, rows);
}

for (const zone of zones) {
  const meterIds = new Set(
    meters
      .filter(
        (meter) => meter.zoneId === zone.id
      )
      .map((meter) => meter.id)
  );

  const rows = billDays.filter(
    (row) => meterIds.has(row.meterId)
  );

  addSeries("zone", zone.id, rows);
}

addSeries(
  "enterprise",
  "ENT-001",
  billDays
);

const alertTitles = [
  "High electricity consumption",
  "Abnormal meter reading",
  "Meter communication failure",
  "Scheduled maintenance",
];

for (const zone of zones) {
  const zoneMeters = meters.filter(
    (meter) => meter.zoneId === zone.id
  );

  for (let i = 0; i < 8; i++) {
    const meter = pick(zoneMeters);
    const title = pick(alertTitles);

    alerts.push({
      id: makeId(
        "ALT",
        alerts.length + 1
      ),
      zoneId: zone.id,
      zoneName: zone.name,
      meterId: meter.id,
      title,
      message: `${title} detected for ${meter.id}.`,
      severity: pick([
        "Low",
        "Medium",
        "High",
        "Critical",
      ]),
      status: pick([
        "Open",
        "Resolved",
      ]),
      createdAt: new Date(
        referenceDate.getTime() -
        randomInt(1, 20) * 86400000
      ).toISOString(),
    });
  }
}

const notificationTemplates = [
  {
    type: "bill_generated",
    title: "New bill generated",
    message: "Your monthly electricity bill is available.",
  },
  {
    type: "payment_due",
    title: "Payment reminder",
    message: "Please check your upcoming bill due date.",
  },
  {
    type: "payment_received",
    title: "Payment received",
    message: "Your previous electricity payment was received.",
  },
  {
    type: "high_consumption",
    title: "High consumption",
    message: "Your electricity consumption has increased.",
  },
  {
    type: "maintenance",
    title: "Maintenance notice",
    message: "Scheduled maintenance may affect meter services.",
  },
];

for (const user of users) {
  if (user.role !== "user") continue;

  const count = user.id === "USR-001" ? 5 : 1;

  for (let i = 0; i < count; i++) {
    const template =
      notificationTemplates[
        i % notificationTemplates.length
      ];

    notifications.push({
      id: makeId(
        "NOT",
        notifications.length + 1
      ),
      userId: user.id,
      ...template,
      createdAt: new Date(
        referenceDate.getTime() -
        i * 86400000
      ).toISOString(),
      read: i % 2 !== 0,
    });
  }
}

const auditActions = [
  {
    action: "Login",
    resource: "Authentication",
  },
  {
    action: "View",
    resource: "Meter",
  },
  {
    action: "View",
    resource: "Customer",
  },
  {
    action: "Generate",
    resource: "Report",
  },
  {
    action: "View",
    resource: "Zone",
  },
];

const administrators = users.filter(
  (user) => user.role !== "user"
);

for (let i = 0; i < 40; i++) {
  const user = pick(administrators);
  const action = pick(auditActions);

  auditLogs.push({
    id: makeId("LOG", i + 1),
    timestamp: new Date(
      referenceDate.getTime() -
      i * 3600000
    ).toISOString(),
    userId: user.id,
    userName: user.name,
    ...action,
    status:
      i % 7 === 0
        ? "Failed"
        : "Success",
  });
}

for (const zone of zones) {
  settings.push({
    id: `SET-${zone.id}`,
    scope: "zone",
    zoneId: zone.id,
    highConsumptionThreshold: 500,
    lowConsumptionThreshold: 10,
    abnormalReadingFrequency: 3,
    inactiveMeterDays: 7,
    emailNotifications: true,
    smsNotifications: false,
  });
}

settings.push({
  id: "SET-ENTERPRISE",
  scope: "enterprise",
  dataRetentionMonths: 24,
  auditRetentionMonths: 12,
  autoLogoutMinutes: 30,
  timezone: "Asia/Kolkata",
  language: "en",
  currency: "INR",
  emailNotifications: true,
  smsNotifications: true,
});

for (const user of users) {
  settings.push({
    id: `SET-${user.id}`,
    scope: "user",
    userId: user.id,
    emailNotifications: true,
    smsNotifications: false,
  });
}

const demoMeter = meters.find(
  (meter) => meter.ownerId === "USR-001"
);

const demoRows = billDays.filter(
  (row) => row.meterId === demoMeter.id
);

const dailyData = demoRows
  .slice(-7)
  .map((row) => ({
    id: row.id,
    date: row.date,
    units: row.consumption,
  }));

const weeklyData = chartSeries
  .find(
    (series) =>
      series.scope === "meter" &&
      series.scopeId === demoMeter.id &&
      series.range === "month"
  )
  .points.map((point, index) => ({
    id: String(index + 1),
    week: point.label,
    units: point.units,
  }));

const monthlyData = chartSeries
  .find(
    (series) =>
      series.scope === "meter" &&
      series.scopeId === demoMeter.id &&
      series.range === "year"
  )
  .points.map((point, index) => ({
    id: String(index + 1),
    month: point.label,
    units: point.units,
  }));

const db = {
  zones,
  users,
  meters,
  bills,
  billDays,
  chartSeries,
  alerts,
  notifications,
  auditLogs,
  settings,
  dailyData,
  weeklyData,
  monthlyData,
};

const userIds = new Set(
  users.map((user) => user.id)
);

const zoneIds = new Set(
  zones.map((zone) => zone.id)
);

const meterIds = new Set(
  meters.map((meter) => meter.id)
);

const billIds = new Set(
  bills.map((bill) => bill.id)
);

for (const meter of meters) {
  if (!userIds.has(meter.ownerId)) {
    throw new Error(
      `Invalid owner for ${meter.id}`
    );
  }

  if (!zoneIds.has(meter.zoneId)) {
    throw new Error(
      `Invalid zone for ${meter.id}`
    );
  }

  const owner = users.find(
    (user) => user.id === meter.ownerId
  );

  if (owner.zoneId !== meter.zoneId) {
    throw new Error(
      `Owner and meter zone mismatch: ${meter.id}`
    );
  }
}

for (const bill of bills) {
  if (
    !meterIds.has(bill.meterId) ||
    !userIds.has(bill.userId)
  ) {
    throw new Error(
      `Invalid bill reference: ${bill.id}`
    );
  }
}

for (const row of billDays) {
  if (
    !billIds.has(row.billId) ||
    !meterIds.has(row.meterId)
  ) {
    throw new Error(
      `Invalid daily reading: ${row.id}`
    );
  }
}

for (const [name, records] of Object.entries(db)) {
  const ids = new Set(
    records.map((record) => record.id)
  );

  if (ids.size !== records.length) {
    throw new Error(
      `Duplicate IDs in ${name}`
    );
  }
}

writeFileSync(
  new URL("../db.json", import.meta.url),
  JSON.stringify(db, null, 2),
  "utf-8"
);

console.log("\nMDMS database generated successfully\n");

for (const [name, records] of Object.entries(db)) {
  console.log(`${name}: ${records.length}`);
}