import { describe, expect, it, vi } from "vitest";
import request from "supertest";

vi.mock("../src/config/supabaseClient.js", () => ({
  hasSupabaseConfig: false,
  supabase: null
}));

const { default: app } = await import("../src/app.js");

describe("GET /health", () => {
  it("returns status ok", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
    expect(res.body).toHaveProperty("supabaseConfigured");
  });
});

const RESOURCES = [
  { path: "/api/tenders", name: "Tenders" },
  { path: "/api/vendors", name: "Vendors" },
  { path: "/api/purchase-orders", name: "Purchase Orders" },
  { path: "/api/hse-incidents", name: "HSE Incidents" },
];

describe("CRUD smoke tests (Supabase not configured)", () => {
  for (const { path, name } of RESOURCES) {
    describe(name, () => {
      it(`GET ${path} → 503`, async () => {
        const res = await request(app).get(path);
        expect(res.status).toBe(503);
        expect(res.body).toHaveProperty("error");
      });

      it(`POST ${path} → 503`, async () => {
        const res = await request(app).post(path).send({ test: true });
        expect(res.status).toBe(503);
        expect(res.body).toHaveProperty("error");
      });

      it(`PUT ${path}/fake-id → 503`, async () => {
        const res = await request(app).put(`${path}/fake-id`).send({ test: true });
        expect(res.status).toBe(503);
        expect(res.body).toHaveProperty("error");
      });

      it(`DELETE ${path}/fake-id → 503`, async () => {
        const res = await request(app).delete(`${path}/fake-id`);
        expect(res.status).toBe(503);
        expect(res.body).toHaveProperty("error");
      });
    });
  }
});
