import jsPDF from "jspdf";

/**
 * Client-side PDF generation using jsPDF.
 * Replaces the old server-side /api/generate-pdf endpoint which required
 * a running Express + pdfkit backend — not available in static deployment.
 */
export async function generatePDF(type: string, details: Record<string, unknown>) {
  try {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let y = 20;

    // ── Header ──────────────────────────────────────────────────────────────
    doc.setFillColor(30, 64, 175); // blue-800
    doc.rect(0, 0, pageWidth, 35, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Mr. Book & Fly", pageWidth / 2, 14, { align: "center" });
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("100% Embassy Acceptable Bookings | mrbookandfly.shop", pageWidth / 2, 22, { align: "center" });
    doc.setFontSize(9);
    doc.text("WhatsApp: +91 92 2088 0000  |  support@mrbookandfly.shop", pageWidth / 2, 29, { align: "center" });

    y = 45;
    doc.setTextColor(30, 30, 30);

    // ── Document Title ───────────────────────────────────────────────────────
    const titleMap: Record<string, string> = {
      flight: "Flight Reservation Confirmation",
      hotel: "Hotel Booking Confirmation",
      event: "Event Booking Confirmation",
      invitation: "Invitation Letter for Visa",
      insurance: "Travel Health Insurance Confirmation",
      visa: "Visa Support Document",
      order: "Booking Confirmation",
    };
    const title = titleMap[type] ?? "Booking Confirmation";

    doc.setFillColor(239, 246, 255); // blue-50
    doc.roundedRect(margin, y, contentWidth, 14, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(30, 64, 175);
    doc.text(title, pageWidth / 2, y + 9.5, { align: "center" });
    y += 20;

    // ── Reference & Date ────────────────────────────────────────────────────
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const refNo = Math.random().toString(36).substring(2, 10).toUpperCase();
    const dateIssued = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    doc.text(`Booking Reference: MBF-${refNo}`, margin, y);
    doc.text(`Date Issued: ${dateIssued}`, pageWidth - margin, y, { align: "right" });
    y += 5;

    // Horizontal rule
    doc.setDrawColor(200, 210, 230);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    // ── Details ─────────────────────────────────────────────────────────────
    if (details && Object.keys(details).length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(30, 64, 175);
      doc.text("Booking Details", margin, y);
      y += 7;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(30, 30, 30);

      let rowIdx = 0;
      for (const [key, value] of Object.entries(details)) {
        if (value === null || value === undefined || value === "") continue;

        // Format key: camelCase → Title Case
        const formattedKey = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (s) => s.toUpperCase())
          .trim();

        const valueStr = String(value);

        // Alternate row shading
        if (rowIdx % 2 === 0) {
          doc.setFillColor(247, 250, 255);
          doc.rect(margin, y - 4, contentWidth, 8, "F");
        }

        doc.setFont("helvetica", "bold");
        doc.text(`${formattedKey}:`, margin + 2, y);
        doc.setFont("helvetica", "normal");

        // Wrap long values
        const splitValue = doc.splitTextToSize(valueStr, contentWidth - 60);
        doc.text(splitValue, margin + 60, y);

        y += Math.max(8, splitValue.length * 6);
        rowIdx++;

        // Page break if needed
        if (y > 260) {
          doc.addPage();
          y = 20;
        }
      }
    }

    y += 5;
    doc.setDrawColor(200, 210, 230);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    // ── Validity Notice ─────────────────────────────────────────────────────
    doc.setFillColor(240, 253, 244); // green-50
    doc.roundedRect(margin, y, contentWidth, 20, 3, 3, "F");
    doc.setTextColor(22, 101, 52); // green-800
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("✓ Validity Notice", margin + 4, y + 6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(
      "This document is valid for embassy/consulate visa application purposes. It represents a confirmed",
      margin + 4,
      y + 12
    );
    doc.text(
      "reservation/booking at the time of issuance. Verify specific requirements with the respective embassy.",
      margin + 4,
      y + 17
    );
    y += 26;

    // ── Footer ───────────────────────────────────────────────────────────────
    const footerY = doc.internal.pageSize.getHeight() - 18;
    doc.setFillColor(30, 64, 175);
    doc.rect(0, footerY, pageWidth, 18, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Mr. Book & Fly  |  www.mrbookandfly.shop  |  This is a computer-generated document.",
      pageWidth / 2,
      footerY + 7,
      { align: "center" }
    );
    doc.text(
      "For support contact us on WhatsApp. Document valid for visa application purposes only.",
      pageWidth / 2,
      footerY + 13,
      { align: "center" }
    );

    // ── Save / Download ──────────────────────────────────────────────────────
    const filename = `Mr-Book-Fly-${title.replace(/\s+/g, "-")}-${Date.now()}.pdf`;
    doc.save(filename);

    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}
