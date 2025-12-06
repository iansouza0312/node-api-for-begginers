import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import { z } from "zod";
import { checkRequestJwt } from "./hooks/check-request-jwt.ts";
import { checkUserRole } from "./hooks/check-user-role.ts";

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/courses",
    {
      preHandler: [checkRequestJwt, checkUserRole("manager")],
      schema: {
        tags: ["Courses"],
        summary: "Create a new course",
        description: "Endpoint to create a new course with a title.",
        body: z.object({
          title: z.string().min(5, "Title must be at least 5 characters long"),
        }),
        response: {
          201: z
            .object({ courseId: z.uuid() })
            .describe("Returns the ID of the newly created course"),
        },
      },
    },
    async (request, reply) => {
      const courseTitle = request.body.title;

      const result = await db
        .insert(courses)
        .values({
          title: courseTitle,
        })
        .returning();

      return reply.status(201).send({ courseId: result[0].id });
    }
  );
};
