/**
 * Form field wrapper: label, optional help text, optional footer (e.g. char counter).
 * Children is the input element(s).
 */
export default function Field( { label, help, footer, children } ) {
    return (
        <div className="dono-field">
            { label && <div className="dono-field__label">{ label }</div> }
            { help  && <div className="dono-field__help">{ help }</div> }
            { children }
            { footer && <div className="dono-field__footer">{ footer }</div> }
        </div>
    );
}
