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
        <div className={ `dono-widget${ isOverlay ? ' is-overlay' : '' }${ bare ? ' dono-widget--bare' : '' }` }>
            <div className="dono-widget__chrome">
                <button
                    type="button"
                    className="dono-widget__handle"
                    aria-label={ __( 'Drag to reorder', 'dono-fundraising-platform' ) }
                    { ...dragHandleProps }
                >
                    <Icon name="drag-grip" size={ 14 } />
                </button>
                { title && <h3 className="dono-widget__title">{ title }</h3> }
                <div className="dono-widget__head-extras">{ headerExtras }</div>
                { ! isOverlay && (
                    <Dropdown
                        className="dono-widget__menu"
                        contentClassName="dono-widget__menu-content"
                        popoverProps={ { placement: 'bottom-end' } }
                        renderToggle={ ( { isOpen, onToggle } ) => (
                            <Button
                                size="small"
                                variant="tertiary"
                                onClick={ onToggle }
                                aria-expanded={ isOpen }
                                aria-label={ __( 'Widget options', 'dono-fundraising-platform' ) }
                                icon={ <Icon name="settings" size={ 18 } /> }
                            />
                        ) }
                        renderContent={ ( { onClose } ) => (
                            <MenuGroup>
                                <MenuItem
                                    disabled={ ! canMoveUp }
                                    onClick={ () => { onMoveUp?.(); onClose(); } }
                                >
                                    { __( 'Move up', 'dono-fundraising-platform' ) }
                                </MenuItem>
                                <MenuItem
                                    disabled={ ! canMoveDown }
                                    onClick={ () => { onMoveDown?.(); onClose(); } }
                                >
                                    { __( 'Move down', 'dono-fundraising-platform' ) }
                                </MenuItem>
                                <MenuItem
                                    isDestructive
                                    onClick={ () => { onHide?.(); onClose(); } }
                                >
                                    { __( 'Hide widget', 'dono-fundraising-platform' ) }
                                </MenuItem>
                            </MenuGroup>
                        ) }
                    />
                ) }
            </div>
            <div className="dono-widget__body">{ children }</div>
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
            className={ `dono-widget-slot dono-widget-slot--${ span }${ isDragging ? ' is-dragging-source' : '' }` }
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
