const _fetch = (typeof fetch !== 'undefined') ? fetch : undefined;
const fetch = (typeof FETCH !== 'undefined') ? FETCH : _fetch;

export default fetch;