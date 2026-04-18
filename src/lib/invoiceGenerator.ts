// @ts-nocheck
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

// ─── Colors ───────────────────────────────────────────────────────────────────
const BRAND_BLUE  = [26,  60, 110];
const ACCENT_BLUE = [37,  99, 235];
const LIGHT_BLUE  = [239, 246, 255];
const LIGHT_GREY  = [248, 250, 252];
const MID_GREY    = [100, 116, 139];
const DARK        = [ 30,  41,  59];
const WHITE       = [255, 255, 255];
const BORDER_GREY = [226, 232, 240];
const GREEN       = [22,  163,  74];

const PAGE_W = 210;
const ML     = 14;
const MR     = 14;
const CW     = PAGE_W - ML - MR; // 182mm usable width

function getServiceLabel(serviceType: string, details: any): string {
  const map: Record<string, string> = {
    flight: 'Dummy Flight Reservation',
    hotel:  'Hotel Booking',
    both:   'Flight + Hotel Package',
    health: 'Health Insurance',
  };
  return details?.serviceName ?? map[serviceType] ?? serviceType;
}

export function generateInvoice(data: InvoiceData): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  const travelers: Traveler[] = data.serviceDetails?.travelers ?? [];
  const subtotal = data.amount;
  const gst      = data.gst ?? parseFloat((subtotal * 0.18).toFixed(2));
  const total    = parseFloat((subtotal + gst).toFixed(2));

  // ════════════════════════════════════════════════════════
  // 1. HEADER BANNER
  // ════════════════════════════════════════════════════════
  doc.setFillColor(...BRAND_BLUE);
  doc.rect(0, 0, PAGE_W, 40, 'F');

  doc.setTextColor(...WHITE);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Mr. Book & Fly', ML, 13);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(191, 215, 255);
  doc.text('100% Embassy Acceptable Bookings', ML, 20);
  doc.text('www.mrbookandfly.shop  |  support@mrbookandfly.shop', ML, 27);
  doc.text('WhatsApp: +44 7877 679344', ML, 34);

  doc.setTextColor(...WHITE);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', PAGE_W - MR, 13, { align: 'right' });

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(191, 215, 255);
  doc.text('Invoice #', PAGE_W - MR, 22, { align: 'right' });
  doc.text('Date Issued', PAGE_W - MR, 29, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...WHITE);
  doc.setFontSize(7.5);
  doc.text(data.orderId, PAGE_W - MR - 22, 22);
  doc.text(data.date,    PAGE_W - MR - 22, 29);

  // ════════════════════════════════════════════════════════
  // 2. BILLED TO  +  SERVICE DETAILS
  // ════════════════════════════════════════════════════════
  let y = 46;
  const halfW = (CW - 6) / 2;

  // Left — Billed To
  doc.setFillColor(...LIGHT_BLUE);
  doc.roundedRect(ML, y, halfW, 30, 2, 2, 'F');
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
  doc.text(data.customerEmail, ML + 5, y + 20);
  doc.text(data.customerPhone, ML + 5, y + 27);

  // Right — Service Details
  const rx = ML + halfW + 6;
  doc.setFillColor(...LIGHT_GREY);
  doc.setDrawColor(...BORDER_GREY);
  doc.setLineWidth(0.3);
  doc.roundedRect(rx, y, halfW, 30, 2, 2, 'FD');
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...ACCENT_BLUE);
  doc.text('SERVICE DETAILS', rx + 5, y + 6);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...DARK);
  doc.text(getServiceLabel(data.serviceType, data.serviceDetails), rx + 5, y + 13);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(`Travelers: ${travelers.length || 1}`, rx + 5, y + 20);
  const pricePerPerson = travelers.length > 0
    ? (data.amount / travelers.length).toFixed(2)
    : data.amount.toFixed(2);
  doc.text(`$${pricePerPerson} per person`, rx + 5, y + 27);

  // ════════════════════════════════════════════════════════
  // 3. TRAVELER TABLE — different columns per service
  // ════════════════════════════════════════════════════════
  y += 36;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...BRAND_BLUE);
  doc.text('Traveler Details', ML, y);
  y += 4;

  const baseHeadStyles = {
    fillColor: ACCENT_BLUE,
    textColor: WHITE,
    fontStyle: 'bold',
    fontSize: 8.5,
    cellPadding: { top: 5, bottom: 5, left: 4, right: 4 },
  };
  const baseBodyStyles = {
    textColor: DARK,
    cellPadding: { top: 4, bottom: 4, left: 4, right: 4 },
  };
  const tableOptions = {
    theme: 'plain',
    tableLineColor: BORDER_GREY,
    tableLineWidth: 0.3,
    margin: { left: ML, right: MR },
    alternateRowStyles: { fillColor: LIGHT_BLUE },
  };

  if (data.serviceType === 'health') {
    // ── HEALTH: # | Full Name | Email | Phone ────────────────────────────
    (doc as any).autoTable({
      ...tableOptions,
      startY: y,
      head: [['#', 'Full Name', 'Email', 'Phone']],
      body: travelers.map((t, i) => [
        String(i + 1),
        t.fullName  || '—',
        t.email     || '—',
        t.phone     || '—',
      ]),
      headStyles: { ...baseHeadStyles, fontSize: 8.5 },
      bodyStyles: { ...baseBodyStyles, fontSize: 8.5 },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 52, fontStyle: 'bold' },
        2: { cellWidth: 74 },
        3: { cellWidth: 46 },
      },
    });

  } else if (data.serviceType === 'flight') {
    // ── FLIGHT: # | Full Name | From | To | Departure | Return ──────────
    (doc as any).autoTable({
      ...tableOptions,
      startY: y,
      head: [['#', 'Full Name', 'From', 'To', 'Departure', 'Return']],
      body: travelers.map((t, i) => [
        String(i + 1),
        t.fullName        || '—',
        t.departureCity   || '—',
        t.destinationCity || '—',
        t.departureDate   || '—',
        t.returnDate      || '—',
      ]),
      headStyles: { ...baseHeadStyles, fontSize: 8 },
      bodyStyles: { ...baseBodyStyles, fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 8 },
        1: { cellWidth: 42, fontStyle: 'bold' },
        2: { cellWidth: 34 },
        3: { cellWidth: 34 },
        4: { cellWidth: 34 },
        5: { cellWidth: 30 },
      },
    });

  } else if (data.serviceType === 'hotel') {
    // ── HOTEL: # | Full Name | Email | Phone | City | Date ──────────────
    (doc as any).autoTable({
      ...tableOptions,
      startY: y,
      head: [['#', 'Full Name', 'Email', 'Phone', 'City', 'Date']],
      body: travelers.map((t, i) => [
        String(i + 1),
        t.fullName        || '—',
        t.email           || '—',
        t.phone           || '—',
        t.destinationCity || '—',
        t.departureDate   || '—',
      ]),
      headStyles: { ...baseHeadStyles, fontSize: 8 },
      bodyStyles: { ...baseBodyStyles, fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 8 },
        1: { cellWidth: 38, fontStyle: 'bold' },
        2: { cellWidth: 54 },
        3: { cellWidth: 34 },
        4: { cellWidth: 28 },
        5: { cellWidth: 20 },
      },
    });

  } else if (data.serviceType === 'both') {
    // ── BOTH: Two separate tables — Flight then Hotel ────────────────────

    // Flight table
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...DARK);
    doc.text('Flight Details', ML, y);
    y += 3;

    (doc as any).autoTable({
      ...tableOptions,
      startY: y,
      head: [['#', 'Full Name', 'From', 'To', 'Departure', 'Return']],
      body: travelers.map((t, i) => [
        String(i + 1),
        t.fullName        || '—',
        t.departureCity   || '—',
        t.destinationCity || '—',
        t.departureDate   || '—',
        t.returnDate      || '—',
      ]),
      headStyles: { ...baseHeadStyles, fontSize: 8 },
      bodyStyles: { ...baseBodyStyles, fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 8 },
        1: { cellWidth: 42, fontStyle: 'bold' },
        2: { cellWidth: 34 },
        3: { cellWidth: 34 },
        4: { cellWidth: 34 },
        5: { cellWidth: 30 },
      },
    });

    y = (doc as any).lastAutoTable.finalY + 6;

    // Hotel table
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...DARK);
    doc.text('Hotel Details', ML, y);
    y += 3;

    (doc as any).autoTable({
      ...tableOptions,
      startY: y,
      head: [['#', 'Full Name', 'Email', 'Phone', 'Destination']],
      body: travelers.map((t, i) => [
        String(i + 1),
        t.fullName        || '—',
        t.email           || '—',
        t.phone           || '—',
        t.destinationCity || '—',
      ]),
      headStyles: { ...baseHeadStyles, fontSize: 8 },
      bodyStyles: { ...baseBodyStyles, fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 8 },
        1: { cellWidth: 44, fontStyle: 'bold' },
        2: { cellWidth: 60 },
        3: { cellWidth: 36 },
        4: { cellWidth: 34 },
      },
    });
  }

  // ════════════════════════════════════════════════════════
  // 4. TOTALS
  // ════════════════════════════════════════════════════════
  y = (doc as any).lastAutoTable.finalY + 8;

  const totX = ML + CW * 0.52;
  const totW = CW * 0.48;

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...MID_GREY);
  doc.text('Subtotal', totX + 4, y + 5);
  doc.setTextColor(...DARK);
  doc.text(`$${subtotal.toFixed(2)}`, totX + totW - 4, y + 5, { align: 'right' });

  doc.setTextColor(...MID_GREY);
  doc.text('GST (18%)', totX + 4, y + 11);
  doc.setTextColor(...DARK);
  doc.text(`$${gst.toFixed(2)}`, totX + totW - 4, y + 11, { align: 'right' });

  doc.setFillColor(...BRAND_BLUE);
  doc.roundedRect(totX, y + 14, totW, 13, 2, 2, 'F');
  doc.setTextColor(...WHITE);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL AMOUNT', totX + 5, y + 22);
  doc.setFontSize(11);
  doc.text(`$${total.toFixed(2)}`, totX + totW - 5, y + 22, { align: 'right' });

  y += 32;

  // ════════════════════════════════════════════════════════
  // 5. PAYMENT INFORMATION
  // ════════════════════════════════════════════════════════
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
      0: { cellWidth: 50, fontStyle: 'bold', textColor: MID_GREY, fillColor: LIGHT_GREY },
      1: { cellWidth: CW - 50, textColor: DARK, fillColor: LIGHT_GREY },
    },
    didParseCell: (hookData: any) => {
      if (hookData.row.index === 2 && hookData.column.index === 1) {
        hookData.cell.styles.textColor = GREEN;
        hookData.cell.styles.fontStyle = 'bold';
      }
    },
    tableLineColor: BORDER_GREY,
    tableLineWidth: 0.3,
    margin: { left: ML, right: MR },
  });

  y = (doc as any).lastAutoTable.finalY + 8;

  // ════════════════════════════════════════════════════════
  // 6. FOOTER
  // ════════════════════════════════════════════════════════
  doc.setDrawColor(...BORDER_GREY);
  doc.setLineWidth(0.4);
  doc.line(ML, y, PAGE_W - MR, y);
  y += 6;

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...MID_GREY);
  doc.text('Thank you for choosing Mr. Book & Fly!', PAGE_W / 2, y, { align: 'center' });
  y += 5;
  doc.text('For support: 92sweetflower@gmail.com  |  WhatsApp: +44 7877 679344', PAGE_W / 2, y, { align: 'center' });
  y += 5;
  doc.setFont('helvetica', 'italic');
  doc.text('This is a computer-generated invoice.', PAGE_W / 2, y, { align: 'center' });

  return doc;
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
