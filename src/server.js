import dotenv from "dotenv";
import app from "./app.js";
import sequelize from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {

    try {

        await sequelize.authenticate();

        console.log(
            "Banco conectado com sucesso!"
        );

        app.listen(PORT, () => {

            console.log(
                `Servidor rodando em: http://localhost:${PORT}`
            );

        });

    } catch (error) {

        console.error(
            "Erro ao conectar com o banco!"
        );

        console.error(error);
    }
}

startServer()   ;