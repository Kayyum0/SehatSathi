// src/components/SplashScreen.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  const titleWords = ["Sehat", "Sathi"];
  const subtitleText = "Your Personal Healthcare Companion";
  const subtitleLetters = subtitleText.split("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // --- Variants ---
  const splashVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } },
  };

  const logoVariants = {
    visible: {
      opacity: 1,
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: { scale: { duration: 1.5, repeat: 1 }, rotate: { duration: 1.5, repeat: 0 } },
    },
    hidden: { opacity: 0, scale: 1.3, rotate: 0, transition: { duration: 0.5 } },
  };

  const titleContainerVariants = {
    visible: { transition: { delayChildren: 0.5, staggerChildren: 0.3 } },
  };

  const titleWordVariants = {
    visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 120, damping: 12 } },
    hidden: { opacity: 0, y: 20, rotate: -10 },
  };

  const subtitleContainerVariants = {
    visible: { transition: { delayChildren: 1.2, staggerChildren: 0.05 } },
  };

  const subtitleLetterVariants = {
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, type: "spring", stiffness: 150 } },
    hidden: { opacity: 0, y: 10, scale: 0.8 },
  };

  const dotsVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50 overflow-hidden"
          variants={splashVariants}
          initial="visible"
          animate="visible"
          exit="hidden"
        >
          {/* Background Glow */}
          <motion.div
            className="absolute inset-0 bg-teal-600/10 rounded-full"
            animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Logo */}
          <motion.img
            src="/logo.png"
            alt="App Logo"
            className="w-40 h-40 mb-6 drop-shadow-2xl relative z-10"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />

          {/* Title */}
          <motion.h1
            className="text-6xl font-extrabold text-teal-600 drop-shadow-lg mb-2 flex space-x-4 relative z-10"
            variants={titleContainerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {titleWords.map((word, i) => (
              <motion.span key={i} variants={titleWordVariants}>
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            className="flex flex-wrap justify-center mb-8 relative z-10"
            variants={subtitleContainerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {subtitleLetters.map((letter, i) => (
              <motion.span
                key={i}
                className="text-lg font-medium text-teal-600 tracking-wide"
                variants={subtitleLetterVariants}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Loading Dots */}
          <motion.div
            className="flex space-x-2 relative z-10"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dotsVariants}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-3 h-3 bg-teal-600 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -6, 0] }}
                transition={{ duration: 1, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
