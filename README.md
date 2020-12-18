File
====

Utility functions of native file system API in Node.js. Not to be used in the browser.

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

### copy(from, to, name)

Copy a file.

~~~ .js
copy('./package.json', './foo/bar/baz');
copy('./package.json', './foo/bar/baz', 'package.json.bak');
~~~

### get(path)

Check if file/folder does exist.

~~~ .js
if (false !== get('./package.json')) {
    // …
}
~~~

### getContent(path)

Get file content as string.

~~~ .js
let content = getContent('package.json');

if (null !== content) {
    // …
}
~~~

### isFile(path)

Check if path is a file.

~~~ .js
if (isFile('./foo/bar/baz.qux')) {
    // …
}
~~~

### move(from, to, name)

Delete or move a file.

~~~ .js
// Delete
move('./package.json', false);

// Delete
move('./package.json');

// Move
move('./package.json', './foo/bar/baz');

// Move
move('./package.json', './foo/bar/baz', 'package.json.bak');
~~~

### name(path, x = false)

Get file name from file path.

~~~ .js
console.log(name('/foo/bar/baz.qux'));
console.log(name('/foo/bar/baz.qux', true));
console.log(name('/foo/bar/baz.qux', 'asdf'));
~~~

### parent(path)

Get parent path from file path.

~~~ .js
console.log(parent('./foo/bar/baz.qux'));
console.log(parent('./foo/bar/baz'));
console.log(parent('./'));
console.log(parent('.'));
console.log(parent(""));
~~~

### parseContent(content, data, pattern = '%\\\\((\\\\S+?)\\\\)', separator = '.')

Convert embedded variables with format such as `%(foo.bar)` in `content` with `data`.

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

### set(path)

Create an empty file if it does not exist.

~~~ .js
set('./foo/bar/baz.qux');
~~~

### setContent(path, content)

Create or overwrite a file.

~~~ .js
setContent('./foo/bar/baz.qux', 'foo bar baz');
~~~

### x(path)

Get file extension from file path.

~~~ .js
console.log(x('./foo/bar/baz.qux'));
console.log(x('./foo/bar/baz'));
console.log(x('./foo/bar/baz.'));
console.log(x('./foo/bar/.baz'));
console.log(x('./foo/bar/.baz.qux'));
console.log(x('./'));
console.log(x('.'));
console.log(x(""));
~~~
