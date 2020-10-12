## Why a root folder named '\_'?

NPM package names may contain hyphens and underscores but cannot start with one.

In CRA it is simple to add support for absolute imports, where the 'src' folders
are added to the moduleDirectory, and this project does that.

But to prevent possible name collisions where a folder under the 'src' may have
the same name as module inside 'node\*modules', we place one single folder under the 'src' with the name '\_'.

This makes it clear where something is imported from: 'node_modules' or local 'src'.

Without 'ejecting' form the CRA there is no simple way to customize webpack resolve.alias. But if you have an 'ejected' project then you can alias the 'src' folder
with '\_' and not have this folder.

```
  resolve: {
    alias: {
      // Enable: import from '_/...'
      _: path.resolve(__dirname, 'src'),
    },
  },
```
