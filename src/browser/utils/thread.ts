import { Files, Thread } from "webm-finder";

type ThreadExtended = Thread & { filesCount: number };

export function unpackThreads(files: Files): ThreadExtended[] {
	const threads = [...new Set(files.map(({ rootThread }) => rootThread))];
	return threads
		.map(thread => ({
			...thread,
			filesCount: files.filter(({ rootThread }) => rootThread.id == thread.id).length,
		}))
		.sort((a, b) => b.filesCount - a.filesCount);
}

export function normalizeThreadSubject(subject: string, MAX_SUBJECT_LENGTH = 100): string {
	if (!subject) return "[thread without subject]";
	subject = subject.replace(/<\/?[^>]+(>|$)/g, "");
	return subject.length > MAX_SUBJECT_LENGTH
		? `${subject.substring(0, MAX_SUBJECT_LENGTH)}...`
		: subject;
}
