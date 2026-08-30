/**
 * Two-column section card. Left: title + description. Right: form fields.
 */
export default function SettingsSection( { title, description, children } ) {
    return (
        <div className="fundkit-section">
            <div className="fundkit-section__intro">
                <h3 className="fundkit-section__title">{ title }</h3>
                { description && <p className="fundkit-section__desc">{ description }</p> }
            </div>
            <div className="fundkit-section__body">
                { children }
            </div>
        </div>
    );
}
