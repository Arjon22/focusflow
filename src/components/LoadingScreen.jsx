import { motion } from "framer-motion";

function LoadingScreen() {
  return (
    <div className="loading-screen">

      <motion.div
        className="loading-logo"
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
        }}
      >
        🌸
      </motion.div>


      <motion.h2
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        FocusFlow
      </motion.h2>


      <p>
        Preparing your tasks...
      </p>

    </div>
  );
}

export default LoadingScreen;