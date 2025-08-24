import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatCurrency(value: number | string): string {
    if (value === 'free') return 'Gratis';

    const numericValue = typeof value === 'string' ? Number(value) : value;

    if (isNaN(numericValue)) return 'Precio inválido';

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numericValue);
}