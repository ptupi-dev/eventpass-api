import jwt, { type JwtPayload } from "jsonwebtoken";

import { getUsers } from "../repositories/json.repository.js";
import type { AuthenticatedUser, PublicUser } from "../types.js";
import type { LoginInput } from "../schemas/auth.schema.js";

const jwtSecret = process.env.JWT_SECRET ?? "eventpass-development-secret";

type LoginResult = {
  token: string;
  user: PublicUser;
};

export async function login(input: LoginInput): Promise<LoginResult | null> {
  const users = await getUsers();
  const user = users.find(
    (candidate) =>
      candidate.email === input.email && candidate.password === input.password,
  );

  if (!user) {
    return null;
  }

  const token = jwt.sign(
    {
      email: user.email,
    },
    jwtSecret,
    {
      expiresIn: "1h",
      subject: user.id,
    },
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
}

export function verifyAuthHeader(
  authorizationHeader: string | undefined,
): AuthenticatedUser | null {
  if (!authorizationHeader?.startsWith("Bearer ")) {
    return null;
  }

  const token = authorizationHeader.slice("Bearer ".length);

  try {
    const payload = jwt.verify(token, jwtSecret);

    if (typeof payload === "string" || !isValidAuthPayload(payload)) {
      return null;
    }

    const authenticatedUser: AuthenticatedUser = {
      id: payload.sub,
    };

    if (typeof payload.email === "string") {
      authenticatedUser.email = payload.email;
    }

    return authenticatedUser;
  } catch {
    return null;
  }
}

function isValidAuthPayload(
  payload: JwtPayload,
): payload is JwtPayload & { sub: string } {
  return typeof payload.sub === "string";
}
