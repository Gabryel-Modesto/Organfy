import express from "express";
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import paymentMethodRoutes from "./routes/paymentMethod.routes.js"
import goalTransactionRoutes from "./routes/goalTransaction.routes.js"
import transactionRoutes from "./routes/transaction.routes.js";
import "./database/associations.js";    
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/paymentmethod", paymentMethodRoutes);
app.use("/goal-transactions",goalTransactionRoutes);
app.use("/transactions",transactionRoutes);
app.use("/dashboard",dashboardRoutes);


export default app;

