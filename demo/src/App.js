import React, { useState } from 'react';
import { MegadraftEditor, editorStateFromRaw } from "megadraft";
import 'megadraft/dist/css/megadraft.css';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

// import file from '../../dist/megadraft-file-upload.js'

const App = () => {
  const [editorState, setEditorState] = useState(editorStateFromRaw(DEFAULT))
  
  const Action = args => {
    console.log('onAction fired with args:', args);
  };

  return (
    <>
      <Container maxWidth='xs'>
        <h1>DEMO</h1><br/>
        <Grid container spacing={5}>
          <MegadraftEditor 
            editorState={editorState}
            onChange={(context) => setEditorState(context)}
            onAction={Action}
            plugin={[]}
          />
        </Grid>
      </Container>
    </>
  );
}

const DEFAULT = {
  entityMap: {},
  blocks: [
    {
      key: "ag6qs",
      text: "Megadraft",
      type: "header-two",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
  ]
}

export default App