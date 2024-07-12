import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  const variants = {
    initial: {
      opacity: 0,
      y: 50, // Move the component from bottom to top
    },
    animate: {
      opacity: 1,
      y: 0, // Reset the position to the original
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Layout;
