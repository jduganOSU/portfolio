import MapComponent from "../components/worldmap";
import Footer from "../components/footer";

const Homepage = () => {
  return (
    <>
      <div className="page-container">
        <div className="content-wrap">
          <h1>Welcome to the Panorama App!</h1>
          <div id="homepage-instructions">
            <p>Click on the map to generate the nearest google maps panorama, or check out the ChatGPT Generation link
              at the bottom of the page. It allows you to enter a prompt of a location you're interested in, and ChatGPT 
              will handle the rest!
            </p>
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