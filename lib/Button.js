"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Button;

var _react = _interopRequireWildcard(require("react"));

var _megadraft = require("megadraft");

var _icon = _interopRequireDefault(require("./icon.js"));

var _constants = _interopRequireDefault(require("./constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 * Copyright (c) 2020, clepsydra <jubeat.taiko.1012@gmail.com>
 *
 * License: MIT
 */
function Button(props) {
  var inputEl = (0, _react.useRef)(null);

  var upload_files = function upload_files(e) {
    if (window.File) {
      var files = e.target.files;
      var file = files[files.length - 1];
      var reader = new FileReader();

      reader.onabort = function () {
        return console.log('file reading was aborted');
      };

      reader.onerror = function () {
        return console.log('file reading has failed');
      };

      reader.onload = function () {
        var data = {
          'type': _constants["default"].PLUGIN_TYPE,
          'src': reader.result
        };
        props.onChange((0, _megadraft.insertDataBlock)(props.editorState, data));
      };

      reader.readAsDataURL(file);
      e.target.value = '';
    } else {
      window.alert('File API cannot be used with this browser');
    }
  };

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("button", {
    className: props.className,
    onClick: function onClick(e) {
      inputEl.current.click();
    }
  }, _react["default"].createElement(_icon["default"], {
    className: "sidemenu__button__icon"
  })), _react["default"].createElement("input", {
    type: "file",
    ref: inputEl,
    style: {
      display: 'none'
    },
    onChange: function onChange(e) {
      return upload_files(e);
    }
  }));
}