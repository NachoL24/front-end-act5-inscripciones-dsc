import {Student} from "./Alumno";

export interface Course {
  id?: number;
  name: string;
  description: string;
  capacity: number;
  students?: Student[];

}
