import { ElementModel } from "./src/models/element_model.js";
import sequelize from "./src/config/database.js";

const productos = [
  {
    name: "Laptop HP Pavilion",
    description: "Laptop 15 pulgadas, Intel Core i5, 8GB RAM, 512GB SSD",
    type: "Electrónica",
    quantity: 10,
  },
  {
    name: "Mouse Logitech M305",
    description: "Mouse inalámbrico, receptor USB nano",
    type: "Periférico",
    quantity: 25,
  },
  {
    name: "Teclado Mecánico Redragon",
    description: "Teclado mecánico RGB, switches azules",
    type: "Periférico",
    quantity: 15,
  },
  {
    name: "Monitor Samsung 24\"",
    description: "Monitor Full HD 1080p, 75Hz, panel IPS",
    type: "Electrónica",
    quantity: 8,
  },
  {
    name: "Auriculares Sony WH-1000XM4",
    description: "Auriculares inalámbricos con cancelación de ruido",
    type: "Audio",
    quantity: 5,
  },
  {
    name: "Silla Gamer DXRacer",
    description: "Silla ergonómica con soporte lumbar y apoyabrazos 4D",
    type: "Mobiliario",
    quantity: 3,
  },
  {
    name: "Webcam Logitech C920",
    description: "Cámara web Full HD 1080p con micrófono integrado",
    type: "Periférico",
    quantity: 12,
  },
  {
    name: "Disco SSD Kingston 1TB",
    description: "Disco de estado sólido SATA, velocidad 550MB/s lectura",
    type: "Almacenamiento",
    quantity: 20,
  },
  {
    name: "Hub USB-C 7 en 1",
    description: "Hub con HDMI, USB 3.0, SD card, carga rápida",
    type: "Accesorio",
    quantity: 0,
  },
  {
    name: "Tablet Samsung Galaxy Tab A8",
    description: "Tablet 10.5 pulgadas, 64GB, Android 12",
    type: "Electrónica",
    quantity: 6,
  },
];

const seed = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la DB establecida");

    await sequelize.sync({ alter: true });
    console.log("Tablas sincronizadas");

    // Evitar duplicados: solo inserta si la tabla está vacía
    const count = await ElementModel.count();
    if (count > 0) {
      console.log(`  La tabla ya tiene ${count} productos. No se insertaron duplicados.`);
      console.log("   Si querés reinsertar, eliminá los registros primero.");
      process.exit(0);
    }

    await ElementModel.bulkCreate(productos);
    console.log(` ${productos.length} productos insertados correctamente:`);
    productos.forEach((p) => console.log(`   - ${p.name} (${p.type})`));

    process.exit(0);
  } catch (error) {
    console.error("Error al ejecutar el seed:", error.message);
    process.exit(1);
  }
};

seed();
