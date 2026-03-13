"use client";

import { Button, Card, Form, Input, InputNumber, Select, Space, Table, Tag } from "antd";
import type { CheckboxOptionType } from "antd/es/checkbox";
import { Checkbox } from "antd";
import { useEffect, useState } from "react";

interface Bill {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  splitWith: string[];
  category: string;
  createdAt: string;
}

const residentOptions: CheckboxOptionType<string>[] = [
  { label: "Alex", value: "Alex" },
  { label: "Sam", value: "Sam" },
  { label: "Mira", value: "Mira" },
  { label: "Noah", value: "Noah" },
];

const columns = [
  { title: "Date", dataIndex: "createdAt", key: "createdAt" },
  { title: "Bill", dataIndex: "title", key: "title" },
  { title: "Category", dataIndex: "category", key: "category", render: (v: string) => <Tag>{v}</Tag> },
  { title: "Paid by", dataIndex: "paidBy", key: "paidBy" },
  { title: "Amount", dataIndex: "amount", key: "amount", render: (v: number) => `$${v.toFixed(2)}` },
  {
    title: "Split with",
    dataIndex: "splitWith",
    key: "splitWith",
    render: (list: string[]) => list.join(", "),
  },
];

export default function BillsPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  async function loadBills() {
    const response = await fetch("/api/bills");
    const data = await response.json();
    setBills(data.bills);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadBills();
  }, []);

  async function onFinish(values: {
    title: string;
    amount: number;
    paidBy: string;
    splitWith: string[];
    category: string;
  }) {
    setLoading(true);
    const response = await fetch("/api/bills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      form.resetFields();
      await loadBills();
    }

    setLoading(false);
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl space-y-6 px-4 py-8">
      <section className="rounded-3xl border border-[var(--border)] bg-white/80 p-8 shadow-sm">
        <h1 className="text-4xl font-semibold md:text-5xl">Bills workspace</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-lg">
          Add each shared expense once, and the system handles proportional fairness automatically.
        </p>
      </section>

      <Card title="Add a bill">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Space direction="vertical" size="middle" className="w-full">
            <Form.Item name="title" label="Bill title" rules={[{ required: true }]}> 
              <Input placeholder="e.g., March electricity" />
            </Form.Item>

            <Form.Item name="amount" label="Amount (USD)" rules={[{ required: true }]}> 
              <InputNumber min={1} className="w-full" />
            </Form.Item>

            <Form.Item name="paidBy" label="Paid by" rules={[{ required: true }]}> 
              <Select options={residentOptions.map((o) => ({ label: o.label as string, value: o.value as string }))} />
            </Form.Item>

            <Form.Item name="splitWith" label="Split with" rules={[{ required: true }]}> 
              <Checkbox.Group options={residentOptions} />
            </Form.Item>

            <Form.Item name="category" label="Category" initialValue="Other">
              <Select
                options={[
                  { label: "Rent", value: "Rent" },
                  { label: "Utilities", value: "Utilities" },
                  { label: "Groceries", value: "Groceries" },
                  { label: "Internet", value: "Internet" },
                  { label: "Other", value: "Other" },
                ]}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading}>
              Save Bill
            </Button>
          </Space>
        </Form>
      </Card>

      <Card title="Recorded bills">
        <Table dataSource={bills.map((bill) => ({ ...bill, key: bill.id }))} columns={columns} pagination={false} />
      </Card>
    </main>
  );
}
