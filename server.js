import app from "./src/app.js";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Local server listening on http://localhost:${port}`);
})
