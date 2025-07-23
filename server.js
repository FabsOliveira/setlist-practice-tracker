const express = require('express');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const app = express();
const DATA_FILE = path.join(__dirname, 'songs.json');

app.use(express.json());
app.use(express.static(__dirname));

let writeQueue = Promise.resolve();

app.get('/songs', async (req, res) => {
  try {
    // Ensure any queued writes have completed before reading
    await writeQueue;
    const data = await fsPromises.readFile(DATA_FILE, 'utf8');
    const json = JSON.parse(data || '{}');
    res.json(json);
  } catch (e) {
    const msg = e instanceof SyntaxError ? 'Invalid JSON' : 'Failed to read data';
    res.status(500).json({ error: msg });
  }
});

app.post('/songs', (req, res) => {
  const doWrite = async () => {
    await fsPromises.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2));
  };

  const queued = writeQueue.then(doWrite);

  // If an error occurs, avoid breaking the chain for subsequent writes
  writeQueue = queued.catch(() => {});

  queued
    .then(() => res.json({ status: 'ok' }))
    .catch(() => res.status(500).json({ error: 'Failed to write data' }));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
