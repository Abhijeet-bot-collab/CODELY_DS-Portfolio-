
import React from 'react';
import { ICONS } from '../constants';

const Header: React.FC = () => {
    const navLinks = ['About', 'Skills', 'Projects', 'AI Assistant'];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id.toLowerCase().replace(' ', '-'));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-[#1f1c2c]/80 backdrop-blur-sm shadow-md shadow-green-400/10">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <span className="flex items-center text-2xl font-bold text-green-400">
                            <span className="text-green-400 mr-2">{ICONS.spark}</span>
                            CODELY_DS
                        </span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <button
                                    key={link}
                                    onClick={() => scrollToSection(link)}
                                    className="text-gray-300 hover:bg-gray-700 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {link}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;