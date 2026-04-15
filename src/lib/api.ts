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
