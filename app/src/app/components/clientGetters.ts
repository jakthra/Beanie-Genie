import { purchases } from "../lib/schema";


export async function getPurchases(): Promise<typeof purchases> {
    return fetch('/api/purchases').then((res) => res.json())
}

export async function addPurchase(data: typeof purchases) {
    return fetch("/api/purchases", { method: "POST", body: JSON.stringify(data) })
}