import AdmZip from 'adm-zip';

export function parseZipTxt(buffer) {
  const zip = new AdmZip(buffer);
  const entries = zip.getEntries();

  // Ensure exactly one .txt file and nothing else
  const txtEntries = entries.filter(e => !e.isDirectory && e.entryName.toLowerCase().endsWith('.txt'));
  const fileEntries = entries.filter(e => !e.isDirectory);

  if (txtEntries.length !== 1 || fileEntries.length !== 1) {
    return { ok: false, error: 'ZIP must contain exactly one .txt file.' };
  }

  const content = txtEntries[0].getData().toString('utf-8');
  // Parse CSV-like lines: Name, Latitude, Longitude
  const lines = content.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  // Remove header if present by checking first line contains letters and commas
  const startIdx = (lines[0].toLowerCase().includes('name') && lines[0].includes(',')) ? 1 : 0;

  const locations = [];
  for (let i = startIdx; i < lines.length; i++) {
    const parts = lines[i].split(',').map(p => p.trim());
    if (parts.length < 3) continue;
    const name = parts[0];
    const lat = Number(parts[1]);
    const lng = Number(parts[2]);
    if (!name || Number.isNaN(lat) || Number.isNaN(lng)) continue;
    locations.push({ name, latitude: lat, longitude: lng });
  }

  return { ok: true, locations };
}