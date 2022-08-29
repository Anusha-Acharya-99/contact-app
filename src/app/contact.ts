export interface Contact {
  name: string;
  num: string;
  id: number;
  email: string;
  isChecked?: boolean;
}

export interface Group {
  name: string;
  id: number;
  members?: Contact[];
}
