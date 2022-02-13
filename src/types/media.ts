import { Files, VendorImplementation, fourChannelFactory, twoChannelFactory } from "webm-finder";

type Board = {
	name: string;
	description: string;
	enabled: boolean;
};

type EnabledBoardsStruct = {
	vendor: VendorImplementation;
	boards: Board[];
}[];

export const AllowedBoards: EnabledBoardsStruct = [
	{
		vendor: twoChannelFactory,
		boards: [
			{
				name: "media",
				description: "Анимация",
				enabled: true,
			},
			{
				name: "b",
				description: "Бред",
				enabled: true,
			},
			{
				name: "mu",
				description: "Музыка",
				enabled: false,
			},
			{
				name: "mpl",
				description: "My Little Pony",
				enabled: false,
			},
			{
				name: "mov",
				description: "Фильмы",
				enabled: false,
			},
			{
				name: "pr",
				description: "Программирование",
				enabled: false,
			},
			{
				name: "fg",
				description: "Трапы",
				enabled: false,
			},
			{
				name: "fur",
				description: "Фурри",
				enabled: false,
			},
			{
				name: "gg",
				description: "Хорошие девушки",
				enabled: false,
			},
			{
				name: "hc",
				description: "HardCore",
				enabled: false,
			},
			{
				name: "fet",
				description: "Фетиш",
				enabled: false,
			},
			{
				name: "fag",
				description: "Фагготрия",
				enabled: false,
			},
			{
				name: "a",
				description: "Аниме",
				enabled: false,
			},
			{
				name: "ma",
				description: "Манга",
				enabled: false,
			},
			{
				name: "kpop",
				description: "K-pop",
				enabled: false,
			},
			{
				name: "jsf",
				description: "Japanese Street Fashion",
				enabled: false,
			},
			{
				name: "2d",
				description: "Аниме/Беседка",
				enabled: false,
			},
		],
	},
	{
		vendor: fourChannelFactory,
		boards: [
			{
				name: "mlp",
				description: "My Little Pony",
				enabled: false,
			},
			{
				name: "vg",
				description: "Video Games",
				enabled: false,
			},
			{
				name: "jp",
				description: "Otaku Culture",
				enabled: false,
			},
			{
				name: "vp",
				description: "Pokémon",
				enabled: false,
			},
			{
				name: "h",
				description: "Hentai",
				enabled: false,
			},
			{
				name: "a",
				description: "Anime & Manga",
				enabled: false,
			},
			{
				name: "c",
				description: "Anime/Cute",
				enabled: false,
			},
			{
				name: "cgl",
				description: "Cosplay & EGL",
				enabled: false,
			},
			{
				name: "mu",
				description: "Музыка",
				enabled: false,
			},
			{
				name: "vt",
				description: "Virtual YouTubers",
				enabled: false,
			},
			{
				name: "wsg",
				description: "Worksafe GIF",
				enabled: false,
			},
			{
				name: "aco",
				description: "Adult Cartoons",
				enabled: false,
			},
			{
				name: "b",
				description: "Random",
				enabled: false,
			},
			{
				name: "s",
				description: "Sexy Beautiful Women",
				enabled: false,
			},
			{
				name: "hc",
				description: "Hardcore",
				enabled: false,
			},
			{
				name: "e",
				description: "Ecchi",
				enabled: false,
			},
			{
				name: "u",
				description: "Yuri",
				enabled: false,
			},
			{
				name: "d",
				description: "Hentai/Alternative",
				enabled: false,
			},
			{
				name: "t",
				description: "Torrents",
				enabled: false,
			},
			{
				name: "gif",
				description: "Adult GIF",
				enabled: false,
			},
			{
				name: "r",
				description: "Adult Requests",
				enabled: false,
			},
		],
	},
];

export const AllowedFileExtensions = [
	{ value: "webm", enabled: true },
	{ value: "mp4", enabled: true },
	{ value: "jpeg", enabled: true },
	{ value: "jpg", enabled: true },
	{ value: "png", enabled: true },
	{ value: "gif", enabled: true },
];

export type MediaCache = {
	revisionTime: number;
	files: Files;
};

type MediaSettingsBoards = {
	vendor: string;
	boards: Board[];
}[];

export type MediaSettings = {
	allowedFileExtensions: typeof AllowedFileExtensions;
	allowedBoards: MediaSettingsBoards;
};
