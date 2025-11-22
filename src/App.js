import React, { useState } from 'react';
import { MapPin, Cloud, Loader2, AlertCircle, Compass, Sun, Droplet, Sparkles, Plane } from 'lucide-react';
import './App.css';

const TourismAgentSystem = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const analyzeIntent = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    let place = userInput;
    const patterns = [
      /(?:going to|visit|trip to|travel to)\s+(.+?)(?:\?|,|$)/i,
      /(?:in|at)\s+([A-Z][a-zA-Z\s]+?)(?:\?|,|what|let|$)/i,
      /^([A-Z][a-zA-Z\s]+?)(?:\s+weather|\s+places|\s+trip)?$/i
    ];
    
    for (const pattern of patterns) {
      const match = userInput.match(pattern);
      if (match && match[1]) {
        place = match[1].trim();
        break;
      }
    }
    
    place = place.replace(/^(to|in|at)\s+/i, '').trim();
    place = place.replace(/\s+(weather|temperature|places|attractions|trip|plan).*$/i, '').trim();
    
    const needsWeather = lowerInput.includes('weather') || 
                         lowerInput.includes('temperature') || 
                         lowerInput.includes('temp') ||
                         lowerInput.includes('rain') ||
                         lowerInput.includes('climate');
    
    const needsPlaces = lowerInput.includes('place') || 
                        lowerInput.includes('visit') || 
                        lowerInput.includes('attraction') || 
                        lowerInput.includes('see') ||
                        lowerInput.includes('do') ||
                        lowerInput.includes('trip') ||
                        lowerInput.includes('plan');
    
    const defaultToBoth = !needsWeather && !needsPlaces;
    
    return {
      place: place,
      needsWeather: needsWeather || defaultToBoth,
      needsPlaces: needsPlaces || defaultToBoth
    };
  };

  const getCoordinates = async (placeName) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeName)}&format=json&limit=1`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'TourismApp/1.0' }
    });
    const data = await res.json();
    if (data.length === 0) return null;
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      displayName: data[0].display_name
    };
  };

  const getWeather = async (lat, lon) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation_probability&timezone=auto`;
    const res = await fetch(url);
    const data = await res.json();
    return {
      temperature: data.current.temperature_2m,
      rainChance: data.current.precipitation_probability || 0
    };
  };

  const getPlaces = async (lat, lon) => {
    const overpassQuery = `
      [out:json];
      (
        node["tourism"="attraction"](around:10000,${lat},${lon});
        node["tourism"="museum"](around:10000,${lat},${lon});
        node["historic"](around:10000,${lat},${lon});
        way["tourism"="attraction"](around:10000,${lat},${lon});
        way["tourism"="museum"](around:10000,${lat},${lon});
        way["historic"](around:10000,${lat},${lon});
      );
      out center 20;
    `;
    
    const url = 'https://overpass-api.de/api/interpreter';
    const res = await fetch(url, {
      method: 'POST',
      body: overpassQuery
    });
    const data = await res.json();
    
    const places = data.elements
      .filter(el => el.tags && el.tags.name)
      .map(el => ({
        name: el.tags.name,
        type: el.tags.tourism || el.tags.historic || 'attraction'
      }))
      .slice(0, 5);
    
    return places;
  };

  const processTourismRequest = async (userInput) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const intent = analyzeIntent(userInput);
      const coords = await getCoordinates(intent.place);
      
      if (!coords) {
        setError(`I don't know if "${intent.place}" exists. Please try another location.`);
        setLoading(false);
        return;
      }

      const result = {
        place: intent.place,
        displayName: coords.displayName,
        weather: null,
        places: null
      };

      if (intent.needsWeather) {
        result.weather = await getWeather(coords.lat, coords.lon);
      }

      if (intent.needsPlaces) {
        result.places = await getPlaces(coords.lat, coords.lon);
      }

      setResponse(result);
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="background-overlay"></div>
      
      <div className="content-wrapper">
        <div className="header-card card-float">
          <div className="header-title">
            <Plane className="icon-plane" />
            <h1 className="main-title">
              Travel<span className="gradient-text">Explorer</span>
            </h1>
            <Compass className="icon-compass" />
          </div>
          <p className="subtitle">
            ✈️ Discover amazing destinations 🌍
          </p>
          
          <div className="input-section">
            <div className="input-wrapper">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Where would you like to explore? (e.g., I'm going to Paris!)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !loading && input.trim()) {
                    processTourismRequest(input);
                  }
                }}
                className="main-input"
              />
              <MapPin className="input-icon" />
            </div>
            <button
              onClick={() => input.trim() && processTourismRequest(input)}
              disabled={loading || !input.trim()}
              className="submit-button"
            >
              {loading ? (
                <>
                  <Loader2 className="icon-spin" />
                  <span>Exploring...</span>
                </>
              ) : (
                <>
                  <Sparkles className="icon-sparkle" />
                  <span>Start Adventure</span>
                  <Sparkles className="icon-sparkle" />
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="error-card">
            <div className="error-content">
              <AlertCircle className="error-icon" />
              <div>
                <h3 className="error-title">Oops! Location Not Found</h3>
                <p className="error-message">{error}</p>
              </div>
            </div>
          </div>
        )}

        {response && (
          <div className="results-section">
            <div className="title-card">
              <h2 className="result-title">
                <MapPin className="title-icon" />
                <span className="gradient-text">{response.place}</span>
              </h2>
            </div>

            {response.weather && (
              <div className="weather-card">
                <div className="card-content">
                  <div className="icon-badge weather-badge">
                    <Cloud className="badge-icon" />
                  </div>
                  <div className="card-details">
                    <h3 className="card-title">
                      Weather Forecast
                      <Sun className="icon-sun" />
                    </h3>
                    <div className="info-box">
                      <p className="info-text">
                        In <span className="highlight-place">{response.place}</span> it's currently{' '}
                        <span className="temperature">{response.weather.temperature}°C</span>
                        {' '}with a{' '}
                        <span className="rain-chance">
                          <Droplet className="droplet-icon" />
                          {response.weather.rainChance}%
                        </span>
                        {' '}chance to rain.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {response.places && response.places.length > 0 && (
              <div className="places-card">
                <div className="card-content">
                  <div className="icon-badge places-badge">
                    <MapPin className="badge-icon" />
                  </div>
                  <div className="card-details">
                    <h3 className="card-title">Must-Visit Places ✨</h3>
                    <p className="places-intro">
                      In <span className="highlight-place">{response.place}</span> these are the places you can go:
                    </p>
                    <div className="places-list">
                      {response.places.map((place, idx) => (
                        <div key={idx} className="place-item">
                          <div className="place-number">{idx + 1}</div>
                          <span className="place-name">{place.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {response.places && response.places.length === 0 && (
              <div className="no-places-card">
                <p className="no-places-text">
                  🗺️ No tourist attractions found nearby. This location might be remote or have limited data.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TourismAgentSystem;