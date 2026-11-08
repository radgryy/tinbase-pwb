/** Base URL of the tinbase server (dev: direct to the API port; prod: same origin). */
export const BASE = import.meta.env.DEV ? 'http://127.0.0.1:54321' : ''
