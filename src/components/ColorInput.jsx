/**
 * Shared color input. Renders a swatch + hex label that opens the WP
 * ColorPicker in a popover when clicked.
 */

import { ColorPicker, Dropdown } from '@wordpress/components';

export default function ColorInput( { value, onChange, label } ) {
    const current = String( value || '' );

    return (
        <Dropdown
            contentClassName="fundkit-color-picker-popover"
            popoverProps={ { placement: 'bottom-start' } }
            renderToggle={ ( { isOpen, onToggle } ) => (
                <button
                    type="button"
                    className="fundkit-color"
                    onClick={ onToggle }
                    aria-expanded={ isOpen }
                    aria-label={ label || current || 'Pick a color' }
                >
                    <span
                        className="fundkit-color__swatch"
                        style={ { background: current || 'transparent' } }
                        aria-hidden="true"
                    />
                    { current && (
                        <span className="fundkit-color__hex">
                            { current.toUpperCase() }
                        </span>
                    ) }
                </button>
            ) }
            renderContent={ () => (
                <ColorPicker
                    color={ current }
                    onChange={ ( next ) => onChange( normalizeColor( next ) ) }
                    enableAlpha={ false }
                    copyFormat="hex"
                />
            ) }
        />
    );
}

// Normalize ColorPicker onChange to a hex string (WP versions differ in payload shape).
function normalizeColor( v ) {
    if ( typeof v === 'string' ) return v;
    if ( v && typeof v === 'object' ) {
        if ( typeof v.hex === 'string' ) return v.hex;
        if ( v.color && typeof v.color === 'object' && typeof v.color.toHexString === 'function' ) {
            return v.color.toHexString();
        }
    }
    return '';
}
