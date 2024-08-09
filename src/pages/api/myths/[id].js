import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { id } = req.query;
  const filePath = path.resolve(process.cwd(), 'src/datas/myths.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const myths = JSON.parse(fileContents);

  const myth = myths.find((myth) => (myth.id.english === id || myth.id.indonesian === id));

  if (!myth) {
    return res.status(404).json({ error: 'Myth not found' });
  }

  res.status(200).json(myth);
}
