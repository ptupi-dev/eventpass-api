import Fastify from "fastify";

import { authRoutes } from "./routes/auth.routes.js";
import { eventsRoutes } from "./routes/events.routes.js";
import { ticketsRoutes } from "./routes/tickets.routes.js";

export async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  await app.register(authRoutes);
  await app.register(eventsRoutes);
  await app.register(ticketsRoutes);

  return app;
}
