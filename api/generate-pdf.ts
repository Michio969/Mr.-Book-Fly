import type { VercelRequest, VercelResponse } from '@vercel/node';
import PDFDocument from 'pdfkit';

// ─── Colors ───────────────────────────────────────────────────────────────────
const BRAND_BLUE  = '#1A3C6E';
const ACCENT_BLUE = '#2563EB';
const LIGHT_BLUE  = '#EFF6FF';
const LIGHT_GREY  = '#F8FAFC';
const BORDER_GREY = '#E2E8F0';
const MID_GREY    = '#64748B';
const DARK        = '#1E293B';
const WHITE       = '#FFFFFF';
const GREEN       = '#16A34A';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, details } = req.body;

  try {
    const doc = new PDFDocument({ margin: 0, size: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=mr-book-and-fly-${type}-${Date.now()}.pdf`
    );
    doc.pipe(res);

    const PW  = doc.page.width;
    const ML  = 40;
    const MR  = 40;
    const CW  = PW - ML - MR;

    // ── 1. HEADER BANNER ────────────────────────────────────────────────────
    doc.rect(0, 0, PW, 90).fill(BRAND_BLUE);

    // Company name
    doc.font('Helvetica-Bold').fontSize(26).fillColor(WHITE)
       .text('Mr. Book & Fly', ML, 22);

    // Tagline
    doc.font('Helvetica').fontSize(10).fillColor('#BFD7FF')
       .text('100% Embassy Acceptable Bookings', ML, 54)
       .text('www.mrbookandfly.shop  |  support@mrbookandfly.shop', ML, 68);

    // Right — Title
    const titleMap: Record<string, string> = {
      flight:     'Flight Reservation',
      hotel:      'Hotel Booking',
      both:       'Flight + Hotel',
      health:     'Health Insurance',
      invitation: 'Invitation Letter',
      event:      'Event Booking',
    };
    const title = titleMap[type] ?? 'Booking Confirmation';

    doc.font('Helvetica-Bold').fontSize(22).fillColor(WHITE)
       .text(title, ML, 24, { align: 'right', width: CW });

    // Booking ref + date
    const bookingRef = `MBF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const dateStr    = new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata',
                         day: '2-digit', month: 'short', year: 'numeric' });

    doc.font('Helvetica').fontSize(8).fillColor('#BFD7FF')
       .text('Booking Reference', ML, 56, { align: 'right', width: CW })
       .text('Date Issued',       ML, 70, { align: 'right', width: CW });

    doc.font('Helvetica-Bold').fontSize(9).fillColor(WHITE)
       .text(bookingRef, ML, 56, { align: 'right', width: CW - 100 })
       .text(dateStr,    ML, 70, { align: 'right', width: CW - 100 });

    // ── 2. BOOKING DETAILS CARD ─────────────────────────────────────────────
    let y = 106;

    doc.roundedRect(ML, y, CW, 14, 3).fill(ACCENT_BLUE);
    doc.font('Helvetica-Bold').fontSize(9).fillColor(WHITE)
       .text('BOOKING DETAILS', ML + 10, y + 4);

    y += 14;

    if (details && typeof details === 'object') {
      const skip = new Set(['upiReference', 'travelers', 'serviceName']);
      const entries = Object.entries(details).filter(([k]) => !skip.has(k));

      entries.forEach(([key, value], i) => {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
        const bg    = i % 2 === 0 ? LIGHT_GREY : WHITE;
        const rowH  = 22;

        doc.rect(ML, y, CW, rowH).fill(bg);
        doc.rect(ML, y, CW, rowH).stroke(BORDER_GREY);

        doc.font('Helvetica-Bold').fontSize(8.5).fillColor(MID_GREY)
           .text(label, ML + 10, y + 7, { width: CW * 0.35 });

        doc.font('Helvetica').fontSize(8.5).fillColor(DARK)
           .text(String(value ?? '—'), ML + CW * 0.38, y + 7, { width: CW * 0.6 });

        y += rowH;
      });

      // ── Travelers sub-table ───────────────────────────────────────────────
      if (details.travelers && Array.isArray(details.travelers) && details.travelers.length > 0) {
        y += 10;
        doc.font('Helvetica-Bold').fontSize(10).fillColor(BRAND_BLUE)
           .text('Traveler Details', ML, y);
        y += 6;

        // Header row
        doc.rect(ML, y, CW, 18).fill(ACCENT_BLUE);
        const colW = [24, 110, 120, 90];
        const headers = ['#', 'Full Name', 'Email', 'Phone'];
        let cx = ML;
        headers.forEach((h, i) => {
          doc.font('Helvetica-Bold').fontSize(8).fillColor(WHITE)
             .text(h, cx + 5, y + 5, { width: colW[i] });
          cx += colW[i];
        });
        y += 18;

        details.travelers.forEach((t: any, idx: number) => {
          const rowH = 18;
          const bg   = idx % 2 === 0 ? WHITE : LIGHT_BLUE;
          doc.rect(ML, y, CW, rowH).fill(bg).stroke(BORDER_GREY);

          let cx2 = ML;
          [String(idx + 1), t.fullName ?? '—', t.email ?? '—', t.phone ?? '—'].forEach((val, i) => {
            doc.font(i === 1 ? 'Helvetica-Bold' : 'Helvetica').fontSize(8.5).fillColor(DARK)
               .text(val, cx2 + 5, y + 5, { width: colW[i] - 5, ellipsis: true });
            cx2 += colW[i];
          });
          y += rowH;
        });
      }
    }

    y += 16;

    // ── 3. FOOTER ───────────────────────────────────────────────────────────
    // Divider
    doc.moveTo(ML, y).lineTo(PW - MR, y).stroke(BORDER_GREY);
    y += 10;

    doc.font('Helvetica').fontSize(8.5).fillColor(MID_GREY)
       .text('Thank you for choosing Mr. Book & Fly!', ML, y, { align: 'center', width: CW });
    y += 13;

    doc.font('Helvetica-Oblique').fontSize(8).fillColor(MID_GREY)
       .text(
         'Disclaimer: This document is provided by Mr. Book & Fly for visa application purposes. ' +
         'It represents a valid reservation at the time of issuance. ' +
         'Please verify with the respective embassy for specific requirements.',
         ML, y, { align: 'center', width: CW }
       );
    y += 26;

    doc.font('Helvetica').fontSize(8).fillColor(MID_GREY)
       .text('For support: 92sweetflower@gmail.com  |  www.mrbookandfly.shop', ML, y, {
         align: 'center', width: CW
       });

    doc.end();

  } catch (error: any) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF', message: error.message });
  }
}
