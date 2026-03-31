"use client"

import { cn } from "@/lib/utils"

export const FluidBackground = ({ className }: { className?: string }) => {
    return (
        <div className={cn("fixed inset-0 z-[-1] overflow-hidden pointer-events-none", className)}>
            <div
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/5 rounded-full mix-blend-multiply filter blur-[120px] opacity-50 animate-float"
                style={{ animationDelay: "0s" }}
            />
            <div
                className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-muted-foreground/5 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-float"
                style={{ animationDelay: "2s" }}
            />
            <div
                className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] bg-accent/5 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-float"
                style={{ animationDelay: "4s" }}
            />
        </div>
    )
}
