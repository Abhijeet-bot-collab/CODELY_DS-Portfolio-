import React from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl font-bold text-green-400 mb-12 text-center">{children}</h2>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="bg-gray-500/10 rounded-lg shadow-lg overflow-hidden flex flex-col h-full border border-green-400/50 transition-transform duration-300 hover:scale-105 hover:shadow-green-400/20">
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-green-400">{project.title}</h3>
            <p className="mt-2 text-gray-300 flex-grow">{project.description}</p>
            <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 inline-block text-green-400 font-semibold hover:text-green-300 transition-colors"
            >
                View on GitHub &rarr;
            </a>
        </div>
    </div>
);

const Projects: React.FC = () => {
    return (
        <section id="projects" className="py-20">
            <SectionTitle>Projects</SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROJECTS.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </div>
        </section>
    );
};

export default Projects;