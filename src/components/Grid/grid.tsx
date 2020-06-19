import React, { CSSProperties, PropsWithChildren } from "react";
import classnames from "classnames";

interface ColProps {
	/** 额外类名*/
	className?: string;
	/** 样式*/
	style?: CSSProperties;
	/** xs:<576px*/
	xs?: number;
	/**  sm:≥576px */
	sm?: number;
	/** md :≥768px */
	md?: number;
	/**lg:≥992px  */
	lg?: number;
	/**xl:≥1200px*/
	xl?: number;
	/**xxl:≥1600px*/
	xxl?: number;
}

function Col(props: PropsWithChildren<ColProps>) {
	const { className, style, xxl, xs, sm, md, lg, xl } = props;
	const classes = classnames("bigbear-grid-col", className, {
		[`bigbear-col-xs-${xs}`]: typeof xs === "number",
		[`bigbear-col-sm-${sm}`]: typeof sm === "number",
		[`bigbear-col-md-${md}`]: typeof md === "number",
		[`bigbear-col-lg-${lg}`]: typeof lg === "number",
		[`bigbear-col-xl-${xl}`]: typeof xl === "number",
		[`bigbear-col-xxl-${xxl}`]: typeof xxl === "number"
	});
	return (
		<div className={classes} style={style}>
			{props.children}
		</div>
	);
}

interface RowProps {
	/** 额外类名*/
	className?: string;
	/** 样式*/
	style?: CSSProperties;
}

function Row(props: PropsWithChildren<RowProps>) {
	const { className, style } = props;
	const classes = classnames("bigbear-grid-row", className);
	return (
		<div className={classes} style={style}>
			{props.children}
		</div>
	);
}

Row.Col = Col;

export default Row;

export { Col };