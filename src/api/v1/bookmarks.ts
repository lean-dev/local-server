import { Router } from 'express';
import { db } from '../../utils/db';
import type { Prisma } from '@prisma/client';

const router = Router();

router.get('/', async (req, res) => {
  const data = await db.bookmark.findMany();
  res.json(data);
});

router.get('/:id', async (req, res) => {
  const data = await db.bookmark.findFirst({ where: { id: req.params.id }});
  res.json(data);
});

router.post('/', async (req, res) => {
  const data = await db.bookmark.create({ data: req.body });
  res.status(201).json(data);
});

router.patch('/:id', async (req, res) => {
  const data = await db.bookmark.update({ where: { id: req.params.id }, data: req.body});
  res.json(data);
});

router.put('/:id', async (req, res) => {
  const updatedBookmark: Prisma.BookmarkUpdateInput = { title: undefined, url: undefined, description: null, ...req.body };
  const data = await db.bookmark.update({ where: { id: req.params.id }, data: updatedBookmark});
  res.json(data);
});

router.delete('/:id', async (req, res) => {
  await db.bookmark.delete({ where: { id: req.params.id }});
  res.status(204).end();
});

export { router as bookmarksRouter };
