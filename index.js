const server = require('./src');
const PORT = 3000;

server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));