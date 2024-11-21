import { test, expect, vi, expectTypeOf } from "vitest";
import request from 'supertest';

import app from "../src/app";

vi.mock('@prisma/client');

test('can get bookmarks', async () => {
  const response = await request(app).get('/api/v1/bookmarks');

  expect(response.ok).toBe(true);
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
})
