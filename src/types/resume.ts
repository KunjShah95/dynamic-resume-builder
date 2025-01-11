export interface ResumeSection {
  id: string;
  type: 'personal' | 'experience' | 'education' | 'skills' | 'languages' | 'projects';
  content: any;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa?: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Language {
  name: string;
  proficiency: 'Basic' | 'Intermediate' | 'Advanced' | 'Native';
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}