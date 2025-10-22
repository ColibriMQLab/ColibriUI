import React from "react";
import type { Props } from "./index.props";

export default ({
	fill = "currentColor",
	width = 24,
	height = 24,
	ref,
	...props
}: Props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill={fill}
		width={width}
		height={height}
		ref={ref}
		{...props}
		viewBox="0 0 24 24"
	>
		<path d="m3.338 12-.866-.5-.29.5.29.5.866-.5Zm17.324 0 .866.5.29-.5-.29-.5-.866.5Zm-16.459.5A8.996 8.996 0 0 1 12 8V6a10.996 10.996 0 0 0-9.528 5.5l1.731 1ZM12 8a8.996 8.996 0 0 1 7.797 4.5l1.73-1A10.996 10.996 0 0 0 12 6v2Zm7.797 3.5A8.996 8.996 0 0 1 12 16v2c4.073 0 7.627-2.214 9.528-5.5l-1.731-1ZM12 16a8.996 8.996 0 0 1-7.796-4.5l-1.732 1C4.372 15.787 7.927 18 12 18v-2Z" />
		<circle
			cx={12}
			cy={12}
			r={2}
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
		/>
	</svg>
);
