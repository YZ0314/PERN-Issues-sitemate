// controllers/issuesController.ts

import { Request, Response } from 'express';
import { Issue } from '../models/Issue';
import p from '../db'; 
/**
 * Adds a new issue to the database using the title and description provided in the request body.
 * 
 * @param {Request} req - The request object, containing the title and description of the new issue.
 * @param {Response} res - The response object used to return the added issue or an error message.
 * @returns The newly added issue object is returned as a JSON response if successful. In case of an error, an error message is logged and an appropriate error response is returned.
 */
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
/**
 * Retrieves all issues from the database.
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object used to return the fetched issues or an error message.
 * @returns An array of all issue objects in JSON format if successful. In case of an error, an error message is logged and an appropriate error response is returned.
 */
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
/**
 * Retrieves a single issue by its ID from the database.
 * 
 * @param {Request} req - The request object, containing the ID of the issue to retrieve.
 * @param {Response} res - The response object used to return the requested issue or an error message.
 * @returns The requested issue object in JSON format if found. Returns a 404 error response if the issue is not found. In case of an error, an error message is logged and an appropriate error response is returned.
 */
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
/**
 * Updates an existing issue in the database identified by its ID with the new title and description provided in the request body.
 * 
 * @param {Request} req - The request object, containing the ID of the issue to update and the new title and description.
 * @param {Response} res - The response object used to return the updated issue or an error message.
 * @returns The updated issue object in JSON format if the update is successful. Returns a 404 error response if the issue to be updated is not found. In case of an error, an error message is logged and an appropriate error response is returned.
 */
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

/**
 * Deletes an issue from the database identified by its ID.
 * 
 * @param {Request} req - The request object, containing the ID of the issue to delete.
 * @param {Response} res - The response object used to confirm the deletion or return an error message.
 * @returns A confirmation message is returned in JSON format if the deletion is successful. In case of an error, an error message is logged and an appropriate error response is returned.
 */
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


