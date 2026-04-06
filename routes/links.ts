import express, { Request, Response } from 'express';
import { db } from '../database';
import { urls } from '../database/schema';
import { eq, and, desc } from 'drizzle-orm';

const router = express.Router();

 
router.get('/', async (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const links = await db
      .select()
      .from(urls)
      .where(eq(urls.user_id, req.session.user.id))
      .orderBy(desc(urls.created_at));

    res.json(links);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

 
router.delete('/:id', async (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const id = Number(req.params.id);
    const [deleted] = await db
      .delete(urls)
      .where(and(eq(urls.id, id), eq(urls.user_id, req.session.user.id)))
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: 'Link not found' });
    }
    res.json({ message: 'Deleted', link: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
