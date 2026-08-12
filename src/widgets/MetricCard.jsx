import { __ } from '@wordpress/i18n';

import Icon from '../components/Icon';

export function ComparisonBadge( { pct } ) {
    const positive = pct > 0;
    const negative = pct < 0;
    const cls = `dono-cmp ${ positive ? 'is-up' : negative ? 'is-down' : 'is-flat' }`;
    const arrow = positive ? 'arrow-up' : negative ? 'arrow-down' : null;
    return (
        <span className={ cls } title={ __( 'vs previous period', 'dono-fundraising-platform' ) }>
            { arrow && <Icon name={ arrow } size={ 10 } /> }
            { Math.abs( pct ) }%
        </span>
    );
}

export default function MetricCard( { label, value, sub, changePct, icon, onMenuClick, skeleton = false } ) {
    return (
        <div className={ `dono-metric${ skeleton ? ' is-skeleton' : '' }` }>
            <div className="dono-metric__head">
                <span className="dono-metric__icon">{ icon }</span>
                { onMenuClick && (
                    <button type="button" className="dono-metric__menu" aria-label={ __( 'More', 'dono-fundraising-platform' ) } onClick={ onMenuClick }>
                        <Icon name="more" size={ 14 } />
                    </button>
                ) }
            </div>
            <div className="dono-metric__label">{ label }</div>
            <div className="dono-metric__row">
                <div className="dono-metric__value">
                    { skeleton ? <span className="dono-skeleton dono-skeleton--lg" aria-hidden="true" /> : value }
                </div>
                { ! skeleton && changePct !== null && changePct !== undefined && (
                    <ComparisonBadge pct={ changePct } />
                ) }
            </div>
            { sub && <div className="dono-metric__sub">{ sub }</div> }
        </div>
    );
}
