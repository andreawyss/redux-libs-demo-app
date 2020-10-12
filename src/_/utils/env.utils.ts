export const apiBaseUrl = process.env.REACT_APP__API_BASE_URL;
if (!apiBaseUrl) {
  throw new Error('REACT_APP__API_BASE_URL missing in .env file');
}
