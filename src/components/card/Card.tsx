import type {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	HTMLAttributes,
	MouseEventHandler,
} from "react";

export type CardVariant = "elevated" | "outlined" | "flat";

export type CardPadding = "none" | "sm" | "md" | "lg";

export type CardBaseProps = {
	variant?: CardVariant;
	hover?: boolean;
	padding?: CardPadding;
	className?: string;
	children?: React.ReactNode;
};

export type ClickableCardProps = CardBaseProps &
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
		onClick: MouseEventHandler<HTMLButtonElement>;
		href?: never;
		"aria-label"?: string;
	};

export type LinkCardProps = CardBaseProps &
	Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
		href: string;
		onClick?: never;
	};

export type StaticCardProps = CardBaseProps &
	HTMLAttributes<HTMLElement> & {
		onClick?: never;
		href?: never;
	};

export type CardProps = ClickableCardProps | LinkCardProps | StaticCardProps;

const variantStyles: Record<CardVariant, string> = {
	elevated: "bg-white border border-gray-200 shadow-md",
	outlined: "bg-white border-2 border-gray-300 shadow-none",
	flat: "bg-gray-50 border border-transparent shadow-none",
} as const;

const paddingStyles: Record<CardPadding, string> = {
	none: "",
	sm: "p-3",
	md: "p-4",
	lg: "p-6",
} as const;

const focusStyles =
	"focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

export const Card = ({
	variant = "elevated",
	hover = false,
	padding = "none",
	className = "",
	children,
	...restProps
}: CardProps) => {
	const isClickable =
		"onClick" in restProps && typeof restProps.onClick === "function";
	const isLink = "href" in restProps && typeof restProps.href === "string";

	const isInteractive = isClickable || isLink;

	const baseStyles = [
		"rounded-lg transition-all",
		variantStyles[variant],
		paddingStyles[padding],
		hover && isInteractive && "hover:shadow-lg hover:-translate-y-0.5",
		className,
	]
		.filter(Boolean)
		.join(" ");

	if (isClickable) {
		const {
			onClick,
			"aria-label": ariaLabel,
			...buttonProps
		} = restProps as Omit<ClickableCardProps, keyof CardBaseProps | "children">;

		return (
			<article className="rounded-lg">
				<button
					type="button"
					onClick={onClick}
					aria-label={ariaLabel}
					className={`${baseStyles} text-left w-full ${focusStyles}`}
					{...buttonProps}
				>
					{children}
				</button>
			</article>
		);
	}

	if (isLink) {
		const { href, ...anchorProps } = restProps as Omit<
			LinkCardProps,
			keyof CardBaseProps | "children"
		>;

		return (
			<article className="rounded-lg">
				<a
					href={href}
					className={`${baseStyles} block ${focusStyles}`}
					{...anchorProps}
				>
					{children}
				</a>
			</article>
		);
	}

	const staticProps = restProps as Omit<
		StaticCardProps,
		keyof CardBaseProps | "children"
	>;

	return (
		<article className={baseStyles} {...staticProps}>
			{children}
		</article>
	);
};

export const CardHeader = ({
	className = "",
	children,
	...props
}: HTMLAttributes<HTMLElement>) => (
	<header
		className={`px-6 py-4 border-b border-gray-200 ${className}`}
		{...props}
	>
		{children}
	</header>
);

export const CardBody = ({
	className = "",
	children,
	...props
}: HTMLAttributes<HTMLDivElement>) => (
	<div className={`px-6 py-4 ${className}`} {...props}>
		{children}
	</div>
);

export const CardFooter = ({
	className = "",
	children,
	...props
}: HTMLAttributes<HTMLElement>) => (
	<footer
		className={`px-6 py-4 border-t border-gray-200 ${className}`}
		{...props}
	>
		{children}
	</footer>
);

export const CardTitle = ({
	className = "",
	children,
	...props
}: HTMLAttributes<HTMLHeadingElement>) => (
	<h3 className={`text-lg font-semibold text-gray-900 ${className}`} {...props}>
		{children}
	</h3>
);

export const CardDescription = ({
	className = "",
	children,
	...props
}: HTMLAttributes<HTMLParagraphElement>) => (
	<p className={`text-sm text-gray-600 mt-1 ${className}`} {...props}>
		{children}
	</p>
);

type CardImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
	src: string;
	alt: string;
	className?: string;
};


export const CardImage = ({
	src,
	alt,
	className = "",
	...imgProps
}: CardImageProps) => (
	<div className={`-mx-6 -mt-6 mb-4 overflow-hidden ${className}`}>
		<img
			src={src}
			alt={alt}
			className="w-full h-auto object-cover"
			{...imgProps}
		/>
	</div>
);
