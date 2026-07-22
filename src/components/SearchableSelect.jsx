/**
 * SearchableSelect: text input + dropdown of filtered options.
 *
 *   <SearchableSelect
 *       value={ code }
 *       onChange={ ( code ) => ... }
 *       options={ [{ value, label, hint? }, ...] }
 *       placeholder="Search…"
 *       formatSelected={ ( opt ) => opt.label }   // optional
 *       limit={ 50 }                              // optional, default 50
 *   />
 *
 * The dropdown only renders when the input is focused; clicking an option
 * fires onChange with the option's `value`. Filter matches against label and
 * optional `hint` (case-insensitive substring).
 */

import { useEffect, useMemo, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

export default function SearchableSelect( {
    value,
    onChange,
    options = [],
    placeholder = '',
    formatSelected,
    limit = 50,
    disabled = false,
    className = '',
} ) {
    const selected = useMemo(
        () => options.find( ( o ) => o.value === value ) || null,
        [ options, value ]
    );

    const selectedLabel = selected
        ? ( formatSelected ? formatSelected( selected ) : selected.label )
        : '';

    // `query` is decoupled from the selected label so free typing works while open.
    const [ query, setQuery ] = useState( '' );
    const [ open,  setOpen ]  = useState( false );
    const [ active, setActive ] = useState( 0 );

    const wrapRef  = useRef( null );
    const inputRef = useRef( null );

    // Close on outside mousedown; wrap-level onMouseDown prevents list clicks from reaching this.
    useEffect( () => {
        if ( ! open ) return;
        const onDocClick = ( e ) => {
            if ( wrapRef.current && ! wrapRef.current.contains( e.target ) ) {
                setOpen( false );
            }
        };
        document.addEventListener( 'mousedown', onDocClick );
        return () => document.removeEventListener( 'mousedown', onDocClick );
    }, [ open ] );

    const matches = useMemo( () => {
        const q = query.trim().toLowerCase();
        if ( q === '' ) return options.slice( 0, limit );
        return options.filter( ( o ) => {
            const hay = `${ o.label || '' } ${ o.hint || '' }`.toLowerCase();
            return hay.includes( q );
        } ).slice( 0, limit );
    }, [ options, query, limit ] );

    useEffect( () => { setActive( 0 ); }, [ query ] );

    const pick = ( opt ) => {
        onChange && onChange( opt.value, opt );
        setQuery( '' );
        setOpen( false );
    };

    const onKeyDown = ( e ) => {
        if ( ! open ) return;
        if ( e.key === 'ArrowDown' ) {
            e.preventDefault();
            setActive( ( i ) => Math.min( matches.length - 1, i + 1 ) );
        } else if ( e.key === 'ArrowUp' ) {
            e.preventDefault();
            setActive( ( i ) => Math.max( 0, i - 1 ) );
        } else if ( e.key === 'Enter' ) {
            e.preventDefault();
            if ( matches[ active ] ) pick( matches[ active ] );
        } else if ( e.key === 'Escape' ) {
            setOpen( false );
            setQuery( '' );
        }
    };

    return (
        <div
            ref={ wrapRef }
            className={ `dono-searchable${ open ? ' is-open' : '' }${ disabled ? ' is-disabled' : '' } ${ className }`.trim() }
            // Prevent focus from leaving the input when clicking list items.
            onMouseDown={ ( e ) => {
                if ( inputRef.current && ! inputRef.current.contains( e.target ) ) {
                    e.preventDefault();
                }
            } }
        >
            <input
                ref={ inputRef }
                type="text"
                className="dono-searchable__input"
                value={ open ? query : selectedLabel }
                placeholder={ open ? ( placeholder || __( 'Search…', 'dono' ) ) : ( selectedLabel || placeholder || __( 'Search…', 'dono' ) ) }
                disabled={ disabled }
                onFocus={ () => { setOpen( true ); setQuery( '' ); } }
                onChange={ ( e ) => { setQuery( e.target.value ); if ( ! open ) setOpen( true ); } }
                onKeyDown={ onKeyDown }
                aria-autocomplete="list"
                aria-expanded={ open }
                role="combobox"
            />
            <span className="dono-searchable__chevron" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 4 L5 7 L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>

            { open && matches.length > 0 && (
                <ul className="dono-searchable__list" role="listbox">
                    { matches.map( ( opt, i ) => (
                        <li
                            key={ opt.value }
                            role="option"
                            aria-selected={ i === active }
                            className={ `dono-searchable__option${ i === active ? ' is-active' : '' }${ opt.value === value ? ' is-current' : '' }` }
                            onMouseEnter={ () => setActive( i ) }
                            onClick={ () => pick( opt ) }
                        >
                            <span className="dono-searchable__label">{ opt.label }</span>
                            { opt.hint && (
                                <span className="dono-searchable__hint">{ opt.hint }</span>
                            ) }
                        </li>
                    ) ) }
                </ul>
            ) }
        </div>
    );
}
