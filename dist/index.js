"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const accounts_1 = __importDefault(require("./routes/accounts"));
const characters_1 = __importDefault(require("./routes/characters"));
const characterItems_1 = __importDefault(require("./routes/characterItems"));
const characterStatus_1 = __importDefault(require("./routes/characterStatus"));
const app = (0, express_1.default)();
// Add middleware to parse JSON bodies
app.use(express_1.default.json());
app.use('/api/users', users_1.default);
app.use('/api/accounts', accounts_1.default);
app.use('/api/characters', characters_1.default);
app.use('/api/character-items', characterItems_1.default);
app.use('/api/character-status', characterStatus_1.default);
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// "start:dev": "npx ts-node ./src/index.ts"
