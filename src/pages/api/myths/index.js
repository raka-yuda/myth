import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.resolve(process.cwd(), 'src/datas/myths.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const myths = JSON.parse(fileContents);
  
  res.status(200).json(myths);
}
