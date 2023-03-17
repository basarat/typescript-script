# typescript-script
Script tag support for TypeScript

## Usage
Add the following lines at the bottom of your page: 
```html
<script src="https://unpkg.com/typescript/lib/tsserverlibrary.js"></script>
<script src="https://raw.githack.com/basarat/typescript-script/master/transpiler.js"></script>
```

And then you can use script tags that load `.ts` files or even have `typescript` inline: 
```html
<script type="text/typescript" src="script.ts"></script>
<script type="text/typescript">
    setTimeout(()=>console.log('hello'));
</script>
```

## Sample
### Plunker
http://plnkr.co/edit/j2pzXw?p=preview
