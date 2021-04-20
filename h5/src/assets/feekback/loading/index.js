import "./index.scss";

class Loading {
  constructor() {
    this._box_id = "my_axios_loading_2020";
    this._text_id = "my_axios_loading_2020_text";
    this._box_class = "my-loading-axios";
    this._background_class = "my-loading-axios-background";
    this._body_class = "my-loading-axios-body";
    this._icon_class = "my-loading-axios-icon";
    this._text = "正在加载中...";
  }
  getBoxInnerHTML() {
    return `
    <div class="${this._background_class}"></div>
    <div class="${this._body_class}">
      <svg t="1590550959701" class="${this._icon_class}" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4041"><path d="M552.421053 161.684211m-161.684211 0a161.684211 161.684211 0 1 0 323.368421 0 161.684211 161.684211 0 1 0-323.368421 0Z" fill="#ffffff" p-id="4042" /><path d="M202.105263 377.263158m-134.736842 0a134.736842 134.736842 0 1 0 269.473684 0 134.736842 134.736842 0 1 0-269.473684 0Z" fill="#ffffff" opacity=".8" p-id="4043" /><path d="M202.105263 727.578947m-107.789474 0a107.789474 107.789474 0 1 0 215.578948 0 107.789474 107.789474 0 1 0-215.578948 0Z" fill="#ffffff" opacity=".6" p-id="4044" /><path d="M552.421053 943.157895m-80.842106 0a80.842105 80.842105 0 1 0 161.684211 0 80.842105 80.842105 0 1 0-161.684211 0Z" fill="#ffffff" opacity=".4" p-id="4045" /><path d="M902.736842 727.578947m-53.894737 0a53.894737 53.894737 0 1 0 107.789474 0 53.894737 53.894737 0 1 0-107.789474 0Z" fill="#ffffff" opacity=".2" p-id="4046" /><path d="M902.736842 350.315789m-26.947368 0a26.947368 26.947368 0 1 0 53.894737 0 26.947368 26.947368 0 1 0-53.894737 0Z" fill="#ffffff" opacity=".1" p-id="4047" /></svg>
      <p id="${this._text_id}">${this._text}</p>
    </div>
    `;
  }
  createBox() {
    const box = document.createElement("div");
    box.id = this._box_id;
    box.className = this._box_class;
    box.innerHTML = this.getBoxInnerHTML();
    document.body.appendChild(box);
  }
  destoryBox() {
    const box = this.getBox();
    if (box) {
      document.body.removeChild(box);
    }
  }
  getBox() {
    return document.getElementById(this._box_id);
  }
  getText() {
    return document.getElementById(this._text_id);
  }
  isExist() {
    const box = this.getBox();
    if (box) {
      return true;
    } else {
      return false;
    }
  }
  updateText() {
    const text = this.getText;
    text.innerHTML = this._text;
  }
  open(text = null) {
    if (text) {
      this._text = text;
    }
    if (this.isExist()) {
      this.updateText();
    } else {
      this.createBox();
    }
  }
  close() {
    this.destoryBox();
  }
}

export default new Loading();

// loading.open('正在加载中...') //打开loading
// loading.close() //关闭loading
