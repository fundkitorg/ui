/**
 * Live campaign-page preview with the current token map applied.
 * Tokens become inline CSS custom properties; changes are instant.
 *
 * Effective map = defaults + org-brand preset (unless layer='brand') + tokens.
 */

import { __ } from '@wordpress/i18n';
import { formatAmount, parseTimestamp } from '../utils/format';

const SAMPLE_CAMPAIGN = {
    title:        'Bring clean water to 1,000 villages',
    description:  'Every donation funds a new well, reaching a family of six within a week. Together we can give whole villages safe water for the first time.',
    currency:     'USD',
    goal_cents:   5000000,
    raised_cents: 3050000,
    donors_count: 248,
    slug:         'clean-water',
    image_url:    null,
    ends_at:      null,
};

export default function StylePreview( {
    tokens   = {},
    presetId = '',
    campaign = null,
    layer    = 'campaign',
    styling  = {},
} ) {
    const effective = resolveEffectiveTokens( { tokens, presetId, layer, styling } );
    const data      = campaign && campaign.id ? campaign : SAMPLE_CAMPAIGN;

    const title       = data.title       || SAMPLE_CAMPAIGN.title;
    const description = data.description || SAMPLE_CAMPAIGN.description;
    const currency    = data.currency    || SAMPLE_CAMPAIGN.currency;
    const goalCents   = Number( data.goal_cents )   || 0;
    const raisedCents = Number( data.raised_cents ) || 0;
    const donors      = Number( data.donors_count ) || 0;
    const imageUrl    = data.image_url || null;
    const slug        = data.slug      || SAMPLE_CAMPAIGN.slug;
    const endsAt      = data.ends_at   || null;

    const pct = goalCents > 0
        ? Math.min( 100, Math.round( ( raisedCents / goalCents ) * 100 ) )
        : 0;

    const presets     = derivePresets( goalCents );
    const selectedIdx = 1;

    const host = ( typeof window !== 'undefined' && window.location?.host ) || 'example.com';
    const addr = `${ host }/campaigns/${ slug }`;

    return (
        <div className="dono-style-preview">
            <div className="dono-style-preview__frame" style={ tokensToStyle( effective ) }>
                <div className="dono-style-preview__chrome">
                    <span className="dono-style-preview__dots" aria-hidden="true">
                        <span /><span /><span />
                    </span>
                    <span className="dono-style-preview__addr">{ addr }</span>
                </div>

                <div className="dono-style-preview__page">
                    <div
                        className="dono-style-preview__hero"
                        style={ imageUrl ? { backgroundImage: `url(${ imageUrl })` } : undefined }
                    >
                        <div className="dono-style-preview__hero-title">{ title }</div>
                    </div>

                    <div className="dono-style-preview__body">
                        { description && (
                            <div className="dono-style-preview__desc">{ description }</div>
                        ) }

                        <div className="dono-style-preview__progress-track">
                            <div
                                className="dono-style-preview__progress-fill"
                                style={ { width: `${ pct }%` } }
                            />
                        </div>
                        <div className="dono-style-preview__progress-meta">
                            <span>
                                <strong>{ formatAmount( raisedCents, currency ) }</strong>
                                { ' ' }{ __( 'raised', 'dono' ) }
                            </span>
                            { goalCents > 0 && (
                                <span>
                                    { __( 'of', 'dono' ) }{ ' ' }
                                    { formatAmount( goalCents, currency ) }{ ' ' }
                                    { __( 'goal', 'dono' ) }
                                </span>
                            ) }
                        </div>

                        <div className="dono-style-preview__amounts">
                            { presets.map( ( a, i ) => (
                                <div
                                    key={ i }
                                    className={ `dono-style-preview__amount${ i === selectedIdx ? ' is-sel' : '' }` }
                                >
                                    { formatAmount( a, currency ) }
                                </div>
                            ) ) }
                        </div>

                        <div className="dono-style-preview__cta">
                            { __( 'Donate', 'dono' ) }{ ' ' }
                            { formatAmount( presets[ selectedIdx ], currency ) }
                        </div>

                        <div className="dono-style-preview__meta">
                            { donors > 0
                                ? `${ donors } ${ donors === 1 ? __( 'donor', 'dono' ) : __( 'donors', 'dono' ) }`
                                : __( 'No donors yet', 'dono' ) }
                            { endsAt && ` · ${ __( 'ends', 'dono' ) } ${ shortDate( endsAt ) }` }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function resolveEffectiveTokens( { tokens = {}, presetId = '', layer = 'campaign', styling = {} } = {} ) {
    const defaults  = styling.defaults || {};
    const presets   = Array.isArray( styling.presets ) ? styling.presets : [];
    const defaultId = styling.default_id || '';
    const safe      = tokens && typeof tokens === 'object' ? tokens : {};

    if ( layer === 'brand' ) {
        // Overrides are the preset tokens themselves; apply on top of defaults.
        return { ...defaults, ...safe };
    }

    const chosenId = presetId || defaultId;
    const preset   = presets.find( ( p ) => p.id === chosenId );
    const presetTokens = preset && preset.tokens && typeof preset.tokens === 'object'
        ? preset.tokens
        : {};
    return { ...defaults, ...presetTokens, ...safe };
}

function tokensToStyle( tokens ) {
    const out = {};
    for ( const key in tokens ) {
        const v = tokens[ key ];
        if ( typeof v === 'string' && v !== '' ) out[ `--${ key }` ] = v;
    }
    return out;
}

function derivePresets( goalCents ) {
    if ( ! goalCents || goalCents < 5000 ) return [ 2500, 5000, 10000, 25000 ];
    const round = ( v ) => {
        if ( v >= 50000 ) return Math.round( v / 5000 ) * 5000;
        if ( v >= 10000 ) return Math.round( v / 1000 ) * 1000;
        if ( v >= 2500 )  return Math.round( v / 500 ) * 500;
        return Math.round( v / 100 ) * 100;
    };
    return [
        round( goalCents * 0.005 ),
        round( goalCents * 0.01 ),
        round( goalCents * 0.02 ),
        round( goalCents * 0.05 ),
    ];
}

function shortDate( iso ) {
    try {
        const d = parseTimestamp( iso );
        const hasTime = String( iso ).length > 10;
        const dateOpts = { month: 'short', day: 'numeric', year: 'numeric' };
        if ( ! hasTime ) return d.toLocaleDateString( undefined, dateOpts );
        return d.toLocaleString( undefined, { ...dateOpts, hour: 'numeric', minute: '2-digit' } );
    } catch ( _ ) {
        return iso;
    }
}
