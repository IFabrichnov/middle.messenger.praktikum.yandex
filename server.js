import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'src', 'index.html'));
  res.status(200);
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
