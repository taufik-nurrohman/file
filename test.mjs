import path from 'path';
import ava from 'ava';

import * as f from './index.mjs';

ava.todo('copy');

ava('get', t => {
    t.is(f.get('./package.json'), path.resolve('package.json'));
    t.is(f.get('./asdf'), false);
});

ava('getContent', t => {
    t.is('string' === typeof f.getContent('./package.json'), true);
    t.is('string' === typeof f.getContent('./asdf'), false);
});

ava('isFile', t => {
    t.is(f.isFile('./package.json'), path.resolve('package.json'));
    t.is(f.isFile('./node_modules'), false);
});

ava.todo('move');

ava('name', t => {
    t.is(f.name('./foo/bar/baz.qux'), 'baz');
    t.is(f.name('./foo/bar/baz.qux', true), 'baz.qux');
    t.is(f.name('./foo/bar/baz.qux', 'asdf'), 'baz.asdf');
});

ava('parent', t => {
    t.is(f.parent('./foo/bar/baz'), path.resolve('foo/bar'));
    t.is(f.parent('./'), null);
    t.is(f.parent('.'), null);
    t.is(f.parent(""), null);
});

ava('parseContent', t => {
    t.is(f.parseContent('foo %(bar) %(baz.qux)', {
        bar: 'bar',
        baz: {
            qux: 'baz qux'
        }
    }), 'foo bar baz qux');
    t.is(f.parseContent('foo ${bar} ${baz->qux}', {
        bar: 'bar',
        baz: {
            qux: 'baz qux'
        }
    }, '\\$\\{(\\S+?)\\}', '->'), 'foo bar baz qux');
});

ava.todo('set');
ava.todo('setContent');

ava('x', t => {
    t.is(f.x('./foo/bar/baz.qux'), 'qux');
    t.is(f.x('./foo/bar/baz'), null);
    t.is(f.x('./foo/bar/.baz'), null);
    t.is(f.x('./foo/bar/baz.'), "");
    t.is(f.x('./foo/bar/.baz.qux'), 'qux');
    t.is(f.x('./'), null);
    t.is(f.x('.'), null);
    t.is(f.x(""), null);
});
