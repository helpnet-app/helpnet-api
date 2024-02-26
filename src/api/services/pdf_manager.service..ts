import * as fs from 'fs';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export class PDFManagerService {
  async generateCertificate() {
    const doc = await PDFDocument.create();
    const timesRomanFont = await doc.embedFont(StandardFonts.TimesRoman);
    const boldFont = await doc.embedFont(StandardFonts.TimesRomanBoldItalic);
    const page = doc.addPage([600, 400]);

    const { width, height } = page.getSize();

    const certificadoText = 'CERTIFICADO';
    const certificadoTextWidth = timesRomanFont.widthOfTextAtSize(
      certificadoText,
      30,
    );

    page.drawText(certificadoText, {
      x: (width - certificadoTextWidth) / 2,
      y: height - 50,
      size: 30,
      font: timesRomanFont,
      color: rgb(0, 0.552, 0.058),
    });

    const user = 'Fulano da Silva Lima';
    const program = 'Programa de Voluntariado de Nome Longo';
    const org = 'Organização X';

    const textLines = [
      'A Help Net, plataforma de voluntariado, juntamente com ',
      org,
      ' confere ao voluntário',
      user,
      'o presente certificado, referente a sua participação no programa de voluntariado',
      program,
    ];
    let textY = -120;
    const fontSize = 16;

    for (let i = 0; i < textLines.length; i++) {
      const line = textLines[i];
      let font = timesRomanFont;
      let space = 2;
      if (i == 1 || i == 3 || i == 5) {
        font = boldFont;
        space = 3.5;
      }
      const textWidth = timesRomanFont.widthOfTextAtSize(line, fontSize);
      page.drawText(line, {
        x: (width - textWidth) / 2,
        y: (height - textY) / 2,
        font: font,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      textY += fontSize * space;
    }

    const logo = fs.readFileSync('src/assets/background.png');
    const logoImage = await doc.embedPng(logo);

    const logoWidth = 758 / 2;
    const logoHeight = 624 / 2;
    page.drawImage(logoImage, {
      x: (width - logoWidth) / 2,
      y: (height - logoHeight) / 2,
      width: logoWidth,
      height: logoHeight,
    });

    const pdfBytes = await doc.save();
    fs.writeFileSync('upload/certificado.pdf', pdfBytes);
    return pdfBytes;
  }
}
