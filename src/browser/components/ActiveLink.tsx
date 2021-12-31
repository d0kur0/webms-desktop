import React from "react";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";

export function ActiveLink({ children, to, ...props }: LinkProps) {
	let resolved = useResolvedPath(to);
	let match = useMatch({ path: resolved.pathname, end: true });

	return (
		<Link className={match ? "active" : ""} to={to} {...props}>
			{children}
		</Link>
	);
}
