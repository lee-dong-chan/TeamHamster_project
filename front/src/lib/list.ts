import { IItem } from "../Component/List/ListItem";

interface IList extends IItem {}

export class List implements IList {
  private id: number;
  private title: string;
  private img: string;
  private price: number;
  private createdAt: number;
  constructor(
    id: number,
    title: string,
    img: string,
    price: number,
    createdAt: number
  ) {
    this.id = id;
    this.title = title;
    this.img = img;
    this.price = price;
    this.createdAt = createdAt;
  }
  getId() {
    return this.id;
  }
  getTite() {
    return this.title;
  }
  getImg() {
    return this.img;
  }
  getPrice() {
    return this.price;
  }
  getCreatedAt() {
    return this.createdAt;
  }
}
