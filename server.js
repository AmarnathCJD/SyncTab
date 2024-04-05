const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));

app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
