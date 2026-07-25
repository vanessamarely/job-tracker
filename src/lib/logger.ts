type LogContext = Record<string, unknown>

function format(level: string, message: string, context?: LogContext) {
  const base = `[${level}] ${message}`
  return context ? `${base} ${JSON.stringify(context)}` : base
}

export const logger = {
  info(message: string, context?: LogContext) {
    console.log(format('INFO', message, context))
  },
  warn(message: string, context?: LogContext) {
    console.warn(format('WARN', message, context))
  },
  error(message: string, context?: LogContext) {
    console.error(format('ERROR', message, context))
  },
}
