export interface Button {
  getText(): string;
  getBtnClass(): string;
}

export class Button implements Button {
  private text: string;
  private btnclass: string;
  constructor(text: string, btnclass: string) {
    this.text = text;
    this.btnclass = btnclass;
  }
  getText(): string {
    return this.text;
  }
  getBtnClass(): string {
    return this.btnclass;
  }
}
