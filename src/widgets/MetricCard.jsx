import { __ } from '@wordpress/i18n';

import Icon from '../components/Icon';

export function ComparisonBadge( { pct } ) {
    const positive = pct > 0;
    const negative = pct < 0;
    const cls = `fundkit-cmp ${ positive ? 'is-up' : negative ? 'is-down' : 'is-flat' }`;
    const arrow = positive ? 'arrow-up' : negative ? 'arrow-down' : null;
    return (
        <span className={ cls } title={ __( 'vs previous period', 'fundkit-fundraising-campaigns' ) }>
            { arrow && <Icon name={ arrow } size={ 10 } /> }
            { Math.abs( pct ) }%
        </span>
    );
}

export default function MetricCard( { label, value, sub, changePct, icon, onMenuClick, skeleton = false } ) {
    return (
        <div className={ `fundkit-metric${ skeleton ? ' is-skeleton' : '' }` }>
            <div className="fundkit-metric__head">
                <span className="fundkit-metric__icon">{ icon }</span>
                { onMenuClick && (
                    <button type="button" className="fundkit-metric__menu" aria-label={ __( 'More', 'fundkit-fundraising-campaigns' ) } onClick={ onMenuClick }>
                        <Icon name="more" size={ 14 } />
                    </button>
                ) }
            </div>
            <div className="fundkit-metric__label">{ label }</div>
            <div className="fundkit-metric__row">
                <div className="fundkit-metric__value">
                    { skeleton ? <span className="fundkit-skeleton fundkit-skeleton--lg" aria-hidden="true" /> : value }
                </div>
                { ! skeleton && changePct !== null && changePct !== undefined && (
                    <ComparisonBadge pct={ changePct } />
                ) }
            </div>
            { sub && <div className="fundkit-metric__sub">{ sub }</div> }
        </div>
    );
}
