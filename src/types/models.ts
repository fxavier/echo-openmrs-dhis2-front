export interface Model {
  id: number;
  name: string;
  fields: Field[];
}

export interface Field {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date';
  required: boolean;
}

export interface ModelInstance {
  id: number;
  [key: string]: any;
}