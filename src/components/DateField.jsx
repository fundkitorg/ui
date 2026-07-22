import { Dropdown, DatePicker, DateTimePicker, Button } from '@wordpress/components';
import { dateI18n } from '@wordpress/date';
import { __ } from '@wordpress/i18n';

/**
 * Date (or date + time) input that looks like a .dono-input and opens a WP
 * picker on click. Backed by an ISO string:
 *   - date only:   "YYYY-MM-DD"          (default)
 *   - with time:   "YYYY-MM-DD HH:MM:SS" (when withTime is true)
 *
 * The MySQL-friendly space separator is used for time-mode because that's what
 * `datetime` columns expect; for date-only we drop the time portion entirely.
 *
 * Props:
 *   value       string | null  ISO date or datetime
 *   onChange    (next) => void next is the same shape, or null
 *   withTime    bool           show time picker too (DateTimePicker)
 *   is12Hour    bool           passed to DateTimePicker; defaults to WP setting
 *   placeholder string         shown when value is empty
 *   ariaLabel   string         accessible label
 *   edited      bool           applies .dono-input--edited
 *   className   string         extra classes on the trigger button
 *   format      string         WP date format token; defaults to site setting
 *   allowClear  bool           shows a Clear button under the picker
 */
export default function DateField( {
    value,
    onChange,
    withTime,
    is12Hour,
    placeholder,
    ariaLabel,
    edited,
    className = '',
    format,
    allowClear = true,
} ) {
    const settings = window.wp?.date?.getSettings?.() || null;
    const dateFmt  = format || settings?.formats?.date || 'M j, Y';
    const timeFmt  = settings?.formats?.time || 'H:i';
    const displayFmt = withTime ? `${ dateFmt } · ${ timeFmt }` : dateFmt;
    const displayValue = value ? dateI18n( displayFmt, value ) : '';

    const triggerClass = [
        'dono-input',
        'dono-date-field',
        edited && 'dono-input--edited',
        className,
    ].filter( Boolean ).join( ' ' );

    const Picker = withTime ? DateTimePicker : DatePicker;

    return (
        <Dropdown
            popoverProps={ { placement: 'bottom-start' } }
            renderToggle={ ( { isOpen, onToggle } ) => (
                <button
                    type="button"
                    className={ triggerClass }
                    onClick={ onToggle }
                    aria-expanded={ isOpen }
                    aria-haspopup="dialog"
                    aria-label={ ariaLabel }
                >
                    <span className={ `dono-date-field__value${ value ? '' : ' is-empty' }` }>
                        { displayValue || placeholder || ( withTime
                            ? __( 'Select date and time', 'dono' )
                            : __( 'Select a date', 'dono' ) ) }
                    </span>
                    <svg className="dono-date-field__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                </button>
            ) }
            renderContent={ ( { onClose } ) => (
                <div className="dono-date-field__popover">
                    <Picker
                        currentDate={ value || undefined }
                        is12Hour={ is12Hour }
                        onChange={ ( next ) => {
                            onChange( normalise( next, withTime ) );
                            // Date-only: a click completes selection; time mode keeps the popover.
                            if ( ! withTime ) onClose();
                        } }
                    />
                    { allowClear && value && (
                        <Button
                            variant="tertiary"
                            onClick={ () => { onChange( null ); onClose(); } }
                            className="dono-date-field__clear"
                        >
                            { withTime
                                ? __( 'Clear date and time', 'dono' )
                                : __( 'Clear date', 'dono' ) }
                        </Button>
                    ) }
                </div>
            ) }
        />
    );
}

function normalise( next, withTime ) {
    if ( ! next ) return null;
    const s = String( next );
    if ( ! withTime ) return s.slice( 0, 10 );
    // MySQL DATETIME format: replace "T" with a space and drop offset/ms.
    return s.slice( 0, 19 ).replace( 'T', ' ' );
}
