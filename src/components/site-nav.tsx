"use client";

import {
  CalculatorOutlined,
  DollarOutlined,
  FileProtectOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { key: "/", label: <Link href="/">Overview</Link>, icon: <HomeOutlined /> },
  { key: "/bills", label: <Link href="/bills">Bills</Link>, icon: <DollarOutlined /> },
  {
    key: "/settlements",
    label: <Link href="/settlements">Settlements</Link>,
    icon: <CalculatorOutlined />,
  },
  { key: "/rules", label: <Link href="/rules">Rules</Link>, icon: <FileProtectOutlined /> },
];

export function SiteNav() {
  const pathname = usePathname();
  const current =
    items.find((item) => pathname === item.key || pathname.startsWith(`${item.key}/`))?.key ?? "/";

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[color:rgba(255,255,255,0.9)] backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="mb-2 text-lg font-semibold">RentWise Splitter</div>
        <Menu mode="horizontal" selectedKeys={[current]} items={items} className="bg-transparent" />
      </div>
    </header>
  );
}
