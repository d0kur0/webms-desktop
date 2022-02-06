export type SortingRules = {
	// true: desc, false: asc
	date: boolean;
	threadId: number;
};

export const SortingRulesDefault: SortingRules = { date: true, threadId: null };
