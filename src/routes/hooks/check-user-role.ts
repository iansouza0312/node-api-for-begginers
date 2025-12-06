import type { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { getAuthenticatedUserFromRequest } from "../../utils/get-authenticated-user-from-request.ts";

export function checkUserRole(role: "sutendent" | "instructor" | "manager") {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const user = getAuthenticatedUserFromRequest(request);

    if (user.role !== role) {
      return reply.status(401).send();
    }
  };
}
