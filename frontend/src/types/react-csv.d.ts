declare module 'react-csv' {
  import { ComponentType } from 'react';

  /**
   * Props for CSVLink and CSVDownload components.
   * - `data`: Array of records or values to be converted to CSV.
   * - `filename`: Optional name for the generated file.
   * - `headers`: Optional array of header labels.
   * - Additional props are passed through to the underlying element.
   */
  export interface CSVLinkProps {
    data: unknown[] | object;
    filename?: string;
    headers?: string[];
    [key: string]: unknown;
  }

  /**
   * Link component that triggers CSV file download when clicked.
   */
  export const CSVLink: ComponentType<CSVLinkProps>;

  /**
   * Component that automatically initiates CSV download on render.
   */
  export const CSVDownload: ComponentType<CSVLinkProps>;
}

