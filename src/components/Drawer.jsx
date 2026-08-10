/**
 * Slide-over panel anchored to the right edge. Chrome only - callers supply
 * body (children) and footer actions.
 *
 * Props:
 *   title    string  - heading (left of head)
 *   sub      node     - small muted line under the title (optional)
 *   onClose  fn       - overlay click, the close button and Escape call this
 *   foot     node     - rendered in .dono-drawer__foot (optional)
 *   children node     - body content
 */
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

export default function Drawer( { title, sub, onClose, foot, children } ) {
    useEffect( () => {
        const onKey = ( e ) => { if ( e.key === 'Escape' && onClose ) onClose(); };
        document.addEventListener( 'keydown', onKey );
        return () => document.removeEventListener( 'keydown', onKey );
    }, [ onClose ] );

    return (
        // The overlay is backdrop chrome, so it takes a presentation role and
        // closes only on a click that landed on itself. Keyboard users close
        // with Escape, handled above.
        <div
            className="dono-drawer-overlay"
            role="presentation"
            onClick={ ( e ) => { if ( e.target === e.currentTarget && onClose ) onClose(); } }
        >
            <aside
                className="dono-drawer"
                role="dialog"
                aria-label={ title }
            >
                <div className="dono-drawer__head">
                    <div>
                        <h2>{ title }</h2>
                        { sub && <p>{ sub }</p> }
                    </div>
                    <button
                        type="button"
                        className="dono-drawer__close"
                        onClick={ onClose }
                        aria-label={ __( 'Close', 'dono' ) }
                    >
                        ✕
                    </button>
                </div>

                <div className="dono-drawer__body">{ children }</div>

                { foot && <div className="dono-drawer__foot">{ foot }</div> }
            </aside>
        </div>
    );
}
