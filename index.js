import express from "express";
import cppkieParser from 'cookie-parser';
import multer from "multer";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";

const PORT = 8800;
const app = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage });

app.use(express.json());
app.use(cppkieParser());
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

app.post('/api/upload', upload.single('file'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.status(200).json('Image uploaded');
})

app.get('/health', (req, res) => {
    res.json("it works!");
});

app.listen(PORT, () => {
    console.log(`Blog server is up! on port: ${PORT}`);
});