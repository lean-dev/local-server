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
  const response = await request(app).get('/api/v1/bookmarks').expect(200);
  expect(response.body).toContainEqual(createdBookmark);
});

test('can get single bookmark by id', async () => {
  const response = await request(app).get(`/api/v1/bookmarks/${createdBookmark.id}`).expect(200);
  expect(response.body).toEqual(createdBookmark);
})

test('can patch a bookmark', async() => {
  const description = `
React is the library for web and native user interfaces. Build user interfaces out
of individual pieces called components written in JavaScript. React is designed
to let you seamlessly combine components written by independent people, teams,
and organizations.
  `.trim();

  const response = await request(app).patch(`/api/v1/bookmarks/${createdBookmark.id}`).send({description}).expect(200);
  expect(response.body).toEqual({ ...createdBookmark, description });
});

test('can update a bookmark', async() => {
    const bookmarkWithoutDescription = { title: 'Quick Start - React', url: 'https://react.dev/learn' };
    const response = await request(app).put(`/api/v1/bookmarks/${createdBookmark.id}`).send(bookmarkWithoutDescription).expect(200);
    expect(response.body).toEqual({ ...createdBookmark, ...bookmarkWithoutDescription, description: null });
});
