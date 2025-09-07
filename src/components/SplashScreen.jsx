// src/components/SplashScreen.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  const titleWords = ["Sehat", "Sathi"];
  const subtitleText = "Your Personal Healthcare Companion";
  const subtitleLetters = subtitleText.split(""); // letter by letter

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
      scale: [1, 1.15, 1], // heartbeat
      transition: {
        scale: { duration: 1.5, repeat: 2, ease: "easeInOut" },
        opacity: { duration: 0.6 },
      },
    },
    hidden: { opacity: 0, scale: 1.3, transition: { duration: 0.5 } },
  };

  const titleContainerVariants = {
    visible: { transition: { delayChildren: 0.4, staggerChildren: 0.25 } },
    hidden: {},
  };

  const titleWordVariants = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
    hidden: { opacity: 0, y: 20 },
  };

  const subtitleContainerVariants = {
    visible: { transition: { delayChildren: 1.2, staggerChildren: 0.05 } },
    hidden: {},
  };

  const subtitleLetterVariants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    hidden: { opacity: 0, y: 10 },
  };

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center 
                     bg-white z-50 overflow-hidden"
          variants={splashVariants}
          initial="visible"
          animate="visible"
          exit="hidden"
        >
          {/* Logo */}
          <motion.img
            src="/logo.png"
            alt="App Logo"
            className="w-40 h-40 mb-6 drop-shadow-lg"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />

          {/* Title */}
          <motion.h1
            className="text-6xl font-extrabold text-[#4CAF50] drop-shadow-sm mb-2 flex space-x-4"
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
            className="flex flex-wrap justify-center mb-8"
            variants={subtitleContainerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {subtitleLetters.map((letter, i) => (
              <motion.span
                key={i}
                className="text-lg font-medium text-gray-700 tracking-wide"
                variants={subtitleLetterVariants}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Loading Dots */}
          <motion.div
            className="flex space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 2.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-3 h-3 bg-[#4CAF50] rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
