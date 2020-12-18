File Utility
============

> Utility of native file system implementation in Node.js. Not to be used in the browser.

Usage
-----

### CommonJS

~~~ js
const {getContent, setContent} = require('@taufik-nurrohman/file');

let content = getContent('package.json');

if (null !== content) {
    setContent('package.json', content.replace(/"/g, "'"));
}
~~~

### ECMAScript

~~~ js
import {getContent, setContent} = from '@taufik-nurrohman/file';

let content = getContent('package.json');

if (null !== content) {
    setContent('package.json', content.replace(/"/g, "'"));
}
~~~

Methods
-------

### exist(path)

~~~ .js
if (exist('package.json')) {
    // ...
}
~~~

### getContent(path, then)

~~~ .js
let content = getContent('package.json');

if (null !== content) {
    // ...
}
~~~

~~~ .js
getContent('package.json', (error, content) => {
    if (error) {
        throw error;
    }
    console.log(content);
});
~~~

### move(from, to, then)

~~~ .js
// Delete
move('package.json', false);

// Rename
move('package.json', 'asdf.json');
~~~

~~~ .js
// Delete
move('package.json', false, error => {
    // ...
});

// Rename
move('package.json', 'asdf.json', error => {
    // ...
});
~~~

### name(path, x = false)

~~~ .js
console.log(name('/foo/bar/baz.qux'));
console.log(name('/foo/bar/baz.qux', true));
console.log(name('/foo/bar/baz.qux', 'asdf'));
~~~

### parent(path)

~~~ .js
console.log(parent('/foo/bar/baz.qux'));
console.log(parent('/foo/bar/baz'));
console.log(parent('/'));
console.log(parent(""));
~~~

### parseContent(content, data, pattern = '%\\\\((\\\\S+?)\\\\)', separator = '.')

~~~ .js
let content = 'foo %(bar) %(baz.qux)';
let data = {
        bar: 'bar',
        baz: {
            qux: 'baz qux'
        }
    };

console.log(parseContent(content, data));
~~~

### setContent(path, content)

~~~ .js
setContent('/foo/bar/baz.qux', 'foo bar baz');
~~~

~~~ .js
setContent('/foo/bar/baz.qux', 'foo bar baz', error => {
    // ...
});
~~~

### x(path)

~~~ .js
console.log(x('/foo/bar/baz.qux'));
console.log(x('/foo/bar/baz'));
console.log(x('/foo/bar/baz.'));
console.log(x('/foo/bar/.baz'));
console.log(x('/foo/bar/.baz.qux'));
console.log(x('/'));
console.log(x(""));
~~~
