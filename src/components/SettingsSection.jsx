/**
 * Two-column section card. Left: title + description. Right: form fields.
 */
export default function SettingsSection( { title, description, children } ) {
    return (
        <div className="dono-section">
            <div className="dono-section__intro">
                <h3 className="dono-section__title">{ title }</h3>
                { description && <p className="dono-section__desc">{ description }</p> }
            </div>
            <div className="dono-section__body">
                { children }
            </div>
        </div>
    );
}
