import test from 'ava';
import * as f from './index.mjs';

test.todo('copy');

test('get', t => {
    t.is(f.get('package.json'), 'package.json');
    t.is(f.get('asdf'), false);
});

test('getContent', t => {
    t.is('string' === typeof f.getContent('package.json'), true);
    t.is('string' === typeof f.getContent('asdf'), false);
});

test('isFile', t => {
    t.is(f.isFile('package.json'), 'package.json');
    t.is(f.isFile('.github'), false);
});

test.todo('move');

test('name', t => {
    t.is(f.name('/foo/bar/baz.qux'), 'baz');
    t.is(f.name('/foo/bar/baz.qux', true), 'baz.qux');
    t.is(f.name('/foo/bar/baz.qux', 'asdf'), 'baz.asdf');
});

test('parent', t => {
    t.is(f.parent('/foo/bar/baz'), '/foo/bar');
    t.is(f.parent('/'), null);
    t.is(f.parent(""), null);
});

test('parseContent', t => {
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

test.todo('set');
test.todo('setContent');

test('x', t => {
    t.is(f.x('/foo/bar/baz.qux'), 'qux');
    t.is(f.x('/foo/bar/baz'), null);
    t.is(f.x('/foo/bar/.baz'), null);
    t.is(f.x('/foo/bar/baz.'), "");
    t.is(f.x('/foo/bar/.baz.qux'), 'qux');
    t.is(f.x('/'), null);
    t.is(f.x(""), null);
});
