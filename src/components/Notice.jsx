/**
 * Token-styled inline notice. Drop-in for @wordpress/components Notice:
 * accepts status, onRemove, isDismissible, children.
 */

import { __ } from '@wordpress/i18n';

const STATUSES = [ 'success', 'error', 'warning', 'info' ];

export default function Notice( { status = 'info', onRemove, isDismissible = true, children } ) {
    const s = STATUSES.includes( status ) ? status : 'info';
    return (
        <div
            className={ `fundkit-notice fundkit-notice--${ s }` }
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
