import fastify from "fastify";
import crypto from "node:crypto";
import { db } from "./src/database/client.ts";
import { courses } from "./src/database/schema.ts";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

// const courses = [
//   { id: "1", title: "Learn ReactJS" },
//   { id: "2", title: "Learn VueJS" },
//   { id: "3", title: "Learn Angular" },
// ];

server.get("/courses", async (request, reply) => {
  const result = await db
    .select({
      id: courses.id,
      title: courses.title,
    })
    .from(courses);

  return reply.send({ courses: result });
});

// server.get("/courses/:id", (request, reply) => {
//   type Params = {
//     id: string;
//   };

//   const params = request.params as Params;
//   const courseId = params.id;

//   const course = courses.find((course) => course.id === courseId);

//   if (course) {
//     return { course };
//   }

//   return reply.status(404).send();
// });

// server.post("/courses", (request, reply) => {
//   type Body = {
//     title: string;
//   };

//   const courseId = crypto.randomUUID();
//   const body = request.body as Body;
//   const courseTitle = body.title;

//   if (!courseTitle) {
//     return reply.status(422).send({ error: "Title is a required field" });
//   }

//   courses.push({ id: courseId, title: courseTitle });

//   return reply.status(201).send({ courseId });
// });

server.listen({ port: 3333 }).then(() => {
  console.log("Server is running on http://localhost:3333");
});
