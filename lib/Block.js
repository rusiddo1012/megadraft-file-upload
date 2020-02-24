"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Block;

var _react = _interopRequireDefault(require("react"));

var _megadraft = require("megadraft");

var _styles = require("@material-ui/core/styles");

var _CardMedia = _interopRequireDefault(require("@material-ui/core/CardMedia"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var BlockContent = _megadraft.MegadraftPlugin.BlockContent,
    BlockData = _megadraft.MegadraftPlugin.BlockData,
    BlockInput = _megadraft.MegadraftPlugin.BlockInput,
    CommonBlock = _megadraft.MegadraftPlugin.CommonBlock;
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9

    }
  };
});

function Block(props) {
  var classes = useStyles();
  var blockActions = [{
    key: 'delete',
    icon: _megadraft.MegadraftIcons.DeleteIcon,
    action: props.container.remove
  }];
  return _react["default"].createElement(CommonBlock, _extends({
    actions: blockActions
  }, props), _react["default"].createElement(BlockContent, null, _react["default"].createElement(_CardMedia["default"], {
    className: classes.media,
    image: props.data.src
  })), _react["default"].createElement(BlockData, null, _react["default"].createElement(BlockInput, {
    placeholder: "Enter an image caption"
  })));
}