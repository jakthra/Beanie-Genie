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

export async function patchInventory(data: InferInsertModel<typeof inventory>) {
    return fetch(`/api/inventory/${data.id}`, { method: 'PATCH', body: JSON.stringify(data) }).then((res) => res.json())
}