/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable react/jsx-key */
/* eslint-disable padded-blocks */
/* eslint-disable no-console */
/* eslint-disable func-call-spacing */
/* eslint-disable semi */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable space-in-parens */
/**
 * BLOCK: yellow-button
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, InspectorControls, ColorPalette } = wp.editor;
const { PanelBody } = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('cgb/block-yellow-button', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Yellow Button'), // Block title.
	icon: 'button', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('yellow-button — CGB Block'),
		__('CGB Example'),
		__('create-guten-block'),
	],
	attributes: {
		outline: {
			type: 'object',
		},
		style: {
			type: 'string',
		},
		url: {
			type: 'string',
		},
		name: {
			type: 'string',
		},

	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: (props) => {
		const { attributes, setAttributes } = props;
		const updateName = (event) => {
			setAttributes({ name: event.target.value });
		}

		const addURL = (event) => {
			setAttributes({ url: event.target.value });

		}

		const changeStyle = (event) => {
			if (event.target.value === 'outline') {
				setAttributes({
					outline: {
						backgroundColor: 'white',
						borderColor: '#f9cd45',
						color: '#f9cd45',
						boxShadow: 'none',
						border: 'solid',
						borderWidth: '1px',
					},
					style: event.target.value,
				})
			}
			else if (event.target.value === 'white') {
				setAttributes({
					outline: {
						backgroundColor: '#f7f7f7',
						color: 'black',
					},
					style: event.target.value,
				})
			}
			else {
				setAttributes({
					outline: {
					},
					style: event.target.value,
				})

			}
		}
		return ([
			<InspectorControls style={{ marginBottom: '40px' }}>
				<PanelBody title={'Edit Properties'}>
					<p>Enter the URL here:</p>

					<input name="enter-url" value={attributes.url} onChange={addURL} />

					<p><br />Select a Style</p>
					<select id="style" onChange={changeStyle} value={attributes.style}>
						<option value="yellow">Yellow</option>
						<option value="outline">Outlined</option>
						<option value="white">White</option>
					</select>

				</PanelBody>

			</InspectorControls>,
			<div className={props.className}>
				<input name="button-name" value={attributes.name} onChange={updateName} style={attributes.outline} />
			</div>,
		]

		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: (props) => {
		const { attributes } = props;
		return (
			<div >
				<a href={attributes.url} style={attributes.outline} >{attributes.name}</a>
			</div>

		);
	},
});
