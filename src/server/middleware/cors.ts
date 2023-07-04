export default defineEventHandler((event) => {
  // console.log('cors middleware', event.context, event.req.headers);
  let origin = 'http://localhost:3000';
  switch (event.req.headers.origin) {
    case 'https://emury-production.up.railway.app':
      origin = 'https://emury-production.up.railway.app';
      break;
    case 'http://192.168.5.15:3000':
      origin = 'http://192.168.5.15:3000';
      break;
  }

  setResponseHeaders(event, {
    'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Expose-Headers': '*',
  });

  if (getMethod(event) === 'OPTIONS') {
    event.res.statusCode = 204;
    event.res.statusMessage = 'No Content.';
    return 'OK';
  }
});
