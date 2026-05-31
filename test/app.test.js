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
  it("returns 200 with correct content type", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
  });

  it("returns healthy status with uptime and timestamp", async () => {
    const res = await request(app).get("/health");
    expect(res.body).toHaveProperty("status", "healthy");
    expect(res.body).toHaveProperty("uptime");
    expect(res.body).toHaveProperty("timestamp");
  });

  it("returns numeric uptime that is non-negative", async () => {
    const res = await request(app).get("/health");
    expect(typeof res.body.uptime).toBe("number");
    expect(res.body.uptime).toBeGreaterThanOrEqual(0);
  });

  it("returns valid ISO 8601 timestamp", async () => {
    const res = await request(app).get("/health");
    expect(() => new Date(res.body.timestamp)).not.toThrow();
    expect(new Date(res.body.timestamp).getTime()).toBeLessThanOrEqual(Date.now());
  });
});
