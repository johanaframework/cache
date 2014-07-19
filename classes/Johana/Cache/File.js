/// <reference path="./../../../references.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JohanaCacheFile = (function (_super) {
    __extends(JohanaCacheFile, _super);
    function JohanaCacheFile(config) {
        _super.call(this, config);
    }
    JohanaCacheFile.filename = /**
    * Creates a hashed filename based on the string. This is used
    * to create shorter unique IDs for each cache filename.
    *
    * @param id
    * @returns {string}
    */
    function (id) {
        var crypto = require('crypto'), sha1 = crypto.createHash('sha1');
        return sha1.update(id).digest('hex') + '.cache';
    };
    return JohanaCacheFile;
})(Cache);
//# sourceMappingURL=File.js.map
