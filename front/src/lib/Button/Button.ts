import { IBtn } from "../../Component/Button/LargeButton";

interface IButton extends IBtn {}

class Button implements IButton {
  private text: string;
  private btnclass: string;
  constructor(text: string, btnclass: string) {
    this.text = text;
    this.btnclass = btnclass;
  }
  getText() {
    return this.text;
  }
  getBtnClass() {
    return this.btnclass;
  }
}

export default Button;
