/**
 * BoxControl: connected-row T/R/B/L (or T/B) numeric editor.
 *
 * A single rounded container of joined cells. Each cell has an uppercase side
 * label above the number and a small interior tick on the edge it controls.
 * Optional link toggle in the header syncs every side to whatever the user
 * types next.
 *
 *   <BoxControl
 *       title="Padding"
 *       value={ padding }
 *       onChange={ setPadding }
 *       sides="four"     // "four" | "two"
 *       unit="PX"
 *       linkable
 *   />
 */

import { useState } from '@wordpress/element';
import { Link as LinkIcon } from 'lucide-react';

const SIDES_FOUR = [ 'top', 'right', 'bottom', 'left' ];
const SIDES_TWO  = [ 'top', 'bottom' ];

export default function BoxControl( {
    title,
    value = {},
    onChange,
    sides = 'four',
    unit,
    linkable = false,
    min = 0,
    max = 200,
} ) {
    const sideList = sides === 'two' ? SIDES_TWO : SIDES_FOUR;
    const [ linked, setLinked ] = useState( false );

    const setSide = ( side, raw ) => {
        const n = Number( raw ) || 0;
        onChange( { ...value, [ side ]: n } );
    };

    const setAll = ( raw ) => {
        const n = Number( raw ) || 0;
        onChange( Object.fromEntries( sideList.map( ( s ) => [ s, n ] ) ) );
    };

    const toggleLink = () => {
        if ( ! linked ) {
            // Sync all sides to top before entering linked mode.
            setAll( value.top || 0 );
        }
        setLinked( ! linked );
    };

    const linkedValue = Number( value.top ) || 0;

    return (
        <div className="fundkit-box-control">
            { ( title || linkable ) && (
                <div className="fundkit-box-control__header">
                    { title && <span className="fundkit-box-control__title">{ title }</span> }
                    { linkable && (
                        <button
                            type="button"
                            className={ `fundkit-box-control__link ${ linked ? 'is-on' : '' }` }
                            aria-pressed={ linked }
                            aria-label={ linked ? 'Sides linked' : 'Link sides' }
                            onClick={ toggleLink }
                        >
                            <LinkIcon size={ 14 } strokeWidth={ 2 } />
                        </button>
                    ) }
                </div>
            ) }
            { linked ? (
                <div className="fundkit-box-control__linked">
                    <input
                        type="range"
                        className="fundkit-box-control__range"
                        min={ min }
                        max={ max }
                        value={ linkedValue }
                        onChange={ ( e ) => setAll( e.target.value ) }
                    />
                    <div className="fundkit-box-control__linked-num">
                        <input
                            type="number"
                            className="fundkit-box-control__input"
                            min={ min }
                            max={ max }
                            value={ linkedValue }
                            onChange={ ( e ) => setAll( e.target.value ) }
                        />
                    </div>
                    { unit && <div className="fundkit-box-control__unit">{ unit }</div> }
                </div>
            ) : (
                <div
                    className="fundkit-box-control__row"
                    style={ { '--fundkit-box-cells': sideList.length } }
                >
                    { sideList.map( ( side ) => (
                        <label
                            key={ side }
                            className={ `fundkit-box-control__cell fundkit-box-control__cell--${ side }` }
                        >
                            <span className="fundkit-box-control__label">{ side }</span>
                            <input
                                type="number"
                                className="fundkit-box-control__input"
                                min={ min }
                                max={ max }
                                value={ value[ side ] || 0 }
                                onChange={ ( e ) => setSide( side, e.target.value ) }
                            />
                        </label>
                    ) ) }
                    { unit && <div className="fundkit-box-control__unit">{ unit }</div> }
                </div>
            ) }
        </div>
    );
}
