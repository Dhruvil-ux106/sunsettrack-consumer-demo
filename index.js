
const express = require("express");

const {
    sunsetTrack,
    registerRoute,
    generateReport,
    getSummary
} = require("sunsettrack");

const app = express();

// Register a dynamic deprecated endpoint
registerRoute({
    method: "GET",
    path: "/api/v1/users/:id",
    successor: "/api/v2/users/:id",
    deprecatedAt: "2026-11-01",
    sunsetAt: "2027-01-01"
});

// Register middleware
app.use(sunsetTrack());

// Old API with a dynamic user ID
app.get("/api/v1/users/:id", (req, res) => {
    res.json({
        message: "Dynamic route working",
        userId: req.params.id
    });
});

// New API
app.get("/api/v2/users/:id", (req, res) => {
    res.json({
        message: "New API working",
        userId: req.params.id
    });
});

// Migration report
app.get("/sunset-report", (req, res) => {
    res.json({
        summary: getSummary(),
        routes: generateReport()
    });
});

// Start server
app.listen(3000, () => {
    console.log("SunsetTrack consumer running on port 3000");
});
