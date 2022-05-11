const express = require("express");
const morgan = require("morgan");
const mongoConfig = require("./config");

require("dotenv").config();


const PORT = process.env.PORT || 3000;
const server = express();

server.use(express.json());
server.use(morgan("dev"));

server.get('/', (req, res) => {
    res.status(200).json({
        message: "API UP!"
    });
});

const userRouter = require('./routes/user')
server.use('/user',userRouter)

const bookRouter = require('./routes/book')
server.use('/book',bookRouter)


server.listen(PORT, () => {
    mongoConfig()
    console.log(`server is listening on ${PORT}`)
})