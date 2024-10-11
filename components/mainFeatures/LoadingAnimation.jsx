import { motion } from "framer-motion";

export const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <motion.div
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: 'loop' }}
        className="w-16 h-16 bg-primary"
      />
    </div>
  );
};