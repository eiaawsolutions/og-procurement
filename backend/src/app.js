import cors from "cors";
import express from "express";

import { hasSupabaseConfig } from "./config/supabaseClient.js";
import hseIncidentsRouter from "./routes/hseIncidents.js";
import purchaseOrdersRouter from "./routes/purchaseOrders.js";
import tendersRouter from "./routes/tenders.js";
import vendorsRouter from "./routes/vendors.js";

const app = express();

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

export default app;
