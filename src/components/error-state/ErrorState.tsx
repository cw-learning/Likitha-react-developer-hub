import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "../button/Button";

type ErrorVariant = "error" | "warning" | "info";

interface ErrorStateProps {
	title?: string;
	message?: string;
	error?: Error | unknown;
	variant?: ErrorVariant;
	action?: React.ReactNode;
	onRetry?: () => void;
	className?: string;
}

const variantConfig = {
	error: {
		icon: AlertCircle,
		iconColor: "text-red-500",
		titleColor: "text-red-600",
		bgColor: "bg-red-50",
		borderColor: "border-red-200",
	},
	warning: {
		icon: AlertTriangle,
		iconColor: "text-yellow-500",
		titleColor: "text-yellow-700",
		bgColor: "bg-yellow-50",
		borderColor: "border-yellow-200",
	},
	info: {
		icon: Info,
		iconColor: "text-blue-500",
		titleColor: "text-blue-600",
		bgColor: "bg-blue-50",
		borderColor: "border-blue-200",
	},
} as const;

export const ErrorState = ({
	title = "Something went wrong",
	message,
	error,
	variant = "error",
	action,
	onRetry,
	className = "",
}: ErrorStateProps) => {
	const errorMessage =
		message ??
		(error instanceof Error ? error.message : "An unexpected error occurred");

	const config = variantConfig[variant];
	const Icon = config.icon;

	return (
		<section
			role="alert"
			aria-live="polite"
			className={`text-center py-12 px-6 rounded-lg ${config.bgColor} ${config.borderColor} border ${className}`}
		>
			<Icon
				className={`w-12 h-12 mx-auto mb-4 ${config.iconColor}`}
				aria-hidden="true"
			/>
			<h2 className={`text-lg font-semibold ${config.titleColor}`}>{title}</h2>
			<p className="text-gray-600 text-sm mt-2 max-w-md mx-auto">
				{errorMessage}
			</p>
			{(action || onRetry) && (
				<div className="mt-6 flex justify-center gap-3">
					{onRetry && (
						<Button variant="outline" onClick={onRetry}>
							Try Again
						</Button>
					)}
					{action}
				</div>
			)}
		</section>
	);
};
