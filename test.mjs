import test from 'ava';

import {exist, getContent, move, name, parent, parseContent, setContent, x} from './index.mjs';

test('exist', t => {
    t.is(exist('package.json'), 'package.json');
    t.is(exist('asdf'), false);
});

test('getContent', t => {
    t.is('string' === typeof getContent('package.json'), true);
    t.is('string' === typeof getContent('asdf'), false);
});

test.todo('move');

test('name', t => {
    t.is(name('/foo/bar/baz.qux'), 'baz');
    t.is(name('/foo/bar/baz.qux', true), 'baz.qux');
    t.is(name('/foo/bar/baz.qux', 'asdf'), 'baz.asdf');
});

test('parent', t => {
    t.is(parent('/foo/bar/baz'), '/foo/bar');
    t.is(parent('/'), null);
    t.is(parent(""), null);
});

test('parseContent', t => {
    t.is(parseContent('foo %(bar) %(baz.qux)', {
        bar: 'bar',
        baz: {
            qux: 'baz qux'
        }
    }), 'foo bar baz qux');
    t.is(parseContent('foo ${bar} ${baz->qux}', {
        bar: 'bar',
        baz: {
            qux: 'baz qux'
        }
    }, '\\$\\{(\\S+?)\\}', '->'), 'foo bar baz qux');
});

test.todo('setContent');

test('x', t => {
    t.is(x('/foo/bar/baz.qux'), 'qux');
    t.is(x('/foo/bar/baz'), null);
    t.is(x('/foo/bar/.baz'), null);
    t.is(x('/foo/bar/baz.'), "");
    t.is(x('/foo/bar/.baz.qux'), 'qux');
    t.is(x('/'), null);
    t.is(x(""), null);
})
