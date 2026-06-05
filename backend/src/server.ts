import app from "./index.ts";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server run on http://localhost:${PORT}`);
});
