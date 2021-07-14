import Logger, { ILogger, ILogLevel } from 'js-logger'

const emojis: Record<string, string> = {}
emojis[`${Logger.ERROR.value}`] = '🔴'
emojis[`${Logger.WARN.value}`] = '🟡'

const gccLogger = Logger.createDefaultHandler({
  formatter: function(messages, context) {
    // prefix each log message with a timestamp.
    messages.unshift('[GamersClub Challenger]')

    const emoji = emojis[context.level.value] || '🔵'
    messages.unshift(emoji)

    messages.unshift(new Date().toLocaleTimeString())
  }
});

Logger.useDefaults()
Logger.setLevel(process.env.NODE_ENV === 'development' ? Logger.DEBUG : Logger.WARN)
Logger.setHandler(gccLogger)