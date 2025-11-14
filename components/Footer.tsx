
import React from 'react';
import { PERSONAL_DETAILS, ICONS } from '../constants';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#1f1c2c]/50 border-t border-white/10 mt-20">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex justify-center space-x-6 mb-6">
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
                <p className="text-green-400 font-semibold">{PERSONAL_DETAILS.email}</p>
                <p className="mt-4 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} CODELY_DS. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;