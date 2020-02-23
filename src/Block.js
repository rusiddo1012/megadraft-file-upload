/*
 * Copyright (c) 2020, clepsydra <jubeat.taiko.1012@gmail.com>
 *
 * License: MIT
 */

import React from 'react';
import { MegadraftPlugin, MegadraftIcons } from 'megadraft';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

const { BlockContent, BlockData, BlockInput, CommonBlock } = MegadraftPlugin;
const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function Block(props) {
  const classes = useStyles();
  const blockActions = [
    {
      key: 'delete',
      icon: MegadraftIcons.DeleteIcon,
      action: props.container.remove,
    }
  ];

  return (
    <CommonBlock actions={blockActions} {...props}>
      <BlockContent>
      <CardMedia
        className={classes.media}
        image={props.data.src}
      />
      </BlockContent>

      <BlockData>
        <BlockInput placeholder='Enter an image caption' />
      </BlockData>
    </CommonBlock>
  );
}