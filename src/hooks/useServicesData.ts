import { useState, useEffect } from 'react';
import type { Service } from '@/types/services.types';

interface UseServicesDataReturn {
    services: Service[];
    loading: boolean;
    error: string | null;
}

export function useServicesData(): UseServicesDataReturn {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/services.json')
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data: Service[]) => {
                setServices(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load services:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { services, loading, error };
}

/**
 * Helper to resolve a Translation object to the current language.
 */
export function resolveTranslation(
    translation: { es: string; en: string },
    lang: string
): string {
    const key = lang as keyof typeof translation;
    return translation[key] || translation.es;
}
