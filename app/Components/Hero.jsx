"use client"
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { RiArrowRightSLine } from 'react-icons/ri';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const HomePage = ({ setActiveSection, setIsNavOpen, homeRef }) => {
  const homeRef2 = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isButtonHovering, setIsButtonHovering] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const { scrollYProgress } = useScroll({
    target: homeRef2,
    offset: ["start start", "end start"]
  });

  const handleLogoClick = () => {
    setClickCount(clickCount + 1);
    if (clickCount == 4) {
      setShowEasterEgg(true);
      setClickCount(0);
    }
  };

  const setRefs = (el) => {
    homeRef.current = el;
    homeRef2.current = el;
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
    setIsNavOpen(false);
  };

  // Basic scroll animations without parallax
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);


  // Text animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.06,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const nameText = "Aveek Chakraborty";
  const roleText = "Full Stack Developer";

  return (
    <>
      <section id="home" ref={setRefs} className="min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Static Background */}
        <div className="absolute inset-0 z-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-orange-950/30"></div>

          {/* Noise overlay effect */}
          <div className="absolute inset-0 opacity-10 mix-blend-soft-light">
            <div className="noise-effect"></div>
          </div>

          {/* Static grid background */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid-pattern"></div>
          </div>

          {/* Static decorative orbs */}
          <div className="absolute inset-0">
            {Array.from({ length: 5 }).map((_, i) => {
              const size = 300 + (i * 50);
              return (
                <div
                  key={`orb-${i}`}
                  className="absolute rounded-full bg-gradient-radial"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    top: `${20 + (i * 15)}%`,
                    left: `${15 + (i * 15)}%`,
                    background: `radial-gradient(circle, ${i % 2 === 0
                      ? 'rgba(251, 146, 60, 0.15)'
                      : 'rgba(249, 115, 22, 0.1)'
                      } 0%, transparent 70%)`,
                    filter: `blur(${50 + i * 10}px)`,
                    opacity: 0.5 - (i * 0.08),
                  }}
                />
              );
            })}

            {/* Additional static orbs for composition */}
            {Array.from({ length: 3 }).map((_, i) => {
              const size = 250 + (i * 70);
              return (
                <div
                  key={`orb2-${i}`}
                  className="absolute rounded-full bg-gradient-radial"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    bottom: `${30 + (i * 10)}%`,
                    right: `${20 + (i * 15)}%`,
                    background: `radial-gradient(circle, ${i % 2 === 0
                      ? 'rgba(251, 146, 60, 0.12)'
                      : 'rgba(249, 115, 22, 0.08)'
                      } 0%, transparent 70%)`,
                    filter: `blur(${45 + i * 15}px)`,
                    opacity: 0.4 - (i * 0.1),
                  }}
                />
              );
            })}
          </div>

          {/* Subtle vignette effect */}
          <div className="absolute inset-0 bg-radial-vignette"></div>
        </div>

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="container mx-auto px-4 z-10 text-center"
        >
          <div className="flex flex-col items-center">
            {/* Logo with hover effect (no parallax) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10"
            >
              <motion.div
                whileHover={{ scale: 1.1, boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
                onClick={handleLogoClick}
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-4xl font-bold text-white cursor-pointer relative overflow-hidden shadow-lg shadow-orange-500/20 border border-white/10"
              >
                <AnimatePresence>
                  {isHovering && (
                    <motion.div
                      className="absolute inset-0 bg-white/15"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  className="relative z-10"
                  animate={{ rotate: isHovering ? 360 : 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onClick={handleLogoClick}
                >
                  AC
                </motion.div>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-orange-600/0 via-white/40 to-orange-600/0"
                  style={{
                    rotate: -30,
                    translateX: '-100%'
                  }}
                  animate={{
                    translateX: isHovering ? '200%' : '-100%',
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Letter-by-letter text animation for name */}
            <div className="overflow-hidden mb-2">
              <motion.h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-100 to-orange-400 flex flex-wrap justify-center gap-x-3 md:gap-x-5">
                {nameText.split(' ').map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-flex">
                    {word.split('').map((char, charIndex) => (
                      <motion.span
                        key={`${wordIndex}-${charIndex}`}
                        custom={(wordIndex * 10) + charIndex}
                        variants={letterVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.h1>
            </div>

            {/* Role text with typing effect */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mb-6 overflow-hidden"
            >
              <p className="text-xl md:text-2xl text-gray-300 relative">
                <span className="whitespace-nowrap">{roleText}</span>
                <motion.span
                  initial={{ left: 0 }}
                  animate={{ left: "100%" }}
                  transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 left-0 w-full bg-black"
                />
              </p>
            </motion.div>

            {/* Intro text with gradient */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">
                Crafting beautiful digital experiences through clean code and creative solutions.
                Specialized in React, Nextjs , Angular, Node.js, .NET and modern web technologies.
              </span>
            </motion.p>

            {/* Social media links with staggered animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="flex gap-4 mb-10"
            >
              {[
                { icon: FaGithub, link: "#", label: "GitHub" },
                { icon: FaLinkedinIn, link: "#", label: "LinkedIn" },
                { icon: FaTwitter, link: "#", label: "Twitter" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 2 + (index * 0.1), duration: 0.5 }
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    boxShadow: "0 10px 25px rgba(249, 115, 22, 0.2)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-gray-800/70 backdrop-blur-md rounded-full flex items-center justify-center text-gray-300 hover:text-orange-400 border border-gray-700/50 transition-colors duration-300"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Button with improved hover effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <motion.button
                onClick={() => scrollTo('projects')}
                onHoverStart={() => setIsButtonHovering(true)}
                onHoverEnd={() => setIsButtonHovering(false)}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-500 to-orange-700 text-white px-8 py-4 rounded-full font-medium flex items-center mx-auto group transition-all duration-300 relative overflow-hidden shadow-lg shadow-orange-600/20"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10">Explore My Work</span>
                <motion.span
                  className="relative z-10 ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <RiArrowRightSLine size={20} />
                </motion.span>

                {/* Add subtle glow on hover */}
                <AnimatePresence>
                  {isButtonHovering && (
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-50"
                      initial={{ boxShadow: "0 0 0 rgba(249, 115, 22, 0)" }}
                      animate={{ boxShadow: "0 0 20px rgba(249, 115, 22, 0.5)" }}
                      exit={{ boxShadow: "0 0 0 rgba(249, 115, 22, 0)" }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative scroll indicator */}
        <motion.div
          className="absolute hidden md:block md:bottom-16 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <span className="text-gray-400 text-sm mb-2 tracking-widest uppercase">Scroll Down</span>
            <motion.div
              className="w-8 h-12 border-2 border-gray-500 rounded-full flex items-center justify-center p-1"
              whileHover={{ borderColor: "#f97316" }}
            >
              <motion.div
                animate={{
                  y: [0, 14, 0],
                  backgroundColor: ["#f97316", "#ea580c", "#f97316"]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
                className="w-2 h-2 bg-orange-500 rounded-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Static particles (not affected by mouse movement) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => {
            const size = Math.random() * 2 + 1;
            const speed = 7 + Math.random() * 10;
            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: i % 3 === 0 ? "#f97316" : i % 3 === 1 ? "#fdba74" : "#fff",
                  boxShadow: `0 0 ${size * 2}px ${i % 3 === 0 ? "#f97316" : i % 3 === 1 ? "#fdba74" : "#fff"}`,
                  left: `${Math.random() * 100}%`,
                  bottom: `-10px`,
                }}
                animate={{
                  y: [0, -1000],
                  x: [0, Math.sin(i) * 50],
                  opacity: [0, 0.7, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: speed,
                  delay: i * 0.5,
                  ease: "linear"
                }}
              />
            );
          })}
        </div>

        {/* CSS for static effects */}
        <style jsx>{`
        .grid-pattern {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          width: 100%;
          height: 100%;
          transform: perspective(1000px) rotateX(60deg);
          transform-origin: center top;
        }
        
        .bg-radial-vignette {
          background: radial-gradient(circle, transparent 40%, black 140%);
        }

        .noise-effect {
          position: absolute;
          top: -500px;
          left: -500px;
          right: -500px;
          bottom: -500px;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.4;
          filter: contrast(150%) brightness(250%);
          mix-blend-mode: overlay;
        }
      `}</style>
      </section>

      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            {/* Overlay with blur effect */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEasterEgg(false)}
            />

            {/* Improved confetti animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {(() => {
                // Generate confetti config once using IIFE
                const confettiItems = Array.from({ length: 50 }).map((_, i) => {
                  const size = Math.random() * 10 + 3;
                  // Minimalistic orange color palette
                  const color = [
                    '#f97316', '#fb923c', '#fdba74', '#ea580c',
                    '#c2410c', '#9a3412', '#ff8c42', '#ffb347'
                  ][Math.floor(Math.random() * 8)];
                  const xOffset = Math.random() * 100;
                  const yOffset = Math.random() * 5;
                  const rotation = Math.random() * 360;
                  const duration = Math.random() * 3 + 2;
                  const sinOffset = Math.random() * 200 * (Math.random() > 0.5 ? 1 : -1);

                  // Simple shapes for minimalism
                  const shape = Math.floor(Math.random() * 2);
                  const shapeClass = shape === 0 ? "rounded-md" : "rounded-full";

                  // Height variation
                  const height = shape === 1 ? size : size * (Math.random() * 0.6 + 0.4);

                  // Clean opacity
                  const opacity = Math.random() * 0.3 + 0.7;

                  return (
                    <motion.div
                      key={`confetti-${i}`}
                      className={`absolute ${shapeClass}`}
                      style={{
                        width: `${size}px`,
                        height: `${height}px`,
                        backgroundColor: color,
                        top: `-${size}px`,
                        left: `${xOffset}%`,
                        rotate: `${rotation}deg`,
                        opacity: opacity,
                      }}
                      animate={{
                        y: [`-${size}px`, `${window.innerHeight + size}px`],
                        x: [0, sinOffset],
                        rotate: [0, rotation > 180 ? 360 : -360],
                      }}
                      transition={{
                        duration: duration,
                        repeat: Infinity,
                        delay: yOffset,
                        ease: "linear"
                      }}
                    />
                  );
                });

                return confettiItems;
              })()}
            </div>

            {/* Animated radial light behind modal */}
            <motion.div
              className="absolute rounded-full bg-gradient-radial from-orange-500/30 to-transparent w-96 h-96 filter blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Background gradient rings */}
            <div className="absolute pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`ring-${i}`}
                  className="absolute rounded-full border border-orange-500/20"
                  style={{
                    width: `${400 + i * 100}px`,
                    height: `${400 + i * 100}px`,
                    top: "50%",
                    left: "50%",
                    x: "-50%",
                    y: "-50%"
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.1, 0.3],
                    borderWidth: ["1px", "2px", "1px"]
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Floating particles around the modal */}
            <div className="absolute pointer-events-none">
              {(() => {
                return Array.from({ length: 15 }).map((_, i) => {
                  const size = Math.random() * 8 + 2;
                  const distance = 560 + Math.random() * 100;
                  const duration = Math.random() * 5 + 10;
                  const delay = Math.random() * 5;
                  const initialRotation = Math.random() * 360;

                  return (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute rounded-full bg-orange-400/70"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        boxShadow: `0 0 ${size * 2}px ${size}px rgba(249, 115, 22, 0.3)`,
                        top: "50%",
                        left: "50%",
                        x: "-50%",
                        y: "-50%"
                      }}
                      animate={{
                        x: [
                          `calc(-50% + ${Math.cos(initialRotation) * distance}px)`,
                          `calc(-50% + ${Math.cos(initialRotation + 180) * distance}px)`,
                          `calc(-50% + ${Math.cos(initialRotation + 360) * distance}px)`
                        ],
                        y: [
                          `calc(-50% + ${Math.sin(initialRotation) * distance}px)`,
                          `calc(-50% + ${Math.sin(initialRotation + 180) * distance}px)`,
                          `calc(-50% + ${Math.sin(initialRotation + 360) * distance}px)`
                        ],
                        opacity: [0.7, 1, 0.7],
                        scale: [1, 1.3, 1]
                      }}
                      transition={{
                        duration: duration,
                        repeat: Infinity,
                        delay: delay,
                        ease: "easeInOut"
                      }}
                    />
                  );
                });
              })()}
            </div>

            {/* Main card with enhanced effects */}
            <motion.div
              className="bg-gradient-to-br from-gray-900/90 to-gray-950/90 p-8 rounded-2xl border-2 border-orange-500 shadow-2xl relative z-10 max-w-md w-full backdrop-blur-lg"
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{
                rotateY: 0,
                opacity: 1,
                boxShadow: ['0 0 20px rgba(249, 115, 22, 0.3)', '0 0 40px rgba(249, 115, 22, 0.6)', '0 0 20px rgba(249, 115, 22, 0.3)']
              }}
              transition={{
                rotateY: { duration: 0.8, ease: "backOut" },
                opacity: { duration: 0.5 },
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            >
              {/* Glassmorphism effect inside card */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute -inset-[200px] bg-gradient-to-tr from-orange-500/10 via-transparent to-transparent rotate-12 opacity-20"></div>
                <div className="absolute -inset-[100px] bg-gradient-to-bl from-orange-500/10 via-transparent to-transparent -rotate-12 opacity-20"></div>
              </div>

              {/* Animated emojis at the top */}
              <div className="flex justify-center gap-4 mb-6 relative">

                <motion.div
                  className="text-center"
                  animate={{
                    rotate: [0, -15, 15, -15, 0],
                    scale: [1, 1.2, 1, 1.2, 1],
                    y: [0, -5, 0, -5, 0]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
                >
                  <span className="text-5xl">🥞</span>
                </motion.div>
              </div>

              <div className="text-center mb-8 relative">
                <motion.h3
                  className="text-3xl font-bold mb-2"
                  animate={{
                    color: ['#f97316', '#fdba74', '#d97706', '#f97316'],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <motion.span className="inline-block"
                    animate={{
                      y: [0, -5, 0],
                      scaleY: [1, 1.1, 1],
                      rotateZ: [0, 5, 0]
                    }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                  >Y</motion.span>
                  <motion.span className="inline-block"
                    animate={{
                      y: [0, -5, 0],
                      scaleY: [1, 1.1, 1],
                      rotateZ: [0, -3, 0]
                    }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 1, delay: 0.1 }}
                  >o</motion.span>
                  <motion.span className="inline-block"
                    animate={{
                      y: [0, -5, 0],
                      scaleY: [1, 1.1, 1],
                      rotateZ: [0, 5, 0]
                    }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 1, delay: 0.2 }}
                  >u</motion.span>

                  <motion.span className="inline-block ml-3"
                    animate={{
                      y: [0, -5, 0],
                      scaleY: [1, 1.1, 1],
                      rotateZ: [0, -3, 0]
                    }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 1, delay: 0.3 }}
                  >F</motion.span>
                  <motion.span className="inline-block"
                    animate={{
                      y: [0, -5, 0],
                      scaleY: [1, 1.1, 1],
                      rotateZ: [0, 4, 0]
                    }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 1, delay: 0.4 }}
                  >o</motion.span>
                  <motion.span className="inline-block"
                    animate={{
                      y: [0, -5, 0],
                      scaleY: [1, 1.1, 1],
                      rotateZ: [0, -3, 0]
                    }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 1, delay: 0.5 }}
                  >u</motion.span>
                  <motion.span className="inline-block"
                    animate={{
                      y: [0, -5, 0],
                      scaleY: [1, 1.1, 1],
                      rotateZ: [0, 5, 0]
                    }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 1, delay: 0.6 }}
                  >n</motion.span>
                  <motion.span className="inline-block"
                    animate={{
                      y: [0, -5, 0],
                      scaleY: [1, 1.1, 1],
                      rotateZ: [0, -4, 0]
                    }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 1, delay: 0.7 }}
                  >d</motion.span>

                  <motion.span className="inline-block ml-3"
                    animate={{
                      y: [0, -5, 0],
                      scaleY: [1, 1.1, 1],
                      rotateZ: [0, 4, 0]
                    }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 1, delay: 0.8 }}
                  >M</motion.span>
                  <motion.span className="inline-block"
                    animate={{
                      y: [0, -5, 0],
                      scaleY: [1, 1.1, 1],
                      rotateZ: [0, -3, 0]
                    }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 1, delay: 0.9 }}
                  >e</motion.span>
                  <motion.span className="inline-block"
                    animate={{
                      y: [0, -5, 0],
                      scaleY: [1, 1.1, 1],
                      rotateZ: [0, 5, 0]
                    }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 1, delay: 1 }}
                  >!</motion.span>
                </motion.h3>

                <motion.p
                  className="text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Wow! You've unlocked the super secret fun zone!
                </motion.p>

                {/* Sparkling stars */}
                <motion.div
                  className="absolute text-yellow-300 text-lg"
                  style={{ top: '-15px', left: '20%' }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  ✨
                </motion.div>

                <motion.div
                  className="absolute text-yellow-300 text-lg"
                  style={{ top: '10px', right: '25%' }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 4,
                    delay: 1
                  }}
                >
                  ✨
                </motion.div>
              </div>

              <motion.div
                className="bg-gradient-to-r from-black/40 to-orange-950/30 p-6 rounded-xl border border-orange-500/30 mb-8 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Animated background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="flex items-center justify-center mb-4"
                    animate={{
                      rotateZ: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >

                  </motion.div>

                  <p className="text-gray-200 mb-4 relative z-10 text-center">
                    <span className="text-orange-400 font-semibold">Secret revealed:</span> I'm actually a pancake
                    <motion.span
                      className="inline-block mx-1"
                      animate={{
                        rotate: [0, 180, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                    >
                      🥞
                    </motion.span>
                    flipping champion! My record is 10 perfect flips in a row!
                  </p>

                  <div className="bg-gradient-to-r from-orange-900/40 to-black/40 p-4 rounded-md text-center relative mt-6">
                    <p className="text-gray-300 mb-2 italic">"When I'm not coding, I'm flipping!"</p>


                  </div>
                </div>
              </motion.div>

              <div className="text-center mt-6">
                <motion.button
                  onClick={() => setShowEasterEgg(false)}
                  className="bg-gradient-to-r from-orange-500 to-orange-700 text-white px-8 py-3 rounded-full font-medium relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-orange-600/80 to-orange-800/80"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    animate={{
                      background: [
                        'linear-gradient(90deg, rgba(249,115,22,0) 0%, rgba(249,115,22,0.1) 50%, rgba(249,115,22,0) 100%)',
                        'linear-gradient(90deg, rgba(249,115,22,0) 100%, rgba(249,115,22,0.1) 50%, rgba(249,115,22,0) 0%)'
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="relative z-10 flex items-center justify-center">
                    <span>Back to Business</span>
                  </span>
                </motion.button>

                <motion.p
                  className="mt-4 text-gray-400 text-sm italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  *No pancakes were harmed in the making of this portfolio
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>


  );
};

export default HomePage;