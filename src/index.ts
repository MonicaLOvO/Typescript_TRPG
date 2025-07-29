import express from "express";
import usersRouter from "./routes/users";
import accountsRouter from "./routes/accounts";
import charactersRouter from "./routes/characters";
import characterItemsRouter from "./routes/characterItems";
import characterStatusRouter from "./routes/characterStatus";
import roomsRouter from "./routes/rooms";
import actorsRouter from "./routes/actors";
import notesRouter from "./routes/notes";
import classBaseRouter from "./routes/classBase";
import classItemsRouter from "./routes/classItems";
import classStatusRouter from "./routes/classStatus";

const app = express();

// Add middleware to parse JSON bodies
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/characters', charactersRouter);
app.use('/api/character-items', characterItemsRouter);
app.use('/api/character-status', characterStatusRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/actors', actorsRouter);
app.use('/api/notes', notesRouter);
app.use('/api/class-bases', classBaseRouter);
app.use('/api/class-items', classItemsRouter);
app.use('/api/class-status', classStatusRouter);

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// "start:dev": "npx ts-node ./src/index.ts"