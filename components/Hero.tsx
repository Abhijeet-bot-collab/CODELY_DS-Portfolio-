
import React from 'react';
import { PERSONAL_DETAILS, ICONS } from '../constants';

const Hero: React.FC = () => {
    return (
        <section id="hero" className="py-24 md:py-32 text-center">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                    Hi, I'm <span className="text-green-400">CODELY_DS</span>
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-300">
                    A Data Science & Machine Learning Enthusiast passionate about turning data into insights.
                </p>
                <div className="mt-8 flex justify-center space-x-6">
                    <a href={PERSONAL_DETAILS.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors duration-300" aria-label="GitHub">
                        {ICONS.github}
                    </a>
                    <a href={PERSONAL_DETAILS.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors duration-300" aria-label="LinkedIn">
                        {ICONS.linkedin}
                    </a>
                    <a href={`mailto:${PERSONAL_DETAILS.email}`} className="text-gray-400 hover:text-green-400 transition-colors duration-300" aria-label="Email">
                        {ICONS.email}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;