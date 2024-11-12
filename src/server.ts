import express from 'express';
import path from 'path';

const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname)));

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
