import { useStore } from "@nanostores/react";

import "./Threads.css";

import React, { useMemo, useState } from "react";
import { CgEye } from "react-icons/cg";
import { Link } from "react-router-dom";

import { filesStore } from "stores/files";

import { normalizeThreadSubject, unpackThreads } from "utils/thread";

const THREADS_LIMIT = 40;

export default function Threads(): JSX.Element {
	const files = useStore(filesStore);
	const [searchString, setSearchString] = useState("");
	const [page, setPage] = useState(1);

	const threads = useMemo(() => unpackThreads(files), [files]);
	const filteredThreads = useMemo(
		() =>
			(searchString
				? threads.filter(({ subject }) => subject.includes(searchString))
				: threads
			).splice(0, THREADS_LIMIT * page),
		[searchString, threads, page]
	);

	const onClickMoreButton = () => setPage(page => page + 1);

	return (
		<div className="threads">
			<input
				placeholder="Поиск по имени треда"
				className="threads__filter-input"
				onInput={event => setSearchString(event.currentTarget.value)}
			/>

			<div className="thread">
				{filteredThreads.map((thread, key) => (
					<Link to={`/thread/${thread.id}`} key={key} className="thread__row">
						<div className="thread__board">{thread.board}</div>
						<div className="thread__name">{normalizeThreadSubject(thread.subject)}</div>
						<div className="thread__count">{thread.filesCount}</div>
					</Link>
				))}
			</div>

			{THREADS_LIMIT * page < threads.length && (
				<button onClick={onClickMoreButton} className="threads__more-button">
					Показать больше
				</button>
			)}
		</div>
	);
}
