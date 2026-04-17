import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Traveler {
  fullName: string;
  email: string;
  phone: string;
  departureCity?: string;
  destinationCity?: string;
  departureDate?: string;
  returnDate?: string;
}

interface InvoiceData {
  orderId: string;
  date: string;
  serviceType: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  upiReference: string;
  serviceDetails: any;
  gst?: number;
}

// ─── Color Helpers ────────────────────────────────────────────────────────────
const BRAND_BLUE  = [26,  60, 110] as [number, number, number];
const ACCENT_BLUE = [37,  99, 235] as [number, number, number];
const LIGHT_BLUE  = [239, 246, 255] as [number, number, number];
const LIGHT_GREY  = [248, 250, 252] as [number, number, number];
const MID_GREY    = [100, 116, 139] as [number, number, number];
const DARK        = [ 30,  41,  59] as [number, number, number];
const WHITE       = [255, 255, 255] as [number, number, number];
const BORDER_GREY = [226, 232, 240] as [number, number, number];

function rgb(c: [number, number, number]) {
  return { r: c[0], g: c[1], b: c[2] };
}

export function generateInvoice(data: InvoiceData): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const PW = 210; // page width
  const ML = 14;  // margin left
  const MR = 14;  // margin right
  const CW = PW - ML - MR; // content width

  const subtotal = data.amount;
  const gst      = data.gst ?? subtotal * 0.18;
  const total    = subtotal + gst;

  // ── 1. HEADER BANNER ───────────────────────────────────────────────────────
  doc.setFillColor(...BRAND_BLUE);
  doc.rect(0, 0, PW, 38, 'F');

  // Company name
  doc.setTextColor(...WHITE);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Mr. Book & Fly', ML, 14);

  // Tagline
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(191, 215, 255);
  doc.text('100% Embassy Acceptable Bookings', ML, 20);
  doc.text('www.mrbookandfly.shop  |  support@mrbookandfly.shop', ML, 26);

  // INVOICE label (right)
  doc.setTextColor(...WHITE);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', PW - MR, 15, { align: 'right' });

  // Invoice # and Date (right)
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(191, 215, 255);
  doc.text('Invoice #', PW - MR, 22, { align: 'right' });
  doc.text('Date Issued', PW - MR, 29, { align: 'right' });

  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(data.orderId, PW - MR - 22, 22);
  doc.text(data.date,    PW - MR - 22, 29);

  // ── 2. BILLED TO + SERVICE INFO ────────────────────────────────────────────
  let y = 44;

  // Left box — Billed To
  const boxW = (CW - 6) / 2;
  doc.setFillColor(...LIGHT_BLUE);
  doc.roundedRect(ML, y, boxW, 28, 2, 2, 'F');

  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...ACCENT_BLUE);
  doc.text('BILLED TO', ML + 5, y + 6);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...DARK);
  doc.text(data.customerName,  ML + 5, y + 13);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(data.customerEmail, ML + 5, y + 19);
  doc.text(data.customerPhone, ML + 5, y + 25);

  // Right box — Service Details
  const rx = ML + boxW + 6;
  doc.setFillColor(...LIGHT_GREY);
  doc.setDrawColor(...BORDER_GREY);
  doc.setLineWidth(0.3);
  doc.roundedRect(rx, y, boxW, 28, 2, 2, 'FD');

  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...ACCENT_BLUE);
  doc.text('SERVICE DETAILS', rx + 5, y + 6);

  const serviceName = getServiceLabel(data.serviceType, data.serviceDetails);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...DARK);
  doc.text(serviceName, rx + 5, y + 13);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const travelers = data.serviceDetails?.travelers ?? [];
  doc.text(`Travelers: ${travelers.length || 1}`, rx + 5, y + 19);
  doc.text(`$${(data.amount / Math.max(travelers.length, 1)).toFixed(2)} per person`, rx + 5, y + 25);

  // ── 3. TRAVELER TABLE ──────────────────────────────────────────────────────
  y += 34;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...BRAND_BLUE);
  doc.text('Traveler Details', ML, y);
  y += 4;

  const isHealth = data.serviceType === 'health';
  const head = isHealth
    ? [['#', 'Full Name', 'Email', 'Phone']]
    : [['#', 'Full Name', 'From → To', 'Departure', 'Return']];

  const body: any[][] = travelers.length > 0
    ? travelers.map((t: Traveler, i: number) => isHealth
        ? [i + 1, t.fullName, t.email, t.phone]
        : [i + 1, t.fullName,
           `${t.departureCity || '—'} → ${t.destinationCity || '—'}`,
           t.departureDate || '—',
           t.returnDate    || '—'])
    : [[1, data.customerName, data.customerEmail, data.customerPhone]];

  const colWidths = isHealth
    ? [10, 50, 75, 47]
    : [10, 45, 60, 30, 37];

  (doc as any).autoTable({
    startY: y,
    head,
    body,
    theme: 'plain',
    headStyles: {
      fillColor: ACCENT_BLUE,
      textColor: WHITE,
      fontStyle: 'bold',
      fontSize: 8.5,
      cellPadding: { top: 5, bottom: 5, left: 5, right: 5 },
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: DARK,
      cellPadding: { top: 4, bottom: 4, left: 5, right: 5 },
    },
    alternateRowStyles: { fillColor: LIGHT_BLUE },
    columnStyles: Object.fromEntries(colWidths.map((w, i) => [i, { cellWidth: w }])),
    tableLineColor: BORDER_GREY,
    tableLineWidth: 0.3,
    margin: { left: ML, right: MR },
  });

  y = (doc as any).lastAutoTable.finalY + 8;

  // ── 4. TOTALS ──────────────────────────────────────────────────────────────
  const totX = ML + CW * 0.5;
  const totW = CW * 0.5;

  // Subtotal row
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...MID_GREY);
  doc.text('Subtotal', totX + 4, y + 5);
  doc.setTextColor(...DARK);
  doc.text(`$${subtotal.toFixed(2)}`, totX + totW - 4, y + 5, { align: 'right' });

  // GST row
  doc.setTextColor(...MID_GREY);
  doc.text('GST (18%)', totX + 4, y + 11);
  doc.setTextColor(...DARK);
  doc.text(`$${gst.toFixed(2)}`, totX + totW - 4, y + 11, { align: 'right' });

  // Total banner
  doc.setFillColor(...BRAND_BLUE);
  doc.roundedRect(totX, y + 14, totW, 14, 2, 2, 'F');
  doc.setTextColor(...WHITE);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL AMOUNT', totX + 5, y + 23);
  doc.setFontSize(12);
  doc.text(`$${total.toFixed(2)}`, totX + totW - 5, y + 23, { align: 'right' });

  y += 34;

  // ── 5. PAYMENT INFORMATION ────────────────────────────────────────────────
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...BRAND_BLUE);
  doc.text('Payment Information', ML, y);
  y += 4;

  (doc as any).autoTable({
    startY: y,
    body: [
      ['Payment Method', 'UPI'],
      ['UPI Reference',  data.upiReference],
      ['Status',         'PAID ✓'],
    ],
    theme: 'plain',
    bodyStyles: {
      fontSize: 8.5,
      cellPadding: { top: 4, bottom: 4, left: 8, right: 8 },
    },
    columnStyles: {
      0: { cellWidth: 50, fontStyle: 'bold', textColor: MID_GREY },
      1: { cellWidth: CW - 50, textColor: DARK },
    },
    didParseCell: (hookData: any) => {
      // Green text for PAID status
      if (hookData.row.index === 2 && hookData.column.index === 1) {
        hookData.cell.styles.textColor = [22, 163, 74];
        hookData.cell.styles.fontStyle = 'bold';
      }
      // Light background
      hookData.cell.styles.fillColor = LIGHT_GREY;
    },
    tableLineColor: BORDER_GREY,
    tableLineWidth: 0.3,
    margin: { left: ML, right: MR },
  });

  y = (doc as any).lastAutoTable.finalY + 8;

  // ── 6. FOOTER ─────────────────────────────────────────────────────────────
  // Line
  doc.setDrawColor(...BORDER_GREY);
  doc.setLineWidth(0.4);
  doc.line(ML, y, PW - MR, y);
  y += 6;

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...MID_GREY);
  doc.text('Thank you for choosing Mr. Book & Fly!', PW / 2, y, { align: 'center' });
  y += 5;
  doc.text('For support: support@mrbookandfly.shop  |  www.mrbookandfly.shop', PW / 2, y, { align: 'center' });
  y += 5;
  doc.setFont('helvetica', 'italic');
  doc.text('This is a computer-generated invoice.', PW / 2, y, { align: 'center' });

  return doc;
}

function getServiceLabel(serviceType: string, details: any): string {
  const map: Record<string, string> = {
    flight: 'Dummy Flight Reservation',
    hotel:  'Hotel Booking',
    both:   'Flight + Hotel Package',
    health: 'Health Insurance',
  };
  return details?.serviceName ?? map[serviceType] ?? serviceType;
}

export function downloadInvoice(doc: jsPDF, orderId: string): void {
  doc.save(`Invoice_${orderId}_${Date.now()}.pdf`);
}

export function getInvoiceBlob(doc: jsPDF): Blob {
  return doc.output('blob');
}

export function getInvoiceBase64(doc: jsPDF): string {
  return doc.output('dataurlstring');
}
