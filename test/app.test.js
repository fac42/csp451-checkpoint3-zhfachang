const request = require("supertest");
const app = require("../src/app");

describe("GET /", () => {
  it("returns ok status", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

describe("GET /health", () => {
  it("returns 200", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
  });

  it("returns healthy with numeric uptime", async () => {
    const res = await request(app).get("/health");
    expect(res.body.status).toBe("healthy");
    expect(typeof res.body.uptime).toBe("number");
    expect(res.body.uptime).toBeGreaterThanOrEqual(0);
  });
});
