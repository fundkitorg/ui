import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Single-line input with a trailing Copy or Reveal button. Props:
 *   value       string - current value (controlled)
 *   onChange    fn     - (next) => void; omit for readonly
 *   secret      bool   - mask the value and offer Reveal/Hide
 *   placeholder string - shown when value is empty
 *   ariaLabel   string - aria-label for the button
 */
export default function KeyField( { value, onChange, secret, placeholder, ariaLabel } ) {
    const [ shown, setShown ] = useState( ! secret );

    const display = value || '';
    const masked  = secret && ! shown;
    const type    = masked ? 'password' : 'text';

    const onCopy = async () => {
        try { await navigator.clipboard.writeText( display ); } catch ( _ ) {}
    };

    const onToggle = () => setShown( ( v ) => ! v );

    const inputProps = {
        type,
        className: 'dono-input dono-input--mono',
        value: display,
        placeholder,
        ...( onChange
            ? { onChange: ( e ) => onChange( e.target.value ) }
            : { readOnly: true } ),
    };

    return (
        <div className={ `dono-input-row${ masked ? ' dono-input-row--locked' : '' }` }>
            <input { ...inputProps } />
            { secret ? (
                <button
                    type="button"
                    className="dono-copy-btn"
                    onClick={ onToggle }
                    aria-label={ ariaLabel || ( shown ? __( 'Hide', 'dono' ) : __( 'Reveal', 'dono' ) ) }
                >
                    { shown ? __( 'Hide', 'dono' ) : __( 'Reveal', 'dono' ) }
                </button>
            ) : (
                <button
                    type="button"
                    className="dono-copy-btn"
                    onClick={ onCopy }
                    aria-label={ ariaLabel || __( 'Copy', 'dono' ) }
                    disabled={ ! display }
                >
                    { __( 'Copy', 'dono' ) }
                </button>
            ) }
        </div>
    );
}
