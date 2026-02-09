const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDb = require("./config/connectionDb");

const app = express();
const PORT = process.env.PORT || 3000;

connectDb();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());
app.use(express.static("public"));

app.use("/", require("./routes/user"));
app.use("/recipe", require("./routes/recipe"));

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
