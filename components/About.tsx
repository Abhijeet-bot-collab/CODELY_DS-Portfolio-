import React from 'react';
import { PERSONAL_DETAILS, KEY_STRENGTHS } from '../constants';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl font-bold text-green-400 mb-8 text-center">{children}</h2>
);

const About: React.FC = () => {
    return (
        <section id="about" className="py-20">
            <SectionTitle>About Me</SectionTitle>
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="bg-gray-500/10 p-8 rounded-lg shadow-lg backdrop-blur-sm border border-green-400/50">
                    <h3 className="text-2xl font-semibold text-green-400 mb-4">Education</h3>
                    <p className="text-lg font-bold">{PERSONAL_DETAILS.education}</p>
                    <p className="text-gray-400">{PERSONAL_DETAILS.university}</p>
                </div>
                <div className="bg-gray-500/10 p-8 rounded-lg shadow-lg backdrop-blur-sm border border-green-400/50">
                    <h3 className="text-2xl font-semibold text-green-400 mb-4">Key Strengths</h3>
                    <ul className="space-y-3 list-disc list-inside">
                        {KEY_STRENGTHS.map((strength, index) => (
                            <li key={index} className="text-gray-300">{strength}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default About;