import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export const useClientSearchParams = () => {
  const [params, setParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    setParams(useSearchParams()); // This runs only on the client side
  }, []);

  return params;
};
