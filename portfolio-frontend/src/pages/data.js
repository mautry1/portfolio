// data.js
import { CodeBracketIcon } from '@heroicons/react/24/outline';

// Hero section data
export const hero = {
  headline: 'Aspiring Cybersecurity Engineer',
  tagline: 'Computer Science Freshman passionate about coding and technology',
  photo: 'https://lh3.googleusercontent.com/a/ACg8ocLE1AJlwhLuxivAbSWitgYuxNj43xQnhO-NsSWK5M8qDU1YwQ8=s432-c-no', // Replace with your photo URL
};

// Skills data (add your skills here)
export const skills = [
  { name: 'Python', icon: CodeBracketIcon },
  { name: 'Java', icon: CodeBracketIcon },
  { name: 'HTML/CSS', icon: CodeBracketIcon },
  { name: 'Git', icon: CodeBracketIcon },
];

// Featured projects data (add your projects here)
export const projects = [
  {
    title: 'Project 1',
    description: 'A simple calculator built with Python to practice loops and conditionals.',
    link: 'https://github.com/yourusername/project1',
  },
  {
    title: 'Project 2',
    description: 'A personal webpage created with HTML and CSS.',
    link: 'https://github.com/mautry1/portfolio',
  },
];

// Education data
export const education = {
  university: 'Colorado Christian University',
  major: 'Computer Science',
  year: 'Freshman',
  courses: ['Object-Oriented Programming', 'Discrete Mathematics', 'Calculus II', 'Linear Algebra'],
};