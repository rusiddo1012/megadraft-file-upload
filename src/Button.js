/*
 * Copyright (c) 2020, clepsydra <jubeat.taiko.1012@gmail.com>
 *
 * License: MIT
 */

import React, { useRef } from 'react';
import { insertDataBlock } from 'megadraft';

import Icon from './icon.js';
import constants from './constants';

export default function Button(props) {
  const inputEl = useRef(null);

  const upload_files = e => {
    if (window.File) {
      const files = e.target.files
      const file = files[files.length-1];
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const data = {'type': constants.PLUGIN_TYPE, 'src': reader.result};
        props.onChange(insertDataBlock(props.editorState, data));
      }
      reader.readAsDataURL(file);
      e.target.value = ''
    } else {
      window.alert('File API cannot be used with this browser');
    }
  }

  return (
    <>
      <button className={props.className} onClick={e => {inputEl.current.click()}}>
        <Icon className='sidemenu__button__icon' />
      </button>
      <input type='file' ref={inputEl} style={{display:'none'}} onChange={e => upload_files(e)}/>
    </>
  );
}
