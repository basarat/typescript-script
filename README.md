# typescript-script
Script tag support for TypeScript

## Usage
Add the following lines at the bottom of your page: 
```html
<script src="https://raw.githack.com/Microsoft/TypeScript/master/lib/typescriptServices.js"></script>
<script src="https://raw.githack.com/basarat/typescript-script/master/transpiler.js"></script>
```

And then you can use script tags that load `.ts` files or even have `typescript` inline: 
```html
<script type="text/typescript" src="script.ts"></script>
<script type="text/typescript">
    setTimeout(()=>console.log('hello'));
</script>
```

Optionally you can pass `compilerOptions` to the TypeScript transpiler:
```html
<script type="text/typescript" data-compiler-options='{ "target": "es5", "module": "none"}' src="script.ts"></script>
<script type="text/typescript">
    setTimeout(()=>console.log('hello'));
</script>
```

If you are not using a module loader and just need a quick hack if you attempt to export from your module add this to the bottom instead:
```html
<script>var exports = {};</script>
<script src="https://raw.githack.com/Microsoft/TypeScript/master/lib/typescriptServices.js"></script>
<script src="https://raw.githack.com/basarat/typescript-script/master/transpiler.js"></script>
```

## Sample
### Plunker
http://plnkr.co/edit/j2pzXw?p=preview
