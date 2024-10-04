const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

const logEvents = async (message) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const logItem = `${uuid()}\t${dateTime}\t${message}\n`;

  try {
    const logsDir = path.join(__dirname, 'Logs');
    
    if (!await fs.stat(logsDir).catch(() => false)) {
      await fs.mkdir(logsDir);
    }

    const filePath = path.join(logsDir, 'eventLogs.txt');
    await fs.appendFile(filePath, logItem);
    console.log('Log written successfully:', logItem);
  } catch (err) {
    console.error('Error writing log:', err);
  }
};

module.exports = logEvents;
