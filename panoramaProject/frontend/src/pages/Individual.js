import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PanoramaViewer from '../components/panorama';
import MapComponent from '../components/worldmap';
import Footer from '../components/footer';


const containerStyle = {
  width: "50%",
  height: "500px"
};


const Individual = (props) => {
  const { lat, lng } = useParams();
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);
  const [panoData, setPanoData] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (window.google) {
      const sv = new window.google.maps.StreetViewService();
  
      sv.getPanoramaByLocation({ lat: latitude, lng: longitude }, 1000000, (data, status) => {
        if (status === window.google.maps.StreetViewStatus.OK) {
          setPanoData(data);
        } else {
          console.error("No Street View data found for this location.");
        }
      });
    }
  }, [latitude, longitude]);

  const handleSave = async () => {
    console.log("working on save")
    const dateGenerated = new Date().toLocaleDateString();
    try {
      const response = await fetch('/panorama/favPanos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          latitude: panoData.location.latLng.lat(), 
          longitude: panoData.location.latLng.lng(), 
          dateGenerated, 
          description })
      });
      // Check for a 201 status code
      if (response.status === 201) {
        alert('Panorama saved successfully');
        setDescription('');
    } else {
        console.error('Failed to save panorama, status:', response.status);
        alert('Failed to save panorama- description too long. Please try again.');
    }
} catch (error) {
    console.error('Error saving panorama:', error);
}
};

return (
  <>
    <div className="page-container">
      <div className="content-wrap">
        <h1>Panorama Viewer Page</h1>
        
        {panoData && panoData.location && panoData.location.latLng ? (
          <>
            <p>Panorama Latitude: {panoData.location.latLng.lat()}</p>
            <p>Panorama Longitude: {panoData.location.latLng.lng()}</p>
          </>
        ) : null}

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {panoData && panoData.location && panoData.location.latLng ? ( 
            <MapComponent 
              latitude={panoData.location.latLng.lat()} 
              longitude={panoData.location.latLng.lng()} 
              zoom={6} 
              mapContainerStyle={containerStyle}
            />
          ) : null } 

          <PanoramaViewer panoData={panoData} />
        </div>

        <div>
          <label htmlFor="description">Description (Max 25 characters):</label>
          <input 
            type="text" 
            id="description" 
            value={description} 
            maxLength={25} 
            onChange={(e) => setDescription(e.target.value)} 
          />
          <button onClick={handleSave}>Save Panorama</button>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

  
  };

  export default Individual;