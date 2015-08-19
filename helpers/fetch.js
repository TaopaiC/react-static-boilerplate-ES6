const fetch = (typeof FETCH !== 'undefined') ? FETCH : require('whatwg-fetch');

export default fetch;