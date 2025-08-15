import type { IcpPayload } from "../model/type"

// Replace with your real API call
export async function submitIcp(payload: IcpPayload) {
  // Example: await fetch("/api/icp", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(payload) });
  await new Promise((r) => setTimeout(r, 600)); // pretend network
  return { ok: true };
}
