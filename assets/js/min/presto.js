/* http://prismjs.com/download.html?themes=prism&languages=markup+css+css-extras+clike+javascript */
self=typeof window!="undefined"?window:typeof WorkerGlobalScope!="undefined"&&self instanceof WorkerGlobalScope?self:{};var Prism=function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={util:{encode:function(e){return e instanceof n?new n(e.type,t.util.encode(e.content),e.alias):t.util.type(e)==="Array"?e.map(t.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var r={};for(var i in e)e.hasOwnProperty(i)&&(r[i]=t.util.clone(e[i]));return r;case"Array":return e.slice()}return e}},languages:{extend:function(e,n){var r=t.util.clone(t.languages[e]);for(var i in n)r[i]=n[i];return r},insertBefore:function(e,n,r,i){i=i||t.languages;var s=i[e];if(arguments.length==2){r=arguments[1];for(var o in r)r.hasOwnProperty(o)&&(s[o]=r[o]);return s}var u={};for(var a in s)if(s.hasOwnProperty(a)){if(a==n)for(var o in r)r.hasOwnProperty(o)&&(u[o]=r[o]);u[a]=s[a]}t.languages.DFS(t.languages,function(t,n){n===i[e]&&t!=e&&(this[t]=u)});return i[e]=u},DFS:function(e,n,r){for(var i in e)if(e.hasOwnProperty(i)){n.call(e,i,e[i],r||i);t.util.type(e[i])==="Object"?t.languages.DFS(e[i],n):t.util.type(e[i])==="Array"&&t.languages.DFS(e[i],n,i)}}},highlightAll:function(e,n){var r=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');for(var i=0,s;s=r[i++];)t.highlightElement(s,e===!0,n)},highlightElement:function(r,i,s){var o,u,a=r;while(a&&!e.test(a.className))a=a.parentNode;if(a){o=(a.className.match(e)||[,""])[1];u=t.languages[o]}if(!u)return;r.className=r.className.replace(e,"").replace(/\s+/g," ")+" language-"+o;a=r.parentNode;/pre/i.test(a.nodeName)&&(a.className=a.className.replace(e,"").replace(/\s+/g," ")+" language-"+o);var f=r.textContent;if(!f)return;var l={element:r,language:o,grammar:u,code:f};t.hooks.run("before-highlight",l);if(i&&self.Worker){var c=new Worker(t.filename);c.onmessage=function(e){l.highlightedCode=n.stringify(JSON.parse(e.data),o);t.hooks.run("before-insert",l);l.element.innerHTML=l.highlightedCode;s&&s.call(l.element);t.hooks.run("after-highlight",l)};c.postMessage(JSON.stringify({language:l.language,code:l.code}))}else{l.highlightedCode=t.highlight(l.code,l.grammar,l.language);t.hooks.run("before-insert",l);l.element.innerHTML=l.highlightedCode;s&&s.call(r);t.hooks.run("after-highlight",l)}},highlight:function(e,r,i){var s=t.tokenize(e,r);return n.stringify(t.util.encode(s),i)},tokenize:function(e,n,r){var i=t.Token,s=[e],o=n.rest;if(o){for(var u in o)n[u]=o[u];delete n.rest}e:for(var u in n){if(!n.hasOwnProperty(u)||!n[u])continue;var a=n[u];a=t.util.type(a)==="Array"?a:[a];for(var f=0;f<a.length;++f){var l=a[f],c=l.inside,h=!!l.lookbehind,p=0,d=l.alias;l=l.pattern||l;for(var v=0;v<s.length;v++){var m=s[v];if(s.length>e.length)break e;if(m instanceof i)continue;l.lastIndex=0;var g=l.exec(m);if(g){h&&(p=g[1].length);var y=g.index-1+p,g=g[0].slice(p),b=g.length,w=y+b,E=m.slice(0,y+1),S=m.slice(w+1),x=[v,1];E&&x.push(E);var T=new i(u,c?t.tokenize(g,c):g,d);x.push(T);S&&x.push(S);Array.prototype.splice.apply(s,x)}}}}return s},hooks:{all:{},add:function(e,n){var r=t.hooks.all;r[e]=r[e]||[];r[e].push(n)},run:function(e,n){var r=t.hooks.all[e];if(!r||!r.length)return;for(var i=0,s;s=r[i++];)s(n)}}},n=t.Token=function(e,t,n){this.type=e;this.content=t;this.alias=n};n.stringify=function(e,r,i){if(typeof e=="string")return e;if(Object.prototype.toString.call(e)=="[object Array]")return e.map(function(t){return n.stringify(t,r,e)}).join("");var s={type:e.type,content:n.stringify(e.content,r,i),tag:"span",classes:["token",e.type],attributes:{},language:r,parent:i};s.type=="comment"&&(s.attributes.spellcheck="true");if(e.alias){var o=t.util.type(e.alias)==="Array"?e.alias:[e.alias];Array.prototype.push.apply(s.classes,o)}t.hooks.run("wrap",s);var u="";for(var a in s.attributes)u+=a+'="'+(s.attributes[a]||"")+'"';return"<"+s.tag+' class="'+s.classes.join(" ")+'" '+u+">"+s.content+"</"+s.tag+">"};if(!self.document){if(!self.addEventListener)return self.Prism;self.addEventListener("message",function(e){var n=JSON.parse(e.data),r=n.language,i=n.code;self.postMessage(JSON.stringify(t.util.encode(t.tokenize(i,t.languages[r]))));self.close()},!1);return self.Prism}var r=document.getElementsByTagName("script");r=r[r.length-1];if(r){t.filename=r.src;document.addEventListener&&!r.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)}return self.Prism}();typeof module!="undefined"&&module.exports&&(module.exports=Prism);;
Prism.languages.markup={comment:/<!--[\w\W]*?-->/g,prolog:/<\?.+?\?>/,doctype:/<!DOCTYPE.+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,inside:{tag:{pattern:/^<\/?[\w:-]+/i,inside:{punctuation:/^<\/?/,namespace:/^[\w-]+?:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,inside:{punctuation:/=|>|"/g}},punctuation:/\/?>/g,"attr-name":{pattern:/[\w:-]+/g,inside:{namespace:/^[\w-]+?:/}}}},entity:/\&#?[\da-z]{1,8};/gi},Prism.hooks.add("wrap",function(t){"entity"===t.type&&(t.attributes.title=t.content.replace(/&amp;/,"&"))});;
Prism.languages.css={comment:/\/\*[\w\W]*?\*\//g,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*{))/gi,inside:{punctuation:/[;:]/g}},url:/url\((["']?).*?\1\)/gi,selector:/[^\{\}\s][^\{\};]*(?=\s*\{)/g,property:/(\b|\B)[\w-]+(?=\s*:)/gi,string:/("|')(\\?.)*?\1/g,important:/\B!important\b/gi,punctuation:/[\{\};:]/g,"function":/[-a-z0-9]+(?=\()/gi},Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/<style[\w\W]*?>[\w\W]*?<\/style>/gi,inside:{tag:{pattern:/<style[\w\W]*?>|<\/style>/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css},alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').+?\1/gi,inside:{"attr-name":{pattern:/^\s*style/gi,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/gi,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag));;
Prism.languages.css.selector={pattern:/[^\{\}\s][^\{\}]*(?=\s*\{)/g,inside:{"pseudo-element":/:(?:after|before|first-letter|first-line|selection)|::[-\w]+/g,"pseudo-class":/:[-\w]+(?:\(.*\))?/g,"class":/\.[-:\.\w]+/g,id:/#[-:\.\w]+/g}},Prism.languages.insertBefore("css","ignore",{hexcode:/#[\da-f]{3,6}/gi,entity:/\\[\da-f]{1,8}/gi,number:/[\d%\.]+/g});;
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//g,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*?(\r?\n|$)/g,lookbehind:!0}],string:/("|')(\\?.)*?\1/g,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,"boolean":/\b(true|false)\b/g,"function":{pattern:/[a-z0-9_]+\(/gi,inside:{punctuation:/\(/}},number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g};;
Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/<script[\w\W]*?>[\w\W]*?<\/script>/gi,inside:{tag:{pattern:/<script[\w\W]*?>|<\/script>/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript},alias:"language-javascript"}});;



/* CORE */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* UI */

    $.ui = {
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        },
        mouseButton: {
            LEFT: 0,
            MIDDLE: 1,
            RIGHT: 2
        }
    };

}( lQuery, window, document ));



/* TMPL - https://github.com/blueimp/JavaScript-Templates */

/*
 ***************************
 *      Documentation      *
 ***************************
 *
 * Interpolation
 *
 * - Basic
 * <h3>{%=o.title%}</h3>
 *
 * - Unescaped
 * <h3>{%#o.user_id%}</h3>
 *
 * - Result of function call
 * <a href="{%=encodeURI(o.url)%}">Website</a>
 *
 * - Nested properties
 * <strong>{%=o.author.name%}</strong>
 *
 * Evaluation
 *
 * - Print
 * <span>Year: {% var d=new Date(); print(d.getFullYear()); %}</span>
 *
 * - Print unescaped
 * <span>{% print("Fast &amp; powerful", true); %}</span>
 *
 * - Include another template
 * <div>
 *     {% include('tmpl-link', {name: "Website", url: "https://example.org"}); %}
 * </div>
 *
 * - If else condition
 * {% if (o.author.url) { %}
 *     <a href="{%=encodeURI(o.author.url)%}">{%=o.author.name%}</a>
 * {% } else { %}
 *     <em>No author url.</em>
 * {% } %}
 *
 * - For loop
 * <ul>
 *     {% for (var i=0; i<o.features.length; i++) { %}
 *         <li>{%=o.features[i]%}</li>
 *     {% } %}
 * </ul>
 *
 ***************************
 */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* TMPL */

    var tmpl = function ( str, data ) {

        var f = !/[^\w\-\.:]/.test ( str )
                    ? tmpl.cache[str] = tmpl.cache[str] || tmpl ( document.getElementById ( str ).innerHTML )
                    : new Function ( tmpl.arg + ',tmpl', "var _e=_.escape" + tmpl.helper + ",_s='" + str.replace ( tmpl.regexp, tmpl.func ) + "';return _s;" );

        return data
                   ? f ( data, tmpl )
                   : function ( data ) { return f ( data, tmpl ); };

    };

    tmpl.cache = {};

    tmpl.regexp = /([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g;

    tmpl.func = function ( s, p1, p2, p3, p4, p5 ) {

        if ( p1 ) { // whitespace, quote and backspace in HTML context

            return {
                '\n': '\\n',
                '\r': '\\r',
                '\t': '\\t',
                ' ' : ' '
            }[p1] || '\\' + p1;

        }

        if ( p2 ) { // interpolation: {%=prop%}, or unescaped: {%#prop%}

            if ( p2 === '=' ) {

                return "'+_e(" + p3 + ")+'";

            }

            return "'+(" + p3 + "==null?'':" + p3 + ")+'";

        }

        if ( p4 ) { // evaluation start tag: {%

            return "';";

        }

        if ( p5 ) { // evaluation end tag: %}

            return "_s+='";

        }

    };

    tmpl.arg = 'o';

    tmpl.helper = ",print=function(s,e){_s+=e?(s==null?'':s):_e(s);},include=function(s,d){_s+=tmpl(s,d);}";

    /* HELPER */

    $.tmpl = tmpl;

}( lQuery, window, document ));



/* BASE WIDGET */

//TODO: support for trigger -> preventDefault

;(function ( $, window, document, undefined ) {

    'use strict';

    /* BASE WIDGET */

    $.Widget = function ( /* options, element */ ) {};

    $.Widget._childConstructors = [];

    $.Widget.prototype = {

        /* VARIABLES */

        widgetOriginalName: 'widget',
        widgetName: 'widget',
        widgetFullName: 'widget',

        defaultElement: false,
        templates: {}, //INFO: the `base` template will be used as the constructor

        /* OPTIONS */

        options: {
            disabled: false, //TODO: init/set it dinamically on instantiation
            callbacks: {}
        },

        /* WIDGET FUNCTIONS */

        _createWidget: function ( options, element ) {

            // VARIABLES

            this.initializationType = element
                                          ? 'element'
                                          : this.defaultElement
                                              ? 'html'
                                              : this.templates.base
                                                  ? 'template'
                                                  : 'none';

            /* EXTEND OPTIONS */

            this.options = _.extend ( {}, this.options, this._getCreateOptions (), options );

            if ( this.initializationType === 'element' ) {

                _.extend ( this.options, $(element).data ( this.widgetName ) );

            }

            // INIT ELEMENT

            element = $( element || this.defaultElement || ( this.templates.base ? this._tmpl ( 'base', this.options ) : false ) || this ).get ( 0 );

            this.element = element;
            this.$element = $(element);

            this.guid = _.uniqueId ();

            // IF THERE'S AN ELEMENT OR A DEFAULT ELEMENT

            if ( element !== this ) {

                // SAVING INSTANCE

                $.data ( this.element, this.widgetFullName, this );

                // ON $ELEMENT REMOVE -> WIDGET DESTROY

                this._on ( true, this.$element, 'remove', function ( event ) {

                    if ( event.target === this.element ) {

                        this.destroy ();

                    }

                });

            } else { //FIXME

                console.log("PAY ATTENCION!!! element === this");
                alert("PAY ATTENCION!!! element === this");
                console.log(this);

            }

            //TODO: not setting this.document and this.window

            /* CALLBACKS */

            this._create ();

            this._trigger ( 'create', this._getCreateEventData () );

            this._variables ();

            this._init ();

            this._events ();

        },

        _getCreateOptions: $.noop,
        _getCreateEventData: $.noop,
        _create: $.noop,
        _variables: $.noop,
        _init: $.noop,
        _events: $.noop,

        destroy: function () {

            this._destroy ();

            $.data ( this.element, this.widgetFullName, null ); //TODO: remove it, not set it to null

        },

        _destroy: $.noop,

        widget: function () {

            return this.$element;

        },

        /* OPTIONS FUNCTIONS */

        option: function ( key, value ) {

            if ( arguments.length === 0 ) {

                return _.extend ( {}, this.options );

            }

            var options = key,
                parts,
                curOption,
                i;

            if ( typeof key === 'string' ) {

                // handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }

                options = {};
                parts = key.split ( '.' );
                key = parts.shift ();

                if ( parts.length ) {

                    curOption = options[key] = _.extend ( {}, this.options[key] );

                    for ( i = 0; i < parts.length - 1; i++ ) {

                        curOption[parts[i]] = curOption[parts[i]] || {};
                        curOption = curOption[parts[i]];

                    }

                    key = parts.pop ();

                    if ( arguments.length === 1 ) {

                        return curOption[key] === undefined ? null : curOption[key];

                    }

                    curOption[key] = value;

                } else {

                    if ( arguments.length === 1 ) {

                        return this.options[key] === undefined ? null : this.options[key];

                    }

                    options[key] = value;

                }

            }

            this._setOptions ( options );

            return this;

        },

        _setOptions: function ( options ) {

            for ( var key in options ) {

                this._setOption ( key, options[key] );

            }

            return this;

        },

        _setOption: function ( key, value ) {

            this.options[key] = value;

            if ( key === 'disabled' ) {

                this.$element.toggleClass ( this.widgetName + '-disabled', !!value ); //FIXME: are you sure you don't want to use presto.widgetFullName instead?

            }

            return this;

        },

        /* ENABLING / DISABLING */

        enable: function () {

            return this._setOptions ({ disabled: false });

        },

        disable: function () {

            return this._setOptions ({ disabled: true });

        },

        /* EVENTS */

        _on: function ( suppressDisabledCheck, $element, events, handler ) {

            //TODO: add support for delegation and custom data

            var instance = this;

            if ( typeof suppressDisabledCheck !== 'boolean' ) {

                handler = events;
                events = $element;
                $element = suppressDisabledCheck;
                suppressDisabledCheck = false;

            }

            if ( !handler ) {

                handler = events;
                events = $element;
                $element = this.$element;

            }

            handler = _.isString ( handler ) ? this[handler] : handler;

            var handler_guid = $.guid ( handler );

            function handlerProxy () {

                if ( !suppressDisabledCheck && ( instance.options.disabled || instance.$element.hasClass ( instance.widgetName + '-disabled' ) ) ) return; //FIXME: are you sure you don't want to use presto.widgetFullName instead?

                var args = Array.prototype.slice.call ( arguments, 0 );

                args.push ( this );

                return handler.apply ( instance, args );

            }

            handlerProxy.guid = handler_guid;

            $element.on ( events, handlerProxy );

        },

        _off: function ( $element, events, handler ) {

            if ( !handler ) {

                handler = events;
                events = $element;
                $element = this.$element;

            }

            handler = _.isString ( handler ) ? this[handler] : handler;

            $element.off ( events, handler );

        },

        _trigger: function ( events, data ) {

            //TODO: add support for passing datas

            data = data || {};

            events = events.split ( ' ' );

            for ( var ei = 0, el = events.length; ei < el; ei++ ) {

                this.$element.trigger ( this.widgetName + ':' + events[ei], data );

                if ( typeof this.options.callbacks[events[ei]] === 'function' ) {

                    this.options.callbacks[events[ei]].call ( this.element, data );

                }

            }

        },

        /* DELAYING */

        _delay: function ( handler, delay ) {

            var instance = this;

            return setTimeout ( function () {

                handler.apply ( instance, arguments );

            }, delay || 0 );

        },

        /* TEMPLATE */

        _tmpl: function ( name, options ) {

            return $.tmpl ( this.widgetOriginalName + '.' + name, options );

        },

        /* MANIPULATION */

        insertBefore: function ( selector ) {

            this.$element.insertBefore ( selector );

            return this;

        },

        insertAfter: function ( selector ) {

            this.$element.insertAfter ( selector );

            return this;

        },

        prependTo: function ( selector ) {

            this.$element.prependTo ( selector );

            return this;

        },

        appendTo: function ( selector ) {

            this.$element.appendTo ( selector );

            return this;

        }

    };

}( lQuery, window, document ));



/* WIDGET FACTORY */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* WIDGET FACTORY */

    $.widget = function ( originalName, base, prototype ) {

        /* VARIABLES */

        var fullName,
            existingConstructor,
            constructor,
            basePrototype,
            proxiedPrototype = {},
            nameParts = originalName.split ( '.' ),
            namespace = nameParts.length > 1 ? nameParts[0] : false,
            name = nameParts.length > 1 ? nameParts[1] : nameParts[0];

        fullName = namespace ? namespace + '-' + name : name;

        /* NO BASE */

        if ( !prototype ) {

            prototype = base;
            base = $.Widget;

        }

        /* NAMESPACE */

        if ( namespace ) {

            $[namespace] = $[namespace] || {};

        }

        /* CONSTRUCTOR */

        existingConstructor = namespace ? $[namespace][name] : $[name];

        constructor = function ( options, element ) {

            if ( !this._createWidget ) {

                return new constructor ( options, element );

            }

            if ( arguments.length ) {

                this._createWidget ( options, element );

            }

        }

        if ( namespace ) {

            $[namespace][name] = constructor;

        } else {

            $[name] = constructor;

        }

        /* EXTENDING CONSTRUCTOR IN ORDER TO CARRY OVER STATIC PROPERTIES */

        _.extend ( constructor, existingConstructor, {
            _proto: _.extend ( {}, prototype ),
            _childConstructors: []
        });

        /* BASE PROTOTYPE */

        basePrototype = new base ();

        basePrototype.options = _.extend ( {}, basePrototype.options );

        /* PROXIED PROTOTYPE */

        for ( var prop in prototype ) {

            if ( typeof prototype[prop] !== 'function' ) {

                proxiedPrototype[prop] = prototype[prop];
                continue;

            }

            proxiedPrototype[prop] = (function ( prop ) {

                var _super = function () {
                        return base.prototype[prop].apply ( this, arguments );
                    },
                    _superApply = function ( args ) {
                        return base.prototype[prop].apply ( this, args );
                    };

                return function () {

                    var __super = this._super,
                        __superApply = this._superApply,
                        returnValue;

                    this._super = _super;
                    this._superApply = _superApply;

                    returnValue = prototype[prop].apply ( this, arguments );

                    this._super = __super;
                    this._superApply = __superApply;

                    return returnValue;

                };

            })( prop );

        }

        /* CONSTRUCTOR PROTOTYPE */

        constructor.prototype = _.extend ( basePrototype, proxiedPrototype, {
            constructor: constructor,
            namespace: namespace,
            widgetOriginalName: originalName,
            widgetName: name,
            widgetFullName: fullName
        });

        /* CACHE TEMPLATES */

        for ( var tmpl_name in prototype.templates ) {

            $.tmpl.cache[originalName + '.' + tmpl_name] = $.tmpl ( prototype.templates[tmpl_name] );

        }

        /* UPDATE PROTOTYPE CHAIN */

        if ( existingConstructor ) {

            for ( var i = 0, l = existingConstructor._childConstructors.length; i < l; i++ ) {

                var childPrototype = existingConstructor._childConstructors[i].prototype;

                $.widget ( ( childPrototype.namespace ? childPrototype.namespace + '.' + childPrototype.widgetName : childPrototype.widgetName ), constructor, existingConstructor._childConstructors[i]._proto );

            }

            delete existingConstructor._childConstructors;

        } else {

            base._childConstructors.push ( constructor );

        }

        /* CONSTRUCT */

        $.widget.bridge ( name, constructor );

        /* RETURN */

        return constructor;

    };

    $.widget.bridge = function ( name, object ) {

        /* VARIABLES */

        var fullName = object.prototype.widgetFullName || name;

        /* PLUGIN */

        $.fn[name] = function ( options ) {

            if ( this.length === 0 && !object.prototype.defaultElement && !object.prototype.templates.base ) return; //INFO: nothing to work on //FIXME: create the first element with the defaultElement or the templates.base options, then add the instance to him

            var isMethodCall = ( typeof options === 'string' ),
                args = Array.prototype.slice.call ( arguments, 1 ),
                returnValue = this;

            if ( isMethodCall ) {

                /* METHOD CALL */

                this.each ( function () {

                    /* VARIABLES */

                    var methodValue,
                        instance = $.data ( this, fullName );

                    /* GETTING INSTANCE */

                    if ( options === 'instance' ) {

                        returnValue = instance;

                        return false;

                    }

                    /* CHECKING VALID CALL */

                    if ( !instance ) return; //INFO: No instance found

                    if ( !(typeof instance[options] === 'function') || options.charAt ( 0 ) === '_' ) return; //INFO: Private method

                    /* CALLING */

                    methodValue = instance[options].apply ( instance, args );

                    if ( methodValue !== instance && methodValue !== undefined ) {

                        returnValue = methodValue;

                        return false;

                    }

                });

            } else {

                /* SUPPORT FOR PASSING MULTIPLE OPTIONS OBJECTS */

                if ( args.length ) {

                    options = _.extend.apply ( null, [options].concat ( args ) );

                }

                /* INSTANCIATING */

                this.each ( function () {

                    /* GET INSTANCE */

                    var instance = $.data ( this, fullName );

                    if ( instance ) {

                        instance.option ( options || {} );

                    } else {

                        $.data ( this, fullName, new object ( options, this ) );

                    }

                });

            }

            return returnValue;

        };

    };

}( lQuery, window, document ));



/* ANIMATE */

//FIXME: does it work with units different than pixels???
//TODO: add support for easing

;(function ( $, window, document, undefined ) {

    'use strict';

    /* VARIABLES */

    var ms_60fps = 16.5; //INFO: Approximately, it should be a periodic 16.666666

    /* ANIMATE */

    $.fn.animate = function ( properties, duration, easing, complete, delay ) {

        // Support for partial arguments

        if ( !_.isNumber ( duration ) ) {

            delay = complete;
            complete = easing;
            easing = duration;
            duration = 400;

        }

        if ( !_.isString ( easing ) ) {

            complete = easing;
            easing = 'easeOutQuad';

        }

        if ( !_.isFunction ( complete ) ) {

            delay = complete;
            complete = $.noop;

        }

        if ( !_.isNumber ( delay ) ) {

            delay = 0;

        }

        for ( var i = 0, l = this.length; i < l; i++ ) {

            (function ( instance, i ){ //INFO: Avoiding variables overriding when the length is greater than 1

                var ele = instance.nodes[i],
                    $ele = $(ele);

                // Sanitize and create the new_properties (properties that changes)

                var current_properties = {},
                    new_properties = {};

                for ( var prop in properties ) {

                    current_properties[prop] = parseInt ( getComputedStyle ( ele )[prop], 10 );
                    properties[prop] = parseInt ( properties[prop], 10 );

                    if ( properties[prop] !== current_properties[prop] ) { //INFO: checking if something actually changed

                        new_properties[prop] = properties[prop];

                    }

                }

                // If something changes

                if ( _.size ( new_properties ) > 0 ) {

                    setTimeout ( function () {

                        // Populating delta properties (the values to set per each step)

                        var steps_nr = duration / ms_60fps, //TODO: maybe parseInt... pros? cons?
                            delta_properties = {};

                        for ( var prop in new_properties ) {

                            delta_properties[prop] = []; //TODO: Array(steps_nr)

                            var order = current_properties[prop] > new_properties[prop];

                            for ( var step_nr = 0; step_nr < steps_nr; step_nr++ ) {

                                delta_properties[prop][step_nr] = $.easing[easing]( step_nr * ms_60fps, order ? new_properties[prop] : current_properties[prop], order ? current_properties[prop] : new_properties[prop], duration );

                            }

                            if ( order ) delta_properties[prop] = delta_properties[prop].reverse ();

                        }

                        // Scheduling delta properties

                        for ( var prop in new_properties ) {

                            for ( var step_nr = 0; step_nr < steps_nr; step_nr++ ) {

                                setTimeout ( (function ( step_nr ) {

                                    return function () {

                                        $.css_set ( ele, prop, delta_properties[prop][step_nr] );

                                    };

                                })( step_nr ), ms_60fps * step_nr );

                            }

                        }

                        // If the steps are not exactly accurate do the remaining extra change, but do it alsways...

                        setTimeout ( function () {

                            for ( var prop in properties ) {

                                $.css_set ( ele, prop, properties[prop] );

                            };

                        }, duration );

                        // Fire the complete callback

                        if ( i === 0 ) {

                            setTimeout ( function () {

                                complete (); //FIXME: not exactly accurate...

                            }, duration );

                        }

                    }, delay );

                }

            })( this, i );

        }

        return this;

    };

}( lQuery, window, document ));



/* AUTOGROW */

//TODO: make it more DRY

;(function ( $, window, document, undefined ) {

    'use strict';

    /* AUTOGROW */

    $.widget ( 'presto.autogrow', {

        /* OPTIONS */

        options: {
            default_width: 0,
            default_height: 0,
            callbacks: {
                update: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$growable = this.$element;

            this.is_border_box = ( this.$growable.css ( 'box-sizing' ) === 'border-box' ); //TODO: maybe only support border-box...

            this.is_input = this.$growable.is ( 'input' );
            this.is_textarea = this.$growable.is ( 'textarea' );

            this.extra_pxs = 0;

        },

        _init: function () {

            if ( this.is_border_box ) {

                var props = this.is_input
                                ? ['border-left-width', 'padding-left', 'padding-right', 'border-right-width']
                                : this.is_textarea
                                    ? ['border-top-width', 'padding-top', 'padding-bottom', 'border-bottom-width']
                                    : [];

                for ( var i = 0, l = props.length; i < l; i++ ) {

                    this.extra_pxs += parseFloat ( this.$growable.css ( props[i] ) );

                }

            }

            this.update ();

        },

        _events: function () {

            this._on ( 'input change', this.update );

        },

        /* INPUT */

        _update_input_width: function () {

            var needed_width = this._get_input_needed_width ( this.$growable ),
                actual_width = this.$growable.width ();

            if ( needed_width > actual_width ) {

                this.$growable.width ( needed_width + this.extra_pxs );

            } else if ( actual_width > needed_width ) {

                this.$growable.width ( Math.max ( needed_width, this.options.default_width ) + this.extra_pxs );

            }

        },

        _get_input_needed_width: function () {

            var $span = $( '<span>' + this.$growable.val () + '</span>' );

            $span.css ({
                'position' : 'absolute',
                'left' : -9999,
                'top' : -9999,
                'font-family' : this.$growable.css ( 'font-family' ),
                'font-size' : this.$growable.css ( 'font-size' ),
                'font-weight' : this.$growable.css ( 'font-weight' ),
                'font-style' : this.$growable.css ( 'font-style' )
            });

            $span.appendTo ( $body );

            var width = $span.width ();

            $span.remove ();

            return width;

        },

        /* TEXTAREA */

        _update_textarea_height: function () {

            var actual_height = this.$growable.height (),
                needed_height = this.$growable.height ( 1 ).get ( 0 ).scrollHeight - parseFloat ( this.$growable.css ( 'padding-top' ) ) - parseFloat ( this.$growable.css ( 'padding-bottom' ) );

            if ( needed_height > actual_height ) {

                this.$growable.height ( needed_height + this.extra_pxs );

            } else if ( actual_height > needed_height ) {

                this.$growable.height ( Math.max ( needed_height, this.options.default_height ) + this.extra_pxs );

            } else {

                this.$growable.height ( actual_height + this.extra_pxs );

            }

        },

        /* PUBLIC */

        update: function () {

            if ( this.is_input ) {

                this._update_input_width ();

                this._trigger ( 'update' );

            } else if ( this.is_textarea ) {

                this._update_textarea_height ();

                this._trigger ( 'update' );

            }

        }

    });

    /* READY */

    $(function () {

        $('input.autogrow, textarea.autogrow').autogrow ();

    });

}( lQuery, window, document ));



/* BLURRED */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* BLUR */

    $.fn.blurred = function ( activate ) {

        return this.toggleClass ( 'blurred', activate );

    };

}( lQuery, window, document ));



/* BROWSER */

//TODO: detect browsers, versions, OSes

;(function ( $, window, document, undefined ) {

    'use strict';

    /* VARIABLES */

    var userAgent = navigator.userAgent.toLowerCase ();

    /* BROWSER */

    $.browser = {
        isMobile: /iphone|ipad|android|ipod|opera mini|opera mobile|blackberry|iemobile|webos|windows phone|playbook|tablet|kindle/i.test ( userAgent ),
        isTablet: /ipad|playbook|tablet|kindle/i.test ( userAgent ),
        isAndroid: /Android/i.test ( userAgent ),
        isIOS: /(iPhone|iPad|iPod)/i.test ( userAgent ),
        isMac: /Mac/i.test ( userAgent ),
        isIE: /msie [\w.]+/.test ( userAgent )
    };

}( lQuery, window, document ));



/* COOKIE */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* COOKIE */

    $.cookie = {

        destroy: function ( name ) {

            this.write ( name, '', - 86400 * 365, '/' );

        },

        read: function ( name ) {

            var expression = new RegExp ( '(^|; )' + encodeURIComponent ( name ) + '=(.*?)($|;)' ),
                matches = document.cookie.match ( expression );

            return matches ? decodeURIComponent ( matches[2] ) : null;

        },

        write: function ( name, value, expire, path, domain, secure ) {

            var date = new Date ();

            if ( expire && typeof expire === 'number' ) {

                date.setTime ( date.getTime () + expire * 1000 );

            } else {

                expire = null;

            }

            document.cookie =
              encodeURIComponent ( name ) + '=' + encodeURIComponent ( value ) +
              ( expire ? '; expires=' + date.toGMTString () : '' ) +
              '; path=' + ( path ? path : '/' ) +
              ( domain ? '; domain=' + domain : '' ) +
              ( secure ? '; secure' : '' );

            return document.cookie;

        }

    };

}( lQuery, window, document ));



/* DRAGGABLE */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* DRAGGABLE */

    $.fn.draggable = function ( custom_options ) {

        /* OPTIONS */

        var options = {
            start: $.noop,
            move: $.noop,
            end: $.noop,
            delegate: undefined,
            context: undefined, //FIXME: Is it necessary?
            events: {
                start: 'mousedown touchstart',
                move: 'mousemove touchmove',
                end: 'mouseup touchend'
            }
        };

        options = _.extend ( options, custom_options );

        /* VARIABLES */

        var $trigger,
            XYs,
            dragged;

        /* FUNCTIONS */

        var start = function ( event ) {

            $trigger = $(this);

            XYs = {
                start: {},
                move: {},
                end: {},
                delta: {}
            };

            dragged = false;

            XYs.start = $.eventXY ( event );

            options.start.bind ( options.context || this )( event, this, XYs );

            $document.on ( options.events.move, move );
            $document.on ( options.events.end, end );

        };

        var move = function ( event ) {

            XYs.move = $.eventXY ( event );
            XYs.delta = {
                X: XYs.move.X - XYs.start.X,
                Y: XYs.move.Y - XYs.start.Y
            };

            options.move.bind ( options.context || this )( event, this, XYs );

            if ( dragged === false ) {

                dragged = true;

                $html.addClass ( 'dragging' );
                $trigger.addClass ( 'dragging' );

            }

        };

        var end = function ( event ) {

            XYs.end = $.eventXY ( event );

            options.end.bind ( options.context || this )( event, this, XYs );

            if ( dragged === true ) {

                $html.removeClass ( 'dragging' );
                $trigger.removeClass ( 'dragging' );

            }

            $document.off ( options.events.move, move );
            $document.off ( options.events.end, end );

        };

        /* START DRAGGING */

        this.on ( options.events.start, options.delegate, start );

    };

}( lQuery, window, document ));



/* EASING */

//TODO: stripe out the stupid ones

//INFO: t: current time,
//      b: start value,
//      c: end value,
//      d: duration

;(function ( $, window, document, undefined ) {

    'use strict';

    /* EASING */

    $.easing = {
        def: 'easeOutQuad',
        linear: function ( t, b, c, d ) {
            return ( c - b ) / d * t + b;
        },
        easeInQuad: function ( t, b, c, d ) {
            return c * ( t /= d ) * t + b;
        },
        easeOutQuad: function ( t, b, c, d ) {
            return -c * ( t /= d ) * ( t - 2 ) + b;
        },
        easeInOutQuad: function ( t, b, c, d ) {
            if ( ( t /= d / 2 ) < 1 ) return c / 2 * t * t + b;
            return -c / 2 * ( ( --t ) * ( t - 2 ) - 1 ) + b;
        },
        easeInCubic: function ( t, b, c, d ) {
            return c * ( t /= d ) * t * t + b;
        },
        easeOutCubic: function ( t, b, c, d ) {
            return c * ( ( t = t / d - 1 ) * t * t + 1 ) + b;
        },
        easeInOutCubic: function ( t, b, c, d ) {
            if ( ( t /= d / 2 ) < 1 ) return c / 2 * t * t * t + b;
            return c / 2 * ( ( t -= 2 ) * t * t + 2 ) + b;
        },
        easeInQuart: function ( t, b, c, d ) {
            return c * ( t /= d ) * t * t * t + b;
        },
        easeOutQuart: function ( t, b, c, d ) {
            return -c * ( ( t = t / d - 1 ) * t * t * t - 1 ) + b;
        },
        easeInOutQuart: function ( t, b, c, d ) {
            if ( ( t /= d / 2 ) < 1 ) return c / 2 * t * t * t * t + b;
            return -c / 2 * ( ( t -= 2 ) * t * t * t - 2 ) + b;
        },
        easeInQuint: function ( t, b, c, d ) {
            return c * ( t /= d ) * t * t * t * t + b;
        },
        easeOutQuint: function ( t, b, c, d ) {
            return c * ( ( t = t / d - 1 ) * t * t * t * t + 1 ) + b;
        },
        easeInOutQuint: function ( t, b, c, d ) {
            if ( ( t /= d / 2 ) < 1 ) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ( ( t -= 2 ) * t * t * t * t + 2 ) + b;
        },
        easeInSine: function ( t, b, c, d ) {
            return -c * Math.cos ( t / d * ( Math.PI / 2 ) ) + c + b;
        },
        easeOutSine: function ( t, b, c, d ) {
            return c * Math.sin ( t / d * ( Math.PI / 2 ) ) + b;
        },
        easeInOutSine: function ( t, b, c, d ) {
            return -c / 2 * ( Math.cos ( Math.PI * t / d ) - 1 ) + b;
        },
        easeInExpo: function ( t, b, c, d ) {
            return ( t == 0 ) ? b : c * Math.pow ( 2, 10 * ( t / d - 1 ) ) + b;
        },
        easeOutExpo: function ( t, b, c, d ) {
            return ( t == d ) ? b + c : c * ( -Math.pow ( 2, -10 * t / d ) + 1) + b;
        },
        easeInOutExpo: function ( t, b, c, d ) {
            if ( t == 0) return b;
            if ( t == d) return b + c;
            if ( ( t /= d / 2 ) < 1) return c / 2 * Math.pow ( 2, 10 * ( t - 1 ) ) + b;
            return c / 2 * ( -Math.pow ( 2, -10 * --t ) + 2 ) + b;
        }
    };

}( lQuery, window, document ));



/* FORM AJAX */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* FORM AJAX */

    $.fn.formAjax = function () {

        this.on ( 'submit', function ( event ) {

            var $form = $(this);

            event.preventDefault (); //FIXME: Does it work?

            $.ajax ({
                type: $form.attr ( 'method' ) || 'POST',
                url: $form.attr ( 'action' ),
                data: new FormData ( this ),
                before: function () {
                    $form.loading ( true );
                },
                after: function () {
                    $form.loading ( false );
                },
                success: function ( res ) {

                    if ( typeof res === 'string' ) {

                        if ( res === 'refresh' ) {

                            $.noty ( 'Done! Refreshing the page...' );

                            location.reload ();

                        } else if ( /^((\S*)?:\/\/)?\/?\S*$/.test ( res ) ) { //INFO: Is an url, either absolute or relative

                            if ( res === window.location.href || res === window.location.pathname ) {

                                $.noty ( 'Done! Refreshing the page...' );

                                location.reload ();

                            } else {

                                $.noty ( 'Done! Redirecting...' );

                                location.assign ( res );

                            }

                        } else if ( res[0] === '<') { //INFO: Is HTML

                            $.noty ( 'Done! A page refresh may be needed to see the changes' );

                            $body.append ( res );

                        } else {

                            $.noty ( res );

                        }

                    } else {

                        noty ( 'Done! A page refresh may be needed to see the changes' );

                    }

                },
                error: function ( res ) {

                    if ( typeof res === 'string' ) {

                        if ( res[0] === '<' ) { //INFO: Is HTML

                            $.noty ( 'There was an error, please try again or report the problem' );

                            $body.append ( res );

                        } else {

                            $.noty ( res );

                        }

                    } else {

                        $.noty ( 'There was an error, please try again or report the problem' );

                    }

                }
            });

        });

    };

    /* READY */

    $(function () {

        $('form.ajax').formAjax ();

    });

}( lQuery, window, document ));



/* FORM SYNC */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* VARIABLES */

    var synced_groups = [];

    /* FORM SYNC */

    $.fn.formSync = function () {

        this.each ( function () {

            var $form = $(this),
                sync_group = $form.data ( 'sync-group' );

            if ( synced_groups.indexOf ( sync_group ) !== -1 ) return;

            synced_groups.push ( sync_group );

            var $forms = $('form[data-sync-group="' + sync_group + '"]'),
                $eles = $forms.find ( 'input, textarea, select' );

            $eles.each ( function () {

                var $ele = $(this),
                    name = $ele.attr ( 'name' ),
                    is_checkable = $ele.is ( '[type="radio"], [type="checkbox"]' ),
                    is_radio = is_checkable && $ele.is ( '[type="radio"]' ),
                    is_textbox = $ele.is ( 'input, textarea' ),
                    events = is_textbox ? 'input change' : 'change',
                    $current_form = $ele.parent ( 'form' ),
                    $other_forms = $forms.not ( $current_form ),
                    $other_eles = $other_forms.find ( '[name="' + name + '"]' );

                $ele.on ( events, function () {

                    var current_value = $ele.val (),
                        current_checked = !!$ele.prop ( 'checked' );

                    $other_eles.each ( function () {

                        var $other_ele = $(this),
                            other_value = $other_ele.val (),
                            other_checked = !!$other_ele.prop ( 'checked' );

                        if ( is_radio ) {

                            if ( current_value !== other_value || current_checked === other_checked ) return;

                        } else if ( current_value === other_value && current_checked === other_checked ) {

                            return;

                        }

                        if ( is_checkable ) {

                            $other_ele.prop ( 'checked', current_checked ).trigger ( 'change' );

                        } else {

                            $other_ele.val ( current_value ).trigger ( 'change' );

                        }

                    });

                });

            });

        });

    };

    /* READY */

    $(function () {

        $('form[data-sync-group]').formSync ();

    });

}( lQuery, window, document ));



 /* NOTIFICATION */

//INFO: If the tab has a focus and we can use the native notifications than we'll send a native notification, otherwise we will fallback to a noty

;(function ( $, window, document, undefined ) {

    'use strict';

    /* NOTIFICATION */

    $.notification = function ( custom_options ) {

        // OPTIONS

        var options = {
            title: false,
            body: false,
            img: false
        };

        $.extend ( options, custom_options );

        // NOTIFICATION

        if ( !document.hasFocus () && window.Notification && Notification.permission !== 'denied' ) {

            Notification.requestPermission ( function ( status ) {

                if ( status === 'granted' ) {

                    var notification = new Notification ( options.title, { body: options.body, icon: options.img } );

                } else {

                    $.noty ( options );

                }

            });

        } else {

            $.noty ( options );

        }

    };

}( lQuery, window, document ));



/* ONE TIME ACTION */

//INFO: the pipe character (|) is forbidden as a name, cookie's ttl is 1 year

;(function ( $, window, document, undefined ) {

    'use strict';

    /* ONE TIME ACTION */

    $.oneTimeAction = function ( custom_options, action ) {

        // OPTIONS

        var options = {
            container: 'ota', // the cookie name that holds the actions
            name: false, // the action name
            action: false
        };

        if ( _.isString ( custom_options ) ) {

            options.name = custom_options;

            if ( _.isFunction ( action ) ) {

                options.action = action;

            }

        } else if ( _.isPlainObject ( custom_options ) ) {

            $.extend ( options, custom_options );

        }

        // ONE TIME ACTION

        if ( options.name ) {

            var action = new Action ( options.container, options.name );

            if ( options.action && !action.get () ) {

                options.action ();

                action.set ();

            }

            return action;

        } else if ( options.container ) {

            return new Container ( options.container );

        }

    };

    /* CONTAINER OBJ */

    var Container = function ( name ) {

        this.name = name;

        this.actionsStr = $.cookie.read ( this.name ) || '';
        this.actions = this.actionsStr.split ( '|' );

    };

    Container.prototype = {

        get: function ( action ) {

            return ( this.actions.indexOf ( action ) !== -1 );

        },

        set: function ( action ) {

            if ( !this.get ( action ) ) {

                this.actions.push ( action );

                this.update ();

            }

        },

        update: function () {

            this.actionsStr = this.actions.join ( '|' );

            $.cookie.write ( this.name, this.actionsStr, 31536000 ); // 1 year

        },

        reset: function ( action ) {

            if ( action ) {

                _.pull ( this.actions, action );

                this.update ();

            } else {

                $.cookie.destroy ( this.name );

            }

        }

    };

    /* ACTION OBJ */

    var Action = function ( container, name, action ) {

        this.container = new Container ( container );
        this.name = name;

    };

    Action.prototype = {

        get: function () {

            return this.container.get ( this.name );

        },

        set: function () {

            this.container.set ( this.name );

        },

        reset: function () {

            this.container.reset ( this.name );

        }

    };

}( lQuery, window, document ));



/* SELECTABLE */

//TODO: add noty for actions AND/OR right click for action
//FIXME: make it workable with sorting (update after sorting since we may)

;(function ( $, window, document, undefined ) {

    'use strict';

    /* PRIVATE */

    var clear_selection = function () {

        if ( document.selection ) {

            document.selection.empty ();

        } else if ( window.getSelection ) {

            window.getSelection ().removeAllRanges ();

        }

    };

    /* SELECTABLE */

    $.widget ( 'presto.selectable', {

        /* OPTIONS */

        options: {
            selector: 'tbody tr',
            not_selector: '.empty',
            selected_class: 'selected',
            callbacks: {
                //TODO
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$rows = this._get_rows ();

            this.$start_row = false;
            this.$end_row = false;

        },

        _init: function () {

            this._reset_prevs ();

        },

        _events: function () {

            /* KEYS */

            this._on ( 'mouseenter', function () {

                this._on ( $document, 'keydown', this._handler_keys );

            });

            this._on ( 'mouseleave', function () {

                $document.off ( 'keydown', this._handler_keys );

            });

            /* MOUSE */

            this._on ( this.$rows, 'mousedown', this._handler_mousedown );

            /* OTHERS */

            //FIXME: support tableHelper and sortable

            this._on ( 'change sort', this._handler_change_sort );

            this._on ( 'mousedown mouseup', this._handler_clear_selection );

        },

        /* CTRL + A / CTRL + SHIFT + A / CTRL + I */

        _handler_keys: function ( event ) {

            if ( ( $.browser.isMac && event.metaKey ) || ( !$.browser.isMac && event.ctrlKey ) ) { //INFO: COMMAND or CTRL, is we are on Mac or not

                if ( event.keyCode === 65 ) { //INFO: A

                    event.preventDefault (); //FIXME

                    this._reset_prevs ();

                    this.$rows.toggleClass ( this.options.selected_class, !event.shiftKey ); //INFO: SHIFT or not //FIXME: only works if the last character pushed is the `A`, but is it an unwanted behaviour?

                } else if ( event.keyCode === 73 ) { //INFO: I

                    event.preventDefault ();

                    this._reset_prevs ();

                    this.$rows.toggleClass ( this.options.selected_class );

                }

            }

        },

        /* CLICK / CTRL + CLICK / SHIFT + CLICK / CTRL + CLICK -> DRAG */

        _handler_mousedown: function ( event ) {

            if ( event.button !== 0 ) return; //INFO: Left click

            this.$start_row = $(event.currentTarget);

            this._on ( $document, 'mousemove', this._handler_mousemove );

            this._on ( this.$start_row, 'mouseup', this._handler_mouseup );

        },

        _handler_mousemove: function ( event ) { // DRAG

            //FIXME

            if ( ( $.browser.isMac && !event.metaKey ) || ( !$.browser.isMac && !event.ctrlKey ) ) return;

            $document.off ( 'mousemove', this._handler_mousemove );

            this.$start_row.off ( 'mouseup', this._handler_mouseup );

            this._reset_prevs ();

            this.$prev_row = this.$start_row;

            this.$start_row.toggleClass ( this.options.selected_class );

            $html.addClass ( 'dragging' );

            this._on ( this.$rows, 'mouseenter', this._handler_drag_mouseenter );

            this._on ( $document, 'mouseup', this._handler_drag_mouseup );

        },

        _handler_drag_mouseenter: function ( event ) { // DRAG HOVER

            this.$end_row = $(event.currentTarget);

            var start_index = this.$rows.index ( this.$start_row ),
                end_index = this.$rows.index ( this.$end_row ),
                min_index = Math.min ( start_index, end_index ),
                max_index = Math.max ( start_index, end_index );

            if ( min_index === start_index ) { // down

                min_index += 1;
                max_index += 1;

            }

            var $new_dragged = this.$rows.slice ( min_index, max_index );

            if ( this.$prev_dragged ) {

                $new_dragged.not ( this.$prev_dragged ).toggleClass ( this.options.selected_class );

                this.$prev_dragged.not ( $new_dragged ).toggleClass ( this.options.selected_class );

            } else {

                $new_dragged.toggleClass ( this.options.selected_class );

            }

            this.$prev_dragged = $new_dragged;

        },

        _handler_drag_mouseup: function () { // DRAG END

            this.$rows.off ( 'mouseenter', this._handler_drag_mouseenter );

            $document.off ( 'mouseup', this._handler_drag_mouseup );

            this.$prev_dragged = false;

            $html.removeClass ( 'dragging' );

        },

        _handler_mouseup: function ( event ) { // CLICK

            $document.off ( 'mousemove', this._handler_mousemove );

            this.$start_row.off ( 'mouseup', this._handler_mouseup );

            if ( event.shiftKey ) {

                var start_index = this.$rows.index ( this.$prev_row ),
                    end_index = this.$prev_row ? this.$rows.index ( this.$start_row ) : 0,
                    min_index = Math.min ( start_index, end_index ),
                    max_index = Math.max ( start_index, end_index );

                if ( min_index === start_index ) { // down

                    min_index += 1;
                    max_index += 1;

                }

                var $new_shifted = this.$rows.slice ( min_index, max_index );

                if ( this.$prev_shifted ) {

                    $new_shifted.not ( this.$prev_shifted ).toggleClass ( this.options.selected_class );

                    this.$prev_shifted.not ( $new_shifted ).toggleClass ( this.options.selected_class );

                } else {

                    $new_shifted.toggleClass ( this.options.selected_class );

                }

                this.$prev_shifted = $new_shifted;

            } else if ( ( $.browser.isMac && event.metaKey ) || ( !$.browser.isMac && event.ctrlKey ) ) {

                this.$start_row.toggleClass ( this.options.selected_class );

                this._reset_prevs ();

                this.$prev_row = this.$start_row;

            } else {

                this.$rows.removeClass ( this.options.selected_class );

                this.$start_row.addClass ( this.options.selected_class );

                this._reset_prevs ();

                this.$prev_row = this.$start_row;

            }

        },

        /* OTHER EVENTS */

        _handler_change_sort: function () {

            this.$rows = this._get_rows ();

        },

        _handler_clear_selection: function () {

            $.reflow ();

            clear_selection ();

        },

        /* PRIVATE */

        _reset_prevs: function () {

            this.$prev_row = false;
            this.$prev_shifted = false;
            this.$prev_dragged = false;

        },

        _get_rows: function () {

            var $found = this.$element.find ( this.options.selector );

            return this.options.not_selector ? $found.not ( this.options.not_selector ) : $found;

        }

    });

    /* READY */

    $(function () {

        $('table.selectable').selectable ();

    });

}( lQuery, window, document ));



/* SORTABLE */

//TODO: only do the minimum amount of changes, if a row is added we don't need to resort the whole table
//TODO: add support for tableHelper, just put the new addded row in the right position

;(function ( $, window, document, undefined ) {

    'use strict';

    /* SORTABLE */

    $.widget ( 'presto.sortable', {

        /* OPTIONS */

        options: {
            sorters: {
                int: function ( a, b ) {
                    return parseInt ( a, 10 ) - parseInt ( b, 10 );
                },
                float: function ( a, b ) {
                    return parseFloat ( a ) - parseFloat ( b );
                },
                string: function ( a, b ) {
                    a = a.toLocaleLowerCase ();
                    b = b.toLocaleLowerCase ();
                    return a.localeCompare ( b );
                }
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$table = this.$element;
            this.$headers = this.$table.find ( 'thead th' );
            this.$sortables = this.$headers.filter ( '[data-sort]' );
            this.$tbody = this.$table.find ( 'tbody' );

            this.table = this.element;
            this.tbody = this.$tbody.get ( 0 );

            this.current_index = false; // `$headers` index, not `$sortables` index
            this.current_direction = false;;

        },

        _init: function () {

            var $initial = this.$headers.filter ( '.asc, .desc' ).first ();

            if ( $initial.length ) {

                this.sort ( this.$headers.index ( $initial ), ( $initial.hasClass ( 'asc' ) ? 'asc' : 'desc' ) );

            }

        },

        _events: function () {

            this._on ( true, 'change', this._handler_change ); //TODO: update to support tableHelper

            this._on ( this.$sortables, 'click', this._handler_click );

        },

        /* CHANGE */

        _handler_change: function () {

            if ( this.current_index ) {

                this.sort ( this.current_index, this.current_direction );

            }

        },

        /* CLICK */

        _handler_click: function ( event ) {

            var new_index = this.$headers.index ( event.target ),
                new_direction = this.current_index === new_index
                                    ? this.current_direction === 'asc'
                                        ? 'desc'
                                        : 'asc'
                                    : 'asc';

            this.sort ( new_index, new_direction );

        },

        /* SORT */

        sort: function ( index, direction ) {

            // VALIDATE

            var $sortable = this.$headers.eq ( index );

            if ( !$sortable.length ) return; // bad index

            var sorter_name = $sortable.data ( 'sort' );

            if ( !sorter_name ) return; // unsortable column

            var sorter = this.options.sorters[sorter_name];

            if ( !sorter ) return;

            direction = ( direction && direction.toLowerCase () === 'desc' ) ? 'desc' : 'asc';

            // STYLE

            this.$sortables.removeClass ( 'asc desc' );
            $sortable.addClass ( direction );

            // VARIABLES

            var $trs = this.$tbody.find ( 'tr:not(.empty)' ),
                column = Array ( $trs.length );

            // POPULATE

            $trs.each ( function ( trs_index ) {

                var $td = $(this).find ( 'td' ).eq ( index ),
                    value = $td.data ( 'sort-value' ) || $td.html ();

                column[trs_index] = [this, value];

            });

            // SORT

            column.sort ( function ( a, b ) {

                return sorter ( a[1], b[1] );

            });

            if ( direction === 'desc' ) column.reverse ();

            // APPEND

            this.table.removeChild ( this.tbody ); // detach

            for ( var i = 0, l = column.length; i < l; i++ ) {

                this.tbody.appendChild ( column[i][0] ); // reorder

            }

            this.table.appendChild ( this.tbody ); // attach

            // UPDATE

            this.current_index = index;
            this.current_direction = direction;

            // TRIGGER

            this._trigger ( 'sort', {
                index: this.current_index,
                direction: this.current_direction
            });

        }

    });

    /* READY */

    $(function () {

        $('table.sortable').sortable ();

    });

}( lQuery, window, document ));



/* TABLE HELPER */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* TABLE HELPER */

    $.widget ( 'presto.tableHelper', {

        /* SPECIAL */

        _variables: function () {

            this.$table = this.$element;
            this.$thead = this.$table.find ( 'thead' ),
            this.$tfoot = this.$table.find ( 'tfoot' ),
            this.$tbody = this.$table.find ( 'tbody' ),
            this.$headers = this.$thead.find ( 'th' ),
            this.$empty_row = this.$tbody.find ( 'tr.empty' ),
            this.columns_nr = this.$headers.length;

        },

        _init: function () {

            this._check_empty ();

        },

        /* PRIVATE */

        _check_empty: function () {

            this.$empty_row.toggleClass ( 'hidden', this.$tbody.find ( 'tr:not(.empty)' ).length > 0 );

        },

        /* PUBLIC */

        add: function () {

            var datas = Array.prototype.slice.call ( arguments, 1 );

            for ( var i = 0; i < datas.length; i++ ) {

                var $fillables = this.$tbody.find ( 'td.fillable' );

                if ( $fillables.length > 0 ) {

                    $fillables.first ().html ( datas[i] || '' ).removeClass ( 'fillable' );

                } else {

                    if ( arguments[0] && $( '#rid_' + this.uuid + '_' + arguments[0] ).length === 1 ) break;

                    var row_html = '<tr ' + ( arguments[0] ? 'id="rid_' + this.uuid + '_' + arguments[0] + '"' : '' ) + '>';

                    row_html += '<td>' + ( datas[i] || '' ) + '</td>';

                    for ( var fi = 1; fi < this.columns_nr; fi++ ) {

                        row_html += '<td class="fillable"></td>';

                    }

                    row_html += '</tr>';

                    this.$tbody.append ( row_html );

                }

            }

            this._check_empty ();

            this.$table.trigger ( 'change' );

            return this;

        },

        update: function ( id ) {

            var datas = Array.prototype.slice.call ( arguments, 1 ),
                $row = $( '#rid_' + this.uuid + '_' + id ),
                $tds = $row.find ( 'td' );

            for ( var i = 0; i < datas.length; i++ ) {

                if ( !_.isUndefined ( datas[i] ) && datas[i] !== false ) {

                    $tds.eq ( i ).html ( datas[i] );

                }

            }

            this.$table.trigger ( 'change' );

            return this;

        },

        remove: function ( id ) {

            $( '#rid_' + this.uuid + '_' + id ).remove ();

            this._check_empty ();

            this.$table.trigger ( 'change' );

            return this;

        },

        clear: function () {

            this.$tbody.find ( 'tr:not(.empty)' ).remove ();

            this._check_empty ();

            this.$table.trigger ( 'change' );

            return this;

        }

    });

    /* READY */

    $(function () {

        $('table').tableHelper ();

    });

}( lQuery, window, document ));



/* TIMER - http://jchavannes.com/jquery-timer */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* TIMER */

    $.timer = function ( func, time, autostart ) {

        return new Timer ( func, time, autostart );

    };

    /* TIMER OBJ */

    var Timer = function ( func, time, autostart ) {

        return this.set ( func, time, autostart );

    };

    Timer.prototype = {

        set: function ( func, time, autostart ) {

            this.init = true;
            this.action = func;

            if ( !isNaN ( time ) ) this.intervalTime = time;

            if ( autostart && !this.isActive ) {

                this.isActive = true;
                this.setTimer ();

            }

            return this;

        },

        once: function ( time ) {

            var timer = this;

            if ( isNaN ( time ) ) time = 0;

            setTimeout ( function () {

                timer.action ();

            }, time );

            return this;

        },

        play: function ( reset ) {

            if ( !this.isActive ) {

                if ( reset ) this.setTimer ();
                else this.setTimer ( this.remaining_time );

                this.isActive = true;

            }

            return this;

        },

        pause: function () {

            if ( this.isActive ) {

                this.isActive = false;
                this.remaining_time -= new Date() - this.last;
                this.clearTimer ();

            }

            return this;

        },

        stop: function () {

            this.isActive = false;
            this.remaining_time = this.intervalTime;
            this.clearTimer ();

            return this;

        },

        toggle: function ( reset ) {

            if ( this.isActive ) this.pause ();
            else if ( reset ) this.play ( true );
            else this.play ();

            return this;

        },

        reset: function () {

            this.isActive = false;
            this.play ( true );

            return this;

        },

        clearTimer: function () {

            clearTimeout ( this.timeoutObject );

        },

        setTimer: function ( time ) {

            var timer = this;

            if ( isNaN ( time ) ) time = this.intervalTime;

            this.remaining_time = time;
            this.last = new Date ();
            this.clearTimer ();

            this.timeoutObject = setTimeout ( function () {

                timer.go ()

            }, time );

        },

        go: function () {

            if ( this.isActive ) {

                this.action ();
                this.setTimer ();

            }

        },

        remaining: function ( value ) {

            if ( _.isUndefined ( value ) ) return this.remaining_time;

            this.remaining_time = value;

            return this;

        }

    };

}( lQuery, window, document ));



/* TOGGLE HEIGHT  */

//FIXME: support triggered twice before the first one has ended

;(function ( $, window, document, undefined ) {

    'use strict';

    /* UTILITIES */

    var get_actual_height = function ( $ele ) {

        var old_style = $ele.attr ( 'style' ) || '';

        $ele.css ( 'css-text', old_style + 'display:block;position:absolute;top:-99999px;height:auto;' );

        var actual_height = $ele.height ();

        $ele.css ( 'css-text', old_style );

        return actual_height;

    };

    /* TOGGLE HEIGHT */

    $.fn.toggleHeight = function ( force, duration, easing, complete, delay ) {

        if ( !_.isBoolean ( force ) ) {

            delay = complete;
            complete = easing;
            easing = duration;
            duration = force;
            force = undefined;

        }

        duration = duration || 400;
        easing = easing || 'easeOutQuad';
        complete = $.noop;
        delay = delay || 0;

        if ( _.isUndefined ( force ) ) {

            force = ( this.height () === 0 ? true : false );

        }

        // VERSION WITHOUT WRAPPING

        for ( var i = 0, l = this.length; i < l; i++ ) {

            var ele = this.nodes[i],
                $ele = $(ele);

            if ( force ) {

                var prev_values = $.data ( ele, 'toggleHeight' );

                $ele.animate ( _.extend ( {}, prev_values, { height: get_actual_height ( $ele ) + parseInt ( prev_values['padding-top'] || 0 ) + parseInt ( prev_values['padding-bottom'] || 0 ) + parseInt ( prev_values['border-top-width'] || 0 ) + parseInt ( prev_values['border-bottom-width'] || 0 ) + parseInt ( prev_values['margin-top'] || 0 ) + parseInt ( prev_values['margin-bottom'] || 0 ) } ), duration, easing, function () {
                    $ele.removeClass ( 'overflow-hidden' );
                    complete ();
                }, delay );

            } else {

                $.data ( ele, 'toggleHeight', {
                    'border-top-width': $ele.css ( 'border-top-width' ),
                    'border-bottom-width': $ele.css ( 'border-bottom-width' ),
                    'margin-top': $ele.css ( 'margin-top' ),
                    'margin-bottom': $ele.css ( 'margin-bottom' ),
                    'padding-top': $ele.css ( 'padding-top' ),
                    'padding-bottom': $ele.css ( 'padding-bottom' )
                });

                $ele.addClass ( 'overflow-hidden' ).animate({
                    'border-top-width': 0,
                    'border-bottom-width': 0,
                    'margin-top': 0,
                    'margin-bottom': 0,
                    'padding-top': 0,
                    'padding-bottom': 0,
                    'height': 0
                }, duration, easing, complete, delay );

            }

        }

        return this;

        // VERSION WITH WRAPPING

        //FIXME: wrapping might be a problem

        var $instance = this,
            $parent = this.wrap ( '<div class="overflow-hidden"></div>' ).parent ();

        if ( force ) {

            $parent.height ( 0 );

            $instance.removeClass ( 'hidden' );

            $parent.animate ({
                height: get_actual_height ( $parent )
            }, duration, easing, function () {
                $instance.unwrap ();
                complete ();
            }, delay );

        } else {

            $parent.animate ({
                height: 0
            }, duration, easing, function () {
                $instance.addClass ( 'hidden' ).unwrap ();
                complete ();
            }, delay );

        }

        return this;

    };

}( lQuery, window, document ));



/* TOUCHING */

//TODO: add support for linear search, non binary, or maybe a balanced left then right then left again search, so that if we guess wrong but we are close we still won't spend too much time

;(function ( $, window, document, undefined ) {

    'use strict';

    /* UTILITIES */

    var get_coordinates = function ( $ele ) {

        var offset = $ele.offset ();

        return {
            X1: offset.left,
            X2: offset.left + offset.width,
            Y1: offset.top,
            Y2: offset.top + offset.height
        };

    };

    var get_overlapping_area = function ( c1, c2 ) {

        var x_overlap = Math.max ( 0, Math.min ( c1.X2, c2.X2 ) - Math.max ( c1.X1, c2.X1 ) ),
            y_overlap = Math.max ( 0, Math.min ( c1.Y2, c2.Y2 ) - Math.max ( c1.Y1, c2.Y1 ) );

        return x_overlap * y_overlap;

    };

    /* TOUCHING */

    $.fn.touching = function ( custom_options ) {

        /* OPTIONS */

        var options = {
            start_index : false, //INFO: Useful for speeding up the searching process if we may already guess the initial position...
            point: false, //INFO: Used for the punctual search
            //  {
            //      X: 0,
            //      Y: 0
            //  },
            $comparer: false, //INFO: Used for the overlapping search
            $not: false,
            select: 'all'
        };

        $.extend ( options, custom_options );

        /* SEARCHABLE */

        var $searchable = options.$not ? this.not ( options.$not ) : this;

        console.log("searchable: ",$searchable.nodes);

        /* COMPARER */

        if ( options.$comparer ) {

            var c1 = get_coordinates ( options.$comparer ),
                matches = [],
                areas = [];

            for ( var i = 0, l = $searchable.length; i < l; i++ ) {

                var $ele = $searchable.eq ( i );

                var c2 = get_coordinates ( $ele ),
                    overlap_area = get_overlapping_area ( c1, c2 );

                if ( overlap_area > 0 ) {

                    matches.push ( $ele.get ( 0 ) );
                    areas.push ( overlap_area );

                }

            }

            return $( options.select === 'all' ? $(matches) : ( options.select === 'most' && matches.length > 0 ? $( matches[ areas.indexOf ( _.max ( areas ) ) ] ) : $() ) );

        }

        /* PUNCTUAL */

        if ( options.point ) {

            var $touched = false;

            $searchable.btEach ( function () {

                var $ele = $(this),
                    c = get_coordinates ( $ele );

                if ( options.point.Y >= c.Y1 ) {

                    if ( options.point.Y <= c.Y2 ) {

                        if ( options.point.X >= c.X1 ) {

                            if ( options.point.X <= c.X2 ) {

                                $touched = $ele;

                                return false;

                            } else {

                                return 1;

                            }

                        } else {

                            return -1;

                        }

                    } else {

                        return 1;

                    }


                } else {

                    return -1;

                }

            }, options.start_index );

            return $touched ? $touched : $();

        }

    };

}( lQuery, window, document ));



/* EXPANDER */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* EXPANDER */

    $.widget ( 'presto.expander', {

        /* OPTIONS */

        options: {
            callbacks: {
                open: $.noop,
                close: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$expander = this.$element;
            this.$togglers = this.$expander.find ( '.expander-toggler' );

            this.opened = this.$expander.hasClass ( 'opened' );

        },

        // _init: function () {

        //     if ( !this.opened ) this.close ( true ); //INFO: If is opened the CSS takes care of everything

        // },

        _events: function () {

            this._on ( this.$togglers, 'click', this.toggle );

        },

        /* PUBLIC */

        toggle: function () {

            this[this.opened ? 'close' : 'open']();

        },

        open: function () {

            if ( !this.opened ) {

                this.opened = true;

                this.$expander.addClass ( 'opened' );

                this._trigger ( 'open' );

            }

        },

        close: function () {

            if ( this.opened ) {

                this.opened = false;

                this.$expander.removeClass ( 'opened' );

                this._trigger ( 'close' );

            }

        }

    });

    /* READY */

    $(function () {

        $('.expander').expander ();

    });

}( lQuery, window, document ));



/* INFOBAR */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* INFOBAR */

    $.widget ( 'presto.infobar', {

        /* OPTIONS */

        options: {
            delay: {
                close: 150
            },
            callbacks: {
                close: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$infobar = this.$element;
            this.$closers = this.$infobar.find ( '.infobar-closer' );

        },

        _events: function () {

            this._on ( this.$closers, 'click', this.close );

        },

        /* PUBLIC */

        close: function () {

            this.$infobar.addClass ( 'remove' );

            this._delay ( function () {

                this.$infobar.remove ();

                this._trigger ( 'close' );

            }, this.options.delay.close );

        }

    });

    /* READY */

    $(function () {

        $('.infobar-wrp').infobar ();

    });

}( lQuery, window, document ));



/* ACCORDION */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* ACCORDION */

    $.widget ( 'presto.accordion', {

        /* SPECIAL */

        _variables: function () {

            this.$accordion = this.$element;
            this.$expanders = this.$accordion.children ( '.expander' );
            this.expanders_inst = [];

        },

        _init: function () {

            for ( var i = 0, l = this.$expanders.length; i < l; i++ ) {

                this.expanders_inst[i] = this.$expanders.eq ( i ).expander ( 'instance' );

            }

        },

        _events: function () {

            this._on ( this.$expanders, 'expander:open', this._handler_open );

        },

        /* OPEN */

        _handler_open: function ( event, data, node ) {

            for ( var i = 0, l = this.$expanders.length; i < l; i++ ) {

                if ( this.$expanders.nodes[i] !== node ) {

                    this.expanders_inst[i].close ();

                }

            }

        },

        /* PUBLIC */

        toggle: function ( index ) {

            this.expanders_inst[index].toggle ();

        },

        open: function ( index ) {

            this.expanders_inst[index].open ();

        },

        close: function ( index ) {

            this.expanders_inst[index].close ();

        }

    });

    /* READY */

    $(function () {

        $('.accordion').accordion ();

    });

}( lQuery, window, document ));



/* CHECKBOX */

//TODO: add better support for disabled checkboxes

;(function ( $, window, document, undefined ) {

    'use strict';

    /* CHECKBOX */

    $.widget ( 'presto.checkbox', {

        /* OPTIONS */

        options: {
            callbacks: {
                checked: $.noop,
                unchecked: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$checkbox = this.$element;
            this.$input = this.$checkbox.find ( 'input' );

        },

        _init: function () {

            if ( this.$input.prop ( 'checked' ) ) {

                this.$checkbox.addClass ( 'checked' );

            } else if ( this.$checkbox.hasClass ( 'checked' ) ) {

                this.$input.prop ( 'checked', true ).trigger ( 'change' );

            }

        },

        _events: function () {

            this._on ( 'click', this._handler_click );

            this._on ( true, 'change', this._handler_change );

        },

        /* CLICK */

        _handler_click: function ( event ) {

            if ( event.target !== this.$input.get ( 0 ) ) this.toggle ();

        },

        /* CHANGE */

        _handler_change: function () {

            var checked = this.$input.prop ( 'checked' );

            this.$checkbox.toggleClass ( 'checked', checked );

            this._trigger ( checked ? 'checked' : 'unchecked' );

        },

        /* PUBLIC */

        toggle: function () {

            this.$input.prop ( 'checked', !this.$input.prop ( 'checked' ) ).trigger ( 'change' );

        }

    });

    /* READY */

    $(function () {

        $('.checkbox').checkbox ();

    });

}( lQuery, window, document ));



/* DROPDOWN */

//TODO: add dropdown-closer

;(function ( $, window, document, undefined ) {

    'use strict';

    /* VARIABLES */

    var assignments = {};

    /* DROPDOWN */

    $.widget ( 'presto.dropdown', {

        /* OPTIONS */

        options: {
            callbacks: {
                open: $.noop,
                close: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$dropdown = this.$element;
            this.id = this.$dropdown.attr ( 'id' );
            this.$top_tip = this.$dropdown.find ( '.top-tip' );
            this.$right_tip = this.$dropdown.find ( '.right-tip' );
            this.$bottom_tip = this.$dropdown.find ( '.bottom-tip' );
            this.$left_tip = this.$dropdown.find ( '.left-tip' );
            this.$actionables = this.$dropdown.find ( '.actionable' );

            this.$triggers = $('.dropdown-trigger[data-dropdown="' + this.id + '"]');

            this.opened = false;

        },

        _events: function () {

            this._on ( this.$triggers, 'click', this.toggle );

            this._on ( this.$actionables, 'click', this.close );

//          this.$btn_parents.on ( 'scroll', this.update ); //FIXME: If we are doing it into a scrollable content it will be a problem if we don't handle it, the dropdown will not move

        },

        /* WINDOW RESIZE / SCROLL */

        _bind_window_resize_scroll: function () {

            this._on ( $window, 'resize scroll', this.update );

        },

        _unbind_window_resize_scroll: function () {

            this._off ( $window, 'resize scroll', this.update );

        },

        /* WINDOW CLICK */

        _bind_window_click: function () {

            this._on ( $window, 'click', this._handler_window_click );

        },

        _unbind_window_click: function () {

            this._off ( $window, 'click', this._handler_window_click );

        },

        _handler_window_click: function ( event ) {

            var $parents = $(event.target).parents ();

            if ( $parents.index ( this.$dropdown ) === -1 ) { //INFO: Checking if we clicked inside the dropdown or another trigger for this dropdown

                for ( var i = 0, l = this.$triggers.length; i < l; i++ ) {

                    if ( event.target === this.$triggers.nodes[i] || $parents.index ( this.$triggers.nodes[i] ) !== -1 ) {

                        return;

                    }

                }

                this.close ();

            }

        },

        /* POSITIONATE */

        _positionate: function () {

            // Variables

            var $trigger = $(assignments[this.id]),
                no_tip = $trigger.hasClass ( 'no-tip' ) || this.$dropdown.hasClass ( 'no-tip' );

            // Reset classes

            this.$dropdown.removeClass ( 'top bottom left right' ).toggleClass ( 'no-tip', no_tip );

            // update offsets

            var html_offset = $html.offset (),
                drop_offset = this.$dropdown.offset (),
                trig_offset = $trigger.offset ();

            // common variables

            var trig_center_top = trig_offset.top + ( trig_offset.height / 2 ),
                trig_center_left = trig_offset.left + ( trig_offset.width / 2 );

            var bottom_space = html_offset.height - trig_offset.top - trig_offset.height,
                top_space = trig_offset.top,
                right_space = html_offset.width - trig_offset.left - trig_offset.width,
                left_space = trig_offset.left;

            var useful_doc_width = Math.min ( html_offset.width, drop_offset.width ),
                useful_doc_height = Math.min ( html_offset.height, drop_offset.height );

            var areas = {
                bottom: Math.min ( bottom_space, drop_offset.height ) * useful_doc_width,
                top: Math.min ( top_space, drop_offset.height ) * useful_doc_width,
                right: Math.min ( right_space, drop_offset.width ) * useful_doc_height,
                left: Math.min ( left_space, drop_offset.width ) * useful_doc_height
            };

            var needed_area = drop_offset.width * drop_offset.height;

            // helpers

            var get_vertical_left = function () {

                if ( no_tip ) {

                    if ( right_space + trig_offset.width >= drop_offset.width ) {

                        return trig_offset.left;

                    } else if ( left_space + trig_offset.width >= drop_offset.width ) {

                        return left_space + trig_offset.width - drop_offset.width;

                    }

                }

                return Math.max ( 0, Math.min ( html_offset.width - drop_offset.width, trig_center_left - ( drop_offset.width / 2 ) ) );

            };

            var get_horizontal_top = function () {

                if ( no_tip ) {

                    if ( bottom_space + trig_offset.height >= drop_offset.height ) {

                        return trig_offset.top;

                    } else if ( top_space + trig_offset.height >= drop_offset.height ) {

                        return top_space + trig_offset.height - drop_offset.height;

                    }

                }

                return Math.max ( 0, Math.min ( html_offset.height - drop_offset.height, trig_center_top - ( drop_offset.height / 2 ) ) );

            };

            var get_direction_type = function ( direction ) {

                return ( direction === 'top' || direction === 'bottom' ) ? 'vertical' : 'horizontal';

            };

            // get first with acceptable area

            var direction; //FIXME

            if ( !direction ) {

                for ( var dir in areas ) {

                    if ( areas[dir] >= needed_area ) {

                        direction = dir;
                        break;

                    }

                }

            }

            // get the one with the maximum area

            if ( !direction ) {

                var max_area = -1;

                for ( var dir in areas ) {

                    if ( areas[dir] > max_area ) {

                        max_area = areas[dir];

                    }

                }

                for ( var dir in areas ) {

                    if ( areas[dir] === max_area ) {

                        direction = dir;
                        break;

                    }

                }

            }

            // positionate the dropdown

            var direction_type = get_direction_type ( direction );

            var top = ( direction_type === 'horizontal' ) ? get_horizontal_top () : false;
            var left = ( direction_type === 'vertical' ) ? get_vertical_left () : false;

            switch ( direction ) {

                case 'bottom':
                    top = html_offset.height - bottom_space;
                    break;

                case 'top':
                    top = top_space - drop_offset.height;
                    break;

                case 'right':
                    left = html_offset.width - right_space;
                    break;

                case 'left':
                    left = left_space - drop_offset.width;
                    break;

            }

            this.$dropdown.css ({
                top: top,
                left: left
            });

            $trigger.addClass ( direction );
            this.$dropdown.addClass ( direction );

            // positionate the tip

            if ( !no_tip ) {

                drop_offset = this.$dropdown.offset ();

                switch ( direction ) {

                    case 'bottom':
                        this.$top_tip.css ( 'left', trig_center_left - drop_offset.left );
                        break;

                    case 'top':
                        this.$bottom_tip.css ( 'left', trig_center_left - drop_offset.left );
                        break;

                    case 'right':
                        this.$left_tip.css ( 'top', trig_center_top - drop_offset.top );
                        break;

                    case 'left':
                        this.$right_tip.css ( 'top', trig_center_top - drop_offset.top );
                        break;

                }

            }

        },

        /* PUBLIC */

        toggle: function ( event, trigger ) {

            this[this.opened && assignments[this.id] === trigger ? 'close' : 'open']( event, trigger );

        },

        open: function ( event, trigger ) {

            if ( trigger ) {

                $(assignments[this.id]).removeClass ( 'top bottom left right active' );

                assignments[this.id] = trigger;

                $(trigger).addClass ( 'active' );

            }

            this.$dropdown.addClass ( 'show' );

            this._positionate ();

            this._delay ( function () {

                this.$dropdown.addClass ( 'active' );

            });

            this.opened = true;

            this._delay ( this._bind_window_click );

            this._bind_window_resize_scroll ();

            this._trigger ( 'open' );

        },

        close: function () {

            $(assignments[this.id]).removeClass ( 'top bottom left right active' );

            this.$dropdown.removeClass ( 'active' );

            this._delay ( function () {

                this.$dropdown.removeClass ( 'show' );

            }, 150 );

            this.opened = false;

            this._unbind_window_click ();

            this._unbind_window_resize_scroll ();

            this._trigger ( 'close' );

        },

        update: function () {

            if ( this.opened ) {

                this._positionate ();

            }

        }

    });

    /* READY */

    $(function () {

        $('.dropdown').dropdown ();

    });

}( lQuery, window, document ));



/* LOADING */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* LOADING */

    $.fn.loading = function ( force ) {

        if ( _.isUndefined ( force ) ) {

            force = !this.hasClass ( 'loading' );

        }

        if ( force ) {

            this.addClass ( 'loading' );

            $.reflow ();

            this.addClass ( 'loading-active' );

        } else {

            this.removeClass ( 'loading-active' );

            setTimeout ( (function () {

                //TODO: do we need a reflow here? If we don't why?

                this.removeClass ( 'loading' );

            }).bind ( this ), 200 );

        }

        return this;

    };

}( lQuery, window, document ));



/* MODAL */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* MODAL */

    $.widget ( 'presto.modal', {

        /* OPTIONS */

        options: {
            callbacks: {
                open: $.noop,
                close: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$modal = this.$element;
            this.$closers = this.$modal.find ( '.modal-closer' );

        },

        _events: function () {

            this._on ( this.$closers, 'click', this.close );

        },

        /* PRIVATE */

        _handler_esc_keydown: function ( event ) {

            if ( event.keyCode === $.ui.keyCode.ESCAPE ) {

                this.close ();

            }

        },

        /* PUBLIC */

        open: function () {

            this.$modal.addClass ( 'active' );

            this._on ( $document, 'keydown', this._handler_esc_keydown );

            this._trigger ( 'open' );

        },

        close: function () {

            this.$modal.removeClass ( 'active' );

            $document.off ( 'keydown', this._handler_esc_keydown );

            this._trigger ( 'close' );

        }

    });

    /* READY */

    $(function () {

        $('.modal').modal ();

        $('[data-modal-trigger]').on ( 'click', function () { //TODO: maybe so something like this for the other triggable widgets... so that we don't care if a trigger changes or is added dynamically

            $('#' + $(this).data ( 'modal-trigger' )).modal ( 'instance' ).open ();

        });

    });

}( lQuery, window, document ));



/* NAVBAR */

//TODO: make it work better with attachables: se è già aperta non fare niente al background

;(function ( $, window, document, undefined ) {

    'use strict';

    /* NAVBAR */

    $.widget ( 'presto.navbar', {

        /* OPTIONS */

        options: {
            callbacks: {
                open: $.noop,
                close: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$navbar = this.$element;
            this.id = this.$navbar.attr ( 'id' );
            this.$wrp = this.$navbar.parent ();
            this.$closers = this.$wrp.find ( '.navbar-closer' );

            this.opened = this.$wrp.hasClass ( 'opened' );

            this.$triggers = $('.navbar-trigger[data-navbar="' + this.id + '"]');

            this._bind_closer_click ();
            this._bind_trigger_click ();

        },

        /* CLOSER CLICK */

        _bind_closer_click: function () {

            this._on ( this.$closers, 'click', this.close );

        },

        /* TRIGGER CLICK */

        _bind_trigger_click: function () {

            this._on ( this.$triggers, 'click', this.open );

        },

        /* PUBLIC */

        toggle: function ( force ) {

            if ( _.isUndefined ( force ) ) {

                this.opened = !this.opened;

            } else {

                if ( this.opened === force ) return;

                this.opened = force;

            }

            this.$wrp.toggleClass ( 'opened', this.opened );

            this._trigger ( this.opened ? 'open' : 'close' );

        },

        open: function () {

            this.toggle ( true );

        },

        close: function () {

            this.toggle ( false );

        }

    });

    /* READY */

    $(function () {

        $('.navbar').navbar ();

    });

}( lQuery, window, document ));



/* NOTY */

//TODO: add support for swipe to dismiss

;(function ( $, window, document, undefined ) {

    'use strict';

    /* VARIABLES */

    var timers = [];

    /* HELPER */

    $.noty = function ( custom_options ) {

        // EXTEND

        var options = {};

        if ( _.isString ( custom_options ) ) {

            options.body = custom_options;

        } else if ( _.isPlainObject ( custom_options ) ) {

            $.extend ( options, custom_options );

        }

        if ( options.buttons ) options.type = 'action';

        // NOTY

        var noty = new $.presto.noty ( options ); //FIXME: It should be instantiated on an empty object I think, otherwise we always have to type the namespace

        noty.open ();

        return noty;

    };

    /* NOTY */

    $.widget ( 'presto.noty', {

        //FIXME: buttons are not showing properly

        /* TEMPLATES */

        templates: {
            base: '<div class="noty container {%=o.type%} {%=o.color%} {%=o.css%}">' + //TODO: add back transparentize
                      '<div class="container-content">' +
                          '<div class="infobar-wrp inset {%=o.color%}">' + //TODO: add back transparentize
                              '{% if ( o.img ) include ( "presto.noty.img", o.img ); %}' +
                              '<div class="infobar-center">' +
                                  '{% if ( o.title ) include ( "presto.noty.title", o.title ); %}' +
                                  '{% if ( o.body ) include ( "presto.noty.body", o.body ); %}' +
                              '</div>' +
                              '{% if ( o.buttons.length === 1 ) include ( "presto.noty.single_button", o.buttons[0] ); %}' +
                          '</div>' +
                          '{% if ( o.buttons.length > 1 ) include ( "presto.noty.buttons", o.buttons ); %}' +
                      '</div>' +
                  '</div>',
            img: '<div class="noty-img infobar-left">' +
                     '<img src="{%=o%}" class="smooth" />' +
                 '</div>',
            title: '<p class="infobar-title large">' +
                       '{%#o%}' +
                   '</p>',
            body: '{%#o%}',
            single_button: '<div class="infobar-right">' +
                               '{% include ( "presto.noty.button", o ); %}' +
                           '</div>',
            buttons: '<div class="noty-buttons multiple-wrp centered">' +
                         '<div class="multiple">' +
                             '{% for ( var i = 0; i < o.length; i++ ) { %}' +
                                 '{% include ( "presto.noty.button", o[i] ); %}' +
                             '{% } %}' +
                         '</div>' +
                     '</div>',
            button: '<div class="button actionable {%=(o.color || "white")%} {%=(o.size || "xsmall")%} {%=(o.css || "")%}">' +
                        '<div class="label-center">' +
                            '{%#(o.text || "")%}' +
                        '</div>' +
                    '</div>'
        },

        /* OPTIONS */

        options: {
            anchor: {
                y: 'bottom',
                x: 'left'
            },

            title: false,
            body: false,
            img: false,
            buttons: [],
            /*
                   : [{
                          color: 'white',
                          size: 'xsmall',
                          css: '',
                          text: '',
                          onClick: $.noop
                     }],
            */

            type: 'alert',
            color: 'black',
            css: '',

            ttl: 3500,

            callbacks: {
                open: $.noop,
                close: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$noty = this.$element;
            this.timer = false;

            this.isOpen = false;
            this.neverOpened = true;

        },

        /* PRIVATE */

        _init_click: function () {

            if ( !this.options.buttons.length ) {

                this._on ( 'click', this.close );

            }

        },

        _init_buttons_click: function () {

            if ( this.options.buttons.length ) {

                var $buttons = this.$noty.find ( '.button' ),
                    instance = this;

                _.each ( this.options.buttons, function ( button, index ) {

                    var $button = $buttons.eq ( index ); //FIXME: it will not work if we add a button to the body manually

                    $button.on ( 'click', function ( event ) {

                        if ( button.onClick ) button.onClick.call ( this, event );

                        instance.close ();

                    });

                });

            }

        },

        _init_timer: function () {

            if ( this.options.buttons.length === 0 && this.options.ttl !== 'forever' ) {

                this.timer = $.timer ( this.close.bind ( this ), this.options.ttl, true );

                timers.push ( this.timer );

            }

        },

        _init_hover: function () {

            this.$noty.hover ( function () {

                _.each ( timers, function ( timer ) {

                    timer.pause ();

                });

            }, function () {

                _.each ( timers, function ( timer ) {

                    timer.remaining ( Math.max ( 1000, timer.remaining () || 0 ) );

                    timer.play ();

                });

            });

        },

        /* PUBLIC */

        open: function () {

            if ( !this.isOpen ) {

                $('.noty-queues.' + this.options.anchor.y + ' .noty-queue.' + this.options.anchor.x).first ().append ( this.$noty );

                $.reflow ();

                this.$noty.addClass ( 'active' );

                if ( this.neverOpened ) {

                    this._init_click ();
                    this._init_buttons_click ();
                    this._init_hover ();

                    this.neverOpened = false;

                }

                this._init_timer ();

                this._trigger ( 'open' );

                this.isOpen = true;

            }

        },

        close: function () {

            if ( this.timer ) {

                _.pull ( timers, this.timer );

                this.timer.stop ();

            }

            this.$noty.removeClass ( 'active' );

            this._delay ( function () {

                this.$noty.remove ();

            }, 200 );

            this._trigger ( 'close' );

            this.isOpen = false;

        }

    });

    /* READY */

    $(function () {

        $body.append (
            '<div class="noty-queues top">' +
                '<div class="noty-queue expanded"></div>' +
                '<div class="noty-queues-row">' +
                    '<div class="noty-queue left"></div>' +
                    '<div class="noty-queue center"></div>' +
                    '<div class="noty-queue right"></div>' +
                '</div>' +
            '</div>' +
            '<div class="noty-queues bottom">' +
                '<div class="noty-queues-row">' +
                    '<div class="noty-queue left"></div>' +
                    '<div class="noty-queue center"></div>' +
                    '<div class="noty-queue right"></div>' +
                '</div>' +
                '<div class="noty-queue expanded"></div>' +
            '</div>'
        );

    });

}( lQuery, window, document ));



/* PROGRESS BAR */

//TODO: this way of exenting the property erases previous setted styles (synce a array is extended with a copy, we are not extending the childs)
//TODO: make templates DRY

;(function ( $, window, document, undefined ) {

    'use strict';

    /* PRIVATE */

    var generate_options = function ( options, multiple ) {

        if ( !_.isUndefined ( multiple ) ) {

            var new_options = { percentages: Array ( arguments.length ) };

            for ( var i = 0, l = arguments.length; i < l; i++ ) {

                new_options.percentages[i] = _.isNumber ( arguments[i] ) ? { value: arguments[i] } : arguments[i];

            }

        } else {

            var new_options = _.isNumber ( options ) ? { percentages: [{ value: options }] } : ( options.percentages ? options : { percentages: [options] } );

        }

        return new_options;

    };

    /* HELPER */

    $.progressBar = function ( options, multiple ) {

        options = generate_options.apply ( null, arguments );

        return new $.presto.progressBar ( options );

    };

    /* PROGRESS BAR */

    $.widget ( 'presto.progressBar', {

        /* TEMPLATES */

        templates: {
            base: '<div class="progressBar {%=(o.striped ? "striped" : "")%} {%=o.color%} {%=o.size%} {%=o.css%}">' +
                      '<div class="progressBar-unhighlighted">' +
                          '{% include ( "presto.progressBar.percentages" + ( o.labeled ? "_labeled" : "" ), o.percentages ); %}' +
                      '</div>' +
                      '<div class="progressBar-stripes"></div>' +
                  '</div>',
            percentages: '{% for ( var i = 0; i < o.length; i++ ) { %}' +
                             '{% include ( "presto.progressBar.percentage", o[i] ); %}' +
                         '{% } %}',
            percentages_labeled: '{% for ( var i = 0; i < o.length; i++ ) { %}' +
                                     '{% include ( "presto.progressBar.percentage_labeled", o[i] ); %}' +
                                 '{% } %}',
            percentage: '<div class="progressBar-highlighted {%=(o.color || "")%} {%=(o.css || "")%}"></div>',
            percentage_labeled: '<div class="progressBar-highlighted {%=(o.color || "")%} {%=(o.css || "")%}">' +
                                    '{% include ( "presto.progressBar.label", {} ); %}' +
                                '</div>',
            label: '<div class="progressBar-label"></div>'
        },

        /* OPTIONS */

        options: {
            percentages: [],
            /*
                       : [{
                           value: 0,
                           color: '',
                           css: ''
                       }],
            */

            color: '',
            size: '',
            css: '',

            striped: false,
            labeled: false,
            decimals: 0,

            callbacks: {
                update: $.noop,
                full: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$progressBar = this.$element;
            this.$highlighteds = this.$progressBar.find ( '.progressBar-highlighted' );
            this.$stripes = this.$progressBar.find ( '.progressBar-stripes' );

        },

        _init: function () {

            if ( this.initializationType !== 'element' ) {

                this._update ();

            }

        },

        /* PRIVATE */

        _update: function () {

            for ( var i = 0, l = this.options.percentages.length; i < l; i++ ) {

                var $highlighted = this.$highlighteds.eq ( i );

                $highlighted.width ( this.options.percentages[i].value + '%' );

                if ( this.options.labeled ) {

                    var $label = $highlighted.find ( '.progressBar-label' );

                    $label.html ( +(this.options.percentages[i].value).toFixed ( this.options.decimals ) );

                }

            }

            if ( this.options.striped ) {

                //TODO: use the fixed _.sum function instead

                var sum = 0,
                    all = this.get ().slice ( 0, this.$highlighteds.length );

                for ( var i = 0, l = all.length; i < l; i++ ) {

                    sum += all[i];

                }

                this.$stripes.width ( sum + '%' );

                if ( sum === 100 ) {

                    this._trigger ( 'full' ); //TODO: move it, it should be here I think...

                }

            }

        },

        /* PUBLIC */

        get: function () {

            return _.map ( this.options.percentages, function ( percentage ) {

                return percentage.value;

            });

        },

        set: function ( options, multiple ) {

            options = generate_options.apply ( null, arguments );

            _.extend ( this.options, options );

            this._update ();

            this._trigger ( 'update' );

        }

    });

    /* READY */

    $(function () {

        $('.progressBar').each ( function () {

            var $progressBar = $(this),
                options = {
                    percentages: [],
                    striped: $progressBar.hasClass ( 'striped' ),
                    labeled: !!$progressBar.find ( '.progressBar-label' ).length
                };

            $progressBar.find ( '.progressBar-highlighted' ).each ( function () {

                options.percentages.push ({
                    value: parseFloat ( this.style.width )
                });

            });

            $progressBar.progressBar ( options );

        });

    });

}( lQuery, window, document ));



/* RADIO */

//TODO: add better support for disabled checkboxes
//TODO: api for selecting and unselecting (with events)

;(function ( $, window, document, undefined ) {

    'use strict';

    /* RADIO */

    $.widget ( 'presto.radio', {

        /* OPTIONS */

        options: {
            callbacks: {
                checked: $.noop,
                unchecked: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$radio = this.$element;
            this.$input = this.$radio.find ( 'input' );
            this.name = this.$input.attr ( 'name' );
            this.$form = this.$radio.parent ( 'form' );
            this.$other_inputs = this.$form.find ( 'input[name="' + this.name + '"]' );
            this.$other_radios = this.$other_inputs.parent ();

        },

        _init: function () {

            this.$radio.toggleClass ( 'checked', this.$input.prop ( 'checked' ) );

        },

        _events: function () {

            this._on ( 'click', this.select );

            this._on ( true, this.$input, 'change', this._update );

        },

        /* PRIVATE */

        _update: function () {

            var checked = this.$input.prop ( 'checked' );

            if ( checked ) { //INFO: We do the update when we reach the checked one

                this.$other_radios.removeClass ( 'checked' );

                this.$radio.addClass ( 'checked' );

            }

            this._trigger ( checked ? 'checked' : 'unchecked' );

        },

        /* PUBLIC */

        select: function () {

            if ( !this.$input.prop ( 'checked' ) ) {

                this.$input.prop ( 'checked', true ).trigger ( 'change' );

            }

        }

    });

    /* READY */

    $(function () {

        $('.radio').radio ();

    });

}( lQuery, window, document ));



/* RIPPLE */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* RIPPLE */

    var Ripple = {

        delay: {
            show: 350,
            hide: 400
        },

        show: function ( event, $element ) {

            var $ripple = $( '<div class="ripple-circle"></div>' ).appendTo ( $element ),
                offset = $element.offset (),
                eventXY = $.eventXY ( event ),
                now = _.now ();

            $ripple.css ({
                top: eventXY.Y - offset.top,
                left: eventXY.X - offset.left
            }).addClass ( 'ripple-circle-show' );

            $element.on ( 'mouseup mouseleave', function () {

                Ripple.hide ( $ripple, now );

            });

        },

        hide: function ( $ripple, before ) {

            var delay = Math.max ( 0, Ripple.delay.show + before - _.now () );

            setTimeout ( function () {

                $ripple.addClass ('ripple-circle-hide');

                setTimeout ( function () {

                    $ripple.remove ();

                }, Ripple.delay.hide );

            }, delay );

        }
    };

    /* READY */

    $(function () {

        $body.on ( 'mousedown', '.ripple', function ( event ) {

            if ( event.button === $.ui.mouseButton.RIGHT ) return;

            Ripple.show ( event, $(this) );

        });

    });

}( lQuery, window, document ));



/* SELECT */

//TODO: Add support for selecting multiple options (with checkboxes maybe)
//FIXME: Doesn't work when the page is scrolled (check in the components/form)
//TODO: add select-closer

;(function ( $, window, document, undefined ) {

    'use strict';

    /* SELECT */

    $.widget ( 'presto.select', {

        /* TEMPLATES */

        templates: {
            base: '<div id="dropdown-{%=o.id%}" class="dropdown no-tip">' +
                      '<div class="container">' +
                          '<div class="multiple vertical fluid">' +
                              '{% for ( var i = 0, l = o.options.length; i < l; i++ ) { %}' +
                                  '{% include ( "presto.select." + ( o.options[i].value ? "option" : "optgroup" ), o.options[i] ); %}' +
                              '{% } %}' +
                          '</div>' +
                      '</div>' +
                  '</div>',
            optgroup: '<div class="divider_wrp">' +
                          '<div class="divider">{%=o.prop%}</div>' +
                      '</div>',
            option: '<div class="button actionable outlined xsmall" data-value="{%=o.prop%}">{%=o.value%}</div>'
       },

        /* OPTIONS */

        options: {
            callbacks: {
                open: $.noop,
                close: $.noop,
                change: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$trigger = this.$element;
            this.id = this.$trigger.data ( 'select' );
            this.$select = this.$trigger.find ( 'select' );
            this.$options = this.$select.find ( 'option' );
            this.select_options = [];
            this.$placeholder = this.$trigger.find ( '.placeholder' );

            this.$dropdown = false;
            this.$dropdown_container = false;
            this.$buttons = false;

        },

        _init: function () {

            this._update_placeholder ();

            if ( !$.browser.isMobile ) {

                this.$select.addClass ( 'hidden' );

                this._init_select_options ();
                this._init_dropdown ();

                this._bind_button_click ();

            }

        },

        _events: function () {

            this._on ( this.$select, 'change', function () {
                this.update ();
                this.options.callbacks.change ();
            });

        },

        /* BUTTON CLICK */

        _bind_button_click: function () {

            this._on ( this.$buttons, 'click', this._handler_button_click );

        },

        _handler_button_click: function ( event, button ) {

            this.$select.val ( $(button).data ( 'value' ) ).trigger ( 'change' );

        },

        /* PRIVATE */

        _init_select_options: function () { //FIXME: Add support for arbitrary number of optgroups levels

            var previous_optgroup,
                current_optgroup;

            for ( var i = 0, l = this.$options.length; i < l; i++ ) {

                var $option = this.$options.eq ( i ),
                    $parent = $option.parent ();

                if ( $parent.is ( 'optgroup' ) ) {

                    current_optgroup = $parent.attr ( 'label' );

                    if ( current_optgroup !== previous_optgroup ) {

                        previous_optgroup = current_optgroup;

                        this.select_options.push ({
                            prop: current_optgroup
                        });

                    }

                }

                this.select_options.push ({
                    value: $option.html (),
                    prop: $option.attr ( 'value' )
                });

            }

        },

        _init_dropdown: function () {

            var html = this._tmpl ( 'base', { id: this.id, options: this.select_options } );

            $body.append ( html );

            this.$dropdown = $('#dropdown-' + this.id);
            this.$dropdown_container = this.$dropdown.find ( '.container' );
            this.$buttons = this.$dropdown.find ( '.button' );

            this.$trigger.addClass ( 'dropdown-trigger' ).data ( 'dropdown', 'dropdown-' + this.id );

            var instance = this;

            this.$dropdown.dropdown ({
                callbacks: {
                    open: function () {
                        instance._set_dropdown_width.bind ( instance )();
                        instance.options.callbacks.open ();
                    },
                    close: instance.options.callbacks.close
                }
            });

            this._update_dropdown ();

        },

        _update_placeholder: function () {

            var $selected_option = this.$options.filter ( '[value="' + this.$select.val () + '"]' );

            this.$placeholder.html ( $selected_option.html () );

        },

        _update_dropdown: function () {

            this.$buttons.removeClass ( 'active' );

            this.$buttons.filter ( '[data-value="' + this.$select.val () + '"]' ).addClass ( 'active' );

        },

        _set_dropdown_width: function () {

            this.$dropdown_container.css ( 'min-width', this.$trigger.width () );

        },

        /* PUBLIC */

        select: function ( value ) {

            this.$buttons.filter ( '[data-value="' + value + '"]' ).click ();

        },

        update: function () {

            if ( !$.browser.isMobile ) {

                this._update_dropdown ();

            }

            this._update_placeholder ();

        }

    });

    /* READY */

    $(function () {

        $('.select-trigger').select ();

    });

}( lQuery, window, document ));



/* SLIDER */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* SLIDER */

    $.widget ( 'presto.slider', {

        /* OPTIONS */

        options: {
            min: 0,
            max: 100,
            value: 0,
            step: 1,
            decimals: 0,
            callbacks: {
                increased: $.noop,
                decrease: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$slider_wrp = this.$element;
            this.$slider = this.$slider_wrp.find ( '.slider' );
            this.$min_btn = this.$slider.find ( '.min' );
            this.$max_btn = this.$slider.find ( '.max' );
            this.$input = this.$slider.find ( 'input' );
            this.$unhighlighted = this.$slider.find ( '.unhighlighted' );
            this.$highlighted = this.$slider.find ( '.highlighted' );
            this.$handler = this.$slider.find ( '.handler' );
            this.$label = this.$handler.find ( '.slider-label' );

            this.unhighlighted_width = this.$unhighlighted.width ();
            this.one_step_width = this.unhighlighted_width / ( this.options.max - this.options.min );
            this.required_step_width = this.options.step * this.one_step_width;

            this.current_move = 0;

        },

        _init: function () {

            this.set_value ( this.options.value, true );

        },

        _events: function () {

            this._on ( true, this.$input, 'change', this._handler_change );

            this._on ( $window, 'resize', this._handler_resize );

            this._on ( this.$slider, 'mouseenter', this._handler_arrows_in );
            this._on ( this.$slider, 'mouseleave', this._handler_arrows_out );

            this._on ( this.$min_btn, 'click', this.decrease );
            this._on ( this.$max_btn, 'click', this.increase );

            this.$handler.draggable ({
                start: this._handler_drag_start,
                move: this._handler_drag_move,
                context: this
            });

            this._on ( this.$unhighlighted, 'click', this._handler_click );

        },

        /* PRIVATE */

        _round_value: function ( value ) {

            return Number(Number(value).toFixed ( this.options.decimals ));

        },

        _round_distance: function ( distance ) {

            var mod = distance % this.required_step_width,
                extra_step;

            if ( mod > 0 ) {

                extra_step = ( mod >= this.required_step_width / 2 ) ? 1 : 0;

                distance = ( Math.floor ( distance / this.required_step_width ) + extra_step ) * this.required_step_width;

            } else if ( mod < 0 ) {

                extra_step = ( mod <= - ( this.required_step_width / 2 ) ) ? -1 : 0;

                distance = ( Math.ceil ( distance / this.required_step_width ) + extra_step ) * this.required_step_width;

            }

            return distance;

        },

        /* CHANGE */

        _handler_change: function () {

            this.set_value ( this.$input.val () );

        },

        /* RESIZE */

        _handler_resize: function ( event ) {

            this.unhighlighted_width = this.$unhighlighted.width ();
            this.one_step_width = this.unhighlighted_width / ( this.options.max - this.options.min );
            this.required_step_width = this.options.step * this.one_step_width;

        },

        /* LEFT / RIGHT ARROWS */

        _handler_arrows_in: function () {

            this._on ( $document, 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_out: function () {

            this._off ( $document, 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_keydown: function ( event ) {

            if ( event.keyCode === $.ui.keyCode.LEFT || event.keyCode === $.ui.keyCode.DOWN ) {

                this.decrease ();

            } else if ( event.keyCode === $.ui.keyCode.RIGHT || event.keyCode === $.ui.keyCode.UP ) {

                this.increase ();

            }

        },

        /* DRAG */

        _handler_drag_start: function () {

            this.current_move = 0;

        },

        _handler_drag_move: function ( event, trigger, XYs ) {

            var delta_move = XYs.delta.X - this.current_move;

            if ( Math.abs ( delta_move ) >= 1 ) {

                var moved = this.navigate_distance ( delta_move );

                if ( moved !== false ) {

                    this.current_move += moved;

                }

            }

        },

        /* CLICK */

        _handler_click: function ( event ) {

            if ( event.target === this.$handler.get ( 0 ) ) return; //INFO: Maybe we are dragging, shouldn't be handled as a click on the unhighlited bar

            var click_pos = $.eventXY ( event ),
                distance = click_pos.X - ( this.$highlighted.offset ().left + this.$highlighted.width () );

            this.navigate_distance ( distance );

        },

        /* PUBLIC */

        set_value: function ( value, force ) {

            value = this._round_value ( value );

            if ( value >= this.options.min && value <= this.options.max && ( value !== this.options.value || force ) ) {

                this.options.value = value;

                var width = ( ( value - this.options.min ) * 100 / ( this.options.max - this.options.min ) ) + '%';

                this.$handler.css ( 'left', width );
                this.$highlighted.css ( 'width', width );

                this.$input.val ( value ).trigger ( 'change' );
                this.$label.html ( value );

                this._trigger ( value > this.options.value ? 'increase' : 'decrease' );

            }

        },

        increase: function () {

            this.navigate ( this.options.step );

        },

        decrease: function () {

            this.navigate ( - this.options.step );

        },

        navigate: function ( modifier ) {

            var new_value = this.options.value + modifier;

            this.set_value ( new_value );

        },

        navigate_distance: function ( distance ) {

            distance = this._round_distance ( distance );

            if ( distance !== 0 ) {

                var new_value = this.options.value + ( distance / this.one_step_width );

                new_value = Math.max ( this.options.min, Math.min ( this.options.max, new_value ) );

                this.set_value ( new_value );

                return distance; //FIXME: Should we check if the values as changed before?

            }

            return false;

        }

    });

    /* READY */

    $(function () {

        $('.slider_wrp').each ( function () {

            var $slider_wrp = $(this),
                $input = $slider_wrp.find ( 'input' ),
                $min = $slider_wrp.find ( '.min' ),
                $max = $slider_wrp.find ( '.max' ),
                options = {
                    min: Number($min.data ( 'min' ) || 0),
                    max: Number($max.data ( 'max' ) || 100),
                    value: Number($input.val () || 0),
                    step: Number($slider_wrp.data ( 'step' ) || 1),
                    decimals: Number($slider_wrp.data ( 'decimals' ) || 0)
                };

            $slider_wrp.slider ( options );

        });

    });

}( lQuery, window, document ));



/* STEPPER */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* STEPPER */

    $.widget ( 'presto.stepper', {

        /* OPTIONS */

        options: {
            min: 0,
            max: 100,
            value: 0,
            step: 1,
            decimals: 0,
            callbacks: {
                increased: $.noop,
                decreased: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$stepper = this.$element;
            this.$input = this.$stepper.find ( 'input' );
            this.$label = this.$stepper.find ( '.stepper-label .label-center' );
            this.$decreaser = this.$stepper.find ( '.stepper-decreaser' );
            this.$increaser = this.$stepper.find ( '.stepper-increaser' );

        },

        _events: function () {

            this._on ( true, this.$input, 'change', this._handler_change );

            this._on ( 'mouseenter', this._handler_arrows_in );
            this._on ( 'mouseleave', this._handler_arrows_out );

            this._on ( this.$decreaser, 'click', this.decrease );

            this._on ( this.$increaser, 'click', this.increase );

        },

        /* PRIVATE */

        _round_value: function ( value ) {

            return Number(Number(value).toFixed ( this.options.decimals ));

        },

        /* CHANGE */

        _handler_change: function () {

            this.set_value ( this.$input.val () );

        },

        /* LEFT / RIGHT ARROWS */

        _handler_arrows_in: function ( event ) {

            this._on ( $document, 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_out: function ( event ) {

            this._off ( $document, 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_keydown: function ( event ) {

            if ( event.keyCode === $.ui.keyCode.LEFT || event.keyCode === $.ui.keyCode.DOWN ) {

                this.decrease ();

            } else if ( event.keyCode === $.ui.keyCode.RIGHT || event.keyCode === $.ui.keyCode.UP ) {

                this.increase ();

            }

        },

        /* PUBLIC */

        set_value: function ( value ) {

            value = this._round_value ( value );

            if ( value >= this.options.min && value <= this.options.max && value !== this.options.value ) {

                this.options.value = value;

                this.$input.val ( value ).trigger ( 'change' );
                this.$label.html ( value );

                this.$decreaser.toggleClass ( 'disabled', value === this.options.min );
                this.$increaser.toggleClass ( 'disabled', value === this.options.max );

                this._trigger ( value > this.options.value ? 'increased' : 'decreased' );

            }

        },

        increase: function () {

            this.navigate ( this.options.step );

        },

        decrease: function () {

            this.navigate ( - this.options.step );

        },

        navigate: function ( modifier ) {

            var new_value = this.options.value + modifier;

            this.set_value ( new_value );

        }

    });

    /* READY */

    $(function () {

        $('.stepper').each ( function () {

            var $stepper = $(this),
                $input = $stepper.find ( 'input' ),
                options = {
                    min: Number($stepper.data ( 'min' ) || 0),
                    max: Number($stepper.data ( 'max' ) || 100),
                    value: Number($input.val () || 0),
                    step: Number($stepper.data ( 'step' ) || 1),
                    decimals: Number($stepper.data ( 'decimals' ) || 0)
                };

            $stepper.stepper ( options );

        });

    });

}( lQuery, window, document ));



/* SWITCH */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* SWITCH */

    $.widget ( 'presto.switch', {

        /* OPTIONS */

        options: {
            colors: {
                on: 'secondary',
                off: 'gray'
            },
            callbacks: {
                checked: $.noop,
                unchecked: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$switch = this.$element;
            this.$input = this.$switch.find ( 'input' );
            this.$bar = this.$switch.find ( '.switch-bar' );
            this.$handler = this.$switch.find ( '.switch-handler' );
            this.$icon = this.$handler.find ( '.icon' );

            this.checked = this.$input.prop ( 'checked' );
            this.dragging = false;

            this.bar_width = false,
            this.start_percentage = false;

        },

        _init: function () {

            this._set_check ( this.checked, true );

        },

        _events: function () {

            this._on ( true, this.$input, 'change', this._handler_change );

            this._on ( 'mouseenter', this._handler_arrows_in );
            this._on ( 'mouseleave', this._handler_arrows_out );

            this._on ( 'click', this._handler_click );

            this.$handler.draggable ({
                start: this._handler_drag_start,
                move: this._handler_drag_move,
                end: this._handler_drag_end,
                context: this
            });

        },

        /* CHANGE */

        _handler_change: function () {

            var new_checked = this.$input.prop ( 'checked' );

            if ( this.checked !== new_checked ) {

                this.checked = new_checked;

                this._set_check ( this.checked, true );

            }

        },

        /* LEFT / RIGHT ARROWS */

        _handler_arrows_in: function () {

            this._on ( $document, 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_out: function () {

            this._off ( $document, 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_keydown: function ( event ) {

            if ( event.keyCode === $.ui.keyCode.LEFT ) {

                this.uncheck ();

            } else if ( event.keyCode === $.ui.keyCode.RIGHT ) {

                this.check ();

            } else if ( event.keyCode === $.ui.keyCode.SPACE ) {

                this.toggle ();

            }

        },

        /* CLICK */

        _handler_click: function () {

            if ( this.dragging ) {

                this.dragging = false;
                return;

            }

            this.toggle ();

        },

        /* DRAG */

        _handler_drag_start: function () {

            this.start_percentage = this.checked ? 100 : 0;

            this.bar_width = this.$bar.width ();

        },

        _handler_drag_move: function ( event, trigger, XYs ) {

            this.dragging = true;

            var abs_distance = Math.max ( - this.bar_width, Math.min ( Math.abs ( XYs.delta.X ), this.bar_width ) ),
                percentage = abs_distance * 100 / this.bar_width;

            this.drag_percentage = ( XYs.delta.X >= 0 ) ? this.start_percentage + percentage : this.start_percentage - percentage;

            this.$handler.css ( 'left', Math.max ( 0, Math.min ( 100, this.drag_percentage ) ) + '%' );

        },

        _handler_drag_end: function () {

            if ( this.dragging ) {

                this.checked = ( this.drag_percentage >= 50 ) ? true : false;

                this._set_check ( this.checked, true );

            }

        },

        _set_check: function ( checked, force ) {

            if ( checked !== this.$input.prop ( 'checked' ) || force ) {

                this.$switch.toggleClass ( 'checked', checked );

                this.$handler.css ( 'left', checked ? '100%' : 0 );

                this.$bar.toggleClass ( this.options.colors.on, checked );
                this.$handler.toggleClass ( this.options.colors.on, checked );

                this.$bar.toggleClass ( this.options.colors.off, !checked );
                this.$handler.toggleClass ( this.options.colors.off, !checked );

                this.$input.prop ( 'checked', checked ).trigger ( 'change' );

                this._trigger ( checked ? 'checked' : 'unchecked' );

            }

        },

        /* PUBLIC */

        check: function () {

            this._set_check ( true );

        },

        uncheck: function () {

            this._set_check ( false );

        },

        toggle: function () {

            this.checked = !this.checked;
            this._set_check ( this.checked );

        }

    });

    /* READY */

    $(function () {

        $('.switch').each ( function () {

            var $switch = $(this),
                options = {
                    colors: {
                        on: $switch.data ( 'color-on' ) || 'secondary',
                        off: $switch.data ( 'color-off' ) || 'gray'
                    }
                };

            $switch.switch ( options );

        });

    });

}( lQuery, window, document ));



/* TABS */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* TABS */

    $.widget ( 'presto.tabs', {

        /* SPECIAL */

        _variables: function () {

            this.$tabs = this.$element;
            this.$tabs_buttons = this.$tabs.find ( '.tabs-buttons' );
            this.$buttons = this.$tabs.find ( '.button' ); //FIXME: Should only search on the children, or nested tabs will not work
            this.$containers = this.$tabs.find ( '.container' );
            this.$indicator = this.$tabs.find ( '.tabs-indicator' );

            var $current_button = this.$buttons.filter ( '.active' ).first ();

            $current_button = $current_button.length > 0 ? $current_button : this.$buttons.first ();

            this.prev_index = 0;
            this.current_index = this.$buttons.index ( $current_button );

        },

        _init: function () {

            this.select ( this.current_index, true );

        },

        _events: function () {

            this._on ( this.$buttons, 'click', function ( event, node ) {

                var new_index = this.$buttons.index ( $(node) );

                this.select ( new_index );

            });

            this._on ( $window, 'resize', this._positionate_indicator );

        },

        /* PRIVATE */

        _positionate_indicator: function () {

            var $active = this.$buttons.filter ( '.active' ),
                position = $active.position (),
                total_width = this.$tabs_buttons.width ();

            this._delay ( function () {

                this.$indicator.css ( 'left', position.left + ( this.$buttons.index ( $active ) === 0 ? 1 : 0 ) ); //FIXME: it's hacky

            }, this.current_index > this.prev_index ? 40 : 0 );

            this._delay ( function () {

                this.$indicator.css ( 'right', total_width - position.left - $active.width () + ( this.$buttons.index ( $active ) === this.$buttons.length - 1 ? 1 : 0 ) ); //FIXME: it's hacky

            }, this.current_index > this.prev_index ? 0 : 40 );

        },

        /* PUBLIC */

        select: function ( index, force ) {

            if ( this.current_index !== index || force ) {

                this.$buttons.removeClass ( 'active' ).eq ( index ).addClass ( 'active' );
                this.$containers.removeClass ( 'active' ).eq ( index ).addClass ( 'active' );

                if ( this.current_index !== index ) {

                    this.prev_index = this.current_index;
                    this.current_index = index;

                }

                this._positionate_indicator ();

            }

        }

    });

    /* READY */

    $(function () {

        $('.tabs').tabs ();

    });

}( lQuery, window, document ));



/* TAGBOX */

//TODO: add support for non latin characters, I mean maybe forbid them and replace them with the latin equivalent
//FIXME: the partial field is too tall
//TODO: more explicative noty messages, like: you cannot use the tag 'something' again, not "you cannot use the same tag again"
//FIXME: se si immette una tag con tab poi non si e' in focus nel $partial

;(function ( $, window, document, undefined ) {

    'use strict';

    /* TAGBOX */

    $.widget ( 'presto.tagbox', {

        /* TEMPLATES */

        templates: {
            tag: '<div class="multiple-wrp joined tag">' +
                     '<div class="multiple">' +
                         '<div class="label compact {%=(o.color ? o.color : "")%} {%=(o.size ? o.size : "")%} {%=(o.css ? o.css : "")%}">' +
                             '<div class="label-center tag-label">' +
                                 '{%=o.str%}' +
                             '</div>' +
                         '</div>' +
                         '<div class="tag-deleter button actionable compact {%=(o.color ? o.color : "")%} {%=(o.size ? o.size : "")%} {%=(o.css ? o.css : "")%}">' +
                             '<div class="label-center">' +
                                 '<div class="icon icon-navigation-close"></div>' +
                             '</div>' +
                         '</div>' +
                     '</div>' +
                 '</div>'
        },

        /* OPTIONS */

        options: {
            tags: {
                str: '',
                arr: [],
                $nodes: $()
            },
            tag: {
                min_length: 3,
                color: '',
                size: 'small',
                css: 'outlined'
            },
            forbidden: [ '<', '>', ';', '`' ],
            separator: ',',
            sort: false,
            append: true,
            callbacks: {
                tag_added: $.noop,
                tag_removed: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$tagbox = this.$element;

            var $inputs = this.$tagbox.find ( 'input' );

            this.$input = $inputs.eq ( 0 );
            this.$partial = $inputs.eq ( 1 );

        },

        _init: function () {

            this._sanitize_tags_str ();

            var tags_html = this._get_tags_html ();

            this.$partial.before ( tags_html );

            this.options.tags.$nodes = this.$tagbox.find ( '.tag' );

        },

        _events: function () {

            this._on ( this.$partial, 'keypress', this._handler_keypress ); //INFO: For printable characters

            this._on ( this.$partial, 'keydown', function ( event ) {

                if ( event.keyCode === $.ui.keyCode.TAB || event.keyCode === $.ui.keyCode.BACKSPACE || event.keyCode === $.ui.keyCode.DELETE ) {

                    this._handler_keypress ( event );

                }

            }); //INFO: For the others

            this._on ( this.$partial, 'paste', this._handler_paste );

            this._on ( 'click', this._handler_click_on_empty );

            this._on ( 'click', this._handler_click_on_tag_deleter );

        },

        /* PRIVATE */

        _get_tags_html: function () {

            var tags_html = '';

            for ( var i = 0, l = this.options.tags.arr.length; i < l ; i++ ) {

                tags_html += this._get_tag_html ( this.options.tags.arr[i] );

            }

            return tags_html;

        },

        _get_tag_html: function ( tag_str ) {

            tag_str = this._sanitize_str ( tag_str );

            return this._tmpl ( 'tag', _.extend ( { str: tag_str }, this.options.tag ) );

        },

        _sanitize_tags_str: function () {

            var tags_arr = this.options.tags.str.split ( this.options.separator );

            this.options.tags.arr = [];

            for ( var n = 0; n < tags_arr.length; n++ ) {

                this.options.tags.arr[n] = this._sanitize_str ( tags_arr[n] );

            }

            if ( this.options.sort ) {

                this.options.tags.arr.sort ();

            }

            this.options.tags.str = this.options.tags.arr.join ( this.options.separator );

        },

        _sanitize_str: function ( string ) {

            return string.replace ( /[\n\r\t]/g, ' ' ).replace ( /\s+/g, ' ' );

        },

        _update_variables: function () {

            this.options.tags.$nodes = this.$tagbox.find ( '.tag' );

            this.options.tags.arr = [];

            for ( var i = 0, l = this.options.tags.$nodes.length; i < l; i++ ) {

                this.options.tags.arr[i] = this.options.tags.$nodes.eq ( i ).find ( '.tag-label' ).html ();

            }

            this.options.tags.str = this.options.tags.arr.join ( this.options.separator );

        },

        _update_input: function () {

            this.$input.val ( this.options.tags.str );

        },

        _clear_partial: function () {

            this._delay ( function () {

                this.$partial.val ( '' );

            });

        },

        _trim_partial: function () {

            this._delay ( function () {

                this.$partial.val ( _.trim ( this.$partial.val () ) );

            });

        },

        /* KEYPRESS */

        _handler_keypress: function ( event ) {

            var prev_value = this.$partial.val ();

            if ( event.keyCode === $.ui.keyCode.ENTER || event.keyCode === $.ui.keyCode.SPACE || event.keyCode === $.ui.keyCode.TAB || event.keyCode === this.options.separator.charCodeAt ( 0 ) ) {

                var added = this.add_tag ( this.$partial.val () );

                if ( added ) {

                    this._clear_partial ();

                } else {

                    this._delay ( function () {

                        this.$partial.val ( prev_value );

                    });

                }

                event.preventDefault ();
                event.stopImmediatePropagation ();

            } else if ( event.keyCode === $.ui.keyCode.BACKSPACE || event.keyCode === $.ui.keyCode.DELETE ) {

                if ( this.$partial.val ().length === 0 && this.options.tags.arr.length > 0 ) {

                    var $last = this.options.tags.$nodes.last ();
                    this.remove_tag ( $last, !event.ctrlKey );

                }

                event.preventDefault ();
                event.stopImmediatePropagation ();

            } else if ( this.options.forbidden.indexOf ( String.fromCharCode ( event.keyCode ) ) !== -1 ) {

                $.noty ( 'The character you entered is forbidden' );

                this._delay ( function () {

                    this.$partial.val ( prev_value );

                });

                event.preventDefault ();
                event.stopImmediatePropagation ();

            }

        },

        /* PASTE */

        _handler_paste: function ( event ) {

            this._delay ( function () {

                var new_tags = this.$partial.val ().split ( this.options.separator );

                for ( var i = 0; i < new_tags.length; i++ ) {

                    this.add_tag ( new_tags[i] );

                }

                this._clear_partial ();

            });

        },

        /* CLICK ON CLOSE */

        _handler_click_on_tag_deleter: function ( event ) {

            var $target = $(event.target);

            if ( $target.is ( '.tag-deleter ') || $target.parent ( '.tag-deleter' ).length > 0 ) {

                var $tag = $target.parent ( '.tag' );

                this.remove_tag ( $tag );

            }

        },

        /* CLICK ON EMPTY */

        _handler_click_on_empty: function ( event ) {

            if ( this.$partial.get ( 0 ) !== document.activeElement && !$(event.target).is ( 'input, .tag-label' ) ) {

                this.$partial.get ( 0 ).focus ();

            }

        },

        /* PUBLIC */

        add_tag: function ( tag_str ) {

            tag_str = this._sanitize_str ( tag_str );

            if ( tag_str.length < this.options.tag.min_length ) {

                if ( tag_str.length > 0 ) { // so it won't be triggered when the user presses enter and the $partial is empty

                    $.noty ( 'You cannot use tags shorter than ' + this.options.tag.min_length + ' characters' );

                    return false;

                }

            } else if ( this.options.tags.arr.indexOf ( tag_str ) !== -1 ) {

                $.noty ( 'You cannot use duplicate tags' );

                return false;

            } else {

                this.options.tags.arr.push ( tag_str );

                if ( this.options.sort ) {

                    this.options.tags.arr.sort ();

                }

                var tag_html = this._get_tag_html ( tag_str );

                if ( this.options.tags.$nodes.length === 0 || this.options.append ) {

                    this.$partial.before ( tag_html );

                } else {

                    var index = this.options.tags.arr.indexOf ( tag_str );

                    if ( index - 1 < 0 ) {

                        this.options.tags.$nodes.first ().before ( tag_html );

                    } else {

                        this.options.tags.$nodes.eq ( index - 1 ).after ( tag_html );

                    }

                }

                this._update_variables ();
                this._update_input ();

                return true;

            }

        },

        remove_tag: function ( $tag, edit ) {

            $tag.remove ();

            this._update_variables ();
            this._update_input ();

            if ( edit === true ) {

                var tag_str = $tag.find ( '.tag-label' ).html ();

                this.$partial.val ( tag_str );

            }

        }

    });

    /* READY */

    $(function () {

        $('.tagbox').each ( function () {

            var $tagbox = $(this),
                $input = $tagbox.find ( 'input' ).eq ( 0 ),
                options = {
                    tags: {
                        str: $input.val () || ''
                    }
                };

            $tagbox.tagbox ( options );

        });

    });

}( lQuery, window, document ));



/* BINARY TREE .each() */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* BINARY TREE .each () */

    $.fn.btEach = function ( callback, start_index ) {

        var start = 0,
            end = this.length - 1,
            center = 0,
            iterations = 0,
            result = false;

        while ( start <= end ) {

            center = ( iterations === 0 && typeof start_index === 'number' ) ? start_index : Math.ceil ( ( start + end ) / 2 );

            result = callback.call ( this.get ( center ), center, this.get ( center ) );

            iterations += 1;

            if ( result < 0 ) {

                end = center - 1;

            } else if ( result > 0 ) {

                start = center + 1;

            } else {

                return center;

            }

        }

        return false;

    };

}( lQuery, window, document ));



/* TIME AGO */

;(function ( $, window, document, undefined ) {

    'use strict';

    /* TIME AGO */

    $.widget ( 'presto.timeAgo', {

        /* OPTIONS */

        options: {
            timestamp: false,
            title: false,
            callbacks: {
                update: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$timeAgo_wrp = this.$element;

            this.options.timestamp = this.$timeAgo_wrp.data ( 'timestamp' ) || this.options.timestamp;

        },

        _init: function () {

            this._update_loop ( 0 );

        },

        /* PRIVATE */

        _update_loop: function ( wait ) {

            this._delay ( function () {

                this._update_loop ( this.update ().next );

            }, wait * 1000 );

        },

        /* PUBLIC */

        update: function () {

            var timeAgo = _.timeAgo ( this.options.timestamp );

            if ( this.options.title ) {

                this.$timeAgo_wrp.attr ( 'title', timeAgo.str );

            } else {

                this.$timeAgo_wrp.html ( timeAgo.str );

            }

            this._trigger ( 'update' );

            return timeAgo;

        }

    });

    /* READY */

    $(function () {

        $('[data-timestamp]').timeAgo ();
        $('[data-timestamp-title]').timeAgo ({ title: true });

    });

}( lQuery, window, document ));




