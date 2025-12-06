import { faker } from "@faker-js/faker";
import { db } from "../../database/client.ts";
import { users } from "../../database/schema.ts";
import { hash } from "@node-rs/argon2";
import { randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";

export async function makeUser(role?: "student" | "manager" | "instructor") {
  const passwordWithoutHash = randomUUID();

  const result = await db
    .insert(users)
    .values({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: await hash(passwordWithoutHash),
      role: role,
    })
    .returning();

  return {
    user: result[0],
    passwordWithoutHash,
  };
}

export async function makeAuthenticatedUser(
  role: "student" | "manager" | "instructor"
) {
  const { user } = await makeUser();

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = jwt.sign(
    { sub: user.id, role: user.role },
    process.env.JWT_SECRET
  );

  return { user, token };
}
