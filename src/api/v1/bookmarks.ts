import { Router } from 'express';
import { db } from '../../utils/db';

const router = Router();

router.get('/', async (req, res) => {
  const data = await db.bookmark.findMany();
  res.json(data);
});

router.post('/', async (req, res) => {
  const data = await db.bookmark.create({ data: req.body });
  res.status(201).json(data);
});

export { router as bookmarksRouter };
