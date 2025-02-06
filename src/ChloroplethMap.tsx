import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, GeoJSONProps } from 'react-leaflet';
import { FeatureCollection, Feature } from 'geojson';
import 'leaflet/dist/leaflet.css';
import chroma from 'chroma-js';
import { QueryFunctionContext, useQuery } from 'react-query';
import { MapControlsBar } from './MapControlsBar';

interface CountryDataItem {
  country: string;
  count: number;
}

type CountryData = CountryDataItem[];

const fetchCountryCountByYear = async ({ queryKey }: QueryFunctionContext<[string, number, string?]>): Promise<CountryData> => {
  const [, year, sourceBusiness] = queryKey;  // Destructure queryKey
  let url = `${import.meta.env.BASE_URL}/country-count/${year}/`;

  if (sourceBusiness && sourceBusiness !== "All") {
    url += `?source_business=${encodeURIComponent(sourceBusiness)}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const data: CountryData = await response.json();
  return data;
};

const ChoroplethMap = () => {
  const [year, setYear] = useState<number>(2024);  // Example year
  const [sourceBusiness, setSourceBusiness] = useState<string | undefined>(undefined);

  const [geoJsonData, setGeoJsonData] = useState<FeatureCollection | null>(null);
  const { data: countryData, error, isLoading } = useQuery<CountryData, Error, CountryData, [string, number, string?]>({
    queryKey: ['countryCountByYear', year, sourceBusiness],
    queryFn: fetchCountryCountByYear,
    enabled: !!year,
  });

  const [countryCounts, setCountryCounts] = useState<Record<string, number> | null>(null);
  const [secondHighestCount, setSecondHighestCount] = useState<number | null>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null); // Reference to the GeoJSON layer

  useEffect(() => {
    if (countryData) {
      const tempDict: Record<string, number> = {};
      countryData.forEach(row => {
        tempDict[row.country] = row.count;
      });
      setCountryCounts(tempDict);
      setSecondHighestCount([...new Set(Object.values(tempDict))].sort((a, b) => b - a)[1]);
    }
  }, [countryData]);

  // Color scale function
  const getColor = (count: number) =>
    count
      ? chroma.scale('YlOrRd').domain([0, secondHighestCount || 1])(count).hex()
      : '#ccc';

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}/api/countries/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();  // Parse the response body as JSON
      })
      .then(data => {
        setGeoJsonData(data);  // Use state to store the parsed GeoJSON features
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const styleFeature = (feature: Feature) => ({
    fillColor: feature.properties?.name === "United Kingdom" ? "#450c18" : getColor(countryCounts?.[feature.properties?.name || ''] || 0),
    weight: 1,
    color: '#333',
    fillOpacity: 0.8,
  });

  const onEachFeature = (feature: Feature, layer: L.Layer) => {
    const country = feature.properties?.name || 'Unknown';
    const count = countryCounts?.[country] || 0;
    layer.bindPopup(`${country}: ${count} suppliers`);
  };

  const updatePopups = () => {
    if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.eachLayer(layer => {
        const country = layer.feature.properties.name;
        const count = countryCounts?.[country] || 0;
        layer.bindPopup(`${country}: ${count}`);
      });
    }
  };

  useEffect(() => {
    updatePopups();
  }, [countryCounts]);

  return (
    <div className="map-wrapper">
      <h2>Map of countries coloured by supplier count.</h2>
      <div className="map-container">
        <div className="map">
          <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {geoJsonData && (
              <GeoJSON data={geoJsonData} style={styleFeature} onEachFeature={onEachFeature} ref={geoJsonLayerRef} />
            )}
          </MapContainer>
        </div>
        <div className="controls">
          <MapControlsBar items={['Tesco', 'Asda', 'Sainsburys']} onItemChange={setSourceBusiness} />
        </div>
      </div>
    </div>
  );
};

export default ChoroplethMap;
