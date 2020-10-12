export function logError(err: any) {
  let message = err.message;
  if (err.response && err.response.statusText) {
    message = err.response.statusText;
  }
  if (err.response && err.response.data) {
    message = `${message}\n ${err.response.data}`;
  }
  console.error('Error: ', message);
  return message;
}
