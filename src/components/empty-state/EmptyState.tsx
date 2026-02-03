import type { LucideIcon } from "lucide-react";
import { FileQuestion, FolderOpen, Inbox, Search } from "lucide-react";

const variantIcons = {
	default: Inbox,
	search: Search,
	noData: FileQuestion,
	folder: FolderOpen,
} as const satisfies Record<string, LucideIcon>;

type EmptyStateVariant = keyof typeof variantIcons;

interface EmptyStateProps {
	title: string;
	description?: string;
	icon?: React.ReactNode;
	variant?: EmptyStateVariant;
	action?: React.ReactNode;
	className?: string;
}

export const EmptyState = ({
	title,
	description,
	icon,
	variant = "default",
	action,
	className = "",
}: EmptyStateProps) => {
	const DefaultIcon = variantIcons[variant];

	return (
		<section
			aria-label={title}
			className={`text-center py-12 px-6 ${className}`}
		>
			<div className="flex justify-center mb-4" aria-hidden="true">
				{icon ?? <DefaultIcon className="w-12 h-12 text-gray-400" />}
			</div>
			<h2 className="text-gray-600 text-lg font-medium">{title}</h2>
			{description && (
				<p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
					{description}
				</p>
			)}
			{action && <div className="mt-6">{action}</div>}
		</section>
	);
};
