const {copyFile, copyFileSync, existsSync, readFile, readFileSync, rename, renameSync, statSync, unlink, unlinkSync, writeFile, writeFileSync} = require('fs');
const {basename, dirname, extname, normalize} = require('path');

const {isFunction, isString} = require('@taufik-nurrohman/is');

const copy = (from, to, then) => {
    if (isFunction(then)) {
        return copyFile(from, to, (e, data) => then(data, e));
    }
    return copyFileSync(from, to);
};

const get = path => {
    return path && existsSync(path) ? normalize(path) : false;
};

const getContent = (path, then) => {
    if (isFunction(then)) {
        return readFile(path, 'utf8', (e, data) => then(data, e));
    }
    return false !== get(path) ? readFileSync(path, 'utf8') : null;
};

const isFile = path => {
    return statSync(path).isFile() ? normalize(path) : false;
};

const move = (from, to, then) => {
    if (isFunction(to)) {
        then = to;
        to = false;
    }
    if (isFunction(then)) {
        to ? rename(from, to, (e, data) => then(data, e)) : unlink(from, (e, data) => then(data, e));
    } else {
        to ? renameSync(from, to) : unlinkSync(from);
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
    return "" !== value && '.' !== value && '/' !== value ? value : null;
};

const parseContent = (content, data, pattern = '%\\((\\S+?)\\)', separator = '.') => {
    return content.replace(new RegExp(pattern, 'g'), (m0, m1) => {
        // <https://stackoverflow.com/a/6394168>
        return m1.split(separator).reduce((o, k) => o[k], data);
    });
};

const set = (path, then) => {
    !get(path) && setContent(path, "", then);
};

const setContent = (path, content, then) => {
    if (isFunction(then)) {
        return writeFile(path, content, 'utf8', (e, data) => then(data, e));
    }
    return writeFileSync(path, content, 'utf8');
};

const x = path => {
    let value = extname(normalize(path));
    return "" !== value ? value.slice(1) : null;
};

// Cannot be used in the browser
Object.assign(exports || {}, {
    copy,
    get,
    getContent,
    isFile,
    move,
    set,
    setContent
});

// Can be used in the browser
Object.assign(exports || window || {}, {
    name,
    parent,
    parseContent,
    x
});
