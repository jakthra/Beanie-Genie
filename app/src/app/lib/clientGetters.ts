import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { inventory, purchases } from "./schema";

type InventoryJoined = {
    inventory: InferSelectModel<typeof inventory>
    purchases: InferSelectModel<typeof purchases>
}

export async function getPurchases(): Promise<InferSelectModel<typeof purchases>[]> {
    return fetch('/api/purchases').then((res) => res.json())
}

export async function addPurchase(data: InferInsertModel<typeof purchases>) {
    return fetch("/api/purchases", { method: "POST", body: JSON.stringify(data) })
}

export async function getInventory(): Promise<InventoryJoined[]> {
    return fetch('/api/inventory').then((res) => res.json())
}