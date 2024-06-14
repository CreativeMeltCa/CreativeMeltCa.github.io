const express = require('express');
const request = require('request');
const app = express();

app.use('/api', (req, res) => {
  const url = 'https://meltstore-kjq6nv3uv-melts-projects.vercel.app' + req.url;
  req.pipe(request({ url, headers: { 'Access-Control-Allow-Origin': '*' } })).pipe(res);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
