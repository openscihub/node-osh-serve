# Serve

Serve a collection of [Pages](https://github.com/openscihub/node-osh-page) and
[Paths](https://github.com/openscihub/node-osh-path) in
[Node.js](http://nodejs.org). Most importantly, it handles interfacing with
[Dynapack][dynapack] for you so that you can
(almost) forget about compilation steps and whatnot (at least that's the hope).

## Installation

```
npm install osh-serve
```

## Example

```js
var serve = require('osh-serve');

var app = serve({
  dir: __dirname + '/app',
  paths: [ // modules (relative to dir) that export a Path
    'api/user',
    'api/recipe',
    'api/favorite-joke'
  ],
  pages: [ // modules (relative to dir) that export a Page
    'user',
    'signup',
    'submit-favorite-joke'
  ]
});

// app is an Express instance.

app.on('serving', function() {
  app.listen(3333);
});
```

## Documentation

This module exports a single function that returns an Express instance.  The
function is async b/c we (usually) have to bundle javascript with
[Dynapack][dynapack]; the returned Express instance (which is an EventEmitter)
emits the 'serving' event when all javascript has been bundled and all
middleware has been attached.  If an error occurs, the 'error' event will emit.

### Configuration

The serve function accepts a single configuration object with the following
properties.

#### app {Express}

Optional. If provided, all Page/Path middleware will be mounted to it.
If undefined, osh-serve will create its own.


#### dir {String}

The base directory for all pages and paths; this should be an absolute path.
Defaults to current working directory.

#### paths {Array&lt;Path|String&gt;}

Serve these Paths. An array element
can be a Path instance or a string pointing to a module that exports
a Path instance. The string can be relative to the 'dir' setting.

#### pages {Array&lt;String&gt;}

Each array element is a string pointing to a module that exports a Page
instance.  The string can be relative to the 'dir' setting.

Beware that pages will not be mounted until after the `'serving'` event fires
on the returned Express app.


#### scripts {Object}

Options for module bundling; most of the
properties on this object are passed directly to [Dynapack][dynapack].
The properties on the scripts object are:

#### scripts.serve {Boolean}

If true, javascript bundles are served via this Express app under
the [scripts.prefix](#scriptsprefix-string) route using the
[serve-static](https://github.com/expressjs/serve-static) package.  Default:
`true`.

#### scripts.prefix {String}

(Dynapack) This is prepended to each script name generated by
[Dynapack][dynapack]. If [scripts.serve](#scriptsserve-boolean) is true, this
prefix is also used to serve generated javascript bundles. If you send your
bundles to a CDN, then the prefix should include the protocol, hostname, etc.

If prefix does not start with '/', then it is assumed that the scripts are
delivered by an external server. In this case the
[scripts.serve](#scriptsserve-boolean) setting is assumed `false`.

Default: '/'

#### scripts.output {String}

(Dynapack)
Where to save the generated bundles. If left unspecified, and
[scripts.serve](#scriptsserve-boolean)
is `true`, we save them in a temporary directory. If unspecified and
[scripts.serve](#scriptsserve-boolean)
is `false`, no bundles are created and your app will serve static pages.

## License

MIT


dynapack: [https://github.com/bauerca/dynapack]