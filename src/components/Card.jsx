/**
 * Card chrome. Props:
 *   leading  node           - rendered before the title block (e.g. <BrandMark />)
 *   title    string         - card title (left of head)
 *   sub      string         - small muted line under title
 *   meta     node           - text or pill on the right of head
 *   edited   bool | number  - true = "Edited" pill; number = "N change(s)" pill
 *   foot     node           - rendered inside .dono-card__foot
 *   children node           - body content
 */
import { __, _n, sprintf } from '@wordpress/i18n';

export default function Card( { leading, title, sub, meta, edited, foot, children } ) {
    const showHead = leading || title || meta || edited;
    return (
        <div className="dono-card">
            { showHead && (
                <div className="dono-card__head">
                    <div className="dono-card__head-left">
                        { leading }
                        { title && (
                            <div>
                                <h3 className="dono-card__title">{ title }</h3>
                                { sub && <div className="dono-card__sub">{ sub }</div> }
                            </div>
                        ) }
                        { typeof edited === 'number' && edited > 0 && (
                            <span className="dono-edited-pill">
                                { sprintf(
                                    /* translators: %d: number of edited fields in this card */
                                    _n( '%d change', '%d changes', edited, 'dono' ),
                                    edited,
                                ) }
                            </span>
                        ) }
                        { edited === true && (
                            <span className="dono-edited-pill">{ __( 'Edited', 'dono' ) }</span>
                        ) }
                    </div>
                    { meta && <span className="dono-card__meta">{ meta }</span> }
                </div>
            ) }
            <div className="dono-card__body">{ children }</div>
            { foot && <div className="dono-card__foot">{ foot }</div> }
        </div>
    );
}
