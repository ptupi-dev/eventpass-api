import type { FastifyInstance } from "fastify";

import { listEvents } from "../services/events.service.js";

export async function eventsRoutes(app: FastifyInstance) {
  app.get("/events", async () => {
    return listEvents();
  });
}
