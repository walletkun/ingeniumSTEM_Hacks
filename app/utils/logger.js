/*
    This program exports a error logging object.
*/
const winston = require('winston');

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

module.exports = logger;