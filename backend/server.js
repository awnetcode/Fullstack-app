//TO MÓJ PIERWSZY SERVER BACKENDOWY NA NODE, WIĘC KOMENTARZE WYJAŚNIAJĄ JAK NOOBOWI CO DO CZEGO

/*Importuje bibliotekę Express, która jest frameworkiem do budowania aplikacji backendowych w Node.js.
Dlaczego jest potrzebna? Express znacznie upraszcza pracę z żądaniami HTTP (GET, POST itp.) i tworzenie serwerów. Zamiast pisać serwer od zera, dostajesz gotowe narzędzia do obsługi tras, middleware (pośredników) i odpowiedzi HTTP.*/
const express = require('express');

/*Importuje moduł fs (File System), który pozwala na pracę z plikami i folderami na dysku (czytanie, zapisywanie, usuwanie itp.).
Dlaczego jest potrzebny? Do zapisu danych do pliku data.json i odczytywania ich później. */
const fs = require('fs');

/*Importuje bibliotekę body-parser, która pozwala na przetwarzanie treści przesłanych w żądaniu HTTP (np. w POST).
Dlaczego jest potrzebny? Dzięki niemu możesz łatwo odczytać dane JSON przesłane z frontendu (np. formularz). Bez niego dane w req.body byłyby nieczytelne. */
const bodyParser = require('body-parser');

/*Importuje bibliotekę cors, która pozwala kontrolować politykę CORS (Cross-Origin Resource Sharing).
Dlaczego jest potrzebny? W przeglądarce domyślnie żądania do innego źródła (np. frontend na localhost:5173 -> backend na localhost:5000) są blokowane przez tzw. Same-Origin Policy. cors pozwala na obejście tego ograniczenia, definiując, które źródła mają dostęp do API. */
const cors = require('cors');

const app = express(); // Tworzenie instancji Express
const PORT = 5000;

// Włączenie obsługi CORS
app.use(cors({
  origin: 'http://localhost:5173', // Frontendowy adres
  methods: ['GET', 'POST'], // Dozwolone metody
  allowedHeaders: ['Content-Type'] // Dozwolone nagłówki
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

// Endpoint do odczytu danych  
app.get('/data', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Error reading data');
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData); // Wysyłamy dane jako JSON
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      res.status(500).send('Error parsing data');
    }
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
