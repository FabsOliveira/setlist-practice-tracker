const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const DATA_FILE = path.join(__dirname, 'songs.json');

app.use(express.json());
app.use(express.static(__dirname));

app.get('/songs', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read data' });
      return;
    }
    try {
      const json = JSON.parse(data || '{}');
      res.json(json);
    } catch (e) {
      res.status(500).json({ error: 'Invalid JSON' });
    }
  });
});

app.post('/songs', (req, res) => {
  fs.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to write data' });
      return;
    }
    res.json({ status: 'ok' });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
