# spotify-music-recommender
This is my Music Recommender Application that implements the Spotify API. 
This application is designed to integrate with `vercel`, a web hosting service.

### Linting
Run `npx prettier --write .`

### Vercel Integration
- Vercel is a service that focuses on providing easy deployment of static/front-end based applications
- On that note, Vercel does not heavily support server or backend deployment
- Therefore, in order to maintain the security of our application and the ability to call the spotify api, this will be done with serverless functions (which are supported by Vercel)

When you deploy your project to Vercel, each serverless function in your /api directory becomes accessible at a URL that follows this pattern: https://your-vercel-project-url.vercel.app/api/function-name, where function-name is the name of your serverless function file.

##### From the React App, Serverless functions are called like so:

**Step 1:** Identify Your Serverless Function Endpoint
Assume you have a serverless function named spotify-auth.ts in your /api directory. Once deployed, it will be accessible at an endpoint like https://your-vercel-project-url.vercel.app/api/spotify-auth.

**Step 2:** Use Axios to Make HTTP Requests
We will be using the Axios library to make HTTP requests to our serverless functions:
`npm install axios`
```
import axios from 'axios';
async function callSpotifyAuthFunction() {
  try {
    const response = await axios({
      method: 'get', // or 'post'
      url: 'https://your-vercel-project-url.vercel.app/api/spotify-auth',
      // If making a POST request, include data
      // data: { data: 'yourDataHere' },
    });

    console.log(response.data); // Process your data here
  } catch (error) {
    console.error('There was an error!', error);
  }
}
```

**Step 3:** Call Your Function from React Components
You can call callSpotifyAuthFunction from your React components, such as in response to user actions (e.g., button clicks) or during component lifecycle events (e.g., useEffect for data fetching on component mount).

**Step 4:** Handling CORS
When calling serverless functions from a client-side application, you might encounter CORS (Cross-Origin Resource Sharing) errors. If you're controlling both the frontend and the backend (serverless functions in this case), you can avoid these issues by ensuring your serverless functions include CORS headers in their responses. For example, in a Node.js/Express serverless function, you might include:

```
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
```