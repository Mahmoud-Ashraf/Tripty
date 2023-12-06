import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function NotFoundPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the custom 404 page or any other page
        router.push('/404');
    }, [router]);

    return null; // You can render content here if needed
}