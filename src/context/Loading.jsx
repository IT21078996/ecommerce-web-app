import { useState } from 'react';

// A hook for manage global loading state
export const useLoading = () => {
    const [loading, setLoading] = useState(false);

    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    return { loading, startLoading, stopLoading };
};
