import { createLogger, transports, format } from 'winston'

export const logger = createLogger({
  transports: [
    new transports.Console({}),
    new transports.File({
      level: 'error',
      filename: 'logs/server.log',
      format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
  ],
})
