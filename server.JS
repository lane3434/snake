const express = require('express');
const path = require('path');

const app = express();
const PORT = 3555;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve MainMenu.html as the initial page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'MainMenu.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
