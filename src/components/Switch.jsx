/**
 * Toggle switch. Compose inside ToggleRow when title + sub text are needed.
 */
export function Switch( { checked, onChange, disabled, label, id } ) {
    return (
        <label className="giveflow-switch" aria-label={ label }>
            <input
                id={ id }
                type="checkbox"
                checked={ !! checked }
                disabled={ !! disabled }
                onChange={ ( e ) => onChange && onChange( e.target.checked ) }
            />
            <span className="giveflow-switch__track" />
        </label>
    );
}

/**
 * Toggle row with title + sub text on the left and the Switch on the right.
 */
export function ToggleRow( { title, sub, checked, onChange, disabled } ) {
    return (
        <div className="giveflow-toggle-row">
            <div className="giveflow-toggle-row__body">
                <div className="giveflow-toggle-row__title">{ title }</div>
                { sub && <div className="giveflow-toggle-row__sub">{ sub }</div> }
            </div>
            <Switch checked={ checked } onChange={ onChange } disabled={ disabled } label={ title } />
        </div>
    );
}

export default Switch;
