/**
 * Two-column form row (label-left / field-right). Props:
 *   label     string - label text
 *   help      node   - small help line under the label
 *   fieldHelp node   - help text under the input
 *   required  bool   - shows a red asterisk
 *   wide      bool   - single-column layout (label on top)
 *   children  node   - input(s)
 */
export default function FormRow( { label, help, fieldHelp, required, wide, children } ) {
    return (
        <div className={ `dono-form-row${ wide ? ' dono-form-row--wide' : '' }` }>
            { label && (
                <div className="dono-form-row__label">
                    { label }
                    { required && <span className="req">*</span> }
                    { help && <div className="dono-form-row__help">{ help }</div> }
                </div>
            ) }
            <div className="dono-form-row__field">
                { children }
                { fieldHelp && <div className="dono-form-row__field-help">{ fieldHelp }</div> }
            </div>
        </div>
    );
}
