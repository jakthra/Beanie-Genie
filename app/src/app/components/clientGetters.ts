import { purchases } from "../lib/schema";


export async function getPurchases(): Promise<typeof purchases> {
    return fetch('/api/purchases').then((res) => res.json())
}
