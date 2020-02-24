# megadraft-file-upload
[Megadraft](https://github.com/globocom/megadraft)で画像をアップロードするためのプラグインです。

## Installation
`$ yarn add megadraft-file-upload`

## Usage
Megadraftのpropsに、このプラグインを与えてください。

```javascript
import React from "react";
import ReactDOM from "react-dom";
import {MegadraftEditor} from "megadraft";

import file from "megadraft-file-upload";

class Example extends React.Component {
  render(){
    return (
      <MegadraftEditor plugins={[file]} />
    );
  }
}

ReactDOM.render(<Example />, document.getElementById("root"));
```

## Demo
このプラグインのデモを利用できます。
1. .devcontainerフォルダ内のDockerfileを使い環境を作ってください。
2. `$ yanr start`コマンドを実行するとサーバが立ち上がります。
