import * as fs from 'fs';
import * as path from 'path';

export function resolveTemplatePath(templateFileName: string): string {
  const distPath = path.join(
    __dirname,
    '..',
    'services',
    'mail',
    'mail-templates',
    templateFileName,
  );
  const srcPath = path.join(
    process.cwd(),
    'src',
    'services',
    'mail',
    'mail-templates',
    templateFileName,
  );

  if (fs.existsSync(distPath)) {
    return distPath;
  }

  if (fs.existsSync(srcPath)) {
    return srcPath;
  }

  throw new Error(`[Mailer] Template not found: ${templateFileName}`);
}