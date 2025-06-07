declare module 'react-csv' {
  import { ComponentType } from 'react';
  export interface CSVLinkProps {
    data: unknown[];
    filename?: string;
    headers?: string[];
    [key: string]: unknown;
  }
  export const CSVLink: ComponentType<CSVLinkProps>;
  export const CSVDownload: ComponentType<CSVLinkProps>;
}
