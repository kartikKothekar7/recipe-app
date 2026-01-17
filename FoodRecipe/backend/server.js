const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDb = require("./config/connectionDb");

const app = express();
const PORT = process.env.PORT || 3000;

connectDb();

/* ✅ FULL CORS CONFIG */
app.use(cors({
    origin: "https://recipe-app-fronted.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

/* ✅ IMPORTANT: handle preflight */
app.options("*", cors());

app.use(express.json());
app.use(express.static("public"));

app.use("/", require("./routes/user"));
app.use("/recipe", require("./routes/recipe"));

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
