import React, { useEffect } from 'react';

const containerStyle = {
  width: '50%',
  height: '500px'
};

const PanoramaViewer = ({ panoData }) => {

    
  useEffect(() => {
    if (window.google && panoData) {
      const panorama = new window.google.maps.StreetViewPanorama(
        document.getElementById("pano")
      );
      panorama.setPano(panoData.location.pano);
      panorama.setVisible(true);
    }
  }, [panoData]);

  return (
 
      <div id="pano" style={containerStyle}></div>

  );
};

export default PanoramaViewer;
