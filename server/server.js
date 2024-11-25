import http from 'http';
// import cors from 'cors';
import app from './app.js';


const port = process.env.PORT;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});