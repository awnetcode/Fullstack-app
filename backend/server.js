const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); // Tworzenie instancji Express
const PORT = 5000;

// Włączenie obsługi CORS
app.use(cors({
  origin: 'http://localhost:5173', // Dopuszczamy tylko frontend na tym adresie
  methods: ['GET', 'POST'], // Dopuszczalne metody
  allowedHeaders: ['Content-Type'] // Dopuszczalne nagłówki
}));

// Middleware do parsowania JSON
app.use(bodyParser.json());

// Endpoint do zapisu danych
app.post('/save', (req, res) => {
  const newData = req.body;

  // Odczyt istniejącego pliku
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      // Jeśli plik nie istnieje, zaczynamy od pustej tablicy
      if (err.code === 'ENOENT') {
        return fs.writeFile('data.json', JSON.stringify([newData], null, 2), (writeErr) => {
          if (writeErr) {
            console.error('Error writing to file:', writeErr);
            return res.status(500).send('Error saving data');
          }
          return res.send('Data saved successfully');
        });
      }
      console.error('Error reading file:', err);
      return res.status(500).send('Error reading data');
    }

    // Dopisanie nowych danych do istniejącej tablicy
    let jsonData = [];
    try {
      jsonData = JSON.parse(data); // Parsowanie istniejącego JSON-a
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      return res.status(500).send('Error parsing existing data');
    }

    jsonData.push(newData); // Dodanie nowych danych

    // Zapis zaktualizowanej tablicy do pliku
    fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing to file:', writeErr);
        return res.status(500).send('Error saving data');
      }
      res.send('Data saved successfully');
    });
  });
});

// Endpoint powitalny
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
