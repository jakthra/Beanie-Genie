import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { purchases } from "../lib/schema";


export async function getPurchases(): Promise<InferSelectModel<typeof purchases>[]> {
    return fetch('/api/purchases').then((res) => res.json())
}

export async function addPurchase(data: InferInsertModel<typeof purchases>) {
    return fetch("/api/purchases", { method: "POST", body: JSON.stringify(data) })
}