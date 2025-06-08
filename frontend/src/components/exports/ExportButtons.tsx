import type { Player } from '@/types/player';
import { type FC } from 'react';
import { Button } from '@/components/ui/button';
import { CSVLink } from 'react-csv';

// Lazy‐loaded modules
let jsPDF: typeof import('jspdf')['default'] | undefined;
let html2canvasLib: typeof import('html2canvas')['default'] | undefined;

// Botón para exportar la ficha de un jugador a PDF
export const ExportPlayerPDF: FC<{ player: Player }> = ({ player }) => {
  const generate = async () => {
    if (!jsPDF) jsPDF = (await import('jspdf')).default;
    const doc = new jsPDF();
    doc.text(`Ficha de ${player.name}`, 10, 10);
    doc.text(JSON.stringify(player, null, 2), 10, 20);
    doc.save(`${player.name}.pdf`);
  };

  return (
    <Button variant="outline" onClick={generate}>
      Exportar PDF
    </Button>
  );
};

// Botón para descargar datos genéricos como CSV
export const ExportListCSV: FC<{ data: unknown[]; filename?: string }> = ({
  data,
  filename = 'reporte.csv',
}) => {
  return (
    <CSVLink data={data} filename={filename} className="inline-block">
      <Button variant="outline">Exportar CSV</Button>
    </CSVLink>
  );
};

// Función utilitaria para capturar un elemento DOM y exportarlo a PDF
export async function exportElementPDF(
  element: HTMLElement,
  filename: string
) {
  if (!html2canvasLib) html2canvasLib = (await import('html2canvas')).default;
  if (!jsPDF) jsPDF = (await import('jspdf')).default;

  const canvas = await html2canvasLib(element);
  const imgData = canvas.toDataURL('image/png');
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const imgProps = doc.getImageProperties(imgData);
  const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

  doc.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight);
  doc.save(filename);
}

