export type Resident = "Alex" | "Sam" | "Mira" | "Noah";

export interface Bill {
  id: string;
  title: string;
  amount: number;
  paidBy: Resident;
  splitWith: Resident[];
  category: "Rent" | "Utilities" | "Groceries" | "Internet" | "Other";
  createdAt: string;
}

const bills: Bill[] = [
  {
    id: "bill-1",
    title: "March electricity",
    amount: 88,
    paidBy: "Sam",
    splitWith: ["Alex", "Sam", "Mira", "Noah"],
    category: "Utilities",
    createdAt: "2026-03-02",
  },
  {
    id: "bill-2",
    title: "Fiber internet",
    amount: 52,
    paidBy: "Alex",
    splitWith: ["Alex", "Sam", "Mira", "Noah"],
    category: "Internet",
    createdAt: "2026-03-05",
  },
  {
    id: "bill-3",
    title: "Weekly groceries",
    amount: 134,
    paidBy: "Mira",
    splitWith: ["Alex", "Sam", "Mira"],
    category: "Groceries",
    createdAt: "2026-03-07",
  },
];

export function getBills(): Bill[] {
  return bills;
}

export function addBill(input: Omit<Bill, "id" | "createdAt">): Bill {
  const bill: Bill = {
    ...input,
    id: `bill-${Math.random().toString(16).slice(2, 9)}`,
    createdAt: new Date().toISOString().slice(0, 10),
  };

  bills.unshift(bill);
  return bill;
}

export interface Settlement {
  from: Resident;
  to: Resident;
  amount: number;
}

export function calculateSettlements() {
  const people: Resident[] = ["Alex", "Sam", "Mira", "Noah"];
  const balance: Record<Resident, number> = {
    Alex: 0,
    Sam: 0,
    Mira: 0,
    Noah: 0,
  };

  for (const bill of bills) {
    const share = bill.amount / bill.splitWith.length;
    balance[bill.paidBy] += bill.amount;

    for (const person of bill.splitWith) {
      balance[person] -= share;
    }
  }

  const debtors = people
    .filter((person) => balance[person] < -0.01)
    .map((person) => ({ person, amount: -balance[person] }));
  const creditors = people
    .filter((person) => balance[person] > 0.01)
    .map((person) => ({ person, amount: balance[person] }));

  const settlements: Settlement[] = [];

  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].amount, creditors[j].amount);

    settlements.push({
      from: debtors[i].person,
      to: creditors[j].person,
      amount: Number(pay.toFixed(2)),
    });

    debtors[i].amount -= pay;
    creditors[j].amount -= pay;

    if (debtors[i].amount < 0.01) {
      i += 1;
    }

    if (creditors[j].amount < 0.01) {
      j += 1;
    }
  }

  return {
    settlements,
    balance,
  };
}
