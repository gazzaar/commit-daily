import fs from 'fs';
import path from 'path';
import pino from 'pino';
import pretty from 'pino-pretty';

const streams: pino.DestinationStream[] = [
  process.env.NODE_ENV === 'production' ? process.stdout : pretty(),
  fs.createWriteStream(path.join(__dirname, '..', 'process.log'), {
    flags: 'a',
  }),
];

export const LOGGER = pino(
  {
    redact: ['body.password'],
    formatters: {
      bindings: () => ({}),
    },
  },
  pino.multistream(streams),
);
