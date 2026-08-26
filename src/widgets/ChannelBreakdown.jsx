import { __ } from '@wordpress/i18n';

import { formatAmount } from '../utils/format';

/**
 * Acquisition / attribution breakdown. Sources derive from
 * donations.source_attribution.utm_source; unknown values map to "direct".
 */
// Channel palette keyed to bucket ids from CampaignMetricsService::classifyChannel.
const CHANNEL_COLORS = [ '#6f5ce6', '#b08a12', '#1f7fb8', '#c25050', '#0a9bab', '#9a3fb0', '#619c22', '#c2417e', '#7278cf' ];

const CHANNEL_LABELS = {
    email:         __( 'Email', 'giveflow-fundraising-campaigns' ),
    direct:        __( 'Direct', 'giveflow-fundraising-campaigns' ),
    social:        __( 'Organic social', 'giveflow-fundraising-campaigns' ),
    'paid-social': __( 'Paid social', 'giveflow-fundraising-campaigns' ),
    organic:       __( 'Organic search', 'giveflow-fundraising-campaigns' ),
    cpc:           __( 'Paid search', 'giveflow-fundraising-campaigns' ),
    referral:      __( 'Referral', 'giveflow-fundraising-campaigns' ),
    qr:            __( 'QR / In-person', 'giveflow-fundraising-campaigns' ),
    peer:          __( 'Peer-to-peer', 'giveflow-fundraising-campaigns' ),
};

export default function ChannelBreakdown( { rows = [], currency } ) {
    const total = rows.reduce( ( s, r ) => s + r.amount_cents, 0 );

    if ( rows.length === 0 || total === 0 ) {
        return (
            <p className="giveflow-panel__empty">
                { __( 'No donations yet. Channels appear once attribution flows through.', 'giveflow-fundraising-campaigns' ) }
            </p>
        );
    }

    const label = ( ch ) => CHANNEL_LABELS[ ch ] || ch.charAt( 0 ).toUpperCase() + ch.slice( 1 );

    return (
        <div className="giveflow-gateway">
            <div className="giveflow-stackbar">
                { rows.map( ( r, i ) => {
                    const pct = total > 0 ? ( r.amount_cents / total ) * 100 : 0;
                    return (
                        <div
                            key={ r.channel }
                            className="giveflow-stackbar__seg"
                            style={ { width: `${ pct }%`, background: CHANNEL_COLORS[ i % CHANNEL_COLORS.length ] } }
                            title={ `${ label( r.channel ) }: ${ formatAmount( r.amount_cents, currency ) }` }
                        />
                    );
                } ) }
            </div>
            <ul className="giveflow-gateway__legend">
                { rows.map( ( r, i ) => {
                    const pct = total > 0 ? Math.round( ( r.amount_cents / total ) * 100 ) : 0;
                    return (
                        <li key={ r.channel }>
                            <span className="giveflow-gateway__dot" style={ { background: CHANNEL_COLORS[ i % CHANNEL_COLORS.length ] } } />
                            <span className="giveflow-gateway__label">{ label( r.channel ) }</span>
                            <span className="giveflow-gateway__value">{ formatAmount( r.amount_cents, currency ) }</span>
                            <span className="giveflow-gateway__pct">{ pct }%</span>
                        </li>
                    );
                } ) }
            </ul>
        </div>
    );
}
