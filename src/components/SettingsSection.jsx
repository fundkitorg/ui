/**
 * Two-column section card. Left: title + description. Right: form fields.
 */
export default function SettingsSection( { title, description, children } ) {
    return (
        <div className="giveflow-section">
            <div className="giveflow-section__intro">
                <h3 className="giveflow-section__title">{ title }</h3>
                { description && <p className="giveflow-section__desc">{ description }</p> }
            </div>
            <div className="giveflow-section__body">
                { children }
            </div>
        </div>
    );
}
