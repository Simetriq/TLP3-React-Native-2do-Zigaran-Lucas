import { ElementModel } from "../models/element_model.js";

// Obtener todos los elementos
export const getElements = async (req, res) => {
  try {
    const elements = await ElementModel.findAll();
    res.status(200).json(elements);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener elementos" });
  }
};

// Obtener un elemento por ID
export const getElementById = async (req, res) => {
  try {
    const { id } = req.params;
    const element = await ElementModel.findByPk(id);
    if (!element) {
      return res.status(404).json({ error: "Elemento no encontrado" });
    }
    res.status(200).json(element);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener elemento" });
  }
};

// Crear un nuevo elemento
export const createElement = async (req, res) => {
  try {
    const { name, description, type, quantity } = req.body;
    const newElement = await ElementModel.create({
      name,
      description,
      type,
      quantity,
    });
    res.status(201).json(newElement);
  } catch (error) {
    res.status(500).json({ error: "Error al crear elemento" });
  }
};

// Actualizar un elemento
export const updateElement = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, type, quantity } = req.body;
    const element = await ElementModel.findByPk(id);
    if (!element) {
      return res.status(404).json({ error: "Elemento no encontrado" });
    }
    await element.update({ name, description, type, quantity });
    res.status(200).json(element);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar elemento" });
  }
};

// Eliminar un elemento
export const deleteElement = async (req, res) => {
  try {
    const { id } = req.params;
    const element = await ElementModel.findByPk(id);
    if (!element) {
      return res.status(404).json({ error: "Elemento no encontrado" });
    }
    await element.destroy();
    res.status(200).json({ message: "Elemento eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar elemento" });
  }
};