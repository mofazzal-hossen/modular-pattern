import fs from 'fs';
const logger = (req, res, next) => {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
    fs.appendFile("logger.txt", log, (err) => {
        if (err) {
            console.error("Failed to write log:", err);
        }
        else {
            console.log("Log saved successfully");
        }
    });
    next();
};
export default logger;
//# sourceMappingURL=logger.js.map