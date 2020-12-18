import {copyFileSync, existsSync, readFileSync, renameSync, statSync, unlinkSync, writeFileSync} from 'fs';
import {basename, dirname, extname, normalize} from 'path';

import {isFunction, isString} from '@taufik-nurrohman/is';

const trimEnds = path => {
    return path.replace(/[\\\/]+$/, "");
};

export const copy = (from, to, name) => {
    to = trimEnds(to) + '/' + (name || basename(from));
    copyFileSync(from, to);
};

export const get = path => {
    return path && existsSync(path) ? normalize(path) : false;
};

export const getContent = path => {
    return false !== isFile(path) ? readFileSync(path, 'utf8') : null;
};

export const isFile = path => {
    return get(path) && statSync(path).isFile() ? normalize(path) : false;
};

export const move = (from, to, name) => {
    to = trimEnds(to);
    if (!to) {
        unlinkSync(from);
    } else {
        to += '/' + (name || basename(from));
        renameSync(from, to);
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

export const set = path => {
    !get(path) && setContent(path, "");
};

export const setContent = (path, content) => {
    writeFileSync(path, content, 'utf8');
};

export const x = path => {
    let value = extname(normalize(path));
    return "" !== value ? value.slice(1) : null;
};
