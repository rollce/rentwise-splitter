import { ArrowRightOutlined, CheckCircleOutlined, DollarCircleOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Statistic, Tag, Timeline } from "antd";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl space-y-8 px-4 py-8">
      <section className="rounded-3xl border border-[var(--border)] bg-white/80 p-8 shadow-sm">
        <Tag color="blue" className="mb-3">
          REAL-WORLD PROBLEM: ROOMMATE MONEY CONFLICTS
        </Tag>
        <h1 className="max-w-4xl text-4xl font-semibold md:text-6xl">
          End shared-expense fights with transparent bill splitting
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-lg">
          RentWise focuses on one common pain point: unclear who owes what in shared flats. The app
          tracks bills, calculates fair balances, and generates simple settlement actions.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/bills">
            <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
              Open Bills Workspace
            </Button>
          </Link>
          <Link href="/settlements">
            <Button size="large">View Settlement Plan</Button>
          </Link>
        </div>
      </section>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Housemates" value={4} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Expense categories" value={5} prefix={<DollarCircleOutlined />} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Conflict reduction score" value={92} suffix="%" prefix={<CheckCircleOutlined />} />
          </Card>
        </Col>
      </Row>

      <Card title="How this website solves the problem">
        <Timeline
          items={[
            { children: "Capture every bill with payer and split group." },
            { children: "Compute net balance per person in real time." },
            { children: "Generate minimal settlement actions." },
            { children: "Publish clear house rules to prevent future disputes." },
          ]}
        />
      </Card>
    </main>
  );
}
