Panorama Project
Welcome to the Panorama Project! Dive into a world of breathtaking panoramic views. This web application lets users explore and save their favorite panoramas, providing an immersive experience of landscapes and cityscapes.


Features
Interactive Maps: Powered by the Google Maps API, users can explore different locations around the globe in a panoramic view.

Chat with AI: With the integration of OpenAI's API, users can describe a place they would like to see, and the 
application generates the panorama based on the user's description.

Save Favorites: Users can save their favorite panorama they find most interesting. Then all users of the wesbite can 
see a list of all the panoramas our users loved. 


How It Works
Exploring Panoramas: The application interfaces with the Google Maps API to fetch panoramic images. Users can navigate and explore these images with a simple click on the map. 

AI Interaction: Users can describe a location they would like to see, and ChatGPT will generate a list of coordinates based on 
the user prompt. From there, the application will take the coordinates and generate the nearest panoramic view.

Database Interaction: Users can save their favorite panoramas. These are stored in a MongoDB database, and users view the list of all panoramas our users found interesting. 

Tech Stack
Backend: Node.js, Express
Database: MongoDB
Frontend: React, CSS
External APIs: Google Maps, OpenAI