import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false,
  }
);

// Opcional: verificar conexión al inicio
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la DB establecida correctamente");
    // Sincronizar modelos con la DB (crea tablas si no existen)
    await sequelize.sync({ alter: true });
    console.log("✅ Tablas sincronizadas correctamente");
  } catch (error) {
    console.error("❌ No se pudo conectar a la DB:", error);
    process.exit(1);
  }
};

testConnection();

export default sequelize;

