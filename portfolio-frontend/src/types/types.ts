// types.ts
export interface Project {
  _id: string;
  title: string;
  description: string;
  githubLink: string;
  techStack?: string[];
  liveDemoLink?: string;
  createdAt?: Date;
}