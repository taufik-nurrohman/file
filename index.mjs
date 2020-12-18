import {copyFile, copyFileSync, existsSync, readFile, readFileSync, rename, renameSync, statSync, unlink, unlinkSync, writeFile, writeFileSync} from 'fs';
import {basename, dirname, extname, normalize} from 'path';

import {isFunction, isString} from '@taufik-nurrohman/is';

export const copy = (from, to, then) => {
    if (isFunction(then)) {
        return copyFile(from, to, (e, data) => then(data, e));
    }
    return copyFileSync(from, to);
};

export const get = path => {
    return path && existsSync(path) ? normalize(path) : false;
};

export const getContent = (path, then) => {
    if (isFunction(then)) {
        return readFile(path, 'utf8', (e, data) => then(data, e));
    }
    return false !== get(path) ? readFileSync(path, 'utf8') : null;
};

export const move = (from, to, then) => {
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

export const name = (path, x = false) => {
    let ext = extname(path = normalize(path));
    let value = basename(path).slice(0, -ext.length);
    value = x ? value + (isString(x) ? '.' + x : ext) : value;
    return "" !== value ? value : null;
};

export const parent = path => {
    let value = dirname(normalize(path));
    return "" !== value && '.' !== value && '/' !== value ? value : null;
};

export const parseContent = (content, data, pattern = '%\\((\\S+?)\\)', separator = '.') => {
    return content.replace(new RegExp(pattern, 'g'), (m0, m1) => {
        // <https://stackoverflow.com/a/6394168>
        return m1.split(separator).reduce((o, k) => o[k], data);
    });
};

export const set = (path, then) => {
    !get(path) && setContent(path, "", then);
};

export const setContent = (path, content, then) => {
    if (isFunction(then)) {
        writeFile(path, content, 'utf8', (e, data) => then(data, e));
    } else {
        writeFileSync(path, content, 'utf8');
    }
};

export const x = path => {
    let value = extname(normalize(path));
    return "" !== value ? value.slice(1) : null;
};
