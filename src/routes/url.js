import express from 'express';
import { postOrigUrl } from '../controllers/url.js';
import { getOrigUrl } from '../controllers/url.js';

const router = express.Router();

router.post('/short', postOrigUrl);
router.get('/:urlId', getOrigUrl);

const urlRoutes = router;

export { urlRoutes }