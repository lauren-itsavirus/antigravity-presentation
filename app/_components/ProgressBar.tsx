'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
    current: number;
    total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
    const progress = ((current + 1) / total) * 100;

    return (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-800 z-50">
            <motion.div
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
            />
            <div className="absolute bottom-4 right-4 text-white text-sm font-mono opacity-50">
                {current + 1} / {total}
            </div>
        </div>
    );
}
