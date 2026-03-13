"use client";

import { Card, Checkbox, List, Tag } from "antd";

const ruleSet = [
  "Every expense above $20 must be logged within 24 hours.",
  "Bills are split only across residents who actually consume the service.",
  "Settlement day is every Sunday at 20:00.",
  "Any disputed bill is discussed before transfer requests are sent.",
  "Shared subscriptions require monthly confirmation by all members.",
];

export default function RulesPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl space-y-6 px-4 py-8">
      <section className="rounded-3xl border border-[var(--border)] bg-white/80 p-8 shadow-sm">
        <Tag color="gold" className="mb-3">
          PREVENTION LAYER
        </Tag>
        <h1 className="text-4xl font-semibold md:text-5xl">House money rules</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-lg">
          This page turns informal agreements into explicit policy, reducing repeated conflicts.
        </p>
      </section>

      <Card title="Operating agreement">
        <List
          dataSource={ruleSet}
          renderItem={(rule) => (
            <List.Item>
              <Checkbox checked>{rule}</Checkbox>
            </List.Item>
          )}
        />
      </Card>
    </main>
  );
}
