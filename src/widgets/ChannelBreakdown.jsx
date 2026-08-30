import { __ } from '@wordpress/i18n';

import { formatAmount } from '../utils/format';

/**
 * Acquisition / attribution breakdown. Sources derive from
 * donations.source_attribution.utm_source; unknown values map to "direct".
 */
// Channel palette keyed to bucket ids from CampaignMetricsService::classifyChannel.
const CHANNEL_COLORS = [ '#6f5ce6', '#b08a12', '#1f7fb8', '#c25050', '#0a9bab', '#9a3fb0', '#619c22', '#c2417e', '#7278cf' ];

const CHANNEL_LABELS = {
    email:         __( 'Email', 'fundkit-fundraising-campaigns' ),
    direct:        __( 'Direct', 'fundkit-fundraising-campaigns' ),
    social:        __( 'Organic social', 'fundkit-fundraising-campaigns' ),
    'paid-social': __( 'Paid social', 'fundkit-fundraising-campaigns' ),
    organic:       __( 'Organic search', 'fundkit-fundraising-campaigns' ),
    cpc:           __( 'Paid search', 'fundkit-fundraising-campaigns' ),
    referral:      __( 'Referral', 'fundkit-fundraising-campaigns' ),
    qr:            __( 'QR / In-person', 'fundkit-fundraising-campaigns' ),
    peer:          __( 'Peer-to-peer', 'fundkit-fundraising-campaigns' ),
};

export default function ChannelBreakdown( { rows = [], currency } ) {
    const total = rows.reduce( ( s, r ) => s + r.amount_cents, 0 );

    if ( rows.length === 0 || total === 0 ) {
        return (
            <p className="fundkit-panel__empty">
                { __( 'No donations yet. Channels appear once attribution flows through.', 'fundkit-fundraising-campaigns' ) }
            </p>
        );
    }

    const label = ( ch ) => CHANNEL_LABELS[ ch ] || ch.charAt( 0 ).toUpperCase() + ch.slice( 1 );

    return (
        <div className="fundkit-gateway">
            <div className="fundkit-stackbar">
                { rows.map( ( r, i ) => {
                    const pct = total > 0 ? ( r.amount_cents / total ) * 100 : 0;
                    return (
                        <div
                            key={ r.channel }
                            className="fundkit-stackbar__seg"
                            style={ { width: `${ pct }%`, background: CHANNEL_COLORS[ i % CHANNEL_COLORS.length ] } }
                            title={ `${ label( r.channel ) }: ${ formatAmount( r.amount_cents, currency ) }` }
                        />
                    );
                } ) }
            </div>
            <ul className="fundkit-gateway__legend">
                { rows.map( ( r, i ) => {
                    const pct = total > 0 ? Math.round( ( r.amount_cents / total ) * 100 ) : 0;
                    return (
                        <li key={ r.channel }>
                            <span className="fundkit-gateway__dot" style={ { background: CHANNEL_COLORS[ i % CHANNEL_COLORS.length ] } } />
                            <span className="fundkit-gateway__label">{ label( r.channel ) }</span>
                            <span className="fundkit-gateway__value">{ formatAmount( r.amount_cents, currency ) }</span>
                            <span className="fundkit-gateway__pct">{ pct }%</span>
                        </li>
                    );
                } ) }
            </ul>
        </div>
    );
}
