import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { selectToken } from '@/utils/authSlice';

export function useAuth() {
    const router = useRouter();
    const token = useSelector(selectToken);
    const [isCheckingToken, setIsCheckingToken] = useState(true);

    useEffect(() => {
        if (token) {
            setIsCheckingToken(false);
        } else {
            const timer = setTimeout(() => {
                setIsCheckingToken(false);
            }, 1000); 
            return () => clearTimeout(timer);
        }
    }, [token]);

    useEffect(() => {
        if (!isCheckingToken && !token) {
            router.push("/");
        }
    }, [token, isCheckingToken, router]);

    return isCheckingToken;
}
