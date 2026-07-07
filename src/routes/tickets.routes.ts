import type { FastifyInstance } from "fastify";

import { verifyAuthHeader } from "../services/auth.service.js";
import { getTicketForUser } from "../services/tickets.service.js";

type TicketParams = {
  id: string;
};

export async function ticketsRoutes(app: FastifyInstance) {
  app.get<{ Params: TicketParams }>("/tickets/:id", async (request, reply) => {
    const authenticatedUser = verifyAuthHeader(request.headers.authorization);

    if (!authenticatedUser) {
      return reply.status(401).send({
        message: "Missing or invalid token",
      });
    }

    const ticket = await getTicketForUser(
      request.params.id,
      authenticatedUser.id,
    );

    if (!ticket) {
      return reply.status(404).send({
        message: "Ticket not found",
      });
    }

    return ticket;
  });
}
