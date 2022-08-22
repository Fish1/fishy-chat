import dotenv from 'dotenv';

function initialize() {
  dotenv.config();
}

function getPort() {
  return process.env.PORT;
}

export default { initialize, getPort };