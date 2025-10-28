import { useState, useEffect } from "react";
import { addFilter } from "@wordpress/hooks";
import { InspectorAdvancedControls } from "@wordpress/block-editor";
import { createHigherOrderComponent } from "@wordpress/compose";
import { __ } from "@wordpress/i18n";

import { useSettings } from "@wordpress/block-editor";

import { Flex, FlexItem, Text } from "@wordpress/components";
import {
	__experimentalNumberControl as NumberControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	ExternalLink,
	ToggleControl,
	Tip,
} from "@wordpress/components";
``;

import "./style.scss";

const supportedBlocks = [
	"core/group",
	"core/heading",
	"core/button",
	"core/buttons",
	"core/paragraph",
	"core/columns",
	"core/column",
	"core/cover",
	"core/media-text",
	"core/button",
];

addFilter(
	"blocks.registerBlockType",
	"conditional-block-hide/filter-block-attributes",
	(settings, name) => {
		if (!supportedBlocks.includes(name)) return settings;

		return {
			...settings,
			attributes: {
				...settings.attributes,
				hideOnMobile: {
					type: "boolean",
					default: false,
				},
				hideOnTablet: {
					type: "boolean",
					default: false,
				},
				hideOnDesktop: {
					type: "boolean",
					default: false,
				},
				hideOnCustomBreakpoint: {
					type: "boolean",
					default: false,
				},
				customMinWidth: {
					type: "number",
					default: 0,
				},
				customMaxWidth: {
					type: "number",
					default: 0,
				},
				customDirection: {
					type: "string",
					default: "",
				},
			},
		};
	},
);

const DEFAULT_BREAKPOINTS = {
	mobile: "480px",
	tablet: "768px",
	desktop: "1024px",
};

function Edit(props) {
	const { attributes, setAttributes } = props;

	const [breakpoints] = useSettings("custom.breakpoints");

	const mergedBreakpoints = {
		...DEFAULT_BREAKPOINTS,
		...breakpoints,
	};

	useEffect(() => {
		if (
			attributes.hideOnMobile ||
			attributes.hideOnTablet ||
			attributes.hideOnDesktop
		) {
			setAttributes({ hideOnCustomBreakpoint: false });
		}
	}, [attributes]);

	return (
		<InspectorAdvancedControls>
			<ToggleControl
				__nextHasNoMarginBottom
				label="Hide on Mobile"
				help={`Hidden on screens smaller than ${mergedBreakpoints.mobile}`}
				checked={attributes.hideOnMobile}
				onChange={() =>
					setAttributes({ hideOnMobile: !attributes.hideOnMobile })
				}
			/>
			<ToggleControl
				__nextHasNoMarginBottom
				label="Hide on Tablet"
				checked={attributes.hideOnTablet}
				help={`Hidden on screens smaller than ${mergedBreakpoints.tablet} and wider than ${mergedBreakpoints.mobile}`}
				onChange={() =>
					setAttributes({ hideOnTablet: !attributes.hideOnTablet })
				}
			/>
			<ToggleControl
				__nextHasNoMarginBottom
				label="Hide on Desktop"
				checked={attributes.hideOnDesktop}
				help={`Hidden on screens larger than ${mergedBreakpoints.desktop}`}
				onChange={() =>
					setAttributes({ hideOnDesktop: !attributes.hideOnDesktop })
				}
			/>
			<ToggleControl
				__nextHasNoMarginBottom
				label="Hide on Custom Breakpoint"
				checked={attributes.hideOnCustomBreakpoint}
				disabled={
					attributes.hideOnMobile ||
					attributes.hideOnTablet ||
					attributes.hideOnDesktop
				}
				onChange={() =>
					setAttributes({
						hideOnCustomBreakpoint: !attributes.hideOnCustomBreakpoint,
					})
				}
			/>

			{attributes.hideOnCustomBreakpoint && (
				<>
					<ToggleGroupControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						isBlock
						label="Hide..."
						onChange={(value) => setAttributes({ customDirection: value })}
						value={attributes.customDirection}
					>
						<ToggleGroupControlOption label="Under" value="under" />
						<ToggleGroupControlOption label="Over" value="over" />
						<ToggleGroupControlOption label="Between" value="between" />
					</ToggleGroupControl>

					<Flex>
						{(attributes.customDirection === "between" ||
							attributes.customDirection === "over") && (
							<FlexItem>
								<NumberControl
									__next40pxDefaultSize
									label={
										attributes.customDirection === "between"
											? "Min. Width"
											: "Value"
									}
									onChange={(value) => {
										setAttributes({ customMinWidth: parseInt(value) });
									}}
									suffix="px"
									max={
										attributes.customDirection === "between"
											? attributes.customMaxWidth
											: Infinity
									}
									value={attributes.customMinWidth}
								/>
							</FlexItem>
						)}

						{(attributes.customDirection === "between" ||
							attributes.customDirection === "under") && (
							<FlexItem>
								<NumberControl
									className="hbss-number-control"
									__next40pxDefaultSize
									label={
										attributes.customDirection === "between"
											? "Max. Width"
											: "Value"
									}
									suffix="px"
									onChange={(value) => {
										setAttributes({ customMaxWidth: parseInt(value) });
									}}
									value={attributes.customMaxWidth}
									min={
										attributes.customDirection === "between"
											? attributes.customMinWidth
											: 0
									}
								/>
							</FlexItem>
						)}
					</Flex>

					<div className="hbss-mqp">
						<input
							type="checkbox"
							className="hbss-mqp__toggle"
							id="hbss-mqp-toggle"
						/>

						<label className="hbss-mqp__button" htmlFor="hbss-mqp-toggle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 32 32"
							>
								<path d="M8 4v24l18-12z" />
							</svg>
							Show Media Query Preview
						</label>

						<pre className="hbss-mqp__pre">
							<code className="hbss-mqp__code">
								{(() => {
									const minWidth = attributes.customMinWidth;
									const maxWidth = attributes.customMaxWidth;

									// Only min-width is set (and it's greater than 0)
									if (minWidth > 0 && attributes.customDirection === "over") {
										return `@media (min-width: ${minWidth}px) { ... }`;
									}

									// Only max-width is set (and it's greater than 0)
									if (maxWidth > 0 && attributes.customDirection === "under") {
										return `@media (max-width: ${maxWidth}px) { ... }`;
									}

									// Both are set and min-width is less than max-width
									if (
										minWidth > 0 &&
										attributes.customDirection === "between" &&
										maxWidth > 0 &&
										minWidth < maxWidth
									) {
										return `@media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px) { ... }`;
									}

									if (minWidth > 0 && maxWidth > 0 && minWidth >= maxWidth) {
										return `Invalid: min-width (${minWidth}px) must be less than max-width (${maxWidth}px)`;
									}

									// No values set
									return "Enter width values to see media query preview";
								})()}
							</code>
						</pre>
					</div>
				</>
			)}

			{!breakpoints && (
				<Tip>
					Use custom breakpoints by defining them in your theme.json file.{" "}
					<ExternalLink href="https://github.com/Julian1729/hide-block-screen-size?tab=readme-ov-file#theme-integration-link">
						See Documentation
					</ExternalLink>
				</Tip>
			)}
		</InspectorAdvancedControls>
	);
}

addFilter(
	"editor.BlockEdit",
	"conditional-block-hide/filter-block-attributes-s",
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			if (!supportedBlocks.includes(props.name)) {
				return <BlockEdit {...props} />;
			}
			return (
				<>
					<BlockEdit {...props} />
					<Edit {...props} />
				</>
			);
		};
	}),
);
