import { FileQuestion, Inbox, Search, FolderOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type EmptyStateVariant = "default" | "search" | "noData" | "folder";

interface EmptyStateProps {
	title: string;
	description?: string;
	icon?: React.ReactNode;
	variant?: EmptyStateVariant;
	action?: React.ReactNode;
	className?: string;
}

const variantIcons: Record<EmptyStateVariant, LucideIcon> = {
	default: Inbox,
	search: Search,
	noData: FileQuestion,
	folder: FolderOpen,
};

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
