// @ts-nocheck
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
  
  const primaryColor = [41, 128, 185];
  const darkColor = [44, 62, 80];
  const lightGray = [236, 240, 241];
  
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Mr. Book & Fly', 20, 20);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('100% Embassy Acceptable Bookings', 20, 28);
  
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', 190, 20, { align: 'right' });
  
  doc.setTextColor(...darkColor);
  
  let yPos = 45;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Invoice #:', 130, yPos);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  
  const orderId = data.orderId;
  if (orderId.length > 15) {
    doc.text(orderId.substring(0, 15), 150, yPos);
    doc.text(orderId.substring(15), 150, yPos + 3);
    yPos += 6;
  } else {
    doc.text(orderId, 150, yPos);
    yPos += 4;
  }
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Date:', 130, yPos);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(data.date, 150, yPos);
  
  yPos = 60;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('From:', 20, yPos);
  yPos += 6;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Mr. Book & Fly', 20, yPos);
  yPos += 5;
  doc.text('Website: www.mrbookandfly.shop', 20, yPos);
  yPos += 5;
  doc.text('Email: 92sweetflower@gmail.com', 20, yPos);
  yPos += 5;
  doc.text('Phone: +44 7877 679344', 20, yPos);
  
  yPos = 60;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Bill To:', 120, yPos);
  yPos += 6;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(data.customerName, 120, yPos);
  yPos += 5;
  doc.text(data.customerEmail, 120, yPos);
  yPos += 5;
  doc.text(data.customerPhone, 120, yPos);
  
  yPos = 100;
  
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
      fontSize: 10
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
      overflow: 'linebreak',
      cellWidth: 'wrap'
    },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 90 },
      2: { cellWidth: 35, halign: 'right' }
    }
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 10;
  
  // === PAYMENT SUMMARY ===
  const amountUSD = data.amount;
  const amountINR = (amountUSD * 83).toFixed(2); // USD to INR conversion (approx 1 USD = 83 INR)
  
  // Draw summary box
  const boxX = 115;
  const boxY = yPos;
  const boxWidth = 75;
  
  doc.setFillColor(...lightGray);
  doc.rect(boxX, boxY, boxWidth, 22, 'F');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkColor);
  doc.text('Total Amount:', boxX + 5, boxY + 8);
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`$${amountUSD.toFixed(2)} USD`, boxX + 5, boxY + 15);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`(₹${amountINR} INR)`, boxX + 5, boxY + 20);
  
  yPos += 28;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Payment Information:', 20, yPos);
  yPos += 6;
  
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
  
  yPos = 270;
  doc.setFillColor(...primaryColor);
  doc.rect(0, yPos, 210, 27, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text('Thank you for choosing Mr. Book & Fly!', 105, yPos + 8, { align: 'center' });
  doc.text('For support, contact: 92sweetflower@gmail.com', 105, yPos + 13, { align: 'center' });
  doc.text('WhatsApp: +44 7877 679344', 105, yPos + 18, { align: 'center' });
  doc.text('This is a computer-generated invoice.', 105, yPos + 23, { align: 'center' });
  
  return doc;
}

function getServiceTableData(serviceType: string, details: any, amount: number): any[] {
  const data: any[] = [];
  
  const serviceName = details.serviceName || serviceType;
  data.push([{ content: serviceName, colSpan: 3, styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } }]);
  
  if (details.travelers && details.travelers.length > 0) {
    data.push(['Number of Travelers', details.travelers.length.toString(), '']);
    
    details.travelers.forEach((traveler: any, index: number) => {
      data.push([{ content: `Traveler ${index + 1}`, colSpan: 3, styles: { fontStyle: 'bold', fillColor: [250, 250, 250] } }]);
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

export function downloadInvoice(doc: jsPDF, orderId: string): void {
  doc.save(`Invoice_${orderId}_${Date.now()}.pdf`);
}

export function getInvoiceBlob(doc: jsPDF): Blob {
  return doc.output('blob');
}

export function getInvoiceBase64(doc: jsPDF): string {
  return doc.output('dataurlstring');
}
