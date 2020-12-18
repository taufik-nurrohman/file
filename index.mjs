import {existsSync, readFile, readFileSync, rename, renameSync, statSync, unlink, unlinkSync, writeFile, writeFileSync} from 'fs';
import {basename, dirname, extname, normalize} from 'path';

import {isFunction, isString} from '@taufik-nurrohman/is';

export const exist = path => path && existsSync(path) ? normalize(path) : false;

export const getContent = (path, then) => exist(path) ? (isFunction(then) ? readFile(path, 'utf8', then) : readFileSync(path, 'utf8')) : null;

export const move = (fromPath, toPath, then) => {
    if (!toPath) {
        // Delete
        isFunction(then) ? unlink(fromPath, then) : unlinkSync(fromPath);
        return;
    }
    isFunction(then) ? rename(fromPath, toPath, then) : renameSync(fromPath, toPath);
    return;
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

export const setContent = (path, content, then) => isFunction(then) ? writeFile(path, content, 'utf8', then) : writeFileSync(path, content, 'utf8');

export const x = path => {
    let value = extname(normalize(path));
    return "" !== value ? value.slice(1) : null;
};
