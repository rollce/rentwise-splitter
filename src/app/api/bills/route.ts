import { addBill, getBills, Resident } from "@/lib/store";
import { NextRequest, NextResponse } from "next/server";

const residents: Resident[] = ["Alex", "Sam", "Mira", "Noah"];

export async function GET() {
  return NextResponse.json({ bills: getBills() });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body?.title || typeof body?.amount !== "number" || body.amount <= 0 || !body?.paidBy) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (!residents.includes(body.paidBy as Resident)) {
    return NextResponse.json({ error: "Unknown resident" }, { status: 400 });
  }

  const splitWith = Array.isArray(body?.splitWith)
    ? body.splitWith.filter((person: unknown) => residents.includes(person as Resident))
    : [];

  if (!splitWith.length) {
    return NextResponse.json({ error: "Select at least one resident for split" }, { status: 400 });
  }

  const category = body?.category ?? "Other";

  const bill = addBill({
    title: body.title,
    amount: body.amount,
    paidBy: body.paidBy,
    splitWith,
    category,
  });

  return NextResponse.json({ bill }, { status: 201 });
}
