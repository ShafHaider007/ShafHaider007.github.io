"use client"

import { cn } from "@/lib/utils"

export const FluidBackground = ({ className }: { className?: string }) => {
    return (
        <div className={cn("fixed inset-0 z-[-1] overflow-hidden pointer-events-none", className)}>
            {/* Organic Blob 1 (Corporate Blue) */}
            <div
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-float"
                style={{ animationDelay: "0s" }}
            />

            {/* Organic Blob 2 (Slate/Gray) */}
            <div
                className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-slate-300/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-float"
                style={{ animationDelay: "2s" }}
            />

            {/* Organic Blob 3 (Accent/Sky) */}
            <div
                className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-accent/10 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-float"
                style={{ animationDelay: "4s" }}
            />

            {/* Organic Focus Blob */}
            <div
                className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] bg-blue-100/50 rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-breathe"
            />
        </div>
    )
}
