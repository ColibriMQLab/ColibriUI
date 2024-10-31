export type Keys = Record<string, string> & Record<KeyboardKeys, string>;

export type KeyboardKeys =
    | 'BACKSPACE'
    | 'TAB'
    | 'ENTER'
    | 'CAPS_LOCK'
    | 'ESC'
    | 'SPACE'
    | 'PAGE_UP'
    | 'PAGE_DOWN'
    | 'END'
    | 'HOME'
    | 'LEFT'
    | 'UP'
    | 'RIGHT'
    | 'DOWN'
    | 'INSERT'
    | 'DELETE'
    | string;

export const Keys: Keys = {
    BACKSPACE: 'Backspace',
    TAB: 'Tab',
    ENTER: 'Enter',
    CAPS_LOCK: 'CapsLock',
    ESC: 'Escape',
    SPACE: ' ',
    PAGE_UP: 'PageUp',
    PAGE_DOWN: 'PageDown',
    END: 'End',
    HOME: 'Home',
    LEFT: 'ArrowLeft',
    UP: 'ArrowUp',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
    INSERT: 'Insert',
    DELETE: 'Delete',
};

export function isKey(eventKey: string, keys: Array<KeyboardKeys | string>): boolean {
    return keys.some((value) => Keys[value] === eventKey || value === eventKey);
}
