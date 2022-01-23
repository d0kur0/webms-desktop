import React from "react";
import { Range, getTrackBackground } from "react-range";

type CustomRangeProps = {
	values: number[];
	step: number;
	min: number;
	max: number;
	onChange?: (values: number[]) => void;
	disabled?: boolean;
};

export default function CustomRange({ values, step, min, max, onChange, disabled }: CustomRangeProps) {
	return (
		<Range
			values={values}
			step={step}
			min={min}
			disabled={disabled}
			max={max}
			onChange={onChange || (() => {})}
			renderTrack={({ props, children }) => (
				<div
					onMouseDown={props.onMouseDown}
					onTouchStart={props.onTouchStart}
					style={{
						...props.style,
						display: "flex",
						width: "100%",
					}}>
					<div
						ref={props.ref}
						style={{
							height: "var(--range-track-size)",
							width: "100%",
							borderRadius: "5px",
							background: getTrackBackground({
								values: values,
								colors: ["var(--range-bg-color-before)", "var(--range-bg-color-after)"],
								min: min,
								max: max,
							}),
							alignSelf: "center",
						}}>
						{children}
					</div>
				</div>
			)}
			renderThumb={({ props, isDragged }) => (
				<div
					{...props}
					style={{
						...props.style,
						height: "var(--range-thumb-size)",
						width: "var(--range-thumb-size)",
						borderRadius: "100%",
						backgroundColor: "var(--range-thumb-color)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						boxShadow: "0px 2px 6px #AAA",
					}}
				/>
			)}
		/>
	);
}
