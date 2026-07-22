/**
 * Framework-agnostic toast store. Any admin app subscribes via <Toaster/>;
 * call notify.success/error/info/warning(message, opts) to enqueue.
 * opts: { duration } (ms, 0 = sticky), { action: { label, onClick } }.
 */

let items = [];
let seq   = 0;
const subscribers = new Set();

function emit() {
    for ( const fn of subscribers ) fn( items );
}

function add( type, message, opts = {} ) {
    const id       = ++seq;
    const duration = opts.duration ?? ( type === 'error' ? 7000 : 4000 );
    items = [ ...items, { id, type, message, action: opts.action || null } ];
    emit();
    if ( duration > 0 ) {
        setTimeout( () => dismiss( id ), duration );
    }
    return id;
}

export function dismiss( id ) {
    const next = items.filter( ( t ) => t.id !== id );
    if ( next.length !== items.length ) {
        items = next;
        emit();
    }
}

export function subscribe( fn ) {
    subscribers.add( fn );
    fn( items );
    return () => subscribers.delete( fn );
}

export const notify = {
    success: ( message, opts ) => add( 'success', message, opts ),
    error:   ( message, opts ) => add( 'error', message, opts ),
    info:    ( message, opts ) => add( 'info', message, opts ),
    warning: ( message, opts ) => add( 'warning', message, opts ),
};

export default notify;
