const OpenAI = require('openai');


// setup openai api key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Convert coordinate with direction to number
function coordinateToNumber(coordinate) {
    const value = parseFloat(coordinate); // Parse the number from the string
    const direction = coordinate.slice(-1); // Get the last character

    if (direction.toUpperCase() === 'S' || direction.toUpperCase() === 'W') {
        // If the direction is South or West, the value is negative
        return -value;
    }

    // Otherwise, the value is positive
    return value;
}

async function getOpenAiResponse(req, res) {
    const userInput = req.body.userInput;
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `Return the latitude and longitude of: ${userInput}. Return it in this 
                    EXACT format: {Latitude Coordinate} + ","  {Longitude Coordinate}. I dont want anything else in the response 
                    besides those the actual coordinates in that order.`,
                },
            ],
            temperature: 0,
            max_tokens: 100,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });

        const message = response.choices[0].message.content;
        // Regular expression to match latitude and longitude with direction
        const coordinates = message.match(/-?\d+\.\d+°?\s*[NnSsEeWw]/g);

        if (coordinates && coordinates.length === 2) {
            // Parse the latitude and longitude from the matched strings
            const lat = coordinateToNumber(coordinates[0]);
            const lng = coordinateToNumber(coordinates[1]);

            //console.log(lat, lng); // Logs the latitude and longitude with directions

            // Return the latitude and longitude as strings
            res.json({
              lat,
              lng
            });
        } else {
            throw new Error('Could not parse latitude and longitude from response');
        }

    } catch(err) {
        console.error('Error: ' + err);
        res.status(500).json({ error: "Error processing the request."});
    }
};

module.exports = {
    getOpenAiResponse,
};
