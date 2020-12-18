// This file is in sync with `index.mjs` file to enable CommonJS module loader feature.
// If you want to add/remove something here, make sure to do it in `index.mjs` file first.
const {existsSync, readFile, readFileSync, rename, renameSync, statSync, unlink, unlinkSync, writeFile, writeFileSync} = require('fs');
const {basename, dirname, extname, normalize} = require('path');
const {isFunction, isString} = require('@taufik-nurrohman/is');
exports.exist = path => path && existsSync(path) ? normalize(path) : false;
exports.getContent = (path, then) => exist(path) ? (isFunction(then) ? readFile(path, 'utf8', then) : readFileSync(path, 'utf8')) : null;
exports.move = (fromPath, toPath, then) => {
    if (!toPath) {
        isFunction(then) ? unlink(fromPath, then) : unlinkSync(fromPath);
        return;
    }
    isFunction(then) ? rename(fromPath, toPath, then) : renameSync(fromPath, toPath);
    return;
};
exports.name = (path, x = false) => {
    let ext = extname(path = normalize(path));
    let value = basename(path).slice(0, -ext.length);
    value = x ? value + (isString(x) ? '.' + x : ext) : value;
    return "" !== value ? value : null;
};
exports.parent = path => {
    let value = dirname(normalize(path));
    return "" !== value && '.' !== value && '/' !== value ? value : null;
};
exports.parseContent = (content, state, pattern = '%\\((\\S+?)\\)', separator = '.') => {
    return content.replace(new RegExp(pattern, 'g'), (m0, m1) => {
        return m1.split(separator).reduce((o, k) => o[k], state);
    });
};
exports.setContent = (path, content, then) => isFunction(then) ? writeFile(path, content, 'utf8', then) : writeFileSync(path, content, 'utf8');
exports.x = path => {
    let value = extname(normalize(path));
    return "" !== value ? value.slice(1) : null;
};
