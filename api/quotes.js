import client from './client';

const endpoint = "/random";

const getQuotes = () => client.get(endpoint);

export default { getQuotes };