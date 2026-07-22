import { __ } from '@wordpress/i18n';

import { formatAmount } from '../utils/format';

/**
 * Acquisition / attribution breakdown. Sources derive from
 * donations.source_attribution.utm_source; unknown values map to "direct".
 */
// Channel palette keyed to bucket ids from CampaignMetricsService::classifyChannel.
const CHANNEL_COLORS = [ '#1e8a4e', '#2271b1', '#856a1d', '#7c2222', '#5b21b6', '#0891b2', '#be185d', '#65a30d', '#9ca3af' ];

const CHANNEL_LABELS = {
    email:         __( 'Email', 'dono' ),
    direct:        __( 'Direct', 'dono' ),
    social:        __( 'Organic social', 'dono' ),
    'paid-social': __( 'Paid social', 'dono' ),
    organic:       __( 'Organic search', 'dono' ),
    cpc:           __( 'Paid search', 'dono' ),
    referral:      __( 'Referral', 'dono' ),
    qr:            __( 'QR / In-person', 'dono' ),
    peer:          __( 'Peer-to-peer', 'dono' ),
};

export default function ChannelBreakdown( { rows = [], currency } ) {
    const total = rows.reduce( ( s, r ) => s + r.amount_cents, 0 );

    if ( rows.length === 0 || total === 0 ) {
        return (
            <p className="dono-panel__empty">
                { __( 'No donations yet. Channels appear once attribution flows through.', 'dono' ) }
            </p>
        );
    }

    const label = ( ch ) => CHANNEL_LABELS[ ch ] || ch.charAt( 0 ).toUpperCase() + ch.slice( 1 );

    return (
        <div className="dono-gateway">
            <div className="dono-stackbar">
                { rows.map( ( r, i ) => {
                    const pct = total > 0 ? ( r.amount_cents / total ) * 100 : 0;
                    return (
                        <div
                            key={ r.channel }
                            className="dono-stackbar__seg"
                            style={ { width: `${ pct }%`, background: CHANNEL_COLORS[ i % CHANNEL_COLORS.length ] } }
                            title={ `${ label( r.channel ) }: ${ formatAmount( r.amount_cents, currency ) }` }
                        />
                    );
                } ) }
            </div>
            <ul className="dono-gateway__legend">
                { rows.map( ( r, i ) => {
                    const pct = total > 0 ? Math.round( ( r.amount_cents / total ) * 100 ) : 0;
                    return (
                        <li key={ r.channel }>
                            <span className="dono-gateway__dot" style={ { background: CHANNEL_COLORS[ i % CHANNEL_COLORS.length ] } } />
                            <span className="dono-gateway__label">{ label( r.channel ) }</span>
                            <span className="dono-gateway__value">{ formatAmount( r.amount_cents, currency ) }</span>
                            <span className="dono-gateway__pct">{ pct }%</span>
                        </li>
                    );
                } ) }
            </ul>
        </div>
    );
}
