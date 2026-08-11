import express from "express";

import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import paymentMethodRoutes from "./routes/paymentMethod.routes.js"

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/paymentmethod", paymentMethodRoutes);


export default app;

