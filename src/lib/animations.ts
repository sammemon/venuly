// Animation presets for Framer Motion
// Use these consistently across the app for cohesive animations

export const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.5,
    },
  },
};

export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export const slideInRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 40 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

export const rotateIn = {
  initial: { opacity: 0, rotate: -10 },
  animate: { opacity: 1, rotate: 0 },
  exit: { opacity: 0, rotate: 10 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export const buttonHoverVariant = {
  hover: {
    scale: 1.05,
    boxShadow: '0 0 20px rgba(37, 99, 235, 0.4)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 15,
    },
  },
};

export const buttonShakeVariant = {
  shake: {
    x: [-5, 5, -5, 5, 0],
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
};

export const pulseVariant = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const floatingVariant = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const rotatingVariant = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

// Skeleton loader animation
export const skeletonVariant = {
  animate: {
    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Modal animations
export const modalBackdropVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const modalContentVariant = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    y: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    y: 40,
    transition: {
      duration: 0.2,
    },
  },
};

// Notification toast animations
export const toastVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
  },
};

// Success check mark animation
export const checkmarkVariant = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
  pathVariant: {
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
};
