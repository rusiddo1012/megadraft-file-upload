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

const Example = () => {
  const [editorState, setEditorState] = useState(editorStateFromRaw(null))

  return (
    <MegadraftEditor editorState={editorState} onChange={(e) => setEditorState(e)} plugins={[file]} />
  );
}

ReactDOM.render(<Example />, document.getElementById("root"));
```

## Extension Example
#### [react-dropzone](https://github.com/react-dropzone/react-dropzone)を使って、ドラッグ&ドロップでのアップロードを実現する。

```javascript
import React, { useState, useCallback, useRef } from 'react';
import { MegadraftEditor, editorStateFromRaw } from "megadraft";
import 'megadraft/dist/css/megadraft.css';
import { addFile } from 'megadraft-file-upload';
import { useDropzone } from 'react-dropzone'

const Example = () => {
  const editorEl = useRef(null);
  const [editorState, setEditorState] = useState(editorStateFromRaw(null))
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, noClick: true})

  // 画像をドラッグ&ドロップした際の処理
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[acceptedFiles.length-1];
    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      // Megadraftコンポーネントの外からファイルをアップロードする。
      addFile(editorEl, editorState, reader.result)
    };
    reader.readAsDataURL(file);
  }, []);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <MegadraftEditor
        editorState={editorState}
        placeholder={isDragActive ? 'During file selection':'File not selected'}
        onChange={(e) => setEditorState(e)}
        plugins={[file]}
        ref={editorEl}
        />
    </div>
  );
}
```

#### [Amazon S3](https://aws.amazon.com/jp/s3/)へ画像ファイルを保存します。
利用する場合は、事前に[aws-amplify](https://github.com/aws-amplify/amplify-js)の設定を行ってください。

```javascript
import { uploadToS3 } from 'megadraft-file-upload';

const submit = async() => {
  let j_editorState = editorStateToJSON(editorState);
  # 第2引数には、ファイルを保存するS3Bucketのディレクトリ名を指定する。
  await uploadToS3(j_editorState, 'picture');
}
```

## Demo
このプラグインのデモを利用できます。
1. .devcontainerディレクトリ内のDockerfileを使い環境を作ってください。
2. `$ yanr start`コマンドを実行するとサーバが立ち上がります。
