"use client"

import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaEnvelope, FaPaperPlane, FaInstagram, FaUser, FaTag, FaComment } from 'react-icons/fa';
import { Code, Server, Database, Wrench, Zap, Code2Icon } from 'lucide-react';
import { RiNextjsLine } from 'react-icons/ri';
import { useForm, ValidationError } from '@formspree/react';
import HomePage from './Hero';
import {
    FaReact,
    FaNodeJs,
    FaHtml5,
    FaVuejs,
    FaAngular,
    FaJsSquare,
    FaSass,
    FaJava,
    FaGit,
    FaDocker,
    FaAws,
    FaGithub,
    FaFigma
} from 'react-icons/fa';

import {
    SiTypescript,
    SiTailwindcss,
    SiExpress,
    SiPython,
    SiDjango,
    SiPhp,
    SiLaravel,
    SiSpring,
    SiGraphql,
    SiMongodb,
    SiPostgresql,
    SiMysql,
    SiRedis,
    SiFirebase,
    SiOracle,
    SiJenkins,
    SiKubernetes,
    SiWebpack,
    SiDotnet,
} from 'react-icons/si';
import Projects from './Projects';

export default function Home() {

    const experiences = [
        {
            title: 'Associate Software Engineer Intern',
            company: 'Eurofins IT Solutions India',
            period: 'February 2025 - Present',
            description: 'Currently dwelving myself into the world of Angular and .NET'
        },
        {
            title: 'FreeLancer Developer',
            company: 'Quadspace',
            period: 'October 2024 - January 2025',
            description: 'Created interactive UIs and implemented responsive designs for various client projects.'
        },
        {
            title: 'Software Development Engineer Intern',
            company: 'CodeInbound LLp',
            period: 'February 2024 - May 2024',
            description: 'Developed RESTful APIs and implemented MFAs using nestjs'
        },
    ];

    const skillCategories = [
        { id: 'frontend', name: 'Frontend', icon: <Code className="text-orange-200" />, color: 'from-orange-500 to-orange-700' },
        { id: 'backend', name: 'Backend', icon: <Server className="text-orange-200" />, color: 'from-orange-500 to-orange-700' },
        { id: 'databases', name: 'Databases', icon: <Database className="text-orange-200" />, color: 'from-orange-500 to-orange-700' },
        { id: 'tools', name: 'Tools', icon: <Wrench className="text-orange-200" />, color: 'from-orange-500 to-orange-700' }
    ];

    const skills = {
        frontend: [
            { name: 'React', icon: 'react', featured: true },
            { name: 'NextJs', icon: 'nextJS', featured: true },
            { name: 'Angular', icon: 'angularjs' },
            { name: 'JavaScript', icon: 'javascript', featured: true },
            { name: 'TypeScript', icon: 'typescript', featured: true },
            { name: 'HTML5', icon: 'html5' },
            { name: 'CSS3', icon: 'css3' },
            { name: 'Tailwind', icon: 'tailwindcss', featured: true },
            { name: 'SASS', icon: 'sass' }
        ],
        backend: [
            { name: 'Node.js', icon: 'nodejs', featured: true },
            { name: 'Express', icon: 'express', featured: true },
            { name: 'Python', icon: 'python' },
            { name: 'Django', icon: 'django' },
            { name: '.NET', icon: 'dotnet', featured: true },
        ],
        databases: [
            { name: 'MongoDB', icon: 'mongodb', featured: true },
            { name: 'PostgreSQL', icon: 'postgresql', featured: true },
            { name: 'MySQL', icon: 'mysql' },
            { name: 'Firebase', icon: 'firebase' },
            { name: 'Supabase', icon: 'supabase', featured: true },
        ],
        tools: [
            { name: 'Git', icon: 'git' },
            { name: 'Docker', icon: 'docker' },
            { name: 'GitHub', icon: 'github', featured: true },
            { name: 'VSCode', icon: 'vscode', featured: true }
        ]
    };

    const [activeSection, setActiveSection] = useState('home');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('frontend');
    const [state, handleSubmit] = useForm("xqaprqqb");
    const [isMobile, setIsMobile] = useState(false);


    const isAnimatingRef = useRef(false);
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const skillsRef = useRef(null);
    const projectsRef = useRef(null);
    const experienceRef = useRef(null);
    const contactRef = useRef(null);
    const formRef = useRef(null);

    const { scrollY } = useScroll();

    useEffect(() => {
        setIsMounted(true);

        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;

            if (homeRef.current && scrollPosition < homeRef.current.offsetHeight) {
                setActiveSection('home');
            } else if (aboutRef.current && scrollPosition < aboutRef.current.offsetTop + aboutRef.current.offsetHeight) {
                setActiveSection('about');
            } else if (skillsRef.current && scrollPosition < skillsRef.current.offsetTop + skillsRef.current.offsetHeight) {
                setActiveSection('skills');
            } else if (projectsRef.current && scrollPosition < projectsRef.current.offsetTop + projectsRef.current.offsetHeight) {
                setActiveSection('projects');
            } else if (experienceRef.current && scrollPosition < experienceRef.current.offsetTop + experienceRef.current.offsetHeight) {
                setActiveSection('experience');
            } else if (contactRef.current) {
                setActiveSection('contact');
            }
        };

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);


    useEffect(() => {
        if (state.succeeded && formRef.current) {
            formRef.current.reset();
        }
    }, [state.succeeded]);

    const scrollTo = useCallback((id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection(id);
        setIsNavOpen(false);
    }, []);

    const gradientStyle = {
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 165, 0, 0.15), rgba(255, 165, 0, 0.05), transparent 40%)`,
    };

    const getSkillIcon = (icon) => {
        const iconMap = {
            'react': <FaReact />,
            'vuejs': <FaVuejs />,
            'angularjs': <FaAngular />,
            'javascript': <FaJsSquare />,
            'typescript': <SiTypescript />,
            'html5': <FaHtml5 />,
            'css3': <FaHtml5 />,
            'tailwindcss': <SiTailwindcss />,
            'sass': <FaSass />,
            'nodejs': <FaNodeJs />,
            'express': <SiExpress />,
            'python': <SiPython />,
            'django': <SiDjango />,
            'php': <SiPhp />,
            'laravel': <SiLaravel />,
            'java': <FaJava />,
            'spring': <SiSpring />,
            'graphql': <SiGraphql />,
            'mongodb': <SiMongodb />,
            'postgresql': <SiPostgresql />,
            'mysql': <SiMysql />,
            'redis': <SiRedis />,
            'firebase': <SiFirebase />,
            'supabase': <Zap />,
            'oracle': <SiOracle />,
            'amazonwebservices': <FaAws />,
            'git': <FaGit />,
            'docker': <FaDocker />,
            'github': <FaGithub />,
            'jenkins': <SiJenkins />,
            'kubernetes': <SiKubernetes />,
            'webpack': <SiWebpack />,
            'figma': <FaFigma />,
            'vscode': <Code2Icon />,
            'nextJS': <RiNextjsLine />,
            'dotnet': <SiDotnet />,
        };

        return iconMap[icon] || <FaReact />;
    };

    if (!isMounted) {
        return null;
    }

    return (

        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <Head>
                <title>Aveek Chakraborty | Full Stack Developer</title>
                <meta name="description" content="Portfolio of Aveek Chakraborty, Full Stack Developer" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="fixed inset-0 pointer-events-none" style={gradientStyle}></div>

            <nav className="fixed top-6 right-12 md:right-1/2 transform translate-x-1/2 z-50">
                <div className="backdrop-blur-lg bg-black/40 rounded-2xl border border-orange-500/20 shadow-xl transition-all duration-300 hover:shadow-orange-500/10">
                   
                    <div className="hidden md:flex items-center px-6 py-3">
                        {sections.map((section, index) => (
                            <div key={section} className="relative mx-2">
                                <button
                                    onClick={() => scrollTo(section)}
                                    className={`text-sm font-medium px-3 py-1.5 transition-all duration-300 hover:text-orange-400 relative group ${activeSection === section ? 'text-orange-400 font-semibold' : 'text-gray-300'
                                        }`}
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                    <div
                                        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transform origin-left transition-all duration-500 ${activeSection === section ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-75'
                                            }`}
                                    />
                                </button>
                                {index < sections.length - 1 && (
                                    <span className="text-gray-600 text-xs absolute top-1/2 -right-2 transform -translate-y-1/2">•</span>
                                )}
                            </div>
                        ))}
                    </div>

                    
                    <div className="md:hidden flex items-center justify-between p-3">
                        <button
                            onClick={() => setIsNavOpen(!isNavOpen)}
                            className="p-2 rounded-full hover:bg-gray-800/70 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <div className="relative w-6 h-5">
                                <span className={`block h-0.5 w-6 bg-white absolute transition-all duration-300 transform ${isNavOpen ? 'top-2 -rotate-45' : 'top-0'}`}></span>
                                <span className={`block h-0.5 w-6 bg-white absolute top-2 transition-all duration-300 ${isNavOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                                <span className={`block h-0.5 w-6 bg-white absolute transition-all duration-300 transform ${isNavOpen ? 'top-2 rotate-45' : 'top-4'}`}></span>
                            </div>
                        </button>
                    </div>
                </div>

                
                <AnimatePresence>
                    {isNavOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -10 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="absolute top-14 right-0 md:hidden backdrop-blur-xl bg-black/80 mt-5 rounded-xl border border-orange-500/20 shadow-2xl shadow-black/40 w-44 overflow-hidden"
                            style={{ originY: 0 }}
                        >
                            <div className="py-2">
                                {sections.map((section, index) => (
                                    <motion.button
                                        key={section}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        
                                        onClick={() => {
                                            
                                            setIsNavOpen(false);

                                            
                                            setTimeout(() => {
                                                
                                                const element = document.getElementById(section);
                                                if (element) {
                                                    
                                                    const yOffset = -80; 
                                                    const elementPosition = element.getBoundingClientRect().top;
                                                    const offsetPosition = elementPosition + window.pageYOffset + yOffset;

                                                    
                                                    window.scrollTo({
                                                        top: offsetPosition,
                                                        behavior: 'smooth'
                                                    });

                                                    
                                                    setActiveSection(section);
                                                    if (section === 'home') {
                                                        setActiveSection('home');
                                                    }
                                                }
                                            }, 10);
                                        }}
                                        className={`w-full text-left text-sm font-medium px-4 py-3 transition-all duration-300 hover:bg-orange-900/20 flex items-center ${activeSection === section
                                            ? 'text-orange-400 border-l-2 border-orange-400 bg-orange-900/10'
                                            : 'text-gray-300 border-l-2 border-transparent'
                                            }`}
                                        whileHover={{
                                            backgroundColor: 'rgba(249, 115, 22, 0.15)',
                                            x: 2,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        {activeSection === section && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 500 }}
                                                className="mr-2 h-1.5 w-1.5 rounded-full bg-orange-400"
                                            />
                                        )}
                                        {section.charAt(0).toUpperCase() + section.slice(1)}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <HomePage homeRef={homeRef} setActiveSection={setActiveSection} setIsNavOpen={setIsNavOpen} />

            <section id="about" ref={aboutRef} className="py-20 md:py-32 relative overflow-hidden">
                {/* Background gradients and decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-orange-950/10 z-0"></div>
                <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl opacity-60"></div>

                {/* Additional background decorative elements */}
                <div className="absolute top-40 left-1/4 w-72 h-72 bg-orange-500/3 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-40 right-1/4 w-56 h-56 bg-orange-600/3 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-orange-400/5 rounded-full blur-2xl animate-pulse"></div>

                {/* Decorative geometric shapes with animation */}
                <div className="absolute top-10 right-10 w-20 h-20 border border-orange-500/20 rounded-full animate-[float_8s_ease-in-out_infinite]"></div>
                <div className="absolute bottom-10 left-10 w-16 h-16 border border-orange-500/10 rounded-md rotate-45 animate-[float_7s_ease-in-out_infinite_1s]"></div>
                <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-orange-500/10 rounded-full animate-[float_6s_ease-in-out_infinite_0.5s]"></div>
                <div className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-orange-500/20 rounded-full animate-[float_5s_ease-in-out_infinite_1.5s]"></div>

                {/* Additional decorative geometric shapes with animation */}
                <div className="absolute top-1/5 left-20 w-12 h-12 border border-orange-500/15 rounded-full animate-[float_9s_ease-in-out_infinite_0.7s]"></div>
                <div className="absolute bottom-1/5 right-20 w-10 h-10 border border-orange-400/15 rounded-md rotate-12 animate-[float_8s_ease-in-out_infinite_1.2s]"></div>
                <div className="absolute top-3/4 left-1/5 w-8 h-8 bg-orange-500/8 rounded-full animate-[float_7s_ease-in-out_infinite_0.3s]"></div>
                <div className="absolute top-40 right-40 w-5 h-5 bg-orange-400/15 rounded-full animate-[float_6s_ease-in-out_infinite_1.7s]"></div>
                <div className="absolute bottom-60 left-60 w-3 h-3 bg-orange-300/25 rounded-full animate-[float_5s_ease-in-out_infinite_0.9s]"></div>
                <div className="absolute top-60 right-1/3 w-7 h-7 border border-orange-500/10 rounded-full animate-[float_10s_ease-in-out_infinite_1.3s]"></div>
                <div className="absolute bottom-32 left-32 w-9 h-9 border border-orange-400/5 rounded-md rotate-30 animate-[float_11s_ease-in-out_infinite_0.2s]"></div>

                
                <style jsx>{`
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(2deg); }
            50% { transform: translateY(0px) rotate(0deg); }
            75% { transform: translateY(10px) rotate(-2deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes pulse-glow {
            0% { opacity: 0.4; }
            50% { opacity: 0.7; }
            100% { opacity: 0.4; }
        }
        
        @keyframes slow-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `}</style>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-200 to-orange-400">About Me</h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 mx-auto rounded-full"></div>
                        <div className="h-[2px] w-16 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mt-1 rounded-full"></div>
                    </motion.div>

                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="w-full md:w-1/2"
                        >
                            <div className="relative group mx-auto" style={{ maxWidth: "340px" }}>
                                {/* Floating animation for the entire profile container */}
                                <div className="animate-[float_15s_ease-in-out_infinite]">
                                    {/* Main profile frame with premium effects - slightly bigger */}
                                    <div className="w-72 h-72 md:w-84 md:h-84 rounded-3xl overflow-hidden mx-auto border-[3px] border-orange-500/30 backdrop-blur-xl bg-black/60 shadow-lg shadow-orange-900/20 relative group-hover:scale-[1.03] transition-all duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-black/30 to-black/60 z-0"></div>
                                        <div className="absolute inset-[3px] rounded-2xl overflow-hidden bg-gradient-to-br from-orange-700/10 via-orange-500/5 to-transparent"></div>

                                        {/* Image placeholder with hover effects */}
                                        <div className="absolute inset-0 z-10 overflow-hidden">
                                            {/* Profile image */}
                                            <img
                                                src="Aveek.jpg"
                                                alt="Aveek Chakraborty"
                                                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                                            />

                                            {/* Overlay on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                                        </div>

                                        {/* Decorative corner accents */}
                                        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-orange-400/50 rounded-tl-lg z-20"></div>
                                        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-orange-400/50 rounded-tr-lg z-20"></div>
                                        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-orange-400/50 rounded-bl-lg z-20"></div>
                                        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-orange-400/50 rounded-br-lg z-20"></div>

                                        {/* Additional ornate corner accents */}
                                        <div className="absolute top-5 left-5 w-4 h-4 border-t border-l border-orange-400/30 rounded-tl-md z-20"></div>
                                        <div className="absolute top-5 right-5 w-4 h-4 border-t border-r border-orange-400/30 rounded-tr-md z-20"></div>
                                        <div className="absolute bottom-5 left-5 w-4 h-4 border-b border-l border-orange-400/30 rounded-bl-md z-20"></div>
                                        <div className="absolute bottom-5 right-5 w-4 h-4 border-b border-r border-orange-400/30 rounded-br-md z-20"></div>

                                        {/* Name overlay at bottom */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                            <h3 className="text-xl font-bold text-white text-center">Aveek Chakraborty</h3>
                                            <p className="text-sm text-orange-400 text-center">Full Stack Developer</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Enhanced glow effect with animation */}
                                <div className="absolute -z-10 top-5 left-5 right-5 bottom-5 rounded-3xl bg-orange-500/10 blur-xl group-hover:bg-orange-500/20 transition-all duration-500 animate-[pulse-glow_4s_ease-in-out_infinite]"></div>
                                <div className="absolute -z-10 top-0 left-0 w-full h-full rounded-3xl bg-orange-500/20 blur-md transform -rotate-3 scale-90 opacity-60 group-hover:scale-95 group-hover:rotate-6 transition-all duration-700 animate-[pulse-glow_6s_ease-in-out_infinite_1s]"></div>

                                {/* Additional glow effects with animation */}
                                <div className="absolute -z-10 top-10 left-10 w-3/4 h-3/4 rounded-3xl bg-orange-400/5 blur-lg transform rotate-6 scale-95 opacity-40 group-hover:scale-100 group-hover:-rotate-3 transition-all duration-700 animate-[pulse-glow_8s_ease-in-out_infinite_2s]"></div>

                                {/* Decorative dots with animation */}
                                <div className="absolute -right-4 top-1/4 w-3 h-3 bg-orange-500/60 rounded-full group-hover:scale-150 group-hover:bg-orange-400/80 transition-all duration-500 animate-[float_6s_ease-in-out_infinite]"></div>
                                <div className="absolute -left-4 bottom-1/4 w-3 h-3 bg-orange-500/60 rounded-full group-hover:scale-150 group-hover:bg-orange-400/80 transition-all duration-500 delay-100 animate-[float_7s_ease-in-out_infinite_0.5s]"></div>
                                <div className="absolute -right-2 bottom-1/3 w-2 h-2 bg-orange-400/60 rounded-full group-hover:scale-150 group-hover:bg-orange-300/80 transition-all duration-500 delay-150 animate-[float_5s_ease-in-out_infinite_1s]"></div>
                                <div className="absolute -left-2 top-1/3 w-2 h-2 bg-orange-400/60 rounded-full group-hover:scale-150 group-hover:bg-orange-300/80 transition-all duration-500 delay-200 animate-[float_8s_ease-in-out_infinite_1.5s]"></div>

                                {/* Additional decorative dots with animation */}
                                <div className="absolute -right-6 top-1/2 w-2 h-2 bg-orange-300/60 rounded-full group-hover:scale-150 group-hover:bg-orange-200/80 transition-all duration-500 delay-100 animate-[float_9s_ease-in-out_infinite_0.7s]"></div>
                                <div className="absolute -left-6 top-1/2 w-2 h-2 bg-orange-300/60 rounded-full group-hover:scale-150 group-hover:bg-orange-200/80 transition-all duration-500 delay-150 animate-[float_7s_ease-in-out_infinite_1.2s]"></div>
                                <div className="absolute right-1/4 -top-4 w-3 h-3 bg-orange-400/40 rounded-full group-hover:scale-150 group-hover:bg-orange-300/60 transition-all duration-500 delay-200 animate-[float_8s_ease-in-out_infinite_0.3s]"></div>
                                <div className="absolute left-1/4 -bottom-4 w-3 h-3 bg-orange-400/40 rounded-full group-hover:scale-150 group-hover:bg-orange-300/60 transition-all duration-500 delay-250 animate-[float_6s_ease-in-out_infinite_0.9s]"></div>

                                {/* Floating decorative elements with animation */}
                                <div className="absolute -left-8 top-1/4 w-4 h-1 bg-orange-500/30 rounded-full animate-[float_5s_ease-in-out_infinite_1.3s]"></div>
                                <div className="absolute -right-8 bottom-1/4 w-4 h-1 bg-orange-500/30 rounded-full animate-[float_6s_ease-in-out_infinite_0.2s]"></div>
                                <div className="absolute left-1/3 -top-3 w-1 h-4 bg-orange-500/30 rounded-full animate-[float_7s_ease-in-out_infinite_0.8s]"></div>
                                <div className="absolute right-1/3 -bottom-3 w-1 h-4 bg-orange-500/30 rounded-full animate-[float_8s_ease-in-out_infinite_1.4s]"></div>

                                {/* Additional floating particles with animation */}
                                <div className="absolute -left-10 top-1/2 w-2 h-2 bg-orange-400/20 rounded-full animate-[float_10s_ease-in-out_infinite_1.1s]"></div>
                                <div className="absolute -right-10 bottom-1/2 w-2 h-2 bg-orange-400/20 rounded-full animate-[float_9s_ease-in-out_infinite_0.6s]"></div>
                                <div className="absolute left-1/4 -top-6 w-3 h-3 border border-orange-500/10 rounded-full animate-[slow-spin_15s_linear_infinite]"></div>
                                <div className="absolute right-1/4 -bottom-6 w-3 h-3 border border-orange-500/10 rounded-full animate-[slow-spin_20s_linear_infinite_reverse]"></div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="w-full md:w-1/2"
                        >
                            <div className="backdrop-blur-xl bg-black/40 p-8 md:p-10 rounded-2xl border border-gray-800/80 shadow-xl relative overflow-hidden group">
                                {/* Glass effect overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-80"></div>

                                {/* Subtle animated gradient */}
                                <div className="absolute -inset-1/2 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-2000 ease-in-out"></div>

                                {/* Content with premium styling */}
                                <div className="relative z-10">
                                    <div className="flex items-center mb-6">
                                        <div className="w-1 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-3"></div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white">Hello! I'm <span className="text-orange-400">Aveek</span></h3>
                                    </div>

                                    <p className="text-gray-300 mb-5 leading-relaxed border-l-2 border-orange-500/20 pl-4">
                                        I'm a passionate Full Stack Developer with over 2 years of experience in building modern web applications. I specialize in creating responsive, user-friendly interfaces with cutting-edge technologies.
                                    </p>

                                    <p className="text-gray-300 mb-8 leading-relaxed">
                                        My journey in web development began with a fascination for creating interactive experiences. Today, I leverage my expertise in React, Next.js, Angular, Node.js, .NET and various other technologies to build scalable and performant applications that deliver exceptional user experiences.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                        <div className="bg-gradient-to-br from-black/80 to-black/40 px-4 py-4 rounded-xl border border-gray-800/80 shadow-lg relative group overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
                                            <span className="text-2xl text-orange-400 font-bold relative z-10">2+</span>
                                            <p className="text-sm text-gray-400 mt-1 relative z-10">Years Experience</p>
                                        </div>

                                        <div className="bg-gradient-to-br from-black/80 to-black/40 px-4 py-4 rounded-xl border border-gray-800/80 shadow-lg relative group overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
                                            <span className="text-2xl text-orange-400 font-bold relative z-10">8+</span>
                                            <p className="text-sm text-gray-400 mt-1 relative z-10">Projects Completed</p>
                                        </div>

                                        <div className="bg-gradient-to-br from-black/80 to-black/40 px-4 py-4 rounded-xl border border-gray-800/80 shadow-lg relative group overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
                                            <span className="text-2xl text-orange-400 font-bold relative z-10">2+</span>
                                            <p className="text-sm text-gray-400 mt-1 relative z-10">Happy Clients</p>
                                        </div>
                                    </div>

                                    {/* Download Resume Button with functionality */}
                                    <a
                                        href="/Resume.pdf"
                                        download="Aveek_Chakraborty_Resume.pdf"
                                        className="px-6 py-3 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-xl shadow-orange-900/20 flex items-center justify-center group relative overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center">
                                            <span className="mr-2">Download Resume</span>
                                            <svg
                                                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                >
                                                </path>
                                            </svg>
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/20 to-orange-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-orange-400 to-orange-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section id="skills" ref={skillsRef} className="py-24 md:py-32 relative overflow-hidden bg-black">
                {/* Optimized background effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20"></div>
                    <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-orange-600 opacity-10 blur-3xl"></div>
                    <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-orange-400 opacity-10 blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Section header with improved gradient */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <motion.div
                            className="inline-block relative"
                        >
                            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-50 via-orange-200 to-orange-600">
                                Technical Expertise
                            </h2>
                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-500/0"></div>
                        </motion.div>
                        <p className="text-gray-300 max-w-2xl mx-auto mt-6 text-lg">
                            Specialized skills across the entire development stack,
                            from interactive frontends to scalable backend systems
                        </p>
                    </motion.div>

                    {/* Optimized category selector */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="relative mb-20"
                    >
                        <div className="flex flex-wrap justify-center gap-6 md:gap-10 relative">
                            {skillCategories.map((category, index) => (
                                <motion.button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                    whileHover={{
                                        scale: 1.08,
                                        boxShadow: '0 0 30px rgba(249,115,22,0.2)'
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`group relative flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-lg
                        ${activeCategory === category.id
                                            ? `bg-gradient-to-br from-orange-500/90 to-orange-700/90 shadow-lg shadow-orange-900/30 border border-orange-500/50`
                                            : 'bg-gray-900/70 hover:bg-gray-800/80 border border-gray-700/50 hover:border-orange-700/40'
                                        }`}
                                >
                                    {/* Glassmorphic shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Icon */}
                                    <motion.div
                                        className={`text-4xl mb-3 ${activeCategory === category.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}
                                        animate={activeCategory === category.id ? {
                                            scale: [1, 1.2, 1],
                                        } : {}}
                                        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                                    >
                                        {category.icon}
                                    </motion.div>

                                    {/* Category name */}
                                    <span className={`font-medium text-sm md:text-base ${activeCategory === category.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                        {category.name}
                                    </span>

                                    {/* Glow effect on active */}
                                    {activeCategory === category.id && (
                                        <motion.div
                                            className="absolute -inset-1 rounded-2xl opacity-40 blur-lg z-0"
                                            animate={{
                                                opacity: [0.2, 0.5, 0.2]
                                            }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                            style={{
                                                background: 'linear-gradient(to right, #f97316, #c2410c)'
                                            }}
                                        />
                                    )}

                                    {/* Active indicator dot */}
                                    {activeCategory === category.id && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -bottom-1 w-2 h-2 rounded-full bg-orange-400"
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Optimized Skills display area */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="relative mt-10"
                        >
                            {/* Category indicator */}
                            <motion.div
                                className="absolute -top-16 left-1/2 my-4 transform -translate-x-1/2 px-6 py-3 rounded-full backdrop-blur-md bg-black/50 text-white border border-orange-500/30 flex items-center gap-3 z-20 shadow-lg shadow-orange-900/20"
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                            >
                                <Zap size={18} className="text-orange-500" />
                                <span className="text-base font-medium">
                                    {skillCategories.find(c => c.id === activeCategory)?.name} Technologies
                                </span>
                            </motion.div>

                            {/* Optimized hexagonal skills grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 relative z-10 max-w-6xl mx-auto py-8">
                                {skills[activeCategory].map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.07,
                                            type: "spring",
                                            stiffness: 280,
                                            damping: 20
                                        }}
                                        whileHover={{
                                            scale: 1.15,
                                            zIndex: 30,
                                            transition: { duration: 0.3, type: "spring" }
                                        }}
                                        className={`relative aspect-square flex flex-col items-center justify-center ${skill.featured ? 'z-10' : 'z-0'}`}
                                    >
                                        {/* Hexagonal shape */}
                                        <div className={`absolute inset-0 hexagon-shape backdrop-blur-md ${skill.featured
                                            ? `bg-gradient-to-br from-orange-500/30 to-orange-700/30`
                                            : 'bg-gray-800/50'
                                            } border ${skill.featured
                                                ? 'border-orange-500/50'
                                                : 'border-gray-700/40'
                                            } transition-all duration-300 shadow-xl`}
                                        >
                                            {/* Inner glassmorphic shine */}
                                            <div className="absolute inset-0 hexagon-shape bg-gradient-to-br from-white/10 to-transparent"></div>
                                        </div>

                                        {/* Icon */}
                                        <div className="relative z-10 mb-2 flex items-center justify-center w-12 h-12">
                                            {skill.featured && (
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/10 rounded-full blur-md"
                                                    animate={{
                                                        scale: [1, 1.3, 1],
                                                        opacity: [0.5, 0.8, 0.5]
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        repeatType: "reverse"
                                                    }}
                                                />
                                            )}
                                            <div className={`text-3xl md:text-4xl transition-all duration-300 ${skill.featured ? 'text-orange-500' : 'text-orange-400'}`}>
                                                {getSkillIcon(skill.icon)}
                                            </div>
                                        </div>

                                        {/* Skill name */}
                                        <span className={`text-sm md:text-base text-center ${skill.featured ? 'text-white' : 'text-gray-300'} relative z-10 font-medium px-2`}>
                                            {skill.name}
                                        </span>


                                        {/* Animated glow for featured skills */}
                                        {skill.featured && (
                                            <motion.div
                                                className="absolute inset-0 hexagon-shape -z-10 opacity-40 blur-lg"
                                                animate={{
                                                    opacity: [0.2, 0.5, 0.2]
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    repeatType: "reverse"
                                                }}
                                                style={{
                                                    background: 'linear-gradient(to right, #f97316, #ea580c)'
                                                }}
                                            />
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Category-specific decorative elements */}
                            <div className="absolute inset-0 -z-10 overflow-hidden">
                                {activeCategory === 'frontend' && (
                                    <>
                                        <motion.div
                                            className="absolute top-10 right-10 text-7xl text-orange-500/10 opacity-40"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                        >
                                            &lt;/&gt;
                                        </motion.div>
                                        <motion.div
                                            className="absolute bottom-10 left-10 text-9xl text-orange-500/10 opacity-40"
                                            animate={{ rotate: -360 }}
                                            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                                        >
                                            { }
                                        </motion.div>
                                    </>
                                )}

                                {activeCategory === 'backend' && (
                                    <>
                                        <motion.div
                                            className="absolute top-20 right-20 w-36 h-36 border-2 border-orange-500/15 rounded-full opacity-40"
                                            animate={{ scale: [1, 1.5, 1] }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                        />
                                        <motion.div
                                            className="absolute bottom-10 left-10 w-48 h-48 border border-orange-500/15 rounded-full opacity-30"
                                            animate={{ scale: [1.2, 0.8, 1.2] }}
                                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                                        />
                                    </>
                                )}

                                {activeCategory === 'tools' && (
                                    <>
                                        <motion.div
                                            className="absolute top-1/3 right-1/4 w-20 h-20 border border-orange-500/15 rotate-45 opacity-30"
                                            animate={{ rotate: 225 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        />
                                        <motion.div
                                            className="absolute bottom-1/4 left-1/3 w-28 h-28 border border-orange-500/15 rotate-12 opacity-40"
                                            animate={{ rotate: -348 }}
                                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                        />
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Optimized CSS */}
                <style jsx global>{`
        .hexagon-shape {
            clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
        }
        
        .bg-grid-pattern {
            background-size: 30px 30px;
            background-image: linear-gradient(to right, rgba(249, 115, 22, 0.07) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(249, 115, 22, 0.07) 1px, transparent 1px);
        }
    `}</style>
            </section>

            <Projects
                setModalOpen={setModalOpen}
                setSelectedProject={setSelectedProject}
                isAnimatingRef={isAnimatingRef}
                projectsRef={projectsRef}
                setIsMobile={setIsMobile}
                isMobile={isMobile}
                modalOpen={modalOpen}
                selectedProject={selectedProject}
            />

            <section id="experience" ref={experienceRef} className="py-20 md:py-32 relative overflow-hidden bg-black/80">
                {/* Enhanced gradient background */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-orange-950/10 to-black/60 z-0"></div>

                {/* Improved animated particles background with more depth */}
                <div className="absolute inset-0 z-0 opacity-30">
                    <div className="absolute top-10 left-1/4 w-40 h-40 rounded-full bg-orange-500/20 blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-1/3 w-48 h-48 rounded-full bg-orange-400/20 blur-3xl animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '5s' }}></div>
                    <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-orange-300/20 blur-3xl animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '7s' }}></div>
                    <div className="absolute bottom-1/4 left-1/3 w-36 h-36 rounded-full bg-orange-600/20 blur-3xl animate-pulse" style={{ animationDelay: '0.8s', animationDuration: '6s' }}></div>
                </div>

                {/* Enhanced bottom gradients with more vibrant colors and better layering */}
                <div className="absolute bottom-0 left-0 right-0 h-96 z-0">
                    <div className="absolute bottom-0 left-1/6 w-96 h-48 rounded-full bg-gradient-to-t from-orange-500/25 to-orange-400/5 blur-3xl"></div>
                    <div className="absolute -bottom-10 right-1/4 w-80 h-64 rounded-full bg-gradient-to-tr from-orange-600/20 to-orange-100/5 blur-3xl"></div>
                    {/* <div className="absolute -bottom-5 left-1/3 w-full h-40 rounded-full bg-gradient-to-r from-orange-700/20 via-orange-500/15 to-orange-300/5 blur-3xl"></div> */}
                    <div className="absolute bottom-10 right-1/6 w-64 h-36 rounded-full bg-gradient-to-tl from-orange-500/25 to-orange-200/10 blur-3xl"></div>
                    <div className="absolute bottom-5 left-10 w-72 h-48 rounded-full bg-gradient-to-r from-orange-400/15 to-transparent blur-3xl"></div>
                </div>

                {/* Subtle noise texture overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" style={{ mixBlendMode: 'overlay' }}></div>

                {/* Floating decorative elements around the timeline */}
                <div className="absolute inset-0 overflow-hidden z-0">
                    {/* Floating circles */}
                    <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full border border-orange-400/40 bg-orange-500/20 animate-float" style={{ animationDuration: '12s' }}></div>
                    <div className="absolute top-1/3 right-1/3 w-5 h-5 rounded-full border border-orange-300/30 bg-orange-400/10 animate-float-delayed" style={{ animationDuration: '15s', animationDelay: '2s' }}></div>
                    <div className="absolute bottom-1/3 left-1/3 w-4 h-4 rounded-full border border-orange-500/40 bg-orange-500/10 animate-float" style={{ animationDuration: '18s', animationDelay: '1s' }}></div>

                    {/* Floating triangles */}
                    <div className="absolute top-2/5 right-1/4 w-4 h-4 animate-float-delayed" style={{ animationDuration: '14s', animationDelay: '0.5s' }}>
                        <div className="w-full h-full rotate-45 border border-orange-400/30 bg-orange-400/5"></div>
                    </div>
                    <div className="absolute bottom-2/5 left-1/5 w-6 h-6 animate-float" style={{ animationDuration: '16s', animationDelay: '3s' }}>
                        <div className="w-full h-full rotate-12 border border-orange-300/20 bg-orange-300/5"></div>
                    </div>

                    {/* Floating lines */}
                    <div className="absolute top-1/2 right-1/5 w-16 h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent animate-float-delayed" style={{ animationDuration: '20s', animationDelay: '1.5s' }}></div>
                    <div className="absolute bottom-1/4 left-1/4 w-12 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent animate-float" style={{ animationDuration: '16s', animationDelay: '2.5s' }}></div>

                    {/* Floating dots */}
                    <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 rounded-full bg-orange-300/60 animate-pulse animate-float-delayed" style={{ animationDuration: '13s', animationDelay: '1s' }}></div>
                    <div className="absolute bottom-2/3 left-1/2 w-1 h-1 rounded-full bg-orange-400/50 animate-pulse animate-float" style={{ animationDuration: '17s', animationDelay: '0.5s' }}></div>
                    <div className="absolute top-1/2 right-1/2 w-2 h-2 rounded-full bg-orange-500/40 animate-pulse animate-float-delayed" style={{ animationDuration: '15s', animationDelay: '3.5s' }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-100 to-orange-400 drop-shadow-lg">Work Experience</h2>
                        <div className="h-1.5 w-28 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full shadow-lg shadow-orange-500/30"></div>
                    </motion.div>

                    <div className="max-w-4xl mx-auto relative">
                        {/* Additional floating elements specifically around the timeline */}
                        <div className="absolute -left-8 top-1/4 w-2 h-2 rounded-full bg-orange-400/60 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
                        <div className="absolute -right-4 top-1/3 w-8 h-px bg-gradient-to-r from-orange-500/40 to-transparent animate-float" style={{ animationDuration: '10s', animationDelay: '0.5s' }}></div>
                        <div className="absolute -left-6 bottom-1/4 w-1 h-1 rounded-full bg-orange-300/70 animate-ping" style={{ animationDuration: '3s', animationDelay: '2s' }}></div>
                        <div className="absolute -right-8 bottom-1/3 w-3 h-3 rounded-full border border-orange-400/30 animate-float-delayed" style={{ animationDuration: '12s', animationDelay: '1.5s' }}></div>

                        {/* Additional shape decorations */}
                        <div className="absolute top-1/2 -left-12 w-4 h-4 animate-float" style={{ animationDuration: '15s' }}>
                            <div className="w-full h-full rotate-45 border border-orange-500/20 bg-orange-500/5"></div>
                        </div>
                        <div className="absolute bottom-1/2 -right-10 w-5 h-5 animate-float-delayed" style={{ animationDuration: '18s', animationDelay: '2s' }}>
                            <div className="w-full h-full rounded-full border border-orange-300/20 bg-orange-300/5"></div>
                        </div>

                        {/* Premium glass timeline with enhanced depth and light effects */}
                        <div className="relative pl-12 border-l-2 border-orange-500/30 before:absolute before:inset-y-0 before:-left-1 before:w-2 before:bg-gradient-to-b before:from-orange-400/0 before:via-orange-500/70 before:to-orange-400/0">
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={exp.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    className="mb-16 relative"
                                >
                                    {/* Premium timeline node with glow effect */}
                                    <div className="absolute -left-[36px] h-16 w-16 rounded-full backdrop-blur-xl bg-black/40 border border-orange-500/50 flex items-center justify-center shadow-lg shadow-orange-500/30 z-20 group-hover:shadow-orange-500/50 transition-all duration-300">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-inner shadow-orange-700/50">
                                            <div className="h-4 w-4 rounded-full bg-white/90 shadow-md shadow-orange-600/30"></div>
                                        </div>
                                        {/* Subtle glow effect */}
                                        <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-md -z-10 opacity-60"></div>
                                    </div>

                                    {/* Premium glassmorphism card with enhanced effects */}
                                    <div className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-black/60 p-8 rounded-3xl border border-white/10 shadow-xl ml-6 transition-all duration-500 hover:shadow-orange-500/20 hover:border-orange-500/30 group relative overflow-hidden">
                                        {/* Interactive gradient highlight effect */}
                                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        {/* Light refraction effect */}
                                        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-orange-300/10 blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>

                                        {/* Card content with enhanced typography */}
                                        <div className="relative z-10">
                                            <div className="text-orange-400 text-sm font-medium mb-2 flex items-center">
                                                <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 mr-2 shadow-sm shadow-orange-500/50"></span>
                                                {exp.period}
                                            </div>
                                            <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200 drop-shadow-sm">{exp.title}</h3>
                                            <div className="text-gray-200 font-medium mb-4">{exp.company}</div>
                                            <p className="text-gray-300 leading-relaxed">{exp.description}</p>

                                            {/* Enhanced skill tags with glass effect */}
                                            {exp.skills && (
                                                <div className="mt-5 flex flex-wrap gap-2">
                                                    {exp.skills.map(skill => (
                                                        <span key={skill} className="px-3 py-1 rounded-full text-xs backdrop-blur-lg bg-gradient-to-r from-orange-500/15 to-orange-600/5 border border-orange-500/30 text-orange-200 shadow-sm transition-all duration-300 hover:bg-orange-500/20 hover:text-white">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>


            <section id="contact" ref={contactRef} className="py-20 md:py-32 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-950/10 to-orange-950/30 z-0"></div>



                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-400">Get In Touch</h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto"></div>
                        <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg">Let's connect and discuss how we can work together on your next project.</p>
                    </motion.div>

                    <div className="flex flex-col md:flex-row gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="w-full md:w-2/5"
                        >
                            <div className="backdrop-blur-lg bg-black/40 p-6 rounded-3xl border border-gray-800/50 shadow-2xl relative overflow-hidden h-full">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-600/20 rounded-full blur-3xl -ml-12 -mb-12"></div>

                                {/* Decorative circuit lines */}
                                <div className="absolute hidden md:block bottom-0 right-0 w-32 h-32 opacity-20">
                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                        <path d="M10,30 Q30,10 50,30 T90,30" stroke="#f97316" strokeWidth="1" fill="none" />
                                        <path d="M10,50 Q30,30 50,50 T90,50" stroke="#f97316" strokeWidth="1" fill="none" />
                                        <path d="M10,70 Q30,50 50,70 T90,70" stroke="#f97316" strokeWidth="1" fill="none" />
                                        <circle cx="90" cy="30" r="2" fill="#f97316" />
                                        <circle cx="90" cy="50" r="2" fill="#f97316" />
                                        <circle cx="90" cy="70" r="2" fill="#f97316" />
                                    </svg>
                                </div>

                                <h3 className="text-3xl font-bold mb-4 text-white">Connect <span className="text-orange-400">With Me</span></h3>

                                <div className="mt-12 mb-4 p-3 bg-black/30 rounded-2xl border border-orange-500/10 relative">
                                    {/* Pulsing Easter egg icon */}
                                    <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center animate-pulse">
                                        <span className="text-xs font-bold text-black">!</span>
                                    </div>

                                    <p className="text-gray-300 italic text-center">
                                        <span className="text-orange-400 font-semibold">Psst!</span> There's an easter egg hidden somewhere on this site. Can you find it? <span className="text-orange-400">Hint: Try clicking where you least expect...</span>
                                    </p>
                                </div>

                                <div className="flex justify-center gap-4 mt-12">
                                    <a href="mailto:aveek@example.com" className="group" title="Email Me">
                                        <div className="w-14 h-14 rounded-2xl backdrop-blur-sm bg-orange-500/20 flex items-center justify-center shadow-lg border border-orange-500/20 group-hover:bg-orange-500/30 transition-all duration-300 group-hover:scale-110 hover:rotate-6">
                                            <FaEnvelope className="text-orange-400 text-xl group-hover:animate-bounce" />
                                        </div>
                                    </a>

                                    <a href="#" className="group" title="LinkedIn Profile">
                                        <div className="w-14 h-14 rounded-2xl backdrop-blur-sm bg-orange-500/20 flex items-center justify-center shadow-lg border border-orange-500/20 group-hover:bg-orange-500/30 transition-all duration-300 group-hover:scale-110 hover:rotate-6">
                                            <FaLinkedin className="text-orange-400 text-xl group-hover:animate-bounce" />
                                        </div>
                                    </a>

                                    <a href="#" className="group" title="GitHub Profile">
                                        <div className="w-14 h-14 rounded-2xl backdrop-blur-sm bg-orange-500/20 flex items-center justify-center shadow-lg border border-orange-500/20 group-hover:bg-orange-500/30 transition-all duration-300 group-hover:scale-110 hover:rotate-6">
                                            <FaGithub className="text-orange-400 text-xl group-hover:animate-bounce" />
                                        </div>
                                    </a>

                                    <a href="#" className="group" title="Instagram Profile">
                                        <div className="w-14 h-14 rounded-2xl backdrop-blur-sm bg-orange-500/20 flex items-center justify-center shadow-lg border border-orange-500/20 group-hover:bg-orange-500/30 transition-all duration-300 group-hover:scale-110 hover:rotate-6">
                                            <FaInstagram className="text-orange-400 text-xl group-hover:animate-bounce" />
                                        </div>
                                    </a>
                                </div>

                                {/* Cool animated graphic - code wheel */}
                                <div className="mt-8 flex justify-center">
                                    <div className="relative w-32 h-32 animate-spin-slow opacity-20">
                                        <svg viewBox="0 0 100 100" className="w-full h-full">
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="#f97316" strokeWidth="1" strokeDasharray="4,4" />
                                            <circle cx="50" cy="50" r="35" fill="none" stroke="#f97316" strokeWidth="1" />
                                            <circle cx="50" cy="50" r="25" fill="none" stroke="#f97316" strokeWidth="1" strokeDasharray="8,4" />
                                            <circle cx="50" cy="50" r="15" fill="none" stroke="#f97316" strokeWidth="1" />
                                            <path d="M50,5 L50,15" stroke="#f97316" strokeWidth="1" />
                                            <path d="M50,85 L50,95" stroke="#f97316" strokeWidth="1" />
                                            <path d="M5,50 L15,50" stroke="#f97316" strokeWidth="1" />
                                            <path d="M85,50 L95,50" stroke="#f97316" strokeWidth="1" />
                                            <circle cx="50" cy="50" r="5" fill="#f97316" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="w-full md:w-3/5"
                        >
                            <div className="backdrop-blur-lg bg-black/40 p-8 rounded-3xl border border-gray-800/50 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl -ml-20 -mt-20"></div>
                                <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-600/20 rounded-full blur-3xl -mr-16 -mb-16"></div>

                                <h3 className="text-3xl font-bold mb-6 text-white">Send a <span className="text-orange-400">Message</span></h3>

                                <form ref={formRef} className="space-y-5 relative z-10" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="relative">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="w-full bg-black/50 border border-gray-700/70 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                                                placeholder="John Doe"
                                            />
                                            <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
                                            <div className="absolute right-3 top-8 text-orange-400 opacity-70">
                                                <FaUser className="text-sm" />
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="w-full bg-black/50 border border-gray-700/70 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                                                placeholder="john@example.com"
                                            />
                                            <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
                                            <div className="absolute right-3 top-8 text-orange-400 opacity-70">
                                                <FaEnvelope className="text-sm" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            className="w-full bg-black/50 border border-gray-700/70 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                                            placeholder="How can I help you?"
                                        />
                                        <ValidationError prefix="Subject" field="subject" errors={state.errors} className="text-red-500 text-xs mt-1" />
                                        <div className="absolute right-3 top-8 text-orange-400 opacity-70">
                                            <FaTag className="text-sm" />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Your Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="4"
                                            className="w-full bg-black/50 border border-gray-700/70 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                                            placeholder="Tell me about your project or inquiry..."
                                        ></textarea>
                                        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
                                        <div className="absolute right-3 top-8 text-orange-400 opacity-70">
                                            <FaComment className="text-sm" />
                                        </div>
                                    </div>

                                    <div className="pt-1">
                                        <button
                                            type="submit"
                                            disabled={state.submitting}
                                            className="w-full bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-orange-900/30 relative overflow-hidden group"
                                        >
                                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-30 transition-opacity duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
                                            <span className="relative flex items-center justify-center gap-2">
                                                {state.submitting ? "Sending..." : "Send Message"}
                                                <FaPaperPlane className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </span>
                                        </button>
                                    </div>
                                </form>

                                {/* Animated connection graphic at bottom */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-6 flex justify-center items-center opacity-30">
                                    <div className="h-px w-full bg-orange-500 relative">
                                        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
                                        <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full animate-ping animation-delay-300"></div>
                                        <div className="absolute top-1/2 left-2/4 transform -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full animate-ping animation-delay-600"></div>
                                        <div className="absolute top-1/2 left-3/4 transform -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full animate-ping animation-delay-900"></div>
                                        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full animate-ping animation-delay-1200"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* CSS for custom animations */}
                <style jsx>{`
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
        }
        
        .animate-float-1 { animation: float 15s ease-in-out infinite; }
        .animate-float-2 { animation: float 18s ease-in-out infinite 2s; }
        .animate-float-3 { animation: float 21s ease-in-out infinite 1s; }
        .animate-float-4 { animation: float 17s ease-in-out infinite 3s; }
        .animate-float-5 { animation: float 22s ease-in-out infinite 2s; }
        .animate-float-6 { animation: float 19s ease-in-out infinite 1s; }
        
        .animate-spin-slow {
            animation: spin 20s linear infinite;
        }
        
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        .animation-delay-900 { animation-delay: 900ms; }
        .animation-delay-1200 { animation-delay: 1200ms; }
    `}</style>
            </section>

            <footer className="py-12 bg-black/90 border-t border-gray-800">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center">
                        <div className="mb-6">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-xl font-bold text-white">
                                AC
                            </div>
                        </div>

                        <div className="flex space-x-4 mb-6">
                            <a href="#" className="w-10 h-10 rounded-full bg-black/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-400 transition-colors">
                                <FaGithub />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-black/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-400 transition-colors">
                                <FaLinkedin />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-black/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-400 transition-colors">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-black/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-400 transition-colors">
                                <FaEnvelope />
                            </a>
                        </div>

                        <p className="text-gray-500 text-sm text-center">
                            © {new Date().getFullYear()} Aveek Chakraborty. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

        </div>
    );
}

