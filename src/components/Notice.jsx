/**
 * Token-styled inline notice. Drop-in for @wordpress/components Notice:
 * accepts status, onRemove, isDismissible, children.
 *
 * `compact` is for feedback that belongs to the field or row above it: a key
 * that failed its check, a setting that is half filled in. The default is an
 * announcement, and dressing a line of guidance as one makes a panel read as a
 * stack of warnings about nothing.
 */

import { __ } from '@wordpress/i18n';

const STATUSES = [ 'success', 'error', 'warning', 'info' ];

export default function Notice( { status = 'info', compact = false, onRemove, isDismissible = true, children } ) {
    const s = STATUSES.includes( status ) ? status : 'info';
    return (
        <div
            className={ `fundkit-notice fundkit-notice--${ s }${ compact ? ' fundkit-notice--compact' : '' }` }
            role={ s === 'error' || s === 'warning' ? 'alert' : 'status' }
        >
            <div className="fundkit-notice__body">{ children }</div>
            { isDismissible && onRemove && (
                <button
                    type="button"
                    className="fundkit-notice__close"
                    aria-label={ __( 'Dismiss', 'fundkit-fundraising-campaigns' ) }
                    onClick={ onRemove }
                >
                    ×
                </button>
            ) }
        </div>
    );
}
