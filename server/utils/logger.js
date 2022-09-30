import winston from 'winston';

const logger = winston.createLogger({
  transports:[
      new winston.transports.File({
          filename:'../logs/activity.log',
          level:'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
            winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }))
      }),
      new winston.transports.File({
          filename:'../logs/error.log',
          level:'error',
          format: winston.format.combine(winston.format.timestamp(),winston.format.json())
      })
  ]
})

module.exports = logger;