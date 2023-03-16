import express from "express";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";

const PORT = 8800;
const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

app.get('/health', (req, res) => {
    res.json("it works!");
});

app.listen(PORT, () => {
    console.log(`Blog server is up! on port: ${PORT}`);
});