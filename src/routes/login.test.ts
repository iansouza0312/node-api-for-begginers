import { test, expect } from "vitest";
import request from "supertest";
import { server } from "../app.ts";
import { faker } from "@faker-js/faker";
import { makeUser } from "../test/factories/make-user.ts";

test("login", async () => {
  await server.ready();

  const { user, passwordWithoutHash } = await makeUser();

  const response = await request(server.server)
    .post("/sessions")
    .set("Content-Type", "application/json")
    .send({
      email: user.email,
      password: passwordWithoutHash,
    });

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    message: "OK",
  });
});
