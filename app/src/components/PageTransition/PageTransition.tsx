import { motion } from 'framer-motion';

interface IPageTransitionProps {
  children: JSX.Element;
}

const PageTransition = ({ children }: IPageTransitionProps) => {
  return (
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ height: '100dvh'}}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
