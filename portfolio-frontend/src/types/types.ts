export interface Project {
    _id: string;
    title: string;
    description: string;
    techStack: string[];
    githubLink: string;
    liveDemoLink?: string;
    image?: string;
    createdAt: Date;
}