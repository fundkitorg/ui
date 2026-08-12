import { Dropdown, MenuGroup, MenuItem } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

import Icon from '../components/Icon';

export const RANGE_OPTIONS = [
    { value: 'today',    label: __( 'Today', 'dono-fundraising-platform' ) },
    { value: 'last-7',   label: __( 'Last 7 days', 'dono-fundraising-platform' ) },
    { value: 'last-30',  label: __( 'Last 30 days', 'dono-fundraising-platform' ) },
    { value: 'last-90',  label: __( 'Last 90 days', 'dono-fundraising-platform' ) },
    { value: 'all-time', label: __( 'All-time', 'dono-fundraising-platform' ) },
];

const RANGE_DAYS = { 'last-7': 7, 'last-30': 30, 'last-90': 90 };

function compareTriggerLabel( mode, range ) {
    const days = RANGE_DAYS[ range ];
    if ( mode === 'period' && days ) {
        /* translators: %d: number of days in the comparison window */
        return sprintf( __( 'vs previous %d days', 'dono-fundraising-platform' ), days );
    }
    if ( mode === 'year' ) return __( 'vs same period last year', 'dono-fundraising-platform' );
    return __( 'Compare to…', 'dono-fundraising-platform' );
}

function ChevronDown() {
    return <Icon name="caret-down" size={ 10 } />;
}

export default function SectionBar( {
    nav,
    range, onRangeChange,
    compareMode = 'none', onCompareModeChange,
    compareAvailable = false,
    layoutSlot,
} ) {
    const rangeLabel = RANGE_OPTIONS.find( ( r ) => r.value === range )?.label ?? range;

    return (
        <div className="dono-section-bar">
            { nav && <div className="dono-section-bar__nav">{ nav }</div> }
            <div className="dono-section-bar__controls">
                <Dropdown
                    popoverProps={ { placement: 'bottom-end' } }
                    renderToggle={ ( { isOpen, onToggle } ) => (
                        <button
                            type="button"
                            className={ `dono-cmp-toggle${ isOpen ? ' is-open' : '' }` }
                            onClick={ onToggle }
                            aria-expanded={ isOpen }
                        >
                            { rangeLabel }
                            <ChevronDown />
                        </button>
                    ) }
                    renderContent={ ( { onClose } ) => (
                        <MenuGroup>
                            { RANGE_OPTIONS.map( ( r ) => (
                                <MenuItem
                                    key={ r.value }
                                    isSelected={ range === r.value }
                                    onClick={ () => { onRangeChange( r.value ); onClose(); } }
                                >
                                    { r.label }
                                </MenuItem>
                            ) ) }
                        </MenuGroup>
                    ) }
                />
                { compareAvailable && onCompareModeChange && (
                    <Dropdown
                        popoverProps={ { placement: 'bottom-end' } }
                        renderToggle={ ( { isOpen, onToggle } ) => (
                            <button
                                type="button"
                                className={ `dono-cmp-toggle${ compareMode !== 'none' ? ' is-active' : '' }${ isOpen ? ' is-open' : '' }` }
                                onClick={ onToggle }
                                aria-expanded={ isOpen }
                            >
                                { compareMode === 'none' ? <Icon name="plus" size={ 14 } /> : null }
                                { compareTriggerLabel( compareMode, range ) }
                                <ChevronDown />
                            </button>
                        ) }
                        renderContent={ ( { onClose } ) => (
                            <MenuGroup label={ __( 'Compare to', 'dono-fundraising-platform' ) }>
                                <MenuItem
                                    isSelected={ compareMode === 'none' }
                                    onClick={ () => { onCompareModeChange( 'none' ); onClose(); } }
                                >
                                    { __( 'No comparison', 'dono-fundraising-platform' ) }
                                </MenuItem>
                                <MenuItem
                                    isSelected={ compareMode === 'period' }
                                    onClick={ () => { onCompareModeChange( 'period' ); onClose(); } }
                                >
                                    { __( 'Previous period', 'dono-fundraising-platform' ) }
                                </MenuItem>
                                <MenuItem
                                    isSelected={ compareMode === 'year' }
                                    onClick={ () => { onCompareModeChange( 'year' ); onClose(); } }
                                >
                                    { __( 'Same period last year', 'dono-fundraising-platform' ) }
                                </MenuItem>
                            </MenuGroup>
                        ) }
                    />
                ) }
                { layoutSlot }
            </div>
        </div>
    );
}
