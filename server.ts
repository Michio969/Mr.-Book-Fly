import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import PDFDocument from "pdfkit";
import Stripe from "stripe";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Stripe Payment Intent
  app.post("/api/create-payment-intent", async (req, res) => {
    const { amount, currency = "usd" } = req.body;

    try {
      const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
      
      if (!stripeSecretKey) {
        // If no Stripe key is provided, return a simulated client secret
        // This allows the app to function in a demo mode without crashing
        return res.json({ 
          clientSecret: "pi_simulated_secret",
          simulated: true
        });
      }

      const stripe = new Stripe(stripeSecretKey, {
        apiVersion: "2023-10-16" as any, // Use a stable API version
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Stripe error:", error);
      res.status(400).json({ error: { message: error.message } });
    }
  });

  // Dummy PDF Generation Endpoint
  app.post("/api/generate-pdf", (req, res) => {
    const { type, details } = req.body;

    try {
      const doc = new PDFDocument({ margin: 50 });
      
      // Set response headers for PDF download
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=mr-book-and-fly-${type}-${Date.now()}.pdf`
      );

      // Pipe the PDF document to the response
      doc.pipe(res);

      // Add Header
      doc.fontSize(24).font("Helvetica-Bold").text("Mr. Book & Fly", { align: "center" });
      doc.fontSize(12).font("Helvetica").text("100% Embassy Acceptable Bookings", { align: "center" });
      doc.moveDown(2);

      // Add Title
      let title = "Booking Confirmation";
      if (type === "flight") title = "Flight Reservation";
      if (type === "hotel") title = "Hotel Booking";
      if (type === "event") title = "Event Booking";
      if (type === "invitation") title = "Invitation Letter";

      doc.fontSize(18).font("Helvetica-Bold").text(title, { align: "center" });
      doc.moveDown(1);

      // Add Details
      doc.fontSize(12).font("Helvetica");
      
      // Common details
      doc.text(`Booking Reference: ${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
      doc.text(`Date Issued: ${new Date().toLocaleDateString()}`);
      doc.moveDown(1);

      // Specific details based on type
      if (details) {
        Object.entries(details).forEach(([key, value]) => {
          // Format key: camelCase to Title Case
          const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
          doc.font("Helvetica-Bold").text(`${formattedKey}: `, { continued: true });
          doc.font("Helvetica").text(String(value));
        });
      }

      doc.moveDown(2);

      // Add Footer/Disclaimer
      doc.fontSize(10).fillColor("gray");
      doc.text(
        "Disclaimer: This document is provided by Mr. Book & Fly for visa application purposes. " +
        "It represents a valid reservation at the time of issuance. " +
        "Please verify with the respective embassy for specific requirements.",
        { align: "center" }
      );

      // Finalize the PDF
      doc.end();

    } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ error: "Failed to generate PDF" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
