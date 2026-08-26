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
            className={ `giveflow-notice giveflow-notice--${ s }` }
            role={ s === 'error' || s === 'warning' ? 'alert' : 'status' }
        >
            <div className="giveflow-notice__body">{ children }</div>
            { isDismissible && onRemove && (
                <button
                    type="button"
                    className="giveflow-notice__close"
                    aria-label={ __( 'Dismiss', 'giveflow-fundraising-campaigns' ) }
                    onClick={ onRemove }
                >
                    ×
                </button>
            ) }
        </div>
    );
}
