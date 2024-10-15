// Replace this with your actual Cohere API key
const COHERE_API_KEY = 'P31oXC6RZzHhuqi8MHfhnSknWOKihQ60MxKztqHh';

// Function to fetch AI response
async function fetchAIResponse(query) {
    const response = await fetch('https://api.cohere.ai/v1/generate', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${COHERE_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'command-xlarge-nightly', // You can adjust the model here
            prompt: `Provide a short, summarized answer in bullet points for the following query: ${query}`, // Ask for bullet points
            max_tokens: 200, // Limit the number of tokens in the response for brevity
            temperature: 0.5 // Adjust response creativity
        }),
    });

    const data = await response.json();
    return data.generations[0].text;
}

// Function to format the AI response into bullet points
function formatResponseAsBullets(response) {
    // Split the response into lines and wrap each one in <li> tags
    const points = response.split('\n').filter(point => point.trim() !== ''); // Removing empty lines
    return points.map(point => `<li>${point.trim()}</li>`).join('');
}

// Event listener for the search button
document.getElementById('search-btn').addEventListener('click', async () => {
    const query = document.getElementById('search-query').value;
    const responseContainer = document.getElementById('ai-response');

    if (query.trim() === '') {
        alert('Please enter a query.');
        return;
    }

    // Display loading message
    responseContainer.innerHTML = 'AI is thinking...';

    try {
        // Fetch AI response from Cohere
        const aiResponse = await fetchAIResponse(query);

        // Format the response into bullet points
        const bulletPoints = formatResponseAsBullets(aiResponse);

        // Display the formatted response
        responseContainer.innerHTML = `<ul>${bulletPoints}</ul>`;
    } catch (error) {
        console.error('Error fetching AI response:', error);
        responseContainer.textContent = 'Error fetching AI response. Please try again.';
    }
});
