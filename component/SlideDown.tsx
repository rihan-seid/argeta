import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideDownProps {
  children: ReactNode;
  delay?: number;
}

const SlideDown = ({ children, delay = 0 }: SlideDownProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default SlideDown;
