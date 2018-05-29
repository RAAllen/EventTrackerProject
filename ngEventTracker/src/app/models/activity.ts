import { Category } from './category';

export class Activity {
  id: number;
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  category: Category;

  constructor (id?: number, name?: string, description?: string, startTime?: Date, endTime?: Date, category?: Category) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
    this.category = category;
  }
}
