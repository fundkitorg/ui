/**
 * Form field wrapper: label, optional help text, optional footer (e.g. char counter).
 * Children is the input element(s).
 */
export default function Field( { label, help, footer, children } ) {
    return (
        <div className="fundkit-field">
            { label && <div className="fundkit-field__label">{ label }</div> }
            { help  && <div className="fundkit-field__help">{ help }</div> }
            { children }
            { footer && <div className="fundkit-field__footer">{ footer }</div> }
        </div>
    );
}
