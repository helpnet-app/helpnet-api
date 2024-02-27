import * as fs from 'fs';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Program } from 'src/domain/entities/Program';
import { Volunteer } from 'src/domain/entities/Volunteer';
import { ModeEnum } from 'src/domain/entities/enum/mode_enum';
import { IPDFManagerService } from 'src/domain/ports/ipdf_manager_service';

export class PDFManagerService implements IPDFManagerService {
  constructor() {}
  async buildPDF(program: Program, user: Volunteer, verificationCode: string) {
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

    const textLines = [
      'A Help Net, plataforma de gerenciamento de programas de voluntariado, confere ao voluntário',
      user.name,
      'o presente certificado, referente a sua participação no programa de voluntariado',
      program.title,
      'com duração total de ' +
        program.duration +
        ' dias, na modalidade ' +
        ModeEnum[program.mode],
    ];
    let textY = -120;
    const fontSize = 14;

    for (let i = 0; i < textLines.length; i++) {
      const line = textLines[i];
      let font = timesRomanFont;
      let space = 2;
      if (i == 1 || i == 3) {
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

    const verificationText = 'Código de verificação: ' + verificationCode;
    const verificationWidth = timesRomanFont.widthOfTextAtSize(
      verificationText,
      14,
    );

    page.drawText(verificationText, {
      x: (width - verificationWidth) / 2,
      y: textY + 30,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
      size: 14,
    });

    const dateText = `Certificado gerado em ${new Date().toLocaleString()} `;
    const dateTextWidth = timesRomanFont.widthOfTextAtSize(dateText, 10);
    const dateTextHeight = timesRomanFont.heightAtSize(10);
    page.drawText(dateText, {
      x: width - dateTextWidth - 4,
      y: dateTextHeight,
      font: timesRomanFont,
      size: 10,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await doc.save();
    fs.writeFileSync(`upload/${user._id}.pdf`, pdfBytes);
    return pdfBytes;
  }
}
