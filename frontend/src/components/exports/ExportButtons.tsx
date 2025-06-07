import { Player } from '@/types/player';
import { type FC, useState, useEffect } from 'react';
import { Button } from '../ui/button';

let jsPDF: typeof import('jspdf')['default'] | undefined;
let html2canvasLib: typeof import('html2canvas')['default'] | undefined;
let CSVLink: typeof import('react-csv').CSVLink | undefined;

export const ExportPlayerPDF: FC<{ player: Player }> = ({ player }) => {
  const generate = async () => {
    if (!jsPDF) jsPDF = (await import('jspdf')).default;
    const doc = new jsPDF();
    doc.text(`Ficha de ${player.name}`, 10, 10);
    doc.text(JSON.stringify(player, null, 2), 10, 20);
    doc.save(`${player.name}.pdf`);
  };
  return (
    <Button onClick={generate} variant="outline">
      Exportar PDF
    </Button>
  );
};

export const ExportListCSV: FC<{ data: unknown[] }> = ({ data }) => {
  const [Link, setLink] = useState<typeof CSVLink | null>(CSVLink ?? null);
  useEffect(() => {
    if (!Link) {
      import('react-csv').then((mod) => {
        CSVLink = mod.CSVLink;
        setLink(mod.CSVLink);
      });
    }
  }, [Link]);
  if (!Link) return null;
  return (
    <Link data={data} filename="reporte.csv" className="inline-block">
      <Button variant="outline">Exportar CSV</Button>
    </Link>
  );
};

export async function exportElementPDF(element: HTMLElement, filename: string) {
  if (!html2canvasLib) html2canvasLib = (await import('html2canvas')).default;
  if (!jsPDF) jsPDF = (await import('jspdf')).default;
  const canvas = await html2canvasLib(element);
  const imgData = canvas.toDataURL('image/png');
  const doc = new jsPDF();
  doc.addImage(imgData, 'PNG', 0, 0, 200, 0);
  doc.save(filename);
}
