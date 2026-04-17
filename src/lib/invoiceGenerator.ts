import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

export function generateInvoice(data: InvoiceData): jsPDF {
  const doc = new jsPDF();
  
  // Company Colors
  const primaryColor = [41, 128, 185]; // Blue
  const darkColor = [44, 62, 80];
  const lightGray = [236, 240, 241];
  
  // === HEADER SECTION ===
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Company Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Mr. Book & Fly', 20, 20);
  
  // Tagline
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('100% Embassy Acceptable Bookings', 20, 28);
  
  // Invoice Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', 150, 20);
  
  // Reset text color
  doc.setTextColor(...darkColor);
  
  // === INVOICE INFO BOX ===
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Invoice #:', 150, 30);
  doc.setFont('helvetica', 'normal');
  doc.text(data.orderId, 175, 30);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Date:', 150, 35);
  doc.setFont('helvetica', 'normal');
  doc.text(data.date, 175, 35);
  
  // === COMPANY INFO ===
  let yPos = 50;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('From:', 20, yPos);
  yPos += 7;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Mr. Book & Fly', 20, yPos);
  yPos += 5;
  doc.text('Website: www.mrbookandfly.shop', 20, yPos);
  yPos += 5;
  doc.text('Email: support@mrbookandfly.shop', 20, yPos);
  yPos += 5;
  doc.text('Phone: +91 XXXXXXXXXX', 20, yPos);
  
  // === CUSTOMER INFO ===
  yPos = 50;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Bill To:', 120, yPos);
  yPos += 7;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(data.customerName, 120, yPos);
  yPos += 5;
  doc.text(data.customerEmail, 120, yPos);
  yPos += 5;
  doc.text(data.customerPhone, 120, yPos);
  
  // === SERVICE DETAILS TABLE ===
  yPos = 90;
  
  const tableData = getServiceTableData(data.serviceType, data.serviceDetails, data.amount);
  
  (doc as any).autoTable({
    startY: yPos,
    head: [['Description', 'Details', 'Amount ($)']],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: primaryColor,
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 11
    },
    styles: {
      fontSize: 9,
      cellPadding: 3
    },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 80 },
      2: { cellWidth: 40, halign: 'right' }
    }
  });
  
  // Get final Y position after table
  yPos = (doc as any).lastAutoTable.finalY + 10;
  
  // === PAYMENT SUMMARY ===
  const subtotal = data.amount;
  const gst = data.gst || (subtotal * 0.18); // 18% GST
  const total = subtotal + gst;
  
  // Draw summary box
  const boxX = 120;
  const boxY = yPos;
  const boxWidth = 70;
  
  doc.setFillColor(...lightGray);
  doc.rect(boxX, boxY, boxWidth, 30, 'F');
  
  doc.setFont('helvetica', 'normal');
  doc.text('Subtotal:', boxX + 5, boxY + 8);
  doc.text(`$${subtotal.toFixed(2)}`, boxX + boxWidth - 5, boxY + 8, { align: 'right' });
  
  doc.text('GST (18%):', boxX + 5, boxY + 15);
  doc.text(`$${gst.toFixed(2)}`, boxX + boxWidth - 5, boxY + 15, { align: 'right' });
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Total:', boxX + 5, boxY + 24);
  doc.text(`$${total.toFixed(2)}`, boxX + boxWidth - 5, boxY + 24, { align: 'right' });
  
  // === PAYMENT INFO ===
  yPos += 40;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Payment Information:', 20, yPos);
  yPos += 7;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Payment Method: UPI', 20, yPos);
  yPos += 5;
  doc.text(`UPI Reference: ${data.upiReference}`, 20, yPos);
  yPos += 5;
  doc.setTextColor(0, 150, 0);
  doc.setFont('helvetica', 'bold');
  doc.text('Payment Status: PAID ✓', 20, yPos);
  doc.setTextColor(...darkColor);
  doc.setFont('helvetica', 'normal');
  
  // === FOOTER ===
  yPos = 270;
  doc.setFillColor(...primaryColor);
  doc.rect(0, yPos, 210, 27, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text('Thank you for choosing Mr. Book & Fly!', 105, yPos + 10, { align: 'center' });
  doc.text('For support, contact: support@mrbookandfly.shop', 105, yPos + 15, { align: 'center' });
  doc.text('This is a computer-generated invoice.', 105, yPos + 20, { align: 'center' });
  
  return doc;
}

function getServiceTableData(serviceType: string, details: any, amount: number): any[] {
  const data: any[] = [];
  
  // Add service header
  const serviceName = details.serviceName || serviceType;
  data.push([{ content: serviceName, colSpan: 3, styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } }]);
  
  // If multiple travelers
  if (details.travelers && details.travelers.length > 0) {
    data.push(['Number of Travelers', details.travelers.length.toString(), '']);
    
    details.travelers.forEach((traveler: any, index: number) => {
      data.push([{ content: `Traveler ${index + 1}`, colSpan: 3, styles: { fontStyle: 'bold' } }]);
      data.push(['Name', traveler.fullName, '']);
      data.push(['Email', traveler.email, '']);
      data.push(['Phone', traveler.phone, '']);
      
      if (serviceType !== 'health') {
        if (traveler.departureCity) data.push(['From', traveler.departureCity, '']);
        if (traveler.destinationCity) data.push(['To', traveler.destinationCity, '']);
        if (traveler.departureDate) data.push(['Departure', traveler.departureDate, '']);
        if (traveler.returnDate) data.push(['Return', traveler.returnDate, '']);
      }
    });
    
    data.push([{ content: '', colSpan: 2 }, '']);
    data.push(['Total Amount', '', amount.toFixed(2)]);
  } else {
    // Fallback for single booking
    switch (serviceType) {
      case 'hotel':
        data.push(['Hotel Booking', details.location || 'N/A', '']);
        data.push(['Check-in', details.checkIn || 'N/A', '']);
        data.push(['Check-out', details.checkOut || 'N/A', '']);
        data.push(['Total', '', amount.toFixed(2)]);
        break;
        
      case 'flight':
        data.push(['Flight Reservation', '', '']);
        data.push(['From', details.from || 'N/A', '']);
        data.push(['To', details.to || 'N/A', '']);
        data.push(['Date', details.departureDate || 'N/A', '']);
        data.push(['Total', '', amount.toFixed(2)]);
        break;
        
      case 'health':
        data.push(['Health Insurance', '', '']);
        data.push(['Plan Type', details.planType || 'N/A', '']);
        data.push(['Total', '', amount.toFixed(2)]);
        break;
        
      default:
        data.push([serviceType, 'Booking Service', amount.toFixed(2)]);
    }
  }
  
  return data;
}

// Download invoice
export function downloadInvoice(doc: jsPDF, orderId: string): void {
  doc.save(`Invoice_${orderId}_${Date.now()}.pdf`);
}

// Get invoice as blob (for email attachment)
export function getInvoiceBlob(doc: jsPDF): Blob {
  return doc.output('blob');
}

// Get invoice as base64 (for email)
export function getInvoiceBase64(doc: jsPDF): string {
  return doc.output('dataurlstring');
}
