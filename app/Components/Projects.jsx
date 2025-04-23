"use client"

import { useEffect, useCallback, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiArrowRightSLine } from 'react-icons/ri';
import { RiCloseLine } from 'react-icons/ri';
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { MdDevices, MdSecurity, MdSpeed, MdOutlineDesignServices } from 'react-icons/md';
import { FaLaptopCode } from 'react-icons/fa';

const Projects = ({ setModalOpen, setSelectedProject, isAnimatingRef, projectsRef, setIsMobile, isMobile, modalOpen, selectedProject }) => {
    const projects = [
        {
            title: "Portfolio Dashboard",
            description: "A modern analytics dashboard for tracking financial portfolios with real-time data visualization.",
            tech: ["React", "TailwindCSS", "Firebase", "Chart.js"],
            image: "Aveek.jpg",
            longDescription: "A comprehensive financial portfolio tracking system designed for investors to monitor assets across multiple markets. The dashboard provides real-time updates and historical performance analysis.",
            features: [
                "Real-time stock price updates with WebSocket integration",
                "Interactive charts with zoom and filtering capabilities",
                "Portfolio diversification analysis and risk assessment",
                "Performance benchmarking against market indices",
                "Automated alerts for price movements"
            ],
            screenshots: ["dashboard.jpg", "chart-view.jpg", "portfolio-analysis.jpg"],
            challengesSolved: "Implemented efficient data caching strategies to minimize API calls while maintaining real-time data accuracy. Created a responsive design system that adapts to various device sizes without compromising on functionality.",
            githubLink: "https://github.com/username/portfolio-dashboard",
            liveDemo: "https://portfolio-dashboard-demo.com"
        },
        {
            title: "E-commerce Platform",
            description: "Full-featured e-commerce solution with cart functionality, payment processing, and order management.",
            tech: ["Next.js", "MongoDB", "Stripe", "Redux"],
            image: "Aveek.jpg",
            longDescription: "A scalable e-commerce platform built with Next.js that offers seamless shopping experiences with advanced features for both customers and store administrators.",
            features: [
                "Dynamic product catalog with filtering and search",
                "Secure checkout process with Stripe integration",
                "User account management and order history",
                "Admin dashboard for inventory and order management",
                "SEO optimization for product pages"
            ],
            screenshots: ["store-front.jpg", "product-detail.jpg", "checkout-process.jpg"],
            challengesSolved: "Implemented server-side rendering for improved SEO and page load times. Created a robust state management system with Redux to handle complex shopping cart operations across multiple devices.",
            githubLink: "https://github.com/username/ecommerce-platform",
            liveDemo: "https://ecommerce-demo.com"
        },
        {
            title: "AI Image Generator",
            description: "Web application that creates original artwork using advanced image generation algorithms.",
            tech: ["Python", "TensorFlow", "React", "Flask"],
            image: "Aveek.jpg",
            longDescription: "An innovative AI-powered platform that lets users create unique artwork by describing their vision in natural language. The application uses state-of-the-art diffusion models to generate high-quality images.",
            features: [
                "Text-to-image generation with prompt engineering",
                "Style transfer capabilities from reference images",
                "Resolution enhancement and image correction tools",
                "Gallery system for saving and sharing creations",
                "Batch processing for multiple generations"
            ],
            screenshots: ["generator-ui.jpg", "sample-outputs.jpg", "style-transfer.jpg"],
            challengesSolved: "Optimized the machine learning pipeline to reduce generation time while maintaining image quality. Implemented a caching system to store frequently requested styles and elements to improve response time.",
            githubLink: "https://github.com/username/ai-image-generator",
            liveDemo: "https://ai-image-generator-demo.com"
        },
        {
            title: "Blockchain Explorer",
            description: "Tool for visualizing and navigating blockchain data with detailed transaction analysis.",
            tech: ["Ethereum", "Web3.js", "Node.js", "D3.js"],
            image: "Aveek.jpg",
            longDescription: "A comprehensive blockchain explorer that provides deep insights into blockchain networks. The tool visualizes complex blockchain data structures and transaction flows in an intuitive interface.",
            features: [
                "Real-time block and transaction monitoring",
                "Address tracking and balance history",
                "Smart contract interaction and verification",
                "Network statistics and mining information",
                "Gas price analysis and optimization suggestions"
            ],
            screenshots: ["blockchain-overview.jpg", "transaction-details.jpg", "network-stats.jpg"],
            challengesSolved: "Developed custom data indexing algorithms to efficiently retrieve and display large volumes of blockchain data. Created interactive visualization components using D3.js to represent complex blockchain structures.",
            githubLink: "https://github.com/username/blockchain-explorer",
            liveDemo: "https://blockchain-explorer-demo.com"
        },
        {
            title: "Social Media Manager",
            description: "Scheduling and analytics platform for managing multiple social media accounts efficiently.",
            tech: ["Vue.js", "Express", "PostgreSQL", "OAuth"],
            image: "Aveek.jpg",
            longDescription: "An all-in-one solution for social media professionals to schedule content, analyze performance, and manage engagement across multiple platforms from a single dashboard.",
            features: [
                "Cross-platform content scheduling and publishing",
                "Engagement analytics and audience insights",
                "Content calendar with drag-and-drop interface",
                "Automated reporting and performance tracking",
                "AI-assisted content recommendations"
            ],
            screenshots: ["content-calendar.jpg", "analytics-dashboard.jpg", "engagement-metrics.jpg"],
            challengesSolved: "Integrated with multiple social media APIs and normalized their different data structures into a unified interface. Implemented a reliable scheduling system that handles timezone differences and platform-specific posting requirements.",
            githubLink: "https://github.com/username/social-media-manager",
            liveDemo: "https://social-media-manager-demo.com"
        }
    ];

    const totalProjects = projects.length;
    const [activeIndex, setActiveIndex] = useState(1);
    // Create a local ref to ensure we can properly manage animation state
    const localAnimatingRef = useRef(false);

    const navigateCarousel = useCallback((direction) => {
        // Use local ref to check if animation is in progress
        if (localAnimatingRef.current) return;

        // Set both refs to prevent double clicks
        localAnimatingRef.current = true;
        if (isAnimatingRef) isAnimatingRef.current = true;

        setActiveIndex((prev) => {
            return direction === 'next'
                ? (prev === totalProjects - 1 ? 0 : prev + 1)
                : (prev === 0 ? totalProjects - 1 : prev - 1);
        });

        // Release animation lock after transition completes
        setTimeout(() => {
            localAnimatingRef.current = false;
            if (isAnimatingRef) isAnimatingRef.current = false;
        }, 300); // Increased to ensure animation completes
    }, [totalProjects, isAnimatingRef]);

    const nextProject = useCallback((e) => {
        e.stopPropagation(); // Prevent event bubbling
        navigateCarousel('next');
    }, [navigateCarousel]);

    const prevProject = useCallback((e) => {
        e.stopPropagation(); // Prevent event bubbling
        navigateCarousel('prev');
    }, [navigateCarousel]);

    // Single useEffect for responsive detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile(); // Initial check
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, [setIsMobile]);

    // Auto carousel effect with stable callbacks to prevent rerenders
    useEffect(() => {
        // Don't auto-advance during manual navigation
        const interval = setInterval(() => {
            if (!localAnimatingRef.current && isAnimatingRef && !isAnimatingRef.current) {
                setActiveIndex((prev) => (prev === totalProjects - 1 ? 0 : prev + 1));
            }
        }, 6000);

        return () => clearInterval(interval);
    }, [totalProjects, isAnimatingRef]);

    const goToProject = useCallback((index) => {
        if (localAnimatingRef.current || index === activeIndex) return;

        localAnimatingRef.current = true;
        if (isAnimatingRef) isAnimatingRef.current = true;

        setActiveIndex(index);

        setTimeout(() => {
            localAnimatingRef.current = false;
            if (isAnimatingRef) isAnimatingRef.current = false;
        }, 300);
    }, [activeIndex, isAnimatingRef]);

    // Handle modal opening
    const openModal = useCallback((project) => {
        setSelectedProject(project);
        setModalOpen(true);
    }, [setSelectedProject, setModalOpen]);

    // Calculate carousel card variants based on screen size - memoized to prevent recreations
    const getCardVariants = useCallback((position) => {
        const baseScale = isMobile ? 0.85 : 0.9;
        const activeScale = 1;
        const xOffset = isMobile ? 180 : 280;
        const opacity = position === 0 ? 1 : 0.7;
        const zIndex = position === 0 ? 20 : 10 - Math.abs(position);

        // Special handling for cards that are coming into view or leaving
        const isEntering = Math.abs(position) <= 1;
        const rotationFactor = isMobile ? -3 : -4;

        return {
            x: position * xOffset,
            scale: position === 0 ? activeScale : baseScale - (Math.abs(position) * 0.1),
            rotateY: position * rotationFactor,
            opacity: isEntering ? opacity : 0,
            zIndex: zIndex,
            filter: position === 0 ? 'drop-shadow(0 0 15px rgba(249, 115, 22, 0.2))' : 'none',
        };
    }, [isMobile]);


    return (
        <section id="projects" ref={projectsRef} className="py-12 sm:py-20 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black to-orange-950/20 z-0"></div>

            {/* Static glow effect for mobile, animated only for desktop */}
            {!isMobile && (
                <motion.div
                    className="absolute w-1/2 h-1/2 bg-orange-500/10 blur-3xl rounded-full z-0"
                    animate={{
                        x: `calc(${(activeIndex - (totalProjects - 1) / 2) * 50}px)`,
                        opacity: [0.1, 0.15, 0.1],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        x: { duration: 0.8, ease: "easeInOut" },
                        opacity: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                        scale: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                    }}
                    style={{
                        top: '50%',
                        left: '50%',
                        translateX: '-50%',
                        translateY: '-50%',
                    }}
                />
            )}
            {isMobile && (
                <div
                    className="absolute w-1/2 h-1/2 bg-orange-500/10 blur-3xl rounded-full z-0"
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            )}

            <div className="container mx-auto px-4 relative z-10">
                {/* Header - Skip animations on mobile */}
                {isMobile ? (
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-400">Featured Projects</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto"></div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-400">Featured Projects</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto"></div>
                    </motion.div>
                )}

                {/* Carousel Container */}
                <div className="relative h-80 sm:h-96 mb-16">
                    {/* Left Arrow - No hover animations on mobile */}
                    <button
                        className={`absolute -left-2 md:left-2 top-1/2 -translate-y-1/2 z-300 bg-black/50 hover:bg-orange-600/70 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-sm ${localAnimatingRef.current ? 'opacity-100 cursor-pointer' : 'opacity-100 cursor-pointer'}`}
                        onClick={prevProject}
                    // disabled={localAnimatingRef.current}
                    >
                        <FaChevronLeft className="text-sm sm:text-base" />
                    </button>

                    {/* Project Cards - Even further optimized rendering */}
                    <div className="absolute inset-0 flex items-center justify-center perspective">
                        {projects.map((project, index) => {
                            // Calculate position relative to active index
                            let position = index - activeIndex;

                            // Handle wraparound for carousel
                            if (position < -Math.floor(totalProjects / 2)) position += totalProjects;
                            if (position > Math.floor(totalProjects / 2)) position -= totalProjects;

                            // Mobile: Only show active card and one adjacent card on each side
                            if (isMobile && Math.abs(position) > 1) return null;

                            // Desktop: Show active card and two adjacent cards on each side
                            if (!isMobile && Math.abs(position) > 2) return null;

                            const isActive = position === 0;

                            // Different rendering for mobile vs desktop
                            if (isMobile) {
                                // Static positioning for mobile with reduced animations
                                const mobilePosX = position * 100;
                                const mobileOpacity = isActive ? 1 : 0.6;
                                const mobileZIndex = isActive ? 20 : 10;
                                const mobileScale = isActive ? 1 : 0.85;

                                return (
                                    <div
                                        key={project.title}
                                        className={`absolute w-full max-w-xs backdrop-blur-sm bg-black/50 rounded-xl border ${isActive ? 'border-orange-500' : 'border-gray-800'} shadow-xl overflow-hidden cursor-pointer`}
                                        style={{
                                            transform: `translateX(${mobilePosX}%) scale(${mobileScale})`,
                                            opacity: mobileOpacity,
                                            zIndex: mobileZIndex,
                                            transition: 'transform 0.5s ease, opacity 0.5s ease'
                                        }}
                                        onClick={() => isActive ? openModal(project) : goToProject(index)}
                                    >
                                        <div className="h-32 bg-gradient-to-br from-orange-600/20 to-black/40 relative overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={`Project ${project.title}`}
                                                className="w-full h-full object-cover opacity-40"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-3xl font-bold text-white/20">
                                                    {index + 1}
                                                </div>
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-black/30 p-2 rounded-full backdrop-blur-sm">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                                                        {project.title.charAt(0)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <h3 className="text-lg font-bold mb-1 text-white">{project.title}</h3>
                                            <p className="text-gray-400 mb-3 text-xs line-clamp-2">{project.description}</p>
                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {project.tech.slice(0, 2).map((tech) => (
                                                    <span key={tech} className="bg-orange-900/30 text-orange-300 text-xs px-2 py-0.5 rounded-full">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.tech.length > 2 && (
                                                    <span className="bg-orange-900/30 text-orange-300 text-xs px-2 py-0.5 rounded-full">
                                                        +{project.tech.length - 2}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex justify-between">
                                                <button className="text-xs text-orange-400 flex items-center font-medium">
                                                    <span>View Details</span>
                                                    <RiArrowRightSLine className="ml-1" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Very minimal highlight for active card */}
                                        {isActive && (
                                            <div className="absolute inset-0 rounded-xl border border-orange-500/30" />
                                        )}
                                    </div>
                                );
                            } else {
                                // Desktop version with framer motion
                                return (
                                    <motion.div
                                        key={project.title}
                                        className={`absolute w-full max-w-xs sm:max-w-sm md:max-w-md backdrop-blur-sm bg-black/50 rounded-xl sm:rounded-2xl border ${isActive ? 'border-orange-500' : 'border-gray-800'} shadow-xl overflow-hidden cursor-pointer`}
                                        style={{
                                            transformStyle: 'preserve-3d',
                                            backfaceVisibility: 'hidden',
                                            perspective: '1200px'
                                        }}
                                        initial={getCardVariants(position > 0 ? position + 1 : position - 1)}
                                        animate={getCardVariants(position)}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30,
                                            mass: 1
                                        }}
                                        onClick={() => isActive ? openModal(project) : goToProject(index)}
                                    >
                                        <div className="h-32 sm:h-40 md:h-48 bg-gradient-to-br from-orange-600/20 to-black/40 relative overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={`Project ${project.title}`}
                                                className="w-full h-full object-cover opacity-40"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <motion.div
                                                    animate={{
                                                        opacity: isActive ? [0.2, 0.3, 0.2] : 0.15,
                                                        scale: isActive ? [1, 1.05, 1] : 1
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/20"
                                                >
                                                    {index + 1}
                                                </motion.div>
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <motion.div
                                                    className="bg-black/30 p-2 sm:p-3 rounded-full backdrop-blur-sm"
                                                    animate={{
                                                        y: isActive ? [0, -5, 0] : 0,
                                                        scale: isActive ? [1, 1.05, 1] : 1
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                >
                                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                                                        {project.title.charAt(0)}
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </div>

                                        <div className="p-4 sm:p-6">
                                            <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white group-hover:text-orange-400 transition-colors">{project.title}</h3>
                                            <p className="text-gray-400 mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-2">{project.description}</p>
                                            <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                                                {project.tech.slice(0, 4).map((tech) => (
                                                    <span key={tech} className="bg-orange-900/30 text-orange-300 text-xs px-2 py-0.5 sm:py-1 rounded-full">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.tech.length > 4 && (
                                                    <span className="bg-orange-900/30 text-orange-300 text-xs px-2 py-0.5 sm:py-1 rounded-full">
                                                        +{project.tech.length - 4}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex justify-between">
                                                <motion.button
                                                    className="text-xs sm:text-sm text-orange-400 hover:text-orange-300 flex items-center font-medium"
                                                    whileHover={{ x: 3 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                >
                                                    <span>View Details</span>
                                                    <RiArrowRightSLine className="ml-1" />
                                                </motion.button>
                                            </div>
                                        </div>

                                        {isActive && (
                                            <motion.div
                                                className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-orange-500/0"
                                                animate={{
                                                    borderColor: ['rgba(249, 115, 22, 0)', 'rgba(249, 115, 22, 0.3)', 'rgba(249, 115, 22, 0)'],
                                                    boxShadow: [
                                                        '0 0 0px 0px rgba(249, 115, 22, 0)',
                                                        '0 0 10px 2px rgba(249, 115, 22, 0.2)',
                                                        '0 0 0px 0px rgba(249, 115, 22, 0)'
                                                    ]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                        )}
                                    </motion.div>
                                );
                            }
                        })}
                    </div>

                    {/* Right Arrow - No hover animations on mobile */}
                    <button
                        className={`absolute -right-2 md:right-2 top-1/2 -translate-y-1/2 z-300 bg-black/50 hover:bg-orange-600/70 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-sm ${localAnimatingRef.current ? 'opacity-100 cursor-pointer' : 'opacity-100 cursor-pointer'}`}
                        onClick={nextProject}
                    // disabled={localAnimatingRef.current}
                    >
                        <FaChevronRight className="text-sm sm:text-base" />
                    </button>

                    {/* Carousel Indicators - Simplified further for mobile */}
                    <div className="absolute -bottom-2 md:-bottom-12 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2">
                        {projects.map((_, index) => (
                            isMobile ? (
                                <button
                                    key={index}
                                    onClick={() => goToProject(index)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-orange-500 w-6' : 'bg-gray-600 w-2'
                                        }`}
                                    disabled={localAnimatingRef.current}
                                />
                            ) : (
                                <motion.button
                                    key={index}
                                    onClick={() => goToProject(index)}
                                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-orange-500' : 'bg-gray-600'
                                        }`}
                                    animate={{
                                        width: index === activeIndex ? '24px' : '8px',
                                        opacity: index === activeIndex ? 1 : 0.5
                                    }}
                                    whileHover={{ scale: 1.2, opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                    disabled={localAnimatingRef.current}
                                />
                            )
                        ))}
                    </div>
                </div>

                {/* Bottom space - No animations for mobile */}
                {isMobile ? (
                    <div className="text-center mt-12"></div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    ></motion.div>
                )}
            </div>

            {/* Project Detail Modal - Extremely simplified for mobile */}
            <AnimatePresence mode="wait">
                {modalOpen && selectedProject && (
                    <motion.div
                        key={`modal-${selectedProject.id}`}
                        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setModalOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isMobile ? (
                            // Mobile modal with enhanced content
                            <motion.div
                                className="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-xs overflow-hidden max-h-[90vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                                transition={{
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 250,
                                    mass: 0.8
                                }}
                                layoutId={`project-card-${selectedProject.id}`}
                            >
                                {/* Modal Header with Image */}
                                <div className="h-48 relative">
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />

                                    {/* Project Badge */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm p-2 rounded-lg flex items-center gap-2"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xs">
                                            {selectedProject.title.charAt(0)}
                                        </div>
                                        <span className="text-white font-medium text-sm">Project {projects.indexOf(selectedProject) + 1}</span>
                                    </motion.div>

                                    {/* Close Button */}
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="absolute top-4 right-4 bg-black/50 hover:bg-orange-600 text-white p-1.5 rounded-full backdrop-blur-sm transition-colors"
                                    >
                                        <RiCloseLine size={16} />
                                    </button>
                                </div>

                                {/* Modal Content - Enhanced for mobile */}
                                <motion.div
                                    className="p-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h3 className="text-xl font-bold mb-2 text-white">
                                        {selectedProject.title}
                                    </h3>

                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {selectedProject.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="bg-orange-900/30 text-orange-300 text-xs px-2 py-1 rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="text-gray-300 mb-4 text-sm">
                                        {selectedProject.longDescription}
                                    </p>

                                    {/* Key Features Section */}
                                    <div className="mb-4">
                                        <h4 className="text-white text-sm font-semibold mb-2">Key Features</h4>
                                        <ul className="text-gray-400 text-xs space-y-1.5">
                                            {selectedProject.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="text-orange-400 mr-1.5">•</span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Technical Challenges */}
                                    <div className="mb-4">
                                        <h4 className="text-white text-sm font-semibold mb-2">Challenges & Solutions</h4>
                                        <p className="text-gray-400 text-xs">
                                            {selectedProject.challengesSolved}
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-3 mt-6">
                                        <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1.5 rounded-lg font-medium transition-colors flex items-center text-sm">
                                            <FaGithub className="mr-2" />
                                            <span>View Code</span>
                                        </button>
                                        <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1.5 rounded-lg font-medium transition-colors flex items-center text-sm">
                                            <FaExternalLinkAlt className="mr-2" />
                                            <span>Live Demo</span>
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ) : (
                            // Enhanced desktop modal with rich content
                            <motion.div
                                layoutId={`project-card-${selectedProject.id}`}
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                                transition={{
                                    type: "spring",
                                    damping: 30,
                                    stiffness: 300,
                                    mass: 0.8
                                }}
                                className="bg-gray-900 border border-gray-700 rounded-lg sm:rounded-xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Modal Header with Image */}
                                <motion.div
                                    className="h-48 sm:h-56 md:h-64 relative"
                                    layoutId={`project-image-${selectedProject.id}`}
                                >
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />

                                    {/* Project Badge */}
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2, type: "spring" }}
                                        className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm p-2 rounded-lg flex items-center gap-2"
                                    >
                                        <motion.div
                                            className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xs"
                                            layoutId={`project-badge-${selectedProject.id}`}
                                        >
                                            {selectedProject.title.charAt(0)}
                                        </motion.div>
                                        <span className="text-white font-medium text-sm">Project {projects.indexOf(selectedProject) + 1}</span>
                                    </motion.div>

                                    {/* Close Button */}
                                    <motion.button
                                        onClick={() => setModalOpen(false)}
                                        className="absolute top-4 right-4 bg-black/50 hover:bg-orange-600 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        <RiCloseLine size={20} />
                                    </motion.button>
                                </motion.div>

                                {/* Enhanced Modal Content with Staggered Animation */}
                                <div className="p-6">
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: {
                                                opacity: 1,
                                                transition: {
                                                    when: "beforeChildren",
                                                    staggerChildren: 0.1,
                                                    delayChildren: 0.2
                                                }
                                            }
                                        }}
                                    >
                                        <motion.h3
                                            variants={{
                                                hidden: { opacity: 0, y: 10 },
                                                visible: { opacity: 1, y: 0 }
                                            }}
                                            className="text-2xl font-bold mb-2 text-white"
                                            layoutId={`project-title-${selectedProject.id}`}
                                        >
                                            {selectedProject.title}
                                        </motion.h3>

                                        <motion.div
                                            variants={{
                                                hidden: { opacity: 0 },
                                                visible: {
                                                    opacity: 1,
                                                    transition: {
                                                        staggerChildren: 0.05
                                                    }
                                                }
                                            }}
                                            className="flex flex-wrap gap-2 mb-4"
                                        >
                                            {selectedProject.tech.map((tech, index) => (
                                                <motion.span
                                                    key={tech}
                                                    variants={{
                                                        hidden: { opacity: 0, scale: 0.8 },
                                                        visible: { opacity: 1, scale: 1 }
                                                    }}
                                                    layoutId={`project-tech-${selectedProject.id}-${index}`}
                                                    className="bg-orange-900/30 text-orange-300 text-xs px-2 py-1 rounded-full"
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </motion.div>

                                        <motion.p
                                            variants={{
                                                hidden: { opacity: 0, y: 10 },
                                                visible: { opacity: 1, y: 0 }
                                            }}
                                            className="text-gray-300 mb-6 text-base"
                                        >
                                            {selectedProject.longDescription}
                                        </motion.p>

                                        {/* Project Screenshots */}
                                        <motion.div
                                            variants={{
                                                hidden: { opacity: 0, y: 10 },
                                                visible: { opacity: 1, y: 0 }
                                            }}
                                            className="mb-6"
                                        >
                                            <h4 className="text-white text-sm font-semibold mb-3">Project Gallery</h4>
                                            <div className="grid grid-cols-3 gap-2">
                                                {selectedProject.screenshots.map((screenshot, idx) => (
                                                    <div key={idx} className="bg-gray-800 rounded-lg overflow-hidden aspect-video">
                                                        <img
                                                            src={screenshot}
                                                            alt={`${selectedProject.title} screenshot ${idx + 1}`}
                                                            className="w-full h-full object-cover opacity-75 hover:opacity-100 transition-opacity"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>

                                        {/* Key Features with Icons */}
                                        <motion.div
                                            variants={{
                                                hidden: { opacity: 0, y: 10 },
                                                visible: { opacity: 1, y: 0 }
                                            }}
                                            className="mb-6"
                                        >
                                            <h4 className="text-white text-sm font-semibold mb-3">Key Features</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {selectedProject.features.map((feature, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        variants={{
                                                            hidden: { opacity: 0, x: -10 },
                                                            visible: { opacity: 1, x: 0, transition: { delay: idx * 0.1 } }
                                                        }}
                                                        className="flex items-start bg-gray-800/50 p-3 rounded-lg"
                                                    >
                                                        <div className="text-orange-400 mr-3 mt-0.5">
                                                            {idx % 5 === 0 && <MdDevices />}
                                                            {idx % 5 === 1 && <MdSecurity />}
                                                            {idx % 5 === 2 && <MdSpeed />}
                                                            {idx % 5 === 3 && <FaLaptopCode />}
                                                            {idx % 5 === 4 && <MdOutlineDesignServices />}
                                                        </div>
                                                        <span className="text-gray-300 text-sm">{feature}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>

                                        {/* Technical Challenges & Solutions */}
                                        <motion.div
                                            variants={{
                                                hidden: { opacity: 0, y: 10 },
                                                visible: { opacity: 1, y: 0 }
                                            }}
                                            className="mb-6"
                                        >
                                            <h4 className="text-white text-sm font-semibold mb-3">Challenges & Solutions</h4>
                                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                                <p className="text-gray-300 text-sm">
                                                    {selectedProject.challengesSolved}
                                                </p>
                                            </div>
                                        </motion.div>

                                        {/* Action Buttons */}
                                        <motion.div
                                            variants={{
                                                hidden: { opacity: 0, y: 10 },
                                                visible: { opacity: 1, y: 0 }
                                            }}
                                            className="flex flex-wrap gap-4 mt-8"
                                        >
                                            <motion.a
                                                href={selectedProject.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center text-sm"
                                            >
                                                <FaGithub className="mr-2" />
                                                <span>View Code</span>
                                            </motion.a>
                                            
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Projects
