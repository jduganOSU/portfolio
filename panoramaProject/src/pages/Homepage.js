import MapComponent from "../components/worldmap";
import Footer from "../components/footer";

const Homepage = () => {
  return (
    <>
      <div className="page-container">
        <div className="content-wrap">
          <h1>Welcome to the World Map App!</h1>
          <div id="homepage-instructions">
            <p>Click on the map to generate the nearest google maps panorama</p>
          </div>
        </div>
        
        <div id="homemap">
          <MapComponent />
        </div>
      </div>
      
      <Footer />
    </>
  );
  
  };

export default Homepage;