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
  
  // Company Name (Left Side)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Mr. Book & Fly', 20, 20);
  
  // Tagline
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('100% Embassy Acceptable Bookings', 20, 28);
  
  // Invoice Title (Right Side)
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', 190, 20, { align: 'right' });
  
  // Reset text color
  doc.setTextColor(...darkColor);
  
  // === INVOICE INFO BOX (Fixed positioning) ===
  let yPos = 45;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Invoice #:', 130, yPos);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  
  // Split long order ID if needed
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
  
  // === COMPANY INFO ===
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
  doc.text('Phone: +91 9056732633', 20, yPos);
  
  // === CUSTOMER INFO ===
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
  
  // === SERVICE DETAILS TABLE ===
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
  
  // Get final Y position after table
  yPos = (doc as any).lastAutoTable.finalY + 10;
  
  // === PAYMENT SUMMARY ===
  const subtotal = data.amount;
  const gst = data.gst || (subtotal * 0.18); // 18% GST
  const total = subtotal + gst;
  
  // Draw summary box
  const boxX = 125;
  const boxY = yPos;
  const boxWidth = 65;
  
  doc.setFillColor(...lightGray);
  doc.rect(boxX, boxY, boxWidth, 28, 'F');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkColor);
  doc.text('Subtotal:', boxX + 5, boxY + 8);
  doc.text(`$${subtotal.toFixed(2)}`, boxX + boxWidth - 5, boxY + 8, { align: 'right' });
  
  doc.text('GST (18%):', boxX + 5, boxY + 15);
  doc.text(`$${gst.toFixed(2)}`, boxX + boxWidth - 5, boxY + 15, { align: 'right' });
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Total:', boxX + 5, boxY + 24);
  doc.text(`$${total.toFixed(2)}`, boxX + boxWidth - 5, boxY + 24, { align: 'right' });
  
  // === PAYMENT INFO ===
  yPos += 35;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Payment Information:', 20, yPos);
  yPos += 6;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Payment Method: UPI', 20, yPos);
  yPos += 5;
  doc.text(`UPI Reference: ${data.upiReference}`, 20, yPos);
  yPos += 
