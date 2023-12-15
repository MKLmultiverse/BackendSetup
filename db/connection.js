const mongoose = require('mongoose');

; (async () => {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Mongo connection successfull!!...on host : " + connectionInstance.connection.host)
})();