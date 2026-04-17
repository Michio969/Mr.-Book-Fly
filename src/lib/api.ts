// Generate PDF Document
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
      const error = await response.json();
      throw new Error(error.message || "Failed to generate PDF");
    }

    // Get the blob from the response
    const blob = await response.blob();
    
    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary link element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = `mr-book-and-fly-${type}-${Date.now()}.pdf`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    return true;
  } catch (error) {
    console.error("Error downloading PDF:", error);
    throw error;
  }
}

// Process Order with UPI Payment
export async function processOrder(orderData: any, upiReference: string) {
  try {
    const response = await fetch("/api/send-whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderData, upiReference }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to process order');
    }

    return result;
  } catch (error: any) {
    console.error("Error processing order:", error);
    throw error;
  }
}

// Validate UPI Reference
export function validateUPIReference(upiRef: string): boolean {
  const cleaned = upiRef.replace(/\s/g, '');
  return /^\d{12}$/.test(cleaned);
}
