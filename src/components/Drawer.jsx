/**
 * Slide-over panel anchored to the right edge. Chrome only - callers supply
 * body (children) and footer actions.
 *
 * Props:
 *   title    string  - heading (left of head)
 *   sub      node     - small muted line under the title (optional)
 *   onClose  fn       - overlay click, the close button and Escape call this
 *   foot     node     - rendered in .fundkit-drawer__foot (optional)
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
            className="fundkit-drawer-overlay"
            role="presentation"
            onClick={ ( e ) => { if ( e.target === e.currentTarget && onClose ) onClose(); } }
        >
            <aside
                className="fundkit-drawer"
                role="dialog"
                aria-label={ title }
            >
                <div className="fundkit-drawer__head">
                    <div>
                        <h2>{ title }</h2>
                        { sub && <p>{ sub }</p> }
                    </div>
                    <button
                        type="button"
                        className="fundkit-drawer__close"
                        onClick={ onClose }
                        aria-label={ __( 'Close', 'fundkit-fundraising-campaigns' ) }
                    >
                        ✕
                    </button>
                </div>

                <div className="fundkit-drawer__body">{ children }</div>

                { foot && <div className="fundkit-drawer__foot">{ foot }</div> }
            </aside>
        </div>
    );
}
