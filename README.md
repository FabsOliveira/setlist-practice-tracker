# setlist-practice-tracker
Webapp to keep track of my piano practice.

Click the practice button again on the same day to undo marking a song as practised.
Use the delete button (🗑️) to remove a song from the list.

## Running the project
Open `index.html` in your browser. The app stores song data in `localStorage`.

If you want to persist your songs beyond the browser and share them across devices,
run the small server included in this repository. First install the dependencies
with `npm install`, then start the server with `npm start` (or `node server.js`).
The server saves your song data to `songs.json`.
