declare module 'react-csv' {
  import { ComponentType } from 'react';

  export const CSVLink: ComponentType<{
    data: unknown[] | object;
    filename?: string;
  }>;
}
