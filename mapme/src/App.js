import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';

const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-110m.json';

function App() {
  const [geoData, setGeoData] = useState(null);

  // Funzione per caricare i dati GeoJSON
  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        const response = await fetch(geoUrl);
        const data = await response.json();
        setGeoData(data); // Salva i dati nel state
      } catch (error) {
        console.error('Errore nel caricare il GeoJSON:', error);
      }
    };
    fetchGeoData();
  }, []);

  const handleCountryClick = (countryName) => {
    alert(`Hai cliccato su ${countryName}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Benvenuto nel mio sito!</h1>
      </header>
      <main>
        <section id="storie" className="section">
          <h2>Storie</h2>
          <p>Questa è la sezione delle storie. Puoi cliccare sui paesi della mappa per saperne di più!</p>
          <MapContainer center={[20, 0]} zoom={2} style={{ width: '100%', height: '500px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {geoData && (
              <GeoJSON
                data={geoData}
                onEachFeature={(feature, layer) => {
                  // Se il GeoJSON ha la proprietà 'name', usiamola
                  const countryName = feature.properties?.name || 'Paese sconosciuto';
                  layer.on('click', () => handleCountryClick(countryName));
                }}
              />
            )}
          </MapContainer>
        </section>
        <section id="work" className="section">
          <h2>Work</h2>
          <p>Questa è la sezione del lavoro. Qui puoi mostrare i tuoi progetti o esperienze lavorative.</p>
        </section>
      </main>
      <footer>
        <p>Creato con React</p>
      </footer>
    </div>
  );
}

export default App;
