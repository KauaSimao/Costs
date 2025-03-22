const express = require("express");
const Category = require("../models/Category");

const router = express.Router(); // 🔹 Definição correta do router

// Rota POST para adicionar categorias
router.post("/", async (req, res) => {
  try {
    console.log("🧐 Headers:", req.headers);
    console.log("🔍 Body recebido:", req.body);

    const { categories } = req.body;
    if (!categories || categories.length === 0) {
      return res.status(400).json({ error: "Nenhuma categoria enviada" });
    }

    const newCategories = await Category.insertMany(categories);
    res.status(201).json({ message: "Categorias adicionadas com sucesso!", newCategories });
  } catch (error) {
    console.error("❌ Erro ao adicionar categorias:", error);
    res.status(500).json({ error: "Erro ao salvar categorias" });
  }
});

// Exportar o router corretamente
module.exports = router;
