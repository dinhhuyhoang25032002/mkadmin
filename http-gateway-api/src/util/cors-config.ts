export const ConfixCors = {
    origin: "http://localhost:3000",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ['content-type', 'Authorization', 'Origin', 'Access-Control-Allow-Origin', 'Accept', 'Options', 'X-Requested-With'],
    exposedHeaders: ['Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
} 