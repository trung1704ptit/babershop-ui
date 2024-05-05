import { useEffect, useState } from 'react';

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window !== undefined) {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return {
    isMobile,
  };
};

export default useMobile;
