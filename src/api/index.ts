import { json, Router } from 'express';
import { bookmarksRouter } from './v1/bookmarks';

const router = Router();

router.use(json());

router.use('/v1/bookmarks', bookmarksRouter);

export { router as apiRouter };
