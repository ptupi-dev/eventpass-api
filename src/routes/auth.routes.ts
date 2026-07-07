import type { FastifyInstance } from "fastify";

import { loginSchema } from "../schemas/auth.schema.js";
import { login } from "../services/auth.service.js";

export async function authRoutes(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {
    const parsedBody = loginSchema.safeParse(request.body);

    if (!parsedBody.success) {
      return reply.status(400).send({
        message: "Invalid request body",
        issues: parsedBody.error.flatten().fieldErrors,
      });
    }

    const result = await login(parsedBody.data);

    if (!result) {
      return reply.status(401).send({
        message: "Invalid email or password",
      });
    }

    return result;
  });
}
