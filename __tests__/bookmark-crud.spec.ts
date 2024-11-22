import { test, expect, vi } from 'vitest';
import request from 'supertest';

import app from '../src/app';

import type { Bookmark } from '@prisma/client';

vi.mock('@prisma/client');

let createdBookmark: Bookmark;

test('can get initially zero bookmarks', async () => {
  const response = await request(app).get('/api/v1/bookmarks').expect(200);

  expect(Array.isArray(response.body)).toBe(true);
  expect(response.body.length).toBe(0);
});

test('can create bookmarks', async () => {
  const bookmark = {
    title: 'React',
    url: 'https://react.dev/',
    description: 'React Homepage',
  };

  const response = await request(app)
    .post('/api/v1/bookmarks')
    .send(bookmark)
    .expect(201);

  createdBookmark = response.body;
  expect(createdBookmark).toMatchObject(bookmark);
  expect(createdBookmark.id).toBeDefined();
  expect(createdBookmark.createdAt).toBeDefined();
  expect(createdBookmark.updatedAt).toBeDefined();
});

test('can get created bookmarks', async () => {
  const response = await request(app).get('/api/v1/bookmarks');
  expect(response.body).toContainEqual(createdBookmark);
});
