import winston from 'winston';

// Create and configure a logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), // Logs to console
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Error logs to file
        new winston.transports.File({ filename: 'logs/combined.log' }) // Combined logs
    ]
});

// Export logger for usage in other modules
export default logger;