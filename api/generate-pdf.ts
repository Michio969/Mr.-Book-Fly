import type { VercelRequest, VercelResponse } from '@vercel/node';
import PDFDocument from 'pdfkit';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
    if (type === "health") title = "Health Insurance Confirmation";
    if (type === "invitation") title = "Invitation Letter";

    doc.fontSize(18).font("Helvetica-Bold").text(title, { align: "center" });
    doc.moveDown(1);

    // Add Booking Reference
    const bookingRef = Math.random().toString(36).substring(2, 10).toUpperCase();
    doc.fontSize(12).font("Helvetica");
    doc.text(`Booking Reference: MBF-${bookingRef}`);
    doc.text(`Date Issued: ${new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
    doc.moveDown(1);

    // Add Details
    if (details) {
      doc.font("Helvetica-Bold").text("Booking Details:", { underline: true });
      doc.font("Helvetica");
      
      Object.entries(details).forEach(([key, value]) => {
        if (key === 'upiReference') return; // Skip UPI ref in general details
        
        const formattedKey = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        
        doc.font("Helvetica-Bold").text(`${formattedKey}: `, { continued: true });
        doc.font("Helvetica").text(String(value));
      });
    }

    doc.moveDown(2);

    // Add Footer
    doc.fontSize(10).fillColor("gray");
    doc.text(
      "Disclaimer: This document is provided by Mr. Book & Fly for visa application purposes. " +
      "It represents a valid reservation at the time of issuance. " +
      "Please verify with the respective embassy for specific requirements.",
      { align: "center" }
    );

    doc.moveDown(1);
    doc.text("For support: 92sweetflower@gmail.com", { align: "center" });
    doc.text("Website: www.mrbookandfly.shop", { align: "center" });

    // Finalize the PDF
    doc.end();

  } catch (error: any) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ 
      error: "Failed to generate PDF",
      message: error.message 
    });
  }
}
