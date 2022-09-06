export interface Contact {
  name: string;
  num: string;
  id: number;
  email: string;
  image: string;
  members: Contact[];
  isChecked?: boolean;
  type: string;
}

export interface Group {
  name: string;
  id: number;
  members?: Contact[];
}
