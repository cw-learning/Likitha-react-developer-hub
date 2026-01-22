export type ResourceType = "article" | "video" | "docs" | "github";

export type SkillLevel = "beginner" | "intermediate" | "expert";

export type Resource = {
	id: string;
	title: string;
	description: string;
	type: ResourceType;
	level: SkillLevel;
	tags: string[];
	url: string;
	created_at: string;
	updated_at: string;
};

export type ResourceFilters = {
	searchQuery?: string;
	types?: ResourceType[];
	levels?: SkillLevel[];
};
