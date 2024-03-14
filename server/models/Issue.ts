// models/issue.ts

export interface Issue {
    id?: number; // Optional as it is not required when creating
    title: string;
    description: string;
}
