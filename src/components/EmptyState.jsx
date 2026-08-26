/**
 * Reusable empty-state block. Use anywhere a list / panel has nothing to
 * show yet. Avoids the bare "No X yet." text that several panels still use.
 *
 * Props:
 *   - icon:    React element (typically a lucide icon, sized 24).
 *   - title:   Short headline; what the user is missing.
 *   - body:    Helper text; what causes data to appear here.
 *   - action:  Optional React element (Btn, link, etc.) shown below the body.
 *   - compact: Slimmer vertical padding for tight panels.
 */
export default function EmptyState( { icon, title, body, action, compact = false } ) {
    return (
        <div
            className={ `giveflow-empty-state${ compact ? ' giveflow-empty-state--compact' : '' }` }
            role="status"
        >
            { icon && (
                <span className="giveflow-empty-state__icon" aria-hidden="true">
                    { icon }
                </span>
            ) }
            { title && <div className="giveflow-empty-state__title">{ title }</div> }
            { body && <div className="giveflow-empty-state__body">{ body }</div> }
            { action && <div className="giveflow-empty-state__action">{ action }</div> }
        </div>
    );
}
