import React from 'react';
import GenerateCoordinates from '../components/generateCoordinates';
import Footer from '../components/footer';

const CoordinateGenerationPage = () => {
    return (
        <>
            <div className="page-container">
                <div className="content-wrap">
                    <h1>Coordinate Generation</h1>
                    <p>
                        Welcome to the Coordinate Generation page! Here, you can describe a location, and our intelligent system, utlizing ChatGPT API, will try to provide you with its coordinates. Just type in a brief description of the place you have in mind, and let us do the magic!
                    </p>
                    <GenerateCoordinates />
                    <div className="example-prompts">
                        <h3>Example Prompts:</h3>
                        <ul>
                            <li>"The Great Wall of China."</li>
                            <li>"Somewhere you can find the Northern Lights."</li>
                            <li>"A historical monument in India, known as the 'symbol of love'."</li>
                        </ul>
                    </div>
                    {/* Any other content or components you want on this page */}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CoordinateGenerationPage;
