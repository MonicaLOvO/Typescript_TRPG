import express from "express";
import usersRouter from "./routes/users";
import accountsRouter from "./routes/accounts";

const app = express();

// Add middleware to parse JSON bodies
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/accounts', accountsRouter);

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// "start:dev": "npx ts-node ./src/index.ts"