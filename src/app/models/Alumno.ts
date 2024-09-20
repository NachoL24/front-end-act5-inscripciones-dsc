import {Course} from "./Course";

export interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  courses?: Course[];
}
