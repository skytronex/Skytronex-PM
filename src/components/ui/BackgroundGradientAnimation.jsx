
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const BackgroundGradientAnimation = ({
    gradientBackgroundStart = "rgb(15, 23, 42)", // Deep Slate
    gradientBackgroundEnd = "rgb(30, 41, 59)", // Lighter Slate
    firstColor = "139, 92, 246", // Violet 500
    secondColor = "59, 130, 246", // Blue 500
    thirdColor = "6, 182, 212", // Cyan 500
    fourthColor = "236, 72, 153", // Pink 500
    size = "80%",
    blendingValue = "hard-light",
    children,
    className,
    containerClassName,
}) => {
    return (
        <div
            className={cn(
                "relative left-0 top-0 h-screen w-screen overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
                containerClassName
            )}
            style={{
                "--gradient-background-start": gradientBackgroundStart,
                "--gradient-background-end": gradientBackgroundEnd,
                "--first-color": firstColor,
                "--second-color": secondColor,
                "--third-color": thirdColor,
                "--fourth-color": fourthColor,
                "--size": size,
                "--blending-value": blendingValue,
            }}
        >
            <div className={cn("absolute inset-0 z-0 h-full w-full bg-slate-950/20", className)}>
                {/* Blob 1 - Moving Circle */}
                <motion.div
                    animate={{
                        x: ["0%", "25%", "-25%", "0%"],
                        y: ["0%", "-25%", "25%", "0%"],
                        scale: [1, 1.2, 0.8, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: "linear"
                    }}
                    className="absolute top-[10%] left-[10%] h-[var(--size)] w-[var(--size)] rounded-full bg-[radial-gradient(circle_at_center,_rgba(var(--first-color),_0.8)_0,_rgba(var(--first-color),_0)_50%)] mix-blend-var(--blending-value) opacity-70 blur-[100px]"
                />
                {/* Blob 2 */}
                <motion.div
                    animate={{
                        x: ["0%", "-25%", "25%", "0%"],
                        y: ["0%", "25%", "-25%", "0%"],
                        scale: [1, 0.8, 1.2, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: "linear"
                    }}
                    className="absolute top-[10%] right-[10%] h-[var(--size)] w-[var(--size)] rounded-full bg-[radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)] mix-blend-var(--blending-value) opacity-70 blur-[100px]"
                />
                {/* Blob 3 */}
                <motion.div
                    animate={{
                        x: ["0%", "20%", "-20%", "0%"],
                        y: ["0%", "-20%", "20%", "0%"],
                        scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: "linear"
                    }}
                    className="absolute -bottom-[20%] left-[20%] h-[var(--size)] w-[var(--size)] rounded-full bg-[radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)] mix-blend-var(--blending-value) opacity-70 blur-[100px]"
                />

                {/* Blob 4 - Accent */}
                <motion.div
                    animate={{
                        x: ["0%", "-15%", "15%", "0%"],
                        y: ["0%", "15%", "-15%", "0%"],
                        scale: [0.8, 1, 0.8, 1],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: "linear"
                    }}
                    className="absolute -bottom-[20%] right-[20%] h-[var(--size)] w-[var(--size)] rounded-full bg-[radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)] mix-blend-var(--blending-value) opacity-60 blur-[100px]"
                />

            </div>
            {/* Glassmorphism Overlay Texture */}
            <div className="absolute inset-0 z-[1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

            <div className={cn("relative z-10 w-full h-full", className)}>{children}</div>
        </div>
    );
};
