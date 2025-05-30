export interface Formation {
  id: string;
  name: string;
  description?: string;
}

export interface CreateFormationInput {
  name: string;
  description?: string;
}
