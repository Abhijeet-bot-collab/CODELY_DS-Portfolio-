import React, { useState, useRef, useEffect } from 'react';
import { askGemini } from '../services/geminiService';
import { GeminiModel, ChatMessage } from '../types';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl font-bold text-green-400 mb-8 text-center">{children}</h2>
);

const GeminiAssistant: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: 'model',
            content: "Hello! I'm Codely_DS's AI assistant. Feel free to ask me about his skills, projects, or any tech topic. Choose a mode below to get started.",
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedModel, setSelectedModel] = useState<GeminiModel>(GeminiModel.FLASH_LITE);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const modelOptions = [
        { id: GeminiModel.FLASH_LITE, label: 'Quick Answer', description: 'Fast responses for general questions.' },
        { id: GeminiModel.FLASH_SEARCH, label: 'Web Search', description: 'Uses Google Search for up-to-date info.' },
        { id: GeminiModel.PRO_THINKING, label: 'Deep Dive', description: 'Advanced reasoning for complex topics.' },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: prompt };
        const loadingMessage: ChatMessage = { role: 'model', content: '', isLoading: true };

        setMessages(prev => [...prev, userMessage, loadingMessage]);
        const currentPrompt = prompt;
        setPrompt('');
        setIsLoading(true);

        const result = await askGemini(currentPrompt, selectedModel);
        
        const modelResponse: ChatMessage = {
            role: 'model',
            content: result.text,
            groundingChunks: result.groundingChunks
        };

        setMessages(prev => [...prev.slice(0, -1), modelResponse]);
        setIsLoading(false);
    };

    const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
        const isUser = message.role === 'user';

        if (message.isLoading) {
            return (
                <div className="flex justify-start mb-4">
                    <div className="bg-gray-700/50 rounded-lg p-3 max-w-lg">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`${isUser ? 'bg-green-800/50' : 'bg-gray-700/50'} rounded-lg p-3 max-w-lg text-white`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.groundingChunks && message.groundingChunks.length > 0 && (
                        <div className="mt-4 border-t border-gray-600 pt-3">
                             <h4 className="font-semibold text-green-400 text-sm mb-2">Sources:</h4>
                             <ul className="list-disc list-inside space-y-1 text-sm">
                                 {message.groundingChunks.map((chunk, index) => (
                                     <li key={index}>
                                         <a href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                             {chunk.web.title}
                                         </a>
                                     </li>
                                 ))}
                             </ul>
                         </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <section id="ai-assistant" className="py-20">
            <SectionTitle>Chat With My AI Assistant</SectionTitle>
            <div className="max-w-3xl mx-auto bg-gray-500/10 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-green-400/50">
                <div className="mb-4 grid sm:grid-cols-3 gap-4">
                    {modelOptions.map(option => (
                        <button
                            key={option.id}
                            onClick={() => setSelectedModel(option.id)}
                            className={`p-3 rounded-lg text-left transition-all duration-200 border ${selectedModel === option.id ? 'bg-green-600/50 ring-2 ring-green-400 border-green-400' : 'bg-gray-700/50 hover:bg-gray-600/50 border-green-400/50'}`}
                        >
                            <div className="font-bold text-white text-sm">{option.label}</div>
                            <div className="text-xs text-gray-300 mt-1">{option.description}</div>
                        </button>
                    ))}
                </div>

                <div ref={chatContainerRef} className="h-96 bg-gray-900/50 rounded-md p-4 overflow-y-auto border border-gray-700 space-y-4">
                     {messages.map((msg, index) => (
                        <ChatBubble key={index} message={msg} />
                     ))}
                </div>

                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="flex items-center space-x-2">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                            placeholder="e.g., Explain the 'Customer-Churn-Analysis' project..."
                            className="flex-grow p-3 bg-gray-900/50 rounded-md border border-gray-600 focus:ring-2 focus:ring-green-400 focus:outline-none transition text-white resize-none"
                            rows={1}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-green-600 text-white font-bold py-3 px-5 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                            aria-label="Send message"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default GeminiAssistant;