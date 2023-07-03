const fs = require('fs');
require('dotenv').config();

fetch(`${process.env.NUXT_PUBLIC_TRPC_ENDPOINT}/api/types`, {
  cache: 'no-cache',
})
  .then((res) => res.json())
  .then((data) => {
    fs.writeFile('./src/types/server.d.ts', data.types, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Success');
      }
    });
  })
  .catch((err) => console.log(`Error :(\n${err}`));
