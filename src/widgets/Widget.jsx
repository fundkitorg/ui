import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Dropdown, MenuGroup, MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import Icon from '../components/Icon';

/**
 * Visual card chrome, no DnD coupling. Used by Widget and by the DragOverlay clone.
 */
export function WidgetCard( {
    title, headerExtras, children,
    dragHandleProps = {},
    onHide, onMoveUp, onMoveDown, canMoveUp, canMoveDown,
    isOverlay = false,
    bare = false,
} ) {
    return (
        <div className={ `giveflow-widget${ isOverlay ? ' is-overlay' : '' }${ bare ? ' giveflow-widget--bare' : '' }` }>
            <div className="giveflow-widget__chrome">
                <button
                    type="button"
                    className="giveflow-widget__handle"
                    aria-label={ __( 'Drag to reorder', 'giveflow-fundraising-campaigns' ) }
                    { ...dragHandleProps }
                >
                    <Icon name="drag-grip" size={ 14 } />
                </button>
                { title && <h3 className="giveflow-widget__title">{ title }</h3> }
                <div className="giveflow-widget__head-extras">{ headerExtras }</div>
                { ! isOverlay && (
                    <Dropdown
                        className="giveflow-widget__menu"
                        contentClassName="giveflow-widget__menu-content"
                        popoverProps={ { placement: 'bottom-end' } }
                        renderToggle={ ( { isOpen, onToggle } ) => (
                            <Button
                                size="small"
                                variant="tertiary"
                                onClick={ onToggle }
                                aria-expanded={ isOpen }
                                aria-label={ __( 'Widget options', 'giveflow-fundraising-campaigns' ) }
                                icon={ <Icon name="settings" size={ 18 } /> }
                            />
                        ) }
                        renderContent={ ( { onClose } ) => (
                            <MenuGroup>
                                <MenuItem
                                    disabled={ ! canMoveUp }
                                    onClick={ () => { onMoveUp?.(); onClose(); } }
                                >
                                    { __( 'Move up', 'giveflow-fundraising-campaigns' ) }
                                </MenuItem>
                                <MenuItem
                                    disabled={ ! canMoveDown }
                                    onClick={ () => { onMoveDown?.(); onClose(); } }
                                >
                                    { __( 'Move down', 'giveflow-fundraising-campaigns' ) }
                                </MenuItem>
                                <MenuItem
                                    isDestructive
                                    onClick={ () => { onHide?.(); onClose(); } }
                                >
                                    { __( 'Hide widget', 'giveflow-fundraising-campaigns' ) }
                                </MenuItem>
                            </MenuGroup>
                        ) }
                    />
                ) }
            </div>
            <div className="giveflow-widget__body">{ children }</div>
        </div>
    );
}

/**
 * Sortable wrapper. Fades original while dragging; DragOverlay renders the floating clone.
 */
export default function Widget( {
    id, span = 'half', title, headerExtras, bare = false,
    onHide, onMoveUp, onMoveDown, canMoveUp, canMoveDown,
    children,
} ) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable( { id } );

    const style = {
        transform:  CSS.Transform.toString( transform ),
        transition,
        opacity:    isDragging ? 0 : 1,
    };

    return (
        <div
            ref={ setNodeRef }
            style={ style }
            className={ `giveflow-widget-slot giveflow-widget-slot--${ span }${ isDragging ? ' is-dragging-source' : '' }` }
            data-widget-id={ id }
        >
            <WidgetCard
                title={ title }
                headerExtras={ headerExtras }
                bare={ bare }
                dragHandleProps={ { ...attributes, ...listeners } }
                onHide={ onHide }
                onMoveUp={ onMoveUp }
                onMoveDown={ onMoveDown }
                canMoveUp={ canMoveUp }
                canMoveDown={ canMoveDown }
            >
                { children }
            </WidgetCard>
        </div>
    );
}
