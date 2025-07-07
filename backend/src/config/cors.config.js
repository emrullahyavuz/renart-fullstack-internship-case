const corsOptions = {
    origin: process.env.CORS_ORIGIN ? [process.env.CORS_ORIGIN, "http://localhost:3000", "http://localhost:5173"] : ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Authorization",
        "Cache-Control",
        "Pragma"
    ],
    exposedHeaders: ["Content-Length", "X-Requested-With"],
    maxAge: 86400 // 24 hours
};

module.exports = corsOptions;