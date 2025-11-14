import React from 'react';
import { SKILL_CATEGORIES } from '../constants';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl font-bold text-green-400 mb-12 text-center">{children}</h2>
);

const Skills: React.FC = () => {
    return (
        <section id="skills" className="py-20">
            <SectionTitle>Technical Skills</SectionTitle>
            <div className="space-y-10">
                {SKILL_CATEGORIES.map((category) => (
                    <div key={category.title} className="bg-gray-500/10 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-green-400/50">
                        <h3 className="text-xl font-semibold text-green-400 mb-4">{category.title}</h3>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill) => (
                                <span key={skill} className="bg-green-800/50 text-green-300 text-sm font-medium px-3 py-1 rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;