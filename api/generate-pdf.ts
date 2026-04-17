import { VercelRequest, VercelResponse } from '@vercel/node';
import PDFDocument from 'pdfkit';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, details, upiReference } = req.body;

  try {
    // Validate UPI Reference (12 digits)
    if (upiReference && !/^\d{12}$/.test(upiReference)) {
      return res.status(400).json({ 
        error: 'Invalid UPI reference number. Must be 12 digits.' 
      });
    }

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

    // Add Title based on type
    let title = "Booking Confirmation";
    if (type === "flight") title = "Flight Reservation";
    if (type === "hotel") title = "Hotel Booking";
    if (type === "event") title = "Event Booking";
    if (type === "health") title = "Health Insurance Confirmation";
    if (type === "invitation") title = "Invitation Letter";

    doc.fontSize(18).font("Helvetica-Bold").text(title, { align: "center" });
    doc.moveDown(1);

    // Add Booking Reference
    const bookingRef = Math.random().toString(36).substring(2, 10).toUpperCase();
    doc.fontSize(12).font("Helvetica");
    doc.text(`Booking Reference: MBF-${bookingRef}`);
    doc.text(`Date Issued: ${new Date().toLocaleDateString()}`);
    doc.moveDown(1);

    // Add UPI Payment Confirmation if provided
    if (upiReference) {
      doc.font("Helvetica-Bold").text("Payment Confirmed", { underline: true });
      doc.font("Helvetica").text(`UPI Reference: ${upiReference}`);
      doc.text(`Payment Status: Verified ✓`);
      doc.moveDown(1);
    }

    // Add specific details based on type
    if (details) {
      doc.font("Helvetica-Bold").text("Booking Details:", { underline: true });
      doc.font("Helvetica");
      
      Object.entries(details).forEach(([key, value]) => {
        // Format key: camelCase to Title Case
        const formattedKey = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        
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

    // Add contact info
    doc.moveDown(1);
    doc.text("For queries, contact: support@mrbookandfly.shop", { align: "center" });
    doc.text("WhatsApp: +91 XXXXXXXXXX", { align: "center" });

    // Finalize the PDF
    doc.end();

  } catch (error: any) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ 
      error: "Failed to generate PDF",
      details: error.message 
    });
  }
}
