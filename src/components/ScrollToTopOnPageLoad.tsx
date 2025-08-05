// components/ScrollToTopOnRouteChange.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ScrollToTopOnPageLoad = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to the top of the page smoothly whenever the pathname changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null; // This component doesn't render any UI
};

export default ScrollToTopOnPageLoad;