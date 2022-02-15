const winston = require('winston');
require('winston-daily-rotate-file');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    //   winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.align(),
      winston.format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
      )
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    new winston.transports.DailyRotateFile({
        filename: 'src/logger/logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        level: 'info'
    }),
    new winston.transports.File({ filename: 'src/logger/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'src/logger/combined.log' }),
  ],
});

module.exports = logger