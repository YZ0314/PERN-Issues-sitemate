// routes/issueRoutes.ts
import { Router } from 'express';
import {
    addIssue,
    getAllIssues,
    getIssueById,
    updateIssue,
    deleteIssue
} from '../controllers/issuesController';

const router = Router();

// Route for creating a new issue
router.post('/addissue', addIssue);

// Route for retrieving all issues
router.get('/issues', getAllIssues);

// Route for retrieving a single issue by its ID
router.get('/issues/:id', getIssueById);

// Route for updating an issue by its ID
router.put('/issues/:id', updateIssue);

// Route for deleting an issue by its ID
router.delete('/issues/:id', deleteIssue);



export default router;
