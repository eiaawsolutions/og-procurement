import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { hasSupabaseConfig } from "./config/supabaseClient.js";
import hseIncidentsRouter from "./routes/hseIncidents.js";
import purchaseOrdersRouter from "./routes/purchaseOrders.js";
import tendersRouter from "./routes/tenders.js";
import vendorsRouter from "./routes/vendors.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    supabaseConfigured: hasSupabaseConfig
  });
});

app.use("/api/tenders", tendersRouter);
app.use("/api/vendors", vendorsRouter);
app.use("/api/purchase-orders", purchaseOrdersRouter);
app.use("/api/hse-incidents", hseIncidentsRouter);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
