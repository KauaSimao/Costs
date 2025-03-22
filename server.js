require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());

// Conectar ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 MongoDB conectado!"))
  .catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));

// Definir Schema e Modelo do Projeto
const ProjectSchema = new mongoose.Schema({
  name: String,
  cost: Number,
  services: Array
});

const Project = mongoose.model("Project", ProjectSchema);

// Rotas da API
app.get("/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.post("/projects", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
