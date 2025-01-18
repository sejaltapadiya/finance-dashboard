import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const GeographicLoanDistribution = () => {
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:9192/api/geographic-data')
            .then(response => setGeoData(response.data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <MapContainer center={[20, 77]} zoom={4} style={{ height: '500px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {geoData && <GeoJSON data={geoData} />}
        </MapContainer>
    );
};

export default GeographicLoanDistribution;
