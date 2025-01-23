(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";function escape(e){return e=""+e,e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;")}function hide(e){for(var t=document.querySelectorAll(e),n=0;n<t.length;n++)t[n].style.display="none"}function show(e){for(var t=document.querySelectorAll(e),n=0;n<t.length;n++)t[n].style.display=null}function updateOptions(e){switch(e.target.id){case"inputStrict":opts.strict=e.target.checked;break;case"inputSensitive":opts.sensitive=e.target.checked;break;case"inputEnd":opts.end=e.target.checked}update()}function setVersion(){pathRegexp=versions[_("#inputVersion").value]||pathRegexp,update()}function update(){keys=[];try{regexp=pathRegexp(_("#inputRoute").value,keys,opts)}catch(e){return show(".is-error"),hide(".is-not-match"),hide(".is-match"),void(_("#keys-results-display").innerHTML="<pre><code>"+e.message+"</code></pre>")}_("#keys-results-display").innerHTML="",hide(".is-error"),_("#regexp-display").textContent=regexp.toString(),keys.length?_("#keys-display").innerHTML="<ol>"+keys.map(function(e){return"<li>"+escape(e.name)+(e.optional?" (optional)":"")+"</li>"}).join("")+"</ol>":_("#keys-display").innerHTML="There are no keys captured by this route",updatePath()}function updatePath(){var e=_("#inputPath").value;if(regexp.test(e)){hide(".is-not-match"),show(".is-match");var t=regexp.exec(e);_("#keys-results-display").innerHTML='<dl class="dl-horizontal">'+keys.map(function(e,n){return"<dt>"+escape(e.name)+"</dt><dd>"+(t[n+1]?escape(t[n+1]):"&nbsp;")+"</dd>"}).join("")+"</dl>"}else show(".is-not-match"),hide(".is-match")}var debounce=require("debounce"),pathRegexp,versions={"0.1.7":require("./versions/0.1.7"),"1.7.0":require("./versions/1.7.0"),"2.0.0":require("./versions/2.0.0"),"8.0.0":require("./versions/8.0.0")},_=document.querySelector.bind(document);_("#inputStrict").addEventListener("change",updateOptions,!1),_("#inputSensitive").addEventListener("change",updateOptions,!1),_("#inputEnd").addEventListener("change",updateOptions,!1),_("#inputVersion").addEventListener("change",setVersion,!1),_("#inputRoute").addEventListener("input",debounce(update,100),!1),_("#inputPath").addEventListener("input",debounce(updatePath,100),!1);var opts={strict:!1,sensitive:!1,end:!0},keys,regexp;setVersion();
},{"./versions/0.1.7":3,"./versions/1.7.0":5,"./versions/2.0.0":8,"./versions/8.0.0":10,"debounce":2}],2:[function(require,module,exports){
function debounce(n,e,u){function l(){var i=Date.now()-a;i<e&&i>=0?o=setTimeout(l,e-i):(o=null,u||(r=n.apply(c,t),c=t=null))}var o,t,c,a,r;null==e&&(e=100);var i=function(){c=this,t=arguments,a=Date.now();var i=u&&!o;return o||(o=setTimeout(l,e)),i&&(r=n.apply(c,t),c=t=null),r};return i.clear=function(){o&&(clearTimeout(o),o=null)},i.flush=function(){o&&(r=n.apply(c,t),c=t=null,clearTimeout(o),o=null)},i}debounce.debounce=debounce,module.exports=debounce;
},{}],3:[function(require,module,exports){
module.exports=require("path-to-regexp");
},{"path-to-regexp":4}],4:[function(require,module,exports){
function pathtoRegexp(e,n,t){t=t||{},n=n||[];var r,o=t.strict,a=!1!==t.end,f=t.sensitive?"":"i",i=0,p=n.length,g=0,s=0;if(e instanceof RegExp){for(;r=MATCHING_GROUP_REGEXP.exec(e.source);)n.push({name:s++,optional:!1,offset:r.index});return e}if(Array.isArray(e))return e=e.map(function(e){return pathtoRegexp(e,n,t).source}),new RegExp("(?:"+e.join("|")+")",f);for(e=("^"+e+(o?"":"/"===e[e.length-1]?"?":"/?")).replace(/\/\(/g,"/(?:").replace(/([\/\.])/g,"\\$1").replace(/(\\\/)?(\\\.)?:(\w+)(\(.*?\))?(\*)?(\?)?/g,function(e,t,r,o,a,f,p,g){t=t||"",r=r||"",a=a||"([^\\/"+r+"]+?)",p=p||"",n.push({name:o,optional:!!p,offset:g+i});var s=(p?"":t)+"(?:"+r+(p?t:"")+a+(f?"((?:[\\/"+r+"].+?)?)":"")+")"+p;return i+=s.length-e.length,s}).replace(/\*/g,function(e,t){for(var r=n.length;r-- >p&&n[r].offset>t;)n[r].offset+=3;return"(.*)"});r=MATCHING_GROUP_REGEXP.exec(e);){for(var c=0,l=r.index;"\\"===e.charAt(--l);)c++;c%2!=1&&((p+g===n.length||n[p+g].offset>r.index)&&n.splice(p+g,0,{name:s++,optional:!1,offset:r.index}),g++)}return e+=a?"$":"/"===e[e.length-1]?"":"(?=\\/|$)",new RegExp(e,f)}module.exports=pathtoRegexp;var MATCHING_GROUP_REGEXP=/\((?!\?)/g;
},{}],5:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3,"path-to-regexp":7}],6:[function(require,module,exports){
module.exports=Array.isArray||function(r){return"[object Array]"==Object.prototype.toString.call(r)};
},{}],7:[function(require,module,exports){
function parse(e,t){for(var r,n=[],o=0,a=0,i="",p=t&&t.delimiter||"/";null!=(r=PATH_REGEXP.exec(e));){var s=r[0],c=r[1],u=r.index;if(i+=e.slice(a,u),a=u+s.length,c)i+=c[1];else{var l=e[a],g=r[2],f=r[3],x=r[4],h=r[5],d=r[6],m=r[7];i&&(n.push(i),i="");var y=null!=g&&null!=l&&l!==g,R="+"===d||"*"===d,T="?"===d||"*"===d,E=r[2]||p,v=x||h;n.push({name:f||o++,prefix:g||"",delimiter:E,optional:T,repeat:R,partial:y,asterisk:!!m,pattern:v?escapeGroup(v):m?".*":"[^"+escapeString(E)+"]+?"})}}return a<e.length&&(i+=e.substr(a)),i&&n.push(i),n}function compile(e,t){return tokensToFunction(parse(e,t))}function encodeURIComponentPretty(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function encodeAsterisk(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function tokensToFunction(e){for(var t=new Array(e.length),r=0;r<e.length;r++)"object"==typeof e[r]&&(t[r]=new RegExp("^(?:"+e[r].pattern+")$"));return function(r,n){for(var o="",a=r||{},i=n||{},p=i.pretty?encodeURIComponentPretty:encodeURIComponent,s=0;s<e.length;s++){var c=e[s];if("string"!=typeof c){var u,l=a[c.name];if(null==l){if(c.optional){c.partial&&(o+=c.prefix);continue}throw new TypeError('Expected "'+c.name+'" to be defined')}if(isarray(l)){if(!c.repeat)throw new TypeError('Expected "'+c.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(c.optional)continue;throw new TypeError('Expected "'+c.name+'" to not be empty')}for(var g=0;g<l.length;g++){if(u=p(l[g]),!t[s].test(u))throw new TypeError('Expected all "'+c.name+'" to match "'+c.pattern+'", but received `'+JSON.stringify(u)+"`");o+=(0===g?c.prefix:c.delimiter)+u}}else{if(u=c.asterisk?encodeAsterisk(l):p(l),!t[s].test(u))throw new TypeError('Expected "'+c.name+'" to match "'+c.pattern+'", but received "'+u+'"');o+=c.prefix+u}}else o+=c}return o}}function escapeString(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function escapeGroup(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function attachKeys(e,t){return e.keys=t,e}function flags(e){return e.sensitive?"":"i"}function regexpToRegexp(e,t){var r=e.source.match(/\((?!\?)/g);if(r)for(var n=0;n<r.length;n++)t.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return attachKeys(e,t)}function arrayToRegexp(e,t,r){for(var n=[],o=0;o<e.length;o++)n.push(pathToRegexp(e[o],t,r).source);return attachKeys(new RegExp("(?:"+n.join("|")+")",flags(r)),t)}function stringToRegexp(e,t,r){return tokensToRegExp(parse(e,r),t,r)}function tokensToRegExp(e,t,r){isarray(t)||(r=t||r,t=[]),r=r||{};for(var n=r.strict,o=!1!==r.end,a="",i=0;i<e.length;i++){var p=e[i];if("string"==typeof p)a+=escapeString(p);else{var s=escapeString(p.prefix),c="(?:"+p.pattern+")";t.push(p),p.repeat&&(c+="(?:"+s+c+")*"),c=p.optional?p.partial?s+"("+c+")?":"(?:"+s+"("+c+"))?":s+"("+c+")",a+=c}}var u=escapeString(r.delimiter||"/"),l=a.slice(-u.length)===u;return n||(a=(l?a.slice(0,-u.length):a)+"(?:"+u+"(?=$))?"),a+=o?"$":n&&l?"":"(?="+u+"|$)",attachKeys(new RegExp("^"+a,flags(r)),t)}function pathToRegexp(e,t,r){return isarray(t)||(r=t||r,t=[]),r=r||{},e instanceof RegExp?regexpToRegexp(e,t):isarray(e)?arrayToRegexp(e,t,r):stringToRegexp(e,t,r)}var isarray=require("isarray");module.exports=pathToRegexp,module.exports.parse=parse,module.exports.compile=compile,module.exports.tokensToFunction=tokensToFunction,module.exports.tokensToRegExp=tokensToRegExp;var PATH_REGEXP=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");
},{"isarray":6}],8:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3,"path-to-regexp":9}],9:[function(require,module,exports){
function parse(e,r){for(var t,n=[],o=0,p=0,a="",i=r&&r.delimiter||"/",s=r&&r.delimiters||"./",l=!1;null!==(t=PATH_REGEXP.exec(e));){var g=t[0],u=t[1],c=t.index;if(a+=e.slice(p,c),p=c+g.length,u)a+=u[1],l=!0;else{var f="",x=e[p],h=t[2],m=t[3],d=t[4],T=t[5];if(!l&&a.length){var E=a.length-1;s.indexOf(a[E])>-1&&(f=a[E],a=a.slice(0,E))}a&&(n.push(a),a="",l=!1);var y=""!==f&&void 0!==x&&x!==f,R="+"===T||"*"===T,v="?"===T||"*"===T,w=f||i,b=m||d;n.push({name:h||o++,prefix:f,delimiter:w,optional:v,repeat:R,partial:y,pattern:b?escapeGroup(b):"[^"+escapeString(w)+"]+?"})}}return(a||p<e.length)&&n.push(a+e.substr(p)),n}function compile(e,r){return tokensToFunction(parse(e,r))}function tokensToFunction(e){for(var r=new Array(e.length),t=0;t<e.length;t++)"object"==typeof e[t]&&(r[t]=new RegExp("^(?:"+e[t].pattern+")$"));return function(t,n){for(var o="",p=n&&n.encode||encodeURIComponent,a=0;a<e.length;a++){var i=e[a];if("string"!=typeof i){var s,l=t?t[i.name]:void 0;if(Array.isArray(l)){if(!i.repeat)throw new TypeError('Expected "'+i.name+'" to not repeat, but got array');if(0===l.length){if(i.optional)continue;throw new TypeError('Expected "'+i.name+'" to not be empty')}for(var g=0;g<l.length;g++){if(s=p(l[g]),!r[a].test(s))throw new TypeError('Expected all "'+i.name+'" to match "'+i.pattern+'"');o+=(0===g?i.prefix:i.delimiter)+s}}else if("string"!=typeof l&&"number"!=typeof l&&"boolean"!=typeof l){if(!i.optional)throw new TypeError('Expected "'+i.name+'" to be '+(i.repeat?"an array":"a string"));i.partial&&(o+=i.prefix)}else{if(s=p(String(l)),!r[a].test(s))throw new TypeError('Expected "'+i.name+'" to match "'+i.pattern+'", but got "'+s+'"');o+=i.prefix+s}}else o+=i}return o}}function escapeString(e){return e.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function escapeGroup(e){return e.replace(/([=!:$/()])/g,"\\$1")}function flags(e){return e&&e.sensitive?"":"i"}function regexpToRegexp(e,r){if(!r)return e;var t=e.source.match(/\((?!\?)/g);if(t)for(var n=0;n<t.length;n++)r.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return e}function arrayToRegexp(e,r,t){for(var n=[],o=0;o<e.length;o++)n.push(pathToRegexp(e[o],r,t).source);return new RegExp("(?:"+n.join("|")+")",flags(t))}function stringToRegexp(e,r,t){return tokensToRegExp(parse(e,t),r,t)}function tokensToRegExp(e,r,t){t=t||{};for(var n=t.strict,o=!1!==t.end,p=escapeString(t.delimiter||"/"),a=[].concat(t.endsWith||[]).map(escapeString).concat("$").join("|"),i="",s=0;s<e.length;s++){var l=e[s];if("string"==typeof l)i+=escapeString(l);else{var g=escapeString(l.prefix),u="(?:"+l.pattern+")";r&&r.push(l),l.repeat&&(u+="(?:"+g+u+")*"),u=l.optional?l.partial?g+"("+u+")?":"(?:"+g+"("+u+"))?":g+"("+u+")",i+=u}}return n||(i+="(?:"+p+"(?="+a+"))?"),i+=o?"$"===a?a:"(?="+a+")":"(?="+p+"|"+a+")",new RegExp("^"+i,flags(t))}function pathToRegexp(e,r,t){return e instanceof RegExp?regexpToRegexp(e,r):Array.isArray(e)?arrayToRegexp(e,r,t):stringToRegexp(e,r,t)}module.exports=pathToRegexp,module.exports.parse=parse,module.exports.compile=compile,module.exports.tokensToFunction=tokensToFunction,module.exports.tokensToRegExp=tokensToRegExp;var PATH_REGEXP=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");
},{}],10:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3,"path-to-regexp":11}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenData = void 0;
exports.parse = parse;
exports.compile = compile;
exports.match = match;
exports.pathToRegexp = pathToRegexp;
exports.stringify = stringify;
const DEFAULT_DELIMITER = "/";
const NOOP_VALUE = (value) => value;
const ID_START = /^[$_\p{ID_Start}]$/u;
const ID_CONTINUE = /^[$\u200c\u200d\p{ID_Continue}]$/u;
const DEBUG_URL = "https://git.new/pathToRegexpError";
const SIMPLE_TOKENS = {
    // Groups.
    "{": "{",
    "}": "}",
    // Reserved.
    "(": "(",
    ")": ")",
    "[": "[",
    "]": "]",
    "+": "+",
    "?": "?",
    "!": "!",
};
/**
 * Escape text for stringify to path.
 */
function escapeText(str) {
    return str.replace(/[{}()\[\]+?!:*]/g, "\\$&");
}
/**
 * Escape a regular expression string.
 */
function escape(str) {
    return str.replace(/[.+*?^${}()[\]|/\\]/g, "\\$&");
}
/**
 * Tokenize input string.
 */
function* lexer(str) {
    const chars = [...str];
    let i = 0;
    function name() {
        let value = "";
        if (ID_START.test(chars[++i])) {
            value += chars[i];
            while (ID_CONTINUE.test(chars[++i])) {
                value += chars[i];
            }
        }
        else if (chars[i] === '"') {
            let pos = i;
            while (i < chars.length) {
                if (chars[++i] === '"') {
                    i++;
                    pos = 0;
                    break;
                }
                if (chars[i] === "\\") {
                    value += chars[++i];
                }
                else {
                    value += chars[i];
                }
            }
            if (pos) {
                throw new TypeError(`Unterminated quote at ${pos}: ${DEBUG_URL}`);
            }
        }
        if (!value) {
            throw new TypeError(`Missing parameter name at ${i}: ${DEBUG_URL}`);
        }
        return value;
    }
    while (i < chars.length) {
        const value = chars[i];
        const type = SIMPLE_TOKENS[value];
        if (type) {
            yield { type, index: i++, value };
        }
        else if (value === "\\") {
            yield { type: "ESCAPED", index: i++, value: chars[i++] };
        }
        else if (value === ":") {
            const value = name();
            yield { type: "PARAM", index: i, value };
        }
        else if (value === "*") {
            const value = name();
            yield { type: "WILDCARD", index: i, value };
        }
        else {
            yield { type: "CHAR", index: i, value: chars[i++] };
        }
    }
    return { type: "END", index: i, value: "" };
}
class Iter {
    constructor(tokens) {
        this.tokens = tokens;
    }
    peek() {
        if (!this._peek) {
            const next = this.tokens.next();
            this._peek = next.value;
        }
        return this._peek;
    }
    tryConsume(type) {
        const token = this.peek();
        if (token.type !== type)
            return;
        this._peek = undefined; // Reset after consumed.
        return token.value;
    }
    consume(type) {
        const value = this.tryConsume(type);
        if (value !== undefined)
            return value;
        const { type: nextType, index } = this.peek();
        throw new TypeError(`Unexpected ${nextType} at ${index}, expected ${type}: ${DEBUG_URL}`);
    }
    text() {
        let result = "";
        let value;
        while ((value = this.tryConsume("CHAR") || this.tryConsume("ESCAPED"))) {
            result += value;
        }
        return result;
    }
}
/**
 * Tokenized path instance.
 */
class TokenData {
    constructor(tokens) {
        this.tokens = tokens;
    }
}
exports.TokenData = TokenData;
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options = {}) {
    const { encodePath = NOOP_VALUE } = options;
    const it = new Iter(lexer(str));
    function consume(endType) {
        const tokens = [];
        while (true) {
            const path = it.text();
            if (path)
                tokens.push({ type: "text", value: encodePath(path) });
            const param = it.tryConsume("PARAM");
            if (param) {
                tokens.push({
                    type: "param",
                    name: param,
                });
                continue;
            }
            const wildcard = it.tryConsume("WILDCARD");
            if (wildcard) {
                tokens.push({
                    type: "wildcard",
                    name: wildcard,
                });
                continue;
            }
            const open = it.tryConsume("{");
            if (open) {
                tokens.push({
                    type: "group",
                    tokens: consume("}"),
                });
                continue;
            }
            it.consume(endType);
            return tokens;
        }
    }
    const tokens = consume("END");
    return new TokenData(tokens);
}
/**
 * Compile a string to a template function for the path.
 */
function compile(path, options = {}) {
    const { encode = encodeURIComponent, delimiter = DEFAULT_DELIMITER } = options;
    const data = path instanceof TokenData ? path : parse(path, options);
    const fn = tokensToFunction(data.tokens, delimiter, encode);
    return function path(data = {}) {
        const [path, ...missing] = fn(data);
        if (missing.length) {
            throw new TypeError(`Missing parameters: ${missing.join(", ")}`);
        }
        return path;
    };
}
function tokensToFunction(tokens, delimiter, encode) {
    const encoders = tokens.map((token) => tokenToFunction(token, delimiter, encode));
    return (data) => {
        const result = [""];
        for (const encoder of encoders) {
            const [value, ...extras] = encoder(data);
            result[0] += value;
            result.push(...extras);
        }
        return result;
    };
}
/**
 * Convert a single token into a path building function.
 */
function tokenToFunction(token, delimiter, encode) {
    if (token.type === "text")
        return () => [token.value];
    if (token.type === "group") {
        const fn = tokensToFunction(token.tokens, delimiter, encode);
        return (data) => {
            const [value, ...missing] = fn(data);
            if (!missing.length)
                return [value];
            return [""];
        };
    }
    const encodeValue = encode || NOOP_VALUE;
    if (token.type === "wildcard" && encode !== false) {
        return (data) => {
            const value = data[token.name];
            if (value == null)
                return ["", token.name];
            if (!Array.isArray(value) || value.length === 0) {
                throw new TypeError(`Expected "${token.name}" to be a non-empty array`);
            }
            return [
                value
                    .map((value, index) => {
                    if (typeof value !== "string") {
                        throw new TypeError(`Expected "${token.name}/${index}" to be a string`);
                    }
                    return encodeValue(value);
                })
                    .join(delimiter),
            ];
        };
    }
    return (data) => {
        const value = data[token.name];
        if (value == null)
            return ["", token.name];
        if (typeof value !== "string") {
            throw new TypeError(`Expected "${token.name}" to be a string`);
        }
        return [encodeValue(value)];
    };
}
/**
 * Transform a path into a match function.
 */
function match(path, options = {}) {
    const { decode = decodeURIComponent, delimiter = DEFAULT_DELIMITER } = options;
    const { regexp, keys } = pathToRegexp(path, options);
    const decoders = keys.map((key) => {
        if (decode === false)
            return NOOP_VALUE;
        if (key.type === "param")
            return decode;
        return (value) => value.split(delimiter).map(decode);
    });
    return function match(input) {
        const m = regexp.exec(input);
        if (!m)
            return false;
        const path = m[0];
        const params = Object.create(null);
        for (let i = 1; i < m.length; i++) {
            if (m[i] === undefined)
                continue;
            const key = keys[i - 1];
            const decoder = decoders[i - 1];
            params[key.name] = decoder(m[i]);
        }
        return { path, params };
    };
}
function pathToRegexp(path, options = {}) {
    const { delimiter = DEFAULT_DELIMITER, end = true, sensitive = false, trailing = true, } = options;
    const keys = [];
    const sources = [];
    const flags = sensitive ? "" : "i";
    const paths = Array.isArray(path) ? path : [path];
    const items = paths.map((path) => path instanceof TokenData ? path : parse(path, options));
    for (const { tokens } of items) {
        for (const seq of flatten(tokens, 0, [])) {
            const regexp = sequenceToRegExp(seq, delimiter, keys);
            sources.push(regexp);
        }
    }
    let pattern = `^(?:${sources.join("|")})`;
    if (trailing)
        pattern += `(?:${escape(delimiter)}$)?`;
    pattern += end ? "$" : `(?=${escape(delimiter)}|$)`;
    const regexp = new RegExp(pattern, flags);
    return { regexp, keys };
}
/**
 * Generate a flat list of sequence tokens from the given tokens.
 */
function* flatten(tokens, index, init) {
    if (index === tokens.length) {
        return yield init;
    }
    const token = tokens[index];
    if (token.type === "group") {
        const fork = init.slice();
        for (const seq of flatten(token.tokens, 0, fork)) {
            yield* flatten(tokens, index + 1, seq);
        }
    }
    else {
        init.push(token);
    }
    yield* flatten(tokens, index + 1, init);
}
/**
 * Transform a flat sequence of tokens into a regular expression.
 */
function sequenceToRegExp(tokens, delimiter, keys) {
    let result = "";
    let backtrack = "";
    let isSafeSegmentParam = true;
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token.type === "text") {
            result += escape(token.value);
            backtrack += token.value;
            isSafeSegmentParam || (isSafeSegmentParam = token.value.includes(delimiter));
            continue;
        }
        if (token.type === "param" || token.type === "wildcard") {
            if (!isSafeSegmentParam && !backtrack) {
                throw new TypeError(`Missing text after "${token.name}": ${DEBUG_URL}`);
            }
            if (token.type === "param") {
                result += `(${negate(delimiter, isSafeSegmentParam ? "" : backtrack)}+)`;
            }
            else {
                result += `([\\s\\S]+)`;
            }
            keys.push(token);
            backtrack = "";
            isSafeSegmentParam = false;
            continue;
        }
    }
    return result;
}
function negate(delimiter, backtrack) {
    if (backtrack.length < 2) {
        if (delimiter.length < 2)
            return `[^${escape(delimiter + backtrack)}]`;
        return `(?:(?!${escape(delimiter)})[^${escape(backtrack)}])`;
    }
    if (delimiter.length < 2) {
        return `(?:(?!${escape(backtrack)})[^${escape(delimiter)}])`;
    }
    return `(?:(?!${escape(backtrack)}|${escape(delimiter)})[\\s\\S])`;
}
/**
 * Stringify token data into a path string.
 */
function stringify(data) {
    return data.tokens
        .map(function stringifyToken(token, index, tokens) {
        if (token.type === "text")
            return escapeText(token.value);
        if (token.type === "group") {
            return `{${token.tokens.map(stringifyToken).join("")}}`;
        }
        const isSafe = isNameSafe(token.name) && isNextNameSafe(tokens[index + 1]);
        const key = isSafe ? token.name : JSON.stringify(token.name);
        if (token.type === "param")
            return `:${key}`;
        if (token.type === "wildcard")
            return `*${key}`;
        throw new TypeError(`Unexpected token: ${token}`);
    })
        .join("");
}
function isNameSafe(name) {
    const [first, ...rest] = name;
    if (!ID_START.test(first))
        return false;
    return rest.every((char) => ID_CONTINUE.test(char));
}
function isNextNameSafe(token) {
    if ((token === null || token === void 0 ? void 0 : token.type) !== "text")
        return true;
    return !ID_CONTINUE.test(token.value[0]);
}

},{}]},{},[1])


//# sourceMappingURL=build.js.map