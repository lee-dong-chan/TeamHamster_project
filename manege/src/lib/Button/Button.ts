interface IButton {
  getText(): string;
  getBtnClass(): string;
}

class Button implements IButton {
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

export default Button;
