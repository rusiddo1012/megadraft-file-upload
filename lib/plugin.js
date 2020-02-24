"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFile = addFile;
exports.uploadToS3 = uploadToS3;
exports["default"] = void 0;

var _megadraft = require("megadraft");

var _awsAmplify = require("aws-amplify");

var _reactUuid = _interopRequireDefault(require("react-uuid"));

var _Button = _interopRequireDefault(require("./Button"));

var _Block = _interopRequireDefault(require("./Block"));

var _constants = _interopRequireDefault(require("./constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  title: _constants["default"].PLUGIN_NAME,
  type: _constants["default"].PLUGIN_TYPE,
  buttonComponent: _Button["default"],
  blockComponent: _Block["default"],
  options: {
    displayOptions: [],
    defaultDisplay: null
  }
};
exports["default"] = _default;

function addFile(ref, editorState, base64) {
  var data = {
    'type': _constants["default"].PLUGIN_TYPE,
    'src': base64
  };
  ref.current.onChange((0, _megadraft.insertDataBlock)(editorState, data));
}

;
/**
 * S3にファイルをアップロードして、megadraftのJSONをURLに置き換える
 * @param {string} j_editorState editorStateのJSON形式を取った文字列
 * @param {string} destination_path 保存先のパス
 */

function uploadToS3(_x, _x2) {
  return _uploadToS.apply(this, arguments);
}

function _uploadToS() {
  _uploadToS = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(j_editorState, destination_path) {
    var j_content, upload_files, _loop, key;

    return regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            j_content = JSON.parse(j_editorState); // 置き換えられておらずbase64形式のファイルデータを取得

            upload_files = getFiles(j_content);
            _loop =
            /*#__PURE__*/
            regeneratorRuntime.mark(function _loop(key) {
              var file, file_data, decoded_file, path, content_type, access;
              return regeneratorRuntime.wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      file = upload_files[key];
                      file_data = file.replace(/^data:\w+\/\w+;base64,/, '');
                      decoded_file = new Buffer(file_data, 'base64');
                      path = "".concat(destination_path, "/").concat((0, _reactUuid["default"])(), ")");
                      content_type = file.toString().slice(file.indexOf(':') + 1, file.indexOf(';'));
                      access = {
                        level: 'protected',
                        contentType: content_type
                      };
                      _context.prev = 6;
                      _context.next = 9;
                      return _awsAmplify.Storage.put(path, decoded_file, access);

                    case 9:
                      _context.next = 11;
                      return _awsAmplify.Storage.get(path, {
                        level: 'protected'
                      }).then(function (result) {
                        j_content.blocks[key].data.src = result;
                      });

                    case 11:
                      _context.next = 16;
                      break;

                    case 13:
                      _context.prev = 13;
                      _context.t0 = _context["catch"](6);
                      console.log('UploadPhotos error: ', _context.t0);

                    case 16:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _loop, null, [[6, 13]]);
            });
            _context2.t0 = regeneratorRuntime.keys(upload_files);

          case 4:
            if ((_context2.t1 = _context2.t0()).done) {
              _context2.next = 9;
              break;
            }

            key = _context2.t1.value;
            return _context2.delegateYield(_loop(key), "t2", 7);

          case 7:
            _context2.next = 4;
            break;

          case 9:
            return _context2.abrupt("return", JSON.stringify(j_content, null, 2));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee);
  }));
  return _uploadToS.apply(this, arguments);
}

;
/**
 * file-uploadプラグインのデータを取得する
 * @param {string} j_content editorStateのJSON型
 */

function getFiles(j_content) {
  var upload_files = {};
  var j_blocks = j_content.blocks;
  var re_base64 = new RegExp(/^data:\w+\/\w+;base64,/);

  for (var i = 0; i < Object.values(j_blocks).length; i++) {
    var block_data = j_blocks[i].data;

    if (Object.keys(block_data).length !== 0) {
      // データがbase64形式の物のみ取得
      if (block_data.type === _constants["default"].PLUGIN_TYPE && re_base64.test(block_data.src)) {
        // 上からi行目の画像データを取得
        upload_files["".concat(i)] = block_data.src;
      }
    }
  }

  return upload_files;
}

;