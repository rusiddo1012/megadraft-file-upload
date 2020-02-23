/*
 * Copyright (c) 2020, clepsydra <jubeat.taiko.1012@gmail.com>
 *
 * License: MIT
 */

import { insertDataBlock } from 'megadraft';
import { Storage } from 'aws-amplify';
import uuid from 'react-uuid'

import Button from './Button';
import Block from './Block';
import constants from './constants';

export default {
  title: constants.PLUGIN_NAME,
  type: constants.PLUGIN_TYPE,
  buttonComponent: Button,
  blockComponent: Block,
  options: {
    displayOptions: [],
    defaultDisplay: null
  }
};

export function addFile(ref, editorState, base64) {
  const data = {'type': constants.PLUGIN_TYPE, 'src': base64}
  ref.current.onChange(insertDataBlock(editorState, data))
};

/**
 * S3にファイルをアップロードして、megadraftのJSONをURLに置き換える
 * @param {string} j_editorState editorStateのJSON形式を取った文字列
 * @param {string} destination_path 保存先のパス
 */
export async function uploadToS3(j_editorState, destination_path) {
  let j_content = JSON.parse(j_editorState);
  // 置き換えられておらずbase64形式のファイルデータを取得
  let upload_files = getFiles(j_content)

  for (let key in upload_files) {
    let file = upload_files[key]
    let file_data = file.replace(/^data:\w+\/\w+;base64,/, '')
    let decoded_file = new Buffer(file_data, 'base64')
    let path = `${destination_path}/${uuid()})`;
    let content_type = file.toString().slice(file.indexOf(':') + 1, file.indexOf(';'));
    let access = {level: 'protected', contentType: content_type};
    try {
      // S3にアップロード
      await Storage.put(path, decoded_file, access);
      // S3からURLを取得
      await Storage.get(path, { level: 'protected' })
      .then(result => {
        j_content.blocks[key].data.src = result
      });
    } catch (err) {
        console.log('UploadPhotos error: ', err);
    }
  }

  return JSON.stringify(j_content, null, 2)
};


/**
 * file-uploadプラグインのデータを取得する
 * @param {string} j_content editorStateのJSON型
 */
function getFiles(j_content) {
  let upload_files = {}
  let j_blocks = j_content.blocks
  let re_base64 = new RegExp(/^data:\w+\/\w+;base64,/);
  for (let i=0; i < Object.values(j_blocks).length; i++) {
    let block_data = j_blocks[i].data
    if(Object.keys(block_data).length !== 0){
      // データがbase64形式の物のみ取得
      if(block_data.type === constants.PLUGIN_TYPE && re_base64.test(block_data.src)){
        // 上からi行目の画像データを取得
        upload_files[`${i}`] = block_data.src
      }
    }
  }

  return upload_files
};