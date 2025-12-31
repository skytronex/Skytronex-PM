
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const NeonGradientCard = ({
    children,
    className,
    containerClassName,
    borderSize = 2,
    neonColors = {
        first: "#8B5CF6", // Violet
        second: "#3B82F6", // Blue
        third: "#06B6D4", // Cyan
    }
}) => {
    return (
        <div className={cn("relative group/neon overflow-hidden rounded-2xl bg-slate-900 border border-slate-800", containerClassName)}>
            {/* Animated Gradient Border Layer */}
            <div
                className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] opacity-0 group-hover/neon:opacity-100 transition-opacity duration-500"
                style={{
                    background: `conic-gradient(from 0deg, transparent 0 340deg, ${neonColors.first} 360deg)`
                }}
            />
            <div
                className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] opacity-0 group-hover/neon:opacity-100 transition-opacity duration-500 delay-[-2s]"
                style={{
                    background: `conic-gradient(from 0deg, transparent 0 340deg, ${neonColors.third} 360deg)`
                }}
            />

            {/* Inner Content Mask */}
            <div className={cn("relative h-full w-full rounded-[inherit] bg-slate-900/90 backdrop-blur-xl p-6", className)}
                style={{ margin: borderSize }}
            >
                {children}
            </div>

            {/* Static Border (fallback) */}
            <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none" />
        </div>
    );
};
