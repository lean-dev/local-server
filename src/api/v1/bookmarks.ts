import { Router } from 'express';
import { db } from '../../utils/db';

const router = Router();

router.get('/', async (req, res) => {
  const data = await db.bookmark.findMany();
  res.json(data);
});

export { router as bookmarksRouter };
