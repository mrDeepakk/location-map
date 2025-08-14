import { Router } from 'express';
import multer from 'multer';
import { prisma } from '../db.js';
import { authRequired } from '../middleware/auth.js';
import { parseZipTxt } from '../utils/parseZipTxt.js';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });
const router = Router();

// Get my locations
router.get('/', authRequired, async (req, res) => {
  const locations = await prisma.location.findMany({ where: { userId: req.user.id }, orderBy: { id: 'desc' } });
  res.json({ locations });
});

// Add one location
router.post('/', authRequired, async (req, res) => {
  const { name, latitude, longitude } = req.body;
  if (!name || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ message: 'name, latitude, longitude required' });
  }
  const lat = Number(latitude), lng = Number(longitude);
  if (Number.isNaN(lat) || Number.isNaN(lng)) return res.status(400).json({ message: 'Invalid coordinates' });
  const created = await prisma.location.create({ data: { name, latitude: lat, longitude: lng, userId: req.user.id } });
  res.status(201).json({ location: created });
});

// Upload ZIP containing exactly one .txt
router.post('/upload-zip', authRequired, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const { ok, error, locations } = parseZipTxt(req.file.buffer);
  if (!ok) return res.status(400).json({ message: error });
  if (!locations.length) return res.status(400).json({ message: 'No valid rows found in file' });
  const created = await prisma.$transaction(
    locations.map(l => prisma.location.create({ data: { ...l, userId: req.user.id } }))
  );
  res.status(201).json({ count: created.length, locations: created });
});

export default router;