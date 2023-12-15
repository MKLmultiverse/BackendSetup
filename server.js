require('./config/dotenv')
const app = require('./app');
require('./db/connection');

//handling uncaught exceptions
process.on('uncaughtException',err=>{
    console.error("server :: uncaughtExeption error : "+err.message);
    console.log("shutting down the server due to uncaught exception");
    server.close(()=>{
        process.exit(1);
    });
})

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})

//unhandled promise rejection
process.on('unhandledRejection',err => {
    console.error("Server :: unhandled error : " + err.message);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(()=>{
        process.exit(1);
    })
})