/**
 * Collapsible: inspector section with an expand/collapse header.
 *
 * Use directly inside a block <InspectorControls> to group fields under a
 * title that opens and closes. Lightweight alternative to WP's PanelBody so
 * inspector chrome stays in our type scale.
 *
 * Controlled: pass `open` + `onToggle`.
 * Uncontrolled: omit them and pass `initialOpen` to seed the first state.
 *
 *   <Collapsible title="Background">
 *       <Field ...>...</Field>
 *   </Collapsible>
 */

import { useState, useId } from '@wordpress/element';
import { ChevronDown } from 'lucide-react';

export default function Collapsible( {
    title,
    initialOpen = true,
    open: controlledOpen,
    onToggle,
    children,
} ) {
    const id = useId();
    const isControlled = controlledOpen !== undefined;
    const [ uncontrolled, setUncontrolled ] = useState( !! initialOpen );
    const isOpen = isControlled ? !! controlledOpen : uncontrolled;

    const handleToggle = () => {
        if ( isControlled ) onToggle && onToggle( ! isOpen );
        else setUncontrolled( ( v ) => ! v );
    };

    const headerId = `giveflow-collapsible-${ id }-header`;
    const bodyId   = `giveflow-collapsible-${ id }-body`;

    return (
        <section className={ `giveflow-collapsible ${ isOpen ? 'is-open' : 'is-closed' }` }>
            <button
                type="button"
                className="giveflow-collapsible__header"
                id={ headerId }
                aria-expanded={ isOpen }
                aria-controls={ bodyId }
                onClick={ handleToggle }
            >
                <span className="giveflow-collapsible__title">{ title }</span>
                <ChevronDown
                    size={ 14 }
                    strokeWidth={ 2 }
                    className="giveflow-collapsible__chevron"
                    aria-hidden="true"
                />
            </button>
            { isOpen && (
                <div
                    className="giveflow-collapsible__body"
                    id={ bodyId }
                    role="region"
                    aria-labelledby={ headerId }
                >
                    { children }
                </div>
            ) }
        </section>
    );
}
