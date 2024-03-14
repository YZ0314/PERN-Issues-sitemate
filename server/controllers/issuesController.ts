// controllers/issuesController.ts

import { Request, Response } from 'express';
import { Issue } from '../models/Issue';
import p from '../db'; 

export const addIssue = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body as Issue;
        const newIssue = await p.query("INSERT INTO issues(title, description) VALUES($1, $2) RETURNING *", [title, description]);
        res.json(newIssue.rows[0]);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
    
};

export const getAllIssues = async (req: Request, res: Response) => {
    try {
        const allIssues = await p.query("SELECT * FROM issues");
        res.json(allIssues.rows);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
    
};

export const getIssueById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const issue = await p.query(
            "SELECT * FROM issues WHERE todo_id = $1",
            [id]
        );
        if (issue.rows.length === 0) {
            return res.status(404).json("Issue not found");
        }
        res.json(issue.rows[0]);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
    
};

export const updateIssue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // Get the issue ID from the URL parameter
        const { title, description } = req.body; // Get title and description from request body

       //Update the title and description of the issue corresponding to the ID in the database
        const updatedIssue = await p.query(
            "UPDATE issues SET title = $1, description = $2 WHERE todo_id = $3 RETURNING *",
            [title, description, id]
        );

        // If the issue corresponding to the ID is not found, a 404 error is returned.
        if (updatedIssue.rows.length === 0) {
            return res.status(404).json("Issue not found");
        }

        // Return updated issue data
        res.json(updatedIssue.rows[0]);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json("Server error");
        } else {
            console.error('An unknown error occurred');
            res.status(500).json("An unknown error occurred");
        }
    }
};


export const deleteIssue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleteIssue = await p.query(
            "DELETE FROM issues WHERE todo_id = $1",
            [id]
        );
        res.json("Issue is deleted");
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('An unknown error occurred');
        }
    }
    
};


