/**
 * Full token-map editor. Renders tokens grouped into collapsible panels;
 * each shows the effective value (override or default) with a Reset link.
 *
 * Pure / prop-driven: pass `catalogue`, `groups`, and `defaults` explicitly.
 * The Dono plugin sources these from window.dono.styling and passes them in.
 */

import { PanelBody, RangeControl, SelectControl, TextControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ColorInput from '../components/ColorInput';

export default function TokenEditor( {
    value = {},
    defaults = {},
    onChange,
    catalogue = {},
    groups = {},
} ) {
    const byGroup = {};
    for ( const [ key, def ] of Object.entries( catalogue ) ) {
        const g = def.group || 'other';
        ( byGroup[ g ] ||= [] ).push( { key, def } );
    }

    const orderedGroups = Object.keys( groups ).filter( ( g ) => byGroup[ g ]?.length );
    for ( const g of Object.keys( byGroup ) ) {
        if ( ! orderedGroups.includes( g ) ) orderedGroups.push( g );
    }

    const setToken = ( key, next ) => {
        const out = { ...value };
        if ( next === '' || next == null || next === defaults[ key ] ) {
            delete out[ key ];
        } else {
            out[ key ] = String( next );
        }
        onChange( out );
    };

    const resetToken = ( key ) => {
        const out = { ...value };
        delete out[ key ];
        onChange( out );
    };

    return (
        <div className="dono-token-editor">
            { orderedGroups.map( ( g, gi ) => (
                <PanelBody
                    key={ g }
                    title={ groups[ g ] || g }
                    initialOpen={ gi === 0 }
                >
                    { byGroup[ g ].map( ( { key, def } ) => (
                        <TokenRow
                            key={ key }
                            tokenKey={ key }
                            def={ def }
                            current={ value[ key ] ?? defaults[ key ] ?? '' }
                            isOverridden={ value[ key ] !== undefined }
                            onChange={ ( v ) => setToken( key, v ) }
                            onReset={ () => resetToken( key ) }
                        />
                    ) ) }
                </PanelBody>
            ) ) }
        </div>
    );
}

function TokenRow( { tokenKey, def, current, isOverridden, onChange, onReset } ) {
    const label = def.label || tokenKey;
    return (
        <div className="dono-token-editor__row">
            <div className="dono-token-editor__row-head">
                <span className="dono-token-editor__label">{ label }</span>
                { isOverridden && (
                    <Button
                        variant="link"
                        size="small"
                        className="dono-token-editor__reset"
                        onClick={ onReset }
                    >
                        { __( 'Reset', 'dono' ) }
                    </Button>
                ) }
            </div>
            <TokenControl
                tokenKey={ tokenKey }
                def={ def }
                value={ current }
                onChange={ onChange }
            />
            { def.help && <p className="dono-token-editor__help">{ def.help }</p> }
        </div>
    );
}

function TokenControl( { def, value, onChange } ) {
    switch ( def.control ) {
        case 'color':
            return <ColorInput value={ value } onChange={ onChange } />;

        case 'range': {
            const numeric = parsePixels( value );
            return (
                <RangeControl
                    value={ numeric }
                    onChange={ ( v ) => onChange( `${ v ?? 0 }px` ) }
                    min={ def.min ?? 0 }
                    max={ def.max ?? 32 }
                    step={ def.step ?? 1 }
                    __nextHasNoMarginBottom
                    __next40pxDefaultSize
                />
            );
        }

        case 'select': {
            const options = Object.entries( def.options || {} ).map( ( [ v, label ] ) => ( {
                value: v,
                label,
            } ) );
            return (
                <SelectControl
                    value={ value }
                    options={ options }
                    onChange={ onChange }
                    __nextHasNoMarginBottom
                    __next40pxDefaultSize
                />
            );
        }

        case 'font':
            return (
                <TextControl
                    value={ value }
                    onChange={ onChange }
                    placeholder={ def.default || '' }
                    help={ __( 'CSS font-family stack. e.g. Inter, system-ui, sans-serif.', 'dono' ) }
                    __nextHasNoMarginBottom
                    __next40pxDefaultSize
                />
            );

        default:
            return (
                <TextControl
                    value={ value }
                    onChange={ onChange }
                    __nextHasNoMarginBottom
                    __next40pxDefaultSize
                />
            );
    }
}

function parsePixels( v ) {
    const n = parseFloat( String( v ).replace( /[^0-9.-]/g, '' ) );
    return Number.isFinite( n ) ? n : 0;
}
