// src/data.ts
import { ComponentType } from 'react';
import { CodeBracketIcon } from '@heroicons/react/24/outline';

// Interfaces for type safety
interface Hero {
  headline: string;
  tagline: string;
  photo: string;
}

interface Skill {
  name: string;
  icon: ComponentType<any>; // Heroicon component type
}

interface Project {
  title: string;
  description: string;
  link: string;
}

interface Education {
  university: string;
  major: string;
  year: string;
  courses: string[];
}

// Data exports
export const hero: Hero = {
  headline: 'Aspiring Cybersecurity Engineer',
  tagline: 'Computer Science Freshman passionate about coding and technology',
  photo: 'https://lh3.googleusercontent.com/a/ACg8ocLE1AJlwhLuxivAbSWitgYuxNj43xQnhO-NsSWK5M8qDU1YwQ8=s432-c-no', // Replace with your photo URL
};

export const skills: Skill[] = [
  { name: 'Python', icon: CodeBracketIcon },
  { name: 'Java', icon: CodeBracketIcon },
  { name: 'HTML/CSS', icon: CodeBracketIcon },
  { name: 'Git', icon: CodeBracketIcon },
];

export const projects: Project[] = [
  {
    title: 'Project 1',
    description: 'A simple calculator built with Python to practice loops and conditionals.',
    link: 'https://github.com/yourusername/project1',
  },
  {
    title: 'Project 2',
    description: 'A personal webpage created with HTML and CSS.',
    link: 'https://github.com/yourusername/project2',
  },
];

export const education: Education = {
  university: 'Your University Name',
  major: 'Computer Science',
  year: 'Freshman',
  courses: ['Intro to Programming', 'Data Structures', 'Web Development'],
};