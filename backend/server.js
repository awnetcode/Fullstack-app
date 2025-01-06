const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Endpoint do zapisu danych
app.post('/save', (req, res) => {
  const data = req.body;

  // Zapis do pliku JSON
  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send('Error saving data');
    }
    res.send('Data saved successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
