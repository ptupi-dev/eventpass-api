import { describe, expect, it } from "vitest";

import { buildApp } from "./app.js";

describe("eventpass api", () => {
  it("Logs in with demo credentials", async () => {
    const app = await buildApp();

    const response = await app.inject({
      method: "POST",
      url: "/login",
      payload: {
        email: "demo@eventpass.com",
        password: "password123",
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      user: {
        id: "1",
        email: "demo@eventpass.com",
        name: "John Doe",
      },
    });

    await app.close();
  });

  it("Lists events", async () => {
    const app = await buildApp();

    const response = await app.inject({
      method: "GET",
      url: "/events",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveLength(2);

    await app.close();
  });

  it("Returns a ticket for the authenticated user", async () => {
    const app = await buildApp();

    const loginResponse = await app.inject({
      method: "POST",
      url: "/login",
      payload: {
        email: "demo@eventpass.com",
        password: "password123",
      },
    });
    const { token } = loginResponse.json<{ token: string }>();

    const ticketResponse = await app.inject({
      method: "GET",
      url: "/tickets/1",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    expect(ticketResponse.statusCode).toBe(200);
    expect(ticketResponse.json()).toMatchObject({
      id: "1",
      userId: "1",
      eventId: "1",
      code: "RS26-0XTY-PL9A",
    });

    await app.close();
  });

  it("Blocks ticket access without a token", async () => {
    const app = await buildApp();

    const response = await app.inject({
      method: "GET",
      url: "/tickets/1",
    });

    expect(response.statusCode).toBe(401);

    await app.close();
  });
});
