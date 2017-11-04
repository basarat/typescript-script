// BASED on https://github.com/niutech/typescript-compile but using 1.5 transpile function

(function () {
    //Keep track of the number of scripts to be pulled, and fire the compiler
    //after the number of loaded reaches the total
    var scripts = {
        total: 0, //total number of scripts to be loaded
        loaded: 0, //current number of loaded scripts
        data: [], //file data
        name: [] //file name
    };

    //Function loads each script and pushes its content into scripts.data
    var load = function (url) {
        var xhr = window.ActiveXObject ? new window.ActiveXObject('Microsoft.XMLHTTP') : new window.XMLHttpRequest();;
        xhr.open('GET', url, true);
        if ('overrideMimeType' in xhr) xhr.overrideMimeType('text/plain');
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status === 0 || xhr.status === 200) {
                scripts.loaded++;
                scripts.data.push(xhr.responseText);
                scripts.name.push(url);
                if (scripts.loaded === scripts.total) compile();
                return xhr.responseText;
            } else {
                console.log('Could not load ' + url);
            } //end if
        }; //end xhr.onreadystatechange()
        return xhr.send(null);
    };

    //Compiles each of the scripts found within scripts.data
    var compile = function () {
        if (scripts.data.length == 0 || scripts.data.length != scripts.name.length) return; //no reason to compile when there are no scripts
        var elem, source = '',
            body = document.getElementsByTagName('body')[0];
        scripts.total = 0; //clear the 'queue' incase the xhr response was super quick and happened before the initializer finished
        var hashCode = function (s) {
            var hsh = 0,
                chr, i;
            if (s.length == 0) {
                return hsh;
            }
            for (i = 0; i < s.length; i++) {
                chr = s.charCodeAt(i);
                hsh = (hsh << 5) - hsh + chr;
                hsh = hsh & hsh; //Convert to 32bit integer
            }
            return hsh;
        };
        if (window.sessionStorage && sessionStorage.getItem('typescript' + hashCode(scripts.data.join('')))) {
            source = sessionStorage.getItem('typescript' + hashCode(scripts.data.join('')));
        } else {
            (function () {
                var filename;
                var compilerOptions;
                for (num = 0; num < scripts.data.length; num++) {
                    filename = scripts.name[num] = scripts.name[num].slice(scripts.name[num].lastIndexOf('/') + 1);
                    filename = scripts.name[num] = scripts.name[num].slice(scripts.name[num].lastIndexOf('/') + 1);
                    if ("tsconfig.json" === filename) {
                        compilerOptions = JSON.parse(scripts.data[num]).compilerOptions;
                    } else {
                        var src = scripts.data[num];
                        source += ts.transpile(src,compilerOptions);
                    }
                }
            })();
        }
        elem = document.createElement('script');
        elem.type = 'text/javascript';
        elem.innerHTML = '//Compiled TypeScript\n\n' + source;
        body.appendChild(elem);
    };

    (function () {
        //Polyfill for older browsers
        if (!window.console) window.console = {
            log: function () {}
        };
        var script = document.getElementsByTagName('script');
        var i, src = [];
        for (i = 0; i < script.length; i++) {
            if (script[i].type == 'text/typescript') {
                if (script[i].src) {
                    scripts.total++
                    load(script[i].src);
                } else {
                    scripts.data.push(script[i].innerHTML);
                    scripts.name.push('innerHTML'+scripts.total);
                    scripts.total++;
                    scripts.loaded++;
                }
            }
        }
        if (scripts.loaded === scripts.total) compile(); //only fires if all scripts are innerHTML, else this is fired on XHR response
    })();
})();
