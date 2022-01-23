import { atom } from "nanostores";

type UserStore = {
	isInteracted: boolean;
};

export const userStore = atom<UserStore>({
	isInteracted: false,
});

export function setIsInteracted(value: boolean) {
	userStore.set({ ...userStore.get(), isInteracted: value });
}
