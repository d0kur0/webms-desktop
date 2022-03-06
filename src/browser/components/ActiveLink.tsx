import React from "react";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";

export function ActiveLink({ children, to, ...props }: LinkProps): JSX.Element {
	const resolved = useResolvedPath(to);
	const match = useMatch({ path: resolved.pathname, end: true });

	return (
		<Link className={match ? "active" : ""} to={to} {...props}>
			{children}
		</Link>
	);
}
