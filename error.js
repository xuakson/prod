js:82:25)
      at Socket.emit (node:events:514:28)
      at Socket.emit (node:domain:489:12)
      at addChunk (node:internal/streams/readable:324:12)
      at readableAddChunk (node:internal/streams/readable:297:9) {
    code: 'ER_TOO_MANY_KEYS',
    errno: 1069,
    sqlState: '42000',
    sqlMessage: 'Too many keys specified; max 64 keys allowed',
    sql: 'ALTER TABLE `accounts` CHANGE `idAccount` `idAccount` INTEGER UNIQUE;',
    parameters: undefined
  },
  original: Error: Too many keys specified; max 64 keys allowed
      at Packet.asError (C:\Users\MAN\Desktop\newuf\node_modules\mysql2\