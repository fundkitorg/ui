/**
 * Form field wrapper: label, optional help text, optional footer (e.g. char counter).
 * Children is the input element(s).
 */
export default function Field( { label, help, footer, children } ) {
    return (
        <div className="giveflow-field">
            { label && <div className="giveflow-field__label">{ label }</div> }
            { help  && <div className="giveflow-field__help">{ help }</div> }
            { children }
            { footer && <div className="giveflow-field__footer">{ footer }</div> }
        </div>
    );
}
