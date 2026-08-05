import app from "./app.js";
import dotenv from "dotenv";
import sequelize from "./config/database.js"
import User from "./database/models/user.js";

dotenv.config;

const PORT = process.env.PORT || 3000;

async function startServer() {
    try{
        const users = await User.findAll();
        await sequelize.authenticate();

        console.log("Banco conectado com sucesso!")
        app.listen(PORT, () => {
            console.log(`Servidor rodando em: http://localhost:${PORT}`)
        });

    } catch(error){
        console.error("Erro ao conectar com o banco!");
        console.error(error);
    };
    
};

startServer();


