"use client";

import { Card, Col, Divider, Row, Statistic, Table, Tag } from "antd";
import { useEffect, useState } from "react";

interface Settlement {
  from: string;
  to: string;
  amount: number;
}

interface Payload {
  settlements: Settlement[];
  balance: Record<string, number>;
}

const columns = [
  { title: "From", dataIndex: "from", key: "from" },
  { title: "To", dataIndex: "to", key: "to" },
  { title: "Amount", dataIndex: "amount", key: "amount", render: (v: number) => `$${v.toFixed(2)}` },
];

export default function SettlementsPage() {
  const [data, setData] = useState<Payload | null>(null);

  useEffect(() => {
    fetch("/api/settlements")
      .then((res) => res.json())
      .then((payload: Payload) => setData(payload));
  }, []);

  return (
    <main className="mx-auto min-h-screen max-w-7xl space-y-6 px-4 py-8">
      <section className="rounded-3xl border border-[var(--border)] bg-white/80 p-8 shadow-sm">
        <h1 className="text-4xl font-semibold md:text-5xl">Automatic settlement plan</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-lg">
          The algorithm creates the shortest path of transfers so everyone reaches fair balance.
        </p>
      </section>

      <Card title="Transfers to complete this month">
        <Table
          dataSource={(data?.settlements ?? []).map((item, index) => ({ ...item, key: index + 1 }))}
          columns={columns}
          pagination={false}
        />
      </Card>

      <Card title="Current net balance per resident">
        <Row gutter={[16, 16]}>
          {Object.entries(data?.balance ?? {}).map(([person, value]) => (
            <Col xs={24} md={12} lg={6} key={person}>
              <Card>
                <Statistic title={person} value={Math.abs(value)} prefix="$" precision={2} />
                <Divider className="my-3" />
                <Tag color={value >= 0 ? "green" : "orange"}>{value >= 0 ? "Should receive" : "Should pay"}</Tag>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </main>
  );
}
