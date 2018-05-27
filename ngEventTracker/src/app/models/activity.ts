import { Category } from './category';

export class Activity {
  id: number;
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  category: Category;
}
