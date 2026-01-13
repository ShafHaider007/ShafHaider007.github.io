import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    className?: string
    hoverEffect?: boolean
}

export function GlassCard({ children, className, hoverEffect = true, ...props }: GlassCardProps) {
    return (
        <div
            className={cn(
                "glass-card rounded-2xl p-6 relative overflow-hidden",
                hoverEffect && "hover:scale-[1.01] hover:bg-card/50",
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100 pointer-events-none" />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}
