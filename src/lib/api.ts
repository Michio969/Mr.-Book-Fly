import { generateInvoice, downloadInvoice } from './invoiceGenerator';

// Process Order - CLIENT SIDE (No API needed)
export async function processOrder(orderData: any, upiReference: string) {
  try {
    console.log('🔄 Processing order...', orderData);

    // Validate UPI
    if (!validateUPIReference(upiReference)) {
      throw new Error('Invalid UPI reference. Must be 12 digits.');
    }

    // Generate Order ID
    const orderId = `MBF${Date.now()}${Math.floor(Math.random() * 10000)}`;
    const orderDate = new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    console.log('✅ Order ID generated:', orderId);

    // Extract customer info
    let customerName = 'Customer';
    let customerEmail = 'N/A';
    let customerPhone = 'N/A';

    if (orderData.travelers && orderData.travelers.length > 0) {
      customerName = orderData.travelers[0].fullName || 'Customer';
      customerEmail = orderData.travelers[0].email || 'N/A';
      customerPhone = orderData.travelers[0].phone || 'N/A';
    } else {
      customerName = orderData.name || 'Customer';
      customerEmail = orderData.email || 'N/A';
      customerPhone = orderData.phone || 'N/A';
    }

    // Create invoice data
    const invoiceData = {
      orderId,
      date: orderDate,
      serviceType: orderData.serviceType || 'booking',
      customerName,
      customerEmail,
      customerPhone,
      amount: parseFloat(orderData.totalAmount || orderData.amount || 0),
      upiReference: upiReference.replace(/\s/g, ''),
      serviceDetails: orderData
    };

    console.log('📄 Generating invoice...');

    // Generate PDF
    try {
      const invoice = generateInvoice(invoiceData);
      downloadInvoice(invoice, orderId);
      console.log('✅ Invoice generated successfully');
    } catch (pdfError) {
      console.error('⚠️ PDF Error:', pdfError);
      // Continue even if PDF fails
    }

    // Create WhatsApp message
    const message = createWhatsAppMessage(orderData, orderId, upiReference, orderDate);
    const whatsappURL = `https://wa.me/919056732633?text=${encodeURIComponent(message)}`;

    console.log('✅ WhatsApp URL created');

    return {
      success: true,
      orderId,
      whatsappURL
    };

  } catch (error: any) {
    console.error('❌ Error:', error);
    throw new Error(error.message || 'Failed to process order');
  }
}

// Create WhatsApp Message
function createWhatsAppMessage(orderData: any, orderId: string, upiRef: string, date: string): string {
  const travelers = orderData.travelers || [];
  const serviceName = orderData.serviceName || orderData.serviceType || 'Booking';
  const amount = orderData.totalAmount || orderData.amount || 0;

  let message = `🎯 *NEW BOOKING - Mr. Book & Fly*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `📋 *Order ID:* ${orderId}\n`;
  message += `🏷️ *Service:* ${serviceName}\n`;

  if (travelers.length > 0) {
    message += `👥 *Travelers:* ${travelers.length}\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;

    travelers.forEach((t: any, i: number) => {
      message += `👤 *Traveler ${i + 1}*\n`;
      message += `Name: ${t.fullName || 'N/A'}\n`;
      message += `📧 ${t.email || 'N/A'}\n`;
      message += `📱 ${t.phone || 'N/A'}\n`;

      if (orderData.serviceType !== 'health') {
        message += `🛫 ${t.departureCity || 'N/A'} → 🛬 ${t.destinationCity || 'N/A'}\n`;
        message += `📅 ${t.departureDate || 'N/A'}`;
        if (t.returnDate) message += ` - ${t.returnDate}`;
        message += `\n`;
      }
      message += `\n`;
    });
  } else {
    message += `\n━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `👤 *Customer Details*\n`;
    message += `Name: ${orderData.name || 'N/A'}\n`;
    message += `📧 ${orderData.email || 'N/A'}\n`;
    message += `📱 ${orderData.phone || 'N/A'}\n\n`;
  }

  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 *Payment Details*\n`;
  message += `Amount: $${amount}\n`;
  message += `🔖 UPI Ref: ${upiRef}\n`;
  message += `📅 Date: ${date}\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📄 Invoice downloaded\n`;
  message += `📧 92sweetflower@gmail.com\n`;
  message += `📱 +91 9056732633\n`;
  message += `⏳ Status: Pending Verification`;

  return message;
}

// Validate UPI Reference
export function validateUPIReference(upiRef: string): boolean {
  const cleaned = upiRef.replace(/\s/g, '');
  return /^\d{12}$/.test(cleaned);
}

// Generate PDF (for other pages)
export async function generatePDF(type: string, details: any) {
  try {
    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, details }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate PDF");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mr-book-and-fly-${type}-${Date.now()}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    return true;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
