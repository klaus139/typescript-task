import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddelware';
import { createTask, getUserTasks, getAllTasks} from '../controllers/taslkController';


const router:any = Router();


router.post('/', authenticate, createTask);


router.get('/user', authenticate, getUserTasks);

router.get('/', authenticate, getAllTasks);

export default router;
