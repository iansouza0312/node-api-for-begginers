import { test, expect } from "vitest";
import request from "supertest";
import { server } from "../app.ts";
import { faker } from "@faker-js/faker";
import { makeCourse } from "../test/factories/make-course.ts";

test("getting a course by id", async () => {
  await server.ready();

  const testCourse = await makeCourse();

  const response = await request(server.server).get(
    `/courses/${testCourse.id}`
  );

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null,
    },
  });
});

test("return 404 when course not found", async () => {
  await server.ready();

  const response = await request(server.server).get(
    `/courses/ba897db5-32be-4c00-b16a-c83bf27d975d`
  );

  expect(response.status).toBe(404);
});
