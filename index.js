const {copyFileSync, existsSync, readFileSync, renameSync, statSync, unlinkSync, writeFileSync} = require('fs');
const {basename, dirname, extname, normalize, resolve} = require('path');

const {isFunction, isString} = require('@taufik-nurrohman/is');

const copy = (from, to, name) => {
    to = normalize(to) + '/' + (name || basename(from));
    copyFileSync(from, to);
};

const get = path => {
    return path && existsSync(path) ? resolve(normalize(path)) : false;
};

const getContent = path => {
    return false !== isFile(path) ? readFileSync(path, 'utf8') : null;
};

const isFile = path => {
    return (path = get(path)) && statSync(path).isFile() ? path : false;
};

const move = (from, to, name) => {
    to = normalize(to);
    if (!to) {
        unlinkSync(from);
    } else {
        to += '/' + (name || basename(from));
        renameSync(from, to);
    }
};

const name = (path, x = false) => {
    let ext = extname(path = normalize(path));
    let value = basename(path).slice(0, -ext.length);
    value = x ? value + (isString(x) ? '.' + x : ext) : value;
    return "" !== value ? value : null;
};

const parent = path => {
    let value = dirname(normalize(path));
    return "" !== value && '.' !== value && '/' !== value ? resolve(value) : null;
};

const parseContent = (content, data, pattern = '%\\((\\S+?)\\)', separator = '.') => {
    return content.replace(new RegExp(pattern, 'g'), (m0, m1) => {
        // <https://stackoverflow.com/a/6394168>
        return m1.split(separator).reduce((o, k) => o[k], data);
    });
};

const set = path => {
    !get(path) && setContent(path, "");
};

const setContent = (path, content) => {
    writeFileSync(path, content, 'utf8');
};

const x = path => {
    let value = extname(normalize(path));
    return "" !== value ? value.slice(1) : null;
};

Object.assign(exports || {}, {
    copy,
    get,
    getContent,
    isFile,
    move,
    name,
    parent,
    parseContent,
    set,
    setContent,
    x
});
