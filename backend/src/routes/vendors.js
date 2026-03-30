import express from "express";
import { hasSupabaseConfig, supabase } from "../config/supabaseClient.js";
import { fallbackVendors } from "../data/fallbackData.js";

const router = express.Router();

const ensureSupabaseReady = (res) => {
  if (hasSupabaseConfig) {
    return true;
  }

  res.status(503).json({
    error: "Supabase is not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY."
  });
  return false;
};

router.get("/", async (_req, res) => {
  if (!hasSupabaseConfig) {
    return res.json({ source: "fallback", data: fallbackVendors });
  }

  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .order("nm", { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json({ source: "supabase", data });
});

router.post("/", async (req, res) => {
  if (!ensureSupabaseReady(res)) {
    return;
  }

  const payload = req.body;
  const { data, error } = await supabase.from("vendors").insert([payload]).select().single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json({ source: "supabase", data });
});

router.put("/:id", async (req, res) => {
  if (!ensureSupabaseReady(res)) {
    return;
  }

  const { id } = req.params;
  const payload = req.body;

  if (payload.id && payload.id !== id) {
    return res.status(400).json({ error: "Payload id must match route id." });
  }

  const { data, error } = await supabase
    .from("vendors")
    .update(payload)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: "Vendor not found." });
  }

  return res.json({ source: "supabase", data });
});

router.delete("/:id", async (req, res) => {
  if (!ensureSupabaseReady(res)) {
    return;
  }

  const { id } = req.params;
  const { data, error } = await supabase
    .from("vendors")
    .delete()
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: "Vendor not found." });
  }

  return res.json({ source: "supabase", data });
});

export default router;
