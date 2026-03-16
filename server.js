// express framework
const express = require("express");

// microsoft sql driver
const sql = require("mssql");

// cors allow mobile requests
const cors = require("cors");

// create app
const app = express();

// middleware
app.use(express.json());
app.use(cors());


// DATABASE CONFIGURATION
const config = {

    server: "localhost\\SQLEXPRESS", // your sql server

    database: "login_app", // your database name

    options: {
        trustServerCertificate: true
    }

};


// ROOT ROUTE (for testing server)
app.get("/", (req, res) => {

    res.send("Backend server is running");

});


// LOGIN API
app.post("/login", async (req, res) => {

    try {

        // get data from request
        const { username, password } = req.body;

        // connect database
        await sql.connect(config);

        // sql query
        const result = await sql.query`
        SELECT * FROM users
        WHERE username=${username}
        AND password=${password}
        `;

        // check user exists
        if (result.recordset.length > 0) {

            res.json({
                status: true,
                message: "Login success"
            });

        } else {

            res.json({
                status: false,
                message: "Invalid username or password"
            });

        }

    } catch (error) {

        console.log(error);

        res.json({
            status: false,
            message: "Server error"
        });

    }

});


// SERVER PORT
const PORT = process.env.PORT || 3000;

// START SERVER
app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});