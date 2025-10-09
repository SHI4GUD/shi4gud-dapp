import { useState, useEffect } from 'react';

export function useResponsive() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleResize = () => setIsSmallScreen(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleResize);
    handleResize(); // Initial check

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return { isSmallScreen };
} 