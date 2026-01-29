import React from 'react';
import { cn } from '@/lib/utils';

interface SlideProps {
    children: React.ReactNode;
    className?: string;
}

export default function Slide({ children, className }: SlideProps) {
    return (
        <div className={cn("w-full h-full p-16 flex flex-col", className)}>
            {children}
        </div>
    );
}
