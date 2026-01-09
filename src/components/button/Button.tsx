import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "outline" | "ghost" | "nav" | "custom";
	size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ type = "button", variant = "primary", size = "md", className = "", ...props },
		ref,
	) => {
		const baseStyles =
			"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

		const variantStyles = {
			primary:
				"bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500",
			secondary:
				"bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus-visible:ring-gray-500",
			outline:
				"border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-gray-500",
			ghost:
				"text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-500",
			nav: "text-gray-600 hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-gray-500",
			custom: "",
		} as const;

		const sizeStyles = {
			sm: "h-9 px-3 text-sm",
			md: "h-10 px-4 text-base",
			lg: "h-11 px-6 text-lg",
		} as const;

		return (
			<button
				ref={ref}
				type={type}
				className={cn(
					baseStyles,
					variantStyles[variant],
					sizeStyles[size],
					className,
				)}
				{...props}
			/>
		);
	},
);
