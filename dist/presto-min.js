/* http://prismjs.com/download.html?themes=prism&languages=markup+css+css-extras+clike+javascript */
self=typeof window!="undefined"?window:typeof WorkerGlobalScope!="undefined"&&self instanceof WorkerGlobalScope?self:{};var Prism=function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={util:{encode:function(e){return e instanceof n?new n(e.type,t.util.encode(e.content),e.alias):t.util.type(e)==="Array"?e.map(t.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var r={};for(var i in e)e.hasOwnProperty(i)&&(r[i]=t.util.clone(e[i]));return r;case"Array":return e.slice()}return e}},languages:{extend:function(e,n){var r=t.util.clone(t.languages[e]);for(var i in n)r[i]=n[i];return r},insertBefore:function(e,n,r,i){i=i||t.languages;var s=i[e];if(arguments.length==2){r=arguments[1];for(var o in r)r.hasOwnProperty(o)&&(s[o]=r[o]);return s}var u={};for(var a in s)if(s.hasOwnProperty(a)){if(a==n)for(var o in r)r.hasOwnProperty(o)&&(u[o]=r[o]);u[a]=s[a]}t.languages.DFS(t.languages,function(t,n){n===i[e]&&t!=e&&(this[t]=u)});return i[e]=u},DFS:function(e,n,r){for(var i in e)if(e.hasOwnProperty(i)){n.call(e,i,e[i],r||i);t.util.type(e[i])==="Object"?t.languages.DFS(e[i],n):t.util.type(e[i])==="Array"&&t.languages.DFS(e[i],n,i)}}},highlightAll:function(e,n){var r=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');for(var i=0,s;s=r[i++];)t.highlightElement(s,e===!0,n)},highlightElement:function(r,i,s){var o,u,a=r;while(a&&!e.test(a.className))a=a.parentNode;if(a){o=(a.className.match(e)||[,""])[1];u=t.languages[o]}if(!u)return;r.className=r.className.replace(e,"").replace(/\s+/g," ")+" language-"+o;a=r.parentNode;/pre/i.test(a.nodeName)&&(a.className=a.className.replace(e,"").replace(/\s+/g," ")+" language-"+o);var f=r.textContent;if(!f)return;var l={element:r,language:o,grammar:u,code:f};t.hooks.run("before-highlight",l);if(i&&self.Worker){var c=new Worker(t.filename);c.onmessage=function(e){l.highlightedCode=n.stringify(JSON.parse(e.data),o);t.hooks.run("before-insert",l);l.element.innerHTML=l.highlightedCode;s&&s.call(l.element);t.hooks.run("after-highlight",l)};c.postMessage(JSON.stringify({language:l.language,code:l.code}))}else{l.highlightedCode=t.highlight(l.code,l.grammar,l.language);t.hooks.run("before-insert",l);l.element.innerHTML=l.highlightedCode;s&&s.call(r);t.hooks.run("after-highlight",l)}},highlight:function(e,r,i){var s=t.tokenize(e,r);return n.stringify(t.util.encode(s),i)},tokenize:function(e,n,r){var i=t.Token,s=[e],o=n.rest;if(o){for(var u in o)n[u]=o[u];delete n.rest}e:for(var u in n){if(!n.hasOwnProperty(u)||!n[u])continue;var a=n[u];a=t.util.type(a)==="Array"?a:[a];for(var f=0;f<a.length;++f){var l=a[f],c=l.inside,h=!!l.lookbehind,p=0,d=l.alias;l=l.pattern||l;for(var v=0;v<s.length;v++){var m=s[v];if(s.length>e.length)break e;if(m instanceof i)continue;l.lastIndex=0;var g=l.exec(m);if(g){h&&(p=g[1].length);var y=g.index-1+p,g=g[0].slice(p),b=g.length,w=y+b,E=m.slice(0,y+1),S=m.slice(w+1),x=[v,1];E&&x.push(E);var T=new i(u,c?t.tokenize(g,c):g,d);x.push(T);S&&x.push(S);Array.prototype.splice.apply(s,x)}}}}return s},hooks:{all:{},add:function(e,n){var r=t.hooks.all;r[e]=r[e]||[];r[e].push(n)},run:function(e,n){var r=t.hooks.all[e];if(!r||!r.length)return;for(var i=0,s;s=r[i++];)s(n)}}},n=t.Token=function(e,t,n){this.type=e;this.content=t;this.alias=n};n.stringify=function(e,r,i){if(typeof e=="string")return e;if(Object.prototype.toString.call(e)=="[object Array]")return e.map(function(t){return n.stringify(t,r,e)}).join("");var s={type:e.type,content:n.stringify(e.content,r,i),tag:"span",classes:["token",e.type],attributes:{},language:r,parent:i};s.type=="comment"&&(s.attributes.spellcheck="true");if(e.alias){var o=t.util.type(e.alias)==="Array"?e.alias:[e.alias];Array.prototype.push.apply(s.classes,o)}t.hooks.run("wrap",s);var u="";for(var a in s.attributes)u+=a+'="'+(s.attributes[a]||"")+'"';return"<"+s.tag+' class="'+s.classes.join(" ")+'" '+u+">"+s.content+"</"+s.tag+">"};if(!self.document){if(!self.addEventListener)return self.Prism;self.addEventListener("message",function(e){var n=JSON.parse(e.data),r=n.language,i=n.code;self.postMessage(JSON.stringify(t.util.encode(t.tokenize(i,t.languages[r]))));self.close()},!1);return self.Prism}var r=document.getElementsByTagName("script");r=r[r.length-1];if(r){t.filename=r.src;document.addEventListener&&!r.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)}return self.Prism}();typeof module!="undefined"&&module.exports&&(module.exports=Prism);;
Prism.languages.markup={comment:/<!--[\w\W]*?-->/g,prolog:/<\?.+?\?>/,doctype:/<!DOCTYPE.+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,inside:{tag:{pattern:/^<\/?[\w:-]+/i,inside:{punctuation:/^<\/?/,namespace:/^[\w-]+?:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,inside:{punctuation:/=|>|"/g}},punctuation:/\/?>/g,"attr-name":{pattern:/[\w:-]+/g,inside:{namespace:/^[\w-]+?:/}}}},entity:/\&#?[\da-z]{1,8};/gi},Prism.hooks.add("wrap",function(t){"entity"===t.type&&(t.attributes.title=t.content.replace(/&amp;/,"&"))});;
Prism.languages.css={comment:/\/\*[\w\W]*?\*\//g,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*{))/gi,inside:{punctuation:/[;:]/g}},url:/url\((["']?).*?\1\)/gi,selector:/[^\{\}\s][^\{\};]*(?=\s*\{)/g,property:/(\b|\B)[\w-]+(?=\s*:)/gi,string:/("|')(\\?.)*?\1/g,important:/\B!important\b/gi,punctuation:/[\{\};:]/g,"function":/[-a-z0-9]+(?=\()/gi},Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/<style[\w\W]*?>[\w\W]*?<\/style>/gi,inside:{tag:{pattern:/<style[\w\W]*?>|<\/style>/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.css},alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').+?\1/gi,inside:{"attr-name":{pattern:/^\s*style/gi,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/gi,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag));;
Prism.languages.css.selector={pattern:/[^\{\}\s][^\{\}]*(?=\s*\{)/g,inside:{"pseudo-element":/:(?:after|before|first-letter|first-line|selection)|::[-\w]+/g,"pseudo-class":/:[-\w]+(?:\(.*\))?/g,"class":/\.[-:\.\w]+/g,id:/#[-:\.\w]+/g}},Prism.languages.insertBefore("css","ignore",{hexcode:/#[\da-f]{3,6}/gi,entity:/\\[\da-f]{1,8}/gi,number:/[\d%\.]+/g});;
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//g,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*?(\r?\n|$)/g,lookbehind:!0}],string:/("|')(\\?.)*?\1/g,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,"boolean":/\b(true|false)\b/g,"function":{pattern:/[a-z0-9_]+\(/gi,inside:{punctuation:/\(/}},number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,ignore:/&(lt|gt|amp);/gi,punctuation:/[{}[\];(),.:]/g};;
Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind:!0}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/<script[\w\W]*?>[\w\W]*?<\/script>/gi,inside:{tag:{pattern:/<script[\w\W]*?>|<\/script>/gi,inside:Prism.languages.markup.tag.inside},rest:Prism.languages.javascript},alias:"language-javascript"}});;



/* CORE */

;(function ( $, window, document, undefined ) {

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
        }
    };

}( lQuery, window, document ));



/* WIDGET */

;(function ( $, window, document, undefined ) {

    $.widget = function ( /* options, element */ ) {};

    $.widget._childConstructors = [];

    $.widget.prototype = {

        /* VARIABLES */

        defaultElement: '<div>',

        /* WIDGET PROPS */

        widget: {
            name: 'widget',
            fullName: 'widget'
        },

        /* OPTIONS */

        options: {
            disabled: false, //TODO: init/set it dinamically on instantiation
            callback: {}
        },

        /* WIDGET FUNCTIONS */

        _createWidget: function ( options, element ) {
            // VARIABLES

            element = $( element || this.defaultElement || this )[0];

            this.element = element;
            this.$element = $(element);

            this.uuid = _.uniqueId ();

            // IF THERE'S AN ELEMENT OR A DEFAULT ELEMENT

            if ( element !== this ) {

                // SAVING INSTANCE

                $.data ( this.element, this.widget.fullName, this );

                // ON $ELEMENT REMOVE -> WIDGET DESTROY

                this._on ( true, this.$element, 'remove', function ( event ) {

                    if ( event.target === this.element ) {

                        this.destroy ();

                    }

                });

            }

            //TODO: not setting this.document and this.window

            /* EXTEND OPTIONS */

            _.extend ( this.options, options ); //TODO: maybe do this.options = ..., but why?

            /* CALLBACKS */

            this._create ();

            this._trigger ( 'create' );

            this._init ();

        },

        _create: $.noop,
        _init: $.noop,
        _ready: $.noop,

        destroy: function () {

            this._destroy ();

            $.data ( this.element, this.widget.fullName, null ); //TODO: remove it, not set it to null

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

                this.$element.toggleClass ( this.widget.fullName + '-disabled', !!value );

            }

            return this;

        },

        /* ENABLING / DISABLING */

        enable: function () {

            return this._setOptions ( { disabled: false } );

        },

        disable: function () {

            return this._setOptions ( { disabled: true } );

        },

        /* EVENTS */

        _on: function ( suppressDisabledCheck, $element, events, handler ) {

            //TODO: add support for handlers as functions, not just for string name of a method

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

            if ( suppressDisabledCheck ) {

                var handlerProxy = (function ( handler ) {

                    return function () {

                        if ( instance.options.disabled ) return;

                        return handler.apply ( instance, arguments );

                    };

                }( this[handler] ));

            } else {

                var handlerProxy = (function ( handler ) {

                    return function () {

                        return handler.apply ( instance, arguments );

                    };

                }( this[handler] ));

            }

            var new_handler = '_proxy_' + ( suppressDisabledCheck ? 'check_' : '' ) + handler;

            this[new_handler] = handlerProxy;

            $element.on ( events, this[new_handler] );

        },

        _off: function ( $element, events, handler ) {

            //TODO: add support for handlers as functions, not just for string name of a method

            if ( !handler ) {

                handler = events;
                events = $element;
                $element = this.$element;

            }

            if ( this['_proxy_' + handler] ) {

                $element.off ( events, this['_proxy_' + handler] );

            }

            if ( this['_proxy_check_' + handler] ) {

                $element.off ( events, this['_proxy_check_' + handler] );

            }

        },

        _trigger: function ( events ) {

            this.$element.trigger ( events );

            events = events.split ( ' ' );

            for ( var ei = 0, el = events.length; ei < el; ei++ ) {

                if ( typeof this.options.callback[events[ei]] === 'function' ) {

                    this.options.callback[events[ei]].apply ( this.element );

                }

            }

        },

        /* DELAYING / DEFERRING */

        _delay: function ( handler, delay ) {

            var instance = this;

            return setTimeout ( function () {

                handler.apply ( instance, arguments );

            }, delay || 0 );

        },

        _defer: function ( handler, delay ) {

            var instance = this;

            return setTimeout ( function () {

                document.documentElement.offsetHeight; //INFO: Requesting the `offsetHeight` property triggers a reflow. Necessary, so that the deferred callback will be executed in another cycle

                handler.apply ( instance, arguments );

            }, delay || 0 );

        }

    };

}( lQuery, window, document ));



/* FACTORY */

;(function ( $, window, document, undefined ) {

    $.factory = function ( name, base, prototype ) {

        /* VARIABLES */

        var fullName,
            existingConstructor,
            constructor,
            basePrototype,
            proxiedPrototype = {},
            namespace = name.split ( '.' )[0];

        name = name.split ( '.' )[1];
        fullName = namespace + '-' + name;

        /* NO BASE */

        if ( !prototype ) {

            prototype = base;
            base = $.widget;

        }

        /* NAMESPACE */

        $[namespace] = $[namespace] || {};

        /* CONSTRUCTOR */

        existingConstructor = $[namespace][name];

        constructor = $[namespace][name] = function ( options, element ) {

            if ( !this._createWidget ) {

                return new constructor ( options, element );

            }

            if ( arguments.length ) {

                this._createWidget ( options, element );

            }

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

            if ( !(typeof prototype[prop] === 'function') ) {

                proxiedPrototype[prop] = prototype[prop];
                continue;

            }

            proxiedPrototype[prop] = (function () {

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

                    returnValue = value.apply ( this, arguments );

                    this._super = __super;
                    this._superApply = __superApply;

                    return returnValue;

                };

            })();

        }

        /* CONSTRUCTOR PROTOTYPE */

        constructor.prototype = _.extend ( basePrototype, proxiedPrototype, {
            constructor: constructor,
            namespace: namespace,
            widget: {
                name: name,
                fullName: fullName
            }
        });

        /* UPDATE PROTOTYPE CHAIN */

        if ( existingConstructor ) {

            for ( var i = 0, l = existingConstructor._childConstructors.length; i < l; i++ ) {

                var childPrototype = existingConstructor._childConstructors[i].prototype;

                $.factory ( childPrototype.namespace + '.' + childPrototype.widget.name, constructor, existingConstructor._childConstructors[i]._proto );

            }

            delete existingConstructor._childConstructors;

        } else {

            base._childConstructors.push ( constructor );

        }

        /* CONSTRUCT */

        $.factory.bridge ( name, constructor );

        /* READY */

        if ( constructor.prototype._ready ) {

            $(constructor.prototype._ready);

        }

        /* RETURN */

        return constructor;

    };

    $.factory.bridge = function ( name, object ) {

        /* VARIABLES */

        var fullName = object.prototype.widget.fullName || name;

        /* PLUGIN */

        $.fn[name] = function ( options ) {

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

                    if ( options === "instance" ) {

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

                        /* INIT */

                        instance.option ( options || {} );

                        if ( instance._init ) {

                            instance._init ();

                        }

                    } else {

                        /* INSTANCIATING */

                        $.data ( this, fullName, new object ( options, this ) );

                    }

                });

            }

            return returnValue;

        };

    };

}( lQuery, window, document ));



/* AUTOGROW */

;(function ( $, window, document, undefined ) {

    $.factory ( 'autogrow', {

        default_width: 0,
        default_height: 0,
        onUpdate: $.noop

    }, {

        /* SPECIAL */

        init: function () {

            this.is_border_box = ( this.$ele.css ( 'box-sizing' ) === 'border-box' );

            this.is_input = this.$ele.is ( 'input' );
            this.is_textarea = this.$ele.is ( 'textarea' );

            if ( this.is_input ) {

                this._init_input ();

            } else if ( this.is_textarea ) {

                this._init_textarea ();
            }

        },

        ready: function () {

            $('input.autogrow, textarea.autogrow').autogrow ();

        },

        /* INPUT */

        _init_input: function () {

            this.extra_pxs = this.is_border_box ? parseFloat ( this.$node.css ( 'border-left-width' ) ) + parseFloat ( this.$node.css ( 'padding-left' ) ) + parseFloat ( this.$node.css ( 'padding-right' ) ) + parseFloat ( this.$node.css ( 'border-right-width' ) ) : 0;

            this._update_input_width ();

            this.$ele.on ( 'input change', this._update_input_width );

        },

        _update_input_width: function () {

            var needed_width = this._get_input_needed_width ( this.$node ),
                actual_width = this.$node.width ();

            if ( needed_width > actual_width ) {

                this.$node.width ( needed_width + this.extra_pxs );

            } else if ( actual_width > needed_width ) {

                this.$node.width ( Math.max ( needed_width, this.options.default_width ) + this.extra_pxs );

            }

            this.hook ( 'onUpdate' );

        },

        _get_input_needed_width: function () {

            var id = 'span_' + $.getUID ();

            $body.append ( '<span id="' + id + '">' + this.$node.val () + '</span>' );

            var $span = $('#' + id);

            $span.css ({
                'position' : 'absolute',
                'left' : -9999,
                'top' : -9999,
                'font-family' : this.$node.css ( 'font-family' ),
                'font-size' : this.$node.css ( 'font-size' ),
                'font-weight' : this.$node.css ( 'font-weight' ),
                'font-style' : this.$node.css ( 'font-style' )
            });

            var width = $span.width ();

            $span.remove ();

            return width;

        },

        /* TEXTAREA */

        _init_textarea: function () {

            this.extra_pxs = this.is_border_box ? parseFloat ( this.$node.css ( 'border-top-width' ) ) + parseFloat ( this.$node.css ( 'padding-top' ) ) + parseFloat ( this.$node.css ( 'padding-bottom' ) ) + parseFloat ( this.$node.css ( 'border-bottom-width' ) ) : 0;

            this._update_textarea_height ();

            this.$ele.on ( 'input change', this._update_textarea_height );

        },

        _update_textarea_height: function () {

            var actual_height = this.$node.height (),
                needed_height = this.$node.height ( 1 ).get ( 0 ).scrollHeight - parseFloat ( this.$node.css ( 'padding-top' ) ) - parseFloat ( this.$node.css ( 'padding-bottom' ) );

            if ( needed_height > actual_height ) {

                this.$node.height ( needed_height + this.extra_pxs );

            } else if ( actual_height > needed_height ) {

                this.$node.height ( Math.max ( needed_height, this.options.default_height ) + this.extra_pxs );

            } else {

                this.$node.height ( actual_height + this.extra_pxs );

            }

            this.hook ( 'onUpdate' );

        },

        /* PUBLIC */

        update: function () {

            if ( this.is_input ) {

                this._update_input_width ();

            } else if ( this.is_textarea ) {

                this._update_textarea_height ();
            }

        }

    });

}( lQuery, window, document ));



/* BROWSER */

//TODO: detect browsers, versions, OSes

;(function ( $, window, document, undefined ) {

    var userAgent = navigator.userAgent.toLowerCase ();

    $.browser = {
        isMobile: /iphone|ipad|android|ipod|opera mini|opera mobile|blackberry|iemobile|webos|windows phone|playbook|tablet|kindle/i.test ( userAgent ),
        isTablet: /ipad|playbook|tablet|kindle/i.test ( userAgent ),
        isAndroid: /Android/i.test ( userAgent ),
        isIOS: /(iPhone|iPad|iPod)/i.test ( userAgent ),
        isMac: /Mac/i.test ( userAgent )
    };

}( lQuery, window, document ));



/* COOKIE */

;(function ( $, window, document, undefined ) {

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



/* FORM AJAX */

;(function ( $, window, document, undefined ) {

    $.factory ( 'formAjax', {

        /* SPECIAL */

        init: function () {

            var $form = this.$node;

            $form.on ( 'submit', function ( event ) {

                event.preventDefault ();

                $.ajax ({
                    type: $form.attr ( 'method' ) || 'POST',
                    url: $form.attr ( 'action' ),
                    data: new FormData ( $form.get ( 0 ) ),
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

        },

        ready: function () {

            $('form.ajax').formAjax ();

        }

    });

}( lQuery, window, document ));



/* FORM SYNC */

;(function ( $, window, document, undefined ) {

    var synced_groups = [];

    $.factory ( 'formSync', {

        /* SPECIAL */

        init: function () {

            var $form = this.$node,
                sync_group = $form.data ( 'sync-group');

            if ( synced_groups.indexOf ( sync_group ) !== -1 ) return;

            synced_groups.push ( sync_group );

            var $forms = $('form[data-sync-group="' + sync_group + '"]'),
                $eles = $forms.find ( 'input, textarea, select' );

            $eles.each ( function () {

                var $ele = this,
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

                        var $other_ele = this,
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

        },

        ready: function () {

            $('form[data-sync-group]').formSync ();

        }

    });

}( lQuery, window, document ));



 /* NOTIFICATION */

;(function ( $, window, document, undefined ) {

    $.notification = function ( custom_options, both ) {

        // OPTIONS

        var options = {
            title: false,
            body: false,
            img: false
        };

        $.extend ( options, custom_options );

        // NOTIFICATION

        if ( window.Notification ) {

            if ( Notification.permission !== 'denied' ) {

                Notification.requestPermission ( function ( status ) {

                    if ( status === 'granted' ) {

                        var notification = new Notification ( options.title, { body: options.body, icon: options.img } );

                        if ( both ) {

                            $.noty ( options );

                        }

                    } else {

                        $.noty ( options );

                    }

                });

            } else {

                $.noty ( options );

            }

        } else {

            $.noty ( options );

        }

    };

}( lQuery, window, document ));



/* ONE TIME ACTION */

;(function ( $, window, document, undefined ) {

    $.oneTimeAction = function ( method, option, action ) {

        if ( method === 'cookie' ) { // option -> action id

            var actions_str = $.cookie.read ( 'ota' ),
                actions = actions_str ? actions_str.split ( '|' ) : [];

            if ( actions.indexOf ( option ) === -1 ) { // If not already done

                actions.push ( option );
                actions_str = actions.join ( '|' );

                $.cookie.write ( 'ota', actions_str, 31536000 ); // 1 year

                action ();

            }

        } else if ( method === 'url' ) { // option -> url

            $.ajax ({
                url: option,
                success: function ( res ) {
                    if ( res === 1 || res === '1' ) { //FIXME: doesn't it return only strings??? //TODO: maybe we should just check if the return valus is truthy
                        action ();
                    }
                }
            });

        } else if ( method === 'reset' ) {

            $.cookie.destroy ( 'ota' );

        }

    };

}( lQuery, window, document ));



/* SELECTABLE */

//TODO: add noty for actions AND/OR right click for action
//FIXME: make it workable with sorting (update after sorting since we may)

;(function ( $, window, document, undefined ) {

    $.factory ( 'selectable', {

        selector: 'tbody tr',
        not_selector: '.empty',
        selected_class: 'selected'

    }, {

        /* UTILITIES */

        _clear_selection: function () {

            if ( document.selection ) {

                document.selection.empty ();

            } else if ( window.getSelection ) {

                window.getSelection ().removeAllRanges ();

            }

        },

        _reset_vars: function () {

            this.$prev_row = false;
            this.$prev_shifted = false;
            this.$prev_dragged = false;

        },

        _get_rows: function () {

            return this.$node.find ( this.options.selector ).not ( this.options.not_selector );

        },

        /* SPECIAL */

        init: function () {

            this.$rows = this._get_rows ();

            this.$start_row = false;
            this.$end_row = false;

            this._reset_vars ();

            this._bind_keys ();
            this._bind_mouse ();
            this._bind_others ();

        },

        ready: function () {

            $('table.selectable').selectable ();

        },

        /* CTRL + A / CTRL + SHIFT + A / CTRL + I */

        _bind_keys: function () {

            var instance = this;

            this.$node.on ( 'mouseenter', function () {

                $document.on ( 'keydown', function ( event ) {

                    instance._handler_keys ( event );

                });

            }).on ( 'mouseleave', function () {

                $document.off ( 'keydown', function ( event ) {

                    instance._handler_keys ( event );

                });

            });

        },

        _handler_keys: function ( event ) {

            if ( ( $.browser.isMac && event.metaKey ) || ( !$.browser.isMac && event.ctrlKey ) ) { //INFO: COMMAND or CTRL, is we are on Mac or not

                if ( event.keyCode === 65 ) { //INFO: A

                    event.preventDefault ();

                    this._reset_vars ();

                    this.$rows.toggleClass ( this.options.selected_class, !event.shiftKey ); //INFO: SHIFT or not

                } else if ( event.keyCode === 73 ) { //INFO: I

                    event.preventDefault ();

                    this._reset_vars ();

                    this.$rows.toggleClass ( this.options.selected_class );

                }

            }

        },

        /* CLICK / CTRL + CLICK / SHIFT + CLICK / CTRL + CLICK -> DRAG */

        _bind_mouse: function () {

            var instance = this;

            this.$rows.on ( 'mousedown', function ( event ) {

                instance._handler_mousedown ( event );

            });

        },

        _handler_mousedown: function ( event ) {

            if ( event.button !== 0 ) return;

            var instance = this;

            this.$start_row = $(this);

            $document.mousemove ( function ( event ) {

                instance._handler_mousemove ( event );

            });

            this.$start_row.mouseup ( function ( event ) {

                instance._handler_mouseup ( event );

            });

        },

        _handler_mousemove: function ( event ) { // DRAG

            //FIXME

            if ( !event.ctrlKey ) return;

            var instance = this;

            $document.off ( 'mousemove', this._handler_mousemove );

            this.$start_row.off ( 'mouseup', this._handler_mouseup );

            this._reset_vars ();

            this.$prev_row = this.$start_row;

            this.$start_row.toggleClass ( this.options.selected_class );

            $html.addClass ( 'dragging' );

            this.$rows.on ( 'mouseenter', this._handler_drag_mouseenter );

            $document.on ( 'mouseup', this._handler_drag_mouseup );

        },

        _handler_drag_mouseenter: function ( event ) { // DRAG HOVER

            this.$end_row = $(this);

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

        _handler_drag_mouseup: function ( event ) { // DRAG END

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

            } else if ( event.ctrlKey ) {

                this.$start_row.toggleClass ( this.options.selected_class );

                this._reset_vars ();

                this.$prev_row = $start_row;

            } else {

                this.$rows.removeClass ( this.options.selected_class );

                this.$start_row.addClass ( this.options.selected_class );

                this._reset_vars ();

                this.$prev_row = this.$start_row;

            }

        },

        /* OTHER EVENTS */

        _bind_others: function () {

            this.$node.on ( 'change sort', this._handler_change_sort );

            this.$node.on ( 'mousedown mouseup', this._handler_clear_selection );

        },

        _handler_change_sort: function () {

            this.$rows = _get_rows ();

        },

        _handler_clear_selection: function () {

            $.defer ( this._clear_selection );

        }

    });

}( lQuery, window, document ));



/* SORTABLE */

//TODO: only do the minimum amount of changes, if a row is added we don't need to resort the whole table

;(function ( $, window, document, undefined ) {

    $.factory ( 'sortable', {

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

    }, {

        /* SPECIAL */

        init: function () {

            this.$headers = this.$node.find ( 'thead th' );
            this.$sortables = this.$headers.filter ( '[data-sort]' );
            this.$tbody = this.$node.find ( 'tbody' );

            this.table = this.$node.get ( 0 );
            this.tbody = this.$tbody.get ( 0 );

            this.current_index = false; // `$headers` index, not `$sortables` index
            this.current_direction = false;;

            this._initial_sort ();

            this._bind_change ();
            this._bind_click ();

        },

        ready: function () {

            $('table.sortable').sortable ();

        },

        /* PRIVATE */

        _initial_sort: function () {

            var $initial = this.$headers.filter ( '.asc, .desc' ).first ();

            if ( $initial.length === 1 ) {

                this.sort ( this.$headers.index ( $initial ), ( $initial.hasClass ( 'asc' ) ? 'asc' : 'desc' ) );

            }

        },

        /* CHANGE */

        _bind_change: function () {

            var instance = this;

            this.$node.on ( 'change', function ( event ) {

                instance._handler_change ();

            });

        },

        _handler_change: function () {

            if ( this.current_index ) {

                this.sort ( this.current_index, this.current_direction );

            }

        },

        /* CLICK */

        _bind_click: function () {

            var instance = this;

            this.$sortables.on ( 'click', function ( event ) {

                instance._handler_click ( this );

            });

        },

        _handler_click: function ( sortable ) {

            var new_index = this.$headers.index ( sortable ),
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

            if ( !$sortable ) return; // bad index

            var sorter_name = $sortable.data ( 'sort' );

            if ( !sorter_name ) return; // unsortable column

            var sorter = this.options.sorters[sorter_name];

            if ( !sorter ) return;

            direction = ( !direction || direction.toLowerCase () === 'asc' ) ? 'asc' : 'desc';

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

            this.$node.trigger ( 'sort' );

        }

    });

}( lQuery, window, document ));



/* TABLE HELPER */

;(function ( $, window, document, undefined ) {

    $.factory ( 'tableHelper', {

        /* SPECIAL */

        init: function () {

            this.$thead = this.$node.find ( 'thead' ),
            this.$tfoot = this.$node.find ( 'tfoot' ),
            this.$tbody = this.$node.find ( 'tbody' ),
            this.$headers = this.$thead.find ( 'th' ),
            this.$empty_row = this.$tbody.find ( 'tr.empty' ),
            this.columns_nr = this.$headers.length;

            this._check_empty ();

        },

        ready: function () {

            $('table').tableHelper ();

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

            this.$node.trigger ( 'change' );

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

            this.$node.trigger ( 'change' );

            return this;

        },

        remove: function ( id ) {

            $( '#rid_' + this.uuid + '_' + id ).remove ();

            this._check_empty ();

            this.$node.trigger ( 'change' );

            return this;

        },

        clear: function () {

            this.$tbody.find ( 'tr:not(.empty)' ).remove ();

            this._check_empty ();

            this.$node.trigger ( 'change' );

            return this;

        }

    });

}( lQuery, window, document ));



 /* TIMER - http://jchavannes.com/jquery-timer */

;(function ( $, window, document, undefined ) {

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

;(function ( $, window, document, undefined ) {

    $.factory ( 'toggleHeight', {

        /* SPECIAL */

        init: function () {

            this.speed = parseFloat ( this.$node.css ( 'transition-duration' ) ) * 1000;

            this.$node.height ( this.$node.height () );

        },

        call: function ( force ) {

            this._toggle ( force );

        },

        /* PRIVATE */

        _is_visible: function () {

            return ( this.$node.height () !== 0 );

        },

        _get_actual_height: function () {

            var old_style = this.$node.attr ( 'style' ) || '';

            this.$node.css ( 'css-text', old_style + 'display:block;position:absolute;top:-99999px;height:auto;' );

            var actual_height = this.$node.height ();

            this.$node.css ( 'css-text', old_style );

            return actual_height;

        },

        _toggle: function ( force ) {

            if ( this._is_visible () || force === false ) {

                this.$node.defer ( function () {

                    this.height ( 0 );

                });

                this.$node.defer ( function () {

                    this.toggle ( false );

                }, this.speed || 0 );

            } else {

                this.$node.toggle ( true );

                var actual_height = this._get_actual_height ();

                this.$node.defer ( function () {

                    this.height ( actual_height );

                });

                this.$node.defer ( function () {

                    this.height ( 'auto' );

                }, this.speed );

            }

        }

    });

}( lQuery, window, document ));



/* TOUCHING */

//TODO: make it also able to return more than one match

;(function ( $, window, document, undefined ) {

    $.factory ( 'touching', {

        start_index : false,
        x : 0,
        y : 0

    }, function () {

        var options = this.options,
            touched = false;

        this.bt_each ( function () {

            var $ele = $(this),
                offset = $ele.offset (),
                x1 = offset.left,
                y1 = offset.top;

            if ( options.y >= y1 ) {

                if ( options.y <= y1 + $ele.height () ) {

                    if ( options.x >= x1 ) {

                        if ( options.x <= x1 + $ele.width () ) {

                            touched = $ele;

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

        }, this.options.start_index );

        return touched;

    });

}( lQuery, window, document ));



/* ACCORDION */

;(function ( $, window, document, undefined ) {

    $.factory ( 'accordion', {

        /* SPECIAL */

        init: function () {

            this.$accordions = this.$node.find ( '.accordion' );

            for ( var i = 0, l = this.$accordions.length; i < l; i++ ) {

                this._init_accordion ( this.$accordions.nodes[i] );

            }

        },

        ready: function () {

            $('.accordions_wrp').accordion ();

        },

        /* ACCORDION */

        _init_accordion: function ( node ) {

            var $accordion = $(node),
                $header = $accordion.find ( '.header' ),
                $other_accordions = this.$accordions.not ( $accordion ),
                $other_headers = $other_accordions.find ( '.header' ).not ( $header );

            $header.on ( 'click', function () {

                if ( $accordion.hasClass ( 'inactive' ) ) return;

                var is_active = $accordion.hasClass ( 'active' );

                $accordion.toggleClass ( 'active', !is_active );
                $header.toggleClass ( 'active', !is_active );

                $other_accordions.removeClass ( 'active' );
                $other_headers.removeClass ( 'active' );

            });

        }

    });

}( lQuery, window, document ));



/* BADGE */

;(function ( $, window, document, undefined ) {

    $.factory ( 'badge', {

        title: false,
        type: false,
        style: false

    }, {

        /* SPECIAL */

        init: function () {

            this.$badge_wrp = this.$node.find ( '.badge_wrp' ),
            this.$badge = this.$badge_wrp.find ( '.badge' ),

            this.options.title = this.options.title || $ele.data ( 'badge' ),
            this.options.type = this.options.type || $ele.data ( 'badge-type' ) || 'floating',
            this.options.style = this.options.style || $ele.data ( 'badge-style' ) || ''; // all_colors, squared

            if ( !this.options.title || this.options.title === 0 || this.options.title === '0' ) this.options.title = '';

            if ( !this.options.type && this.options.type !== 'inline' && this.options.type !== 'floating' ) this.options.type = 'inline';

            if ( this.$badge.length === 0 ) {

                this.$node.append ( '<div class="badge_wrp ' + this.options.type + '"><div class="badge_subwrp"><div class="badge ' + this.options.style + '"></div></div></div>' );

                this.options.$badge_wrp = this.$node.find ( '.badge_wrp' );
                this.options.$badge = this.$badge_wrp.find ( '.badge' );

            }

            if ( !this.$badge_wrp.hasClass ( this.options.type ) ) {

                this.$badge_wrp.toggleClass ( 'inline floating' );

            }

            if ( this.options.style ) {

                this.$badge.addClass ( this.options.style );

            }

            if ( this.options.title ) {

                this.$badge.html ( this.options.title );

            }

            var opening = ( this.options.title !== '' );

            if ( opening ) {

                this.$badge_wrp.removeClass ( 'hidden' );

                this.$badge_wrp.defer ( function () {

                    this.addClass ( 'active' );

                });

            } else {

                this.$badge_wrp.removeClass ( 'active' );

                this.$badge_wrp.defer ( function () {

                    this.addClass ( 'hidden' );

                }, 150 );

            }

        },

        call: function ( title ) {

            if ( typeof title === 'string' ) {

                this.options.title = title;

            }

        },

        ready: function () {

            $('[data-badge]').badge ();

        }

    });

}( lQuery, window, document ));



/* BLUR */

;(function ( $, window, document, undefined ) {

    $.fn.blur = function ( activate ) {

        return this.toggleClass ( 'blur', activate );

    };

}( lQuery, window, document ));



/* CHECKBOXES */

;(function ( $, window, document, undefined ) {

    $.factory ( 'checkbox', {

        /* SPECIAL */

        init: function () {

            this.$input = this.$node.find ( 'input' );

            if ( this.$input.prop ( 'checked' ) ) {

                this.$node.addClass ( 'selected' );

            } else if ( this.$node.hasClass ( 'selected' ) ) {

                this.$input.prop ( 'checked', true ).trigger ( 'change' );

            }

            this._bind_click ();

            this._bind_change ();

        },

        ready: function () {

            $('.checkbox').checkbox ();

        },

        /* CLICK */

        _bind_click: function () {

            this.$node.on ( 'click', this._handler_click );

        },

        _handler_click: function ( event ) {

            if ( event.target !== this.$input.get ( 0 ) ) this.toggle ();

        },

        /* CHANGE */

        _bind_change: function () {

            this.$node.on ( 'change', this.update () );

        },

        /* PUBLIC */

        update: function () {

            var active = this.$input.prop ( 'checked' );

            this.$node.toggleClass ( 'selected', active );

        },

        toggle: function () {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            var active = this.$input.prop ( 'checked' );

            this.$input.prop ( 'checked', !active ).trigger ( 'change' );

        }

    });

}( lQuery, window, document ));



/* DROPDOWNS */

;(function ( $, window, document, undefined ) {

    var assignments = {};

    $.factory ( 'dropdown', {

        beforeOpen: $.noop,
        afterOpen: $.noop,
        beforeClose: $.noop,
        afterClose: $.noop

    }, {

        /* SPECIAL */

        init: function () {

            this.dropdown_id = this.$node.data ( 'dropdown' );
            this.$dropdown = $('#' + dropdown_id);
            this.no_tip = this.$node.hasClass ( 'no_tip' ) || this.$dropdown.hasClass ( 'no_tip' );
            this.$bottom_tip = this.no_tip ? false : this.$dropdown.find ( '.bottom_tip' );
            this.$top_tip = this.no_tip ? false : this.$dropdown.find ( '.top_tip' );
            this.$right_tip = this.no_tip ? false : this.$dropdown.find ( '.right_tip' );
            this.$left_tip = this.no_tip ? false : this.$dropdown.find ( '.left_tip' );
            this.$btn_parents = this.$node.parents ();
            this.$buttons = this.$dropdown.find ( '.button' );
            this.opened = false;

            this.$node.on ( 'click', this._handler_btn_click );
            this.$buttons.on ( 'click', this.close );
            $window.on ( 'resize scroll', this.update );
            this.$btn_parents.on ( 'scroll', this.update );

        },

        ready: function () {

            $('.dropdown_trigger').dropdown ();

        },

        /* PRIVATE */

        _handler_window_click: function ( event ) {

            var $parents = $(event.target).parents ();

            if ( $parents.index ( this.$dropdown ) !== -1 ) return; // check if we clicked inside the dropdown

            this.close ();

        },

        _handler_btn_click: function () {

            if ( this.opened ) {

                this.close ();

            } else {

                this.open ();

                $.defer ( function () {

                    $window.on ( 'click', _handler_window_click );

                });

            }

        },

        /* PUBLIC */

        open: function () {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            this.hook ( 'beforeOpen' );

            assignments[dropdown_id] = this.$node;

            this.$node.addClass ( 'active' );

            this.$dropdown.addClass ( 'show' );

            this.positionate ();

            this.$dropdown.defer ( function () {

                this.addClass ( 'active' );

            });

            this.opened = true;

            this.hook ( 'afterOpen' );

        },

        close: function () {

            this.hook ( 'beforeClose' );

            if ( assignments[dropdown_id] === this.$node ) {

                this.$dropdown.removeClass ( 'active' );

                this.$dropdown.defer ( function () {

                    this.removeClass ( 'show' );

                }, 150 );

            }

            this.$node.removeClass ( 'top bottom left right active' );

            $window.off ( 'click', this._handler_window_click );

            this.opened = false;

            this.hook ( 'afterClose' );

        },

        positionate: function () {

            // reset classes

            this.$node.removeClass ( 'top bottom left right' );
            this.$dropdown.removeClass ( 'top bottom left right' ).toggleClass ( 'no_tip', this.no_tip );

            // update offsets

            var body_offset = $body.offset (),
                drop_offset = this.$dropdown.offset (),
                btn_offset = this.$node.offset ();

            // common variables

            var btn_center_top = btn_offset.top + ( btn_offset.height / 2 ),
                btn_center_left = btn_offset.left + ( btn_offset.width / 2 );

            var bottom_space = body_offset.height - btn_offset.top - btn_offset.height,
                top_space = btn_offset.top,
                right_space = body_offset.width - btn_offset.left - btn_offset.width,
                left_space = btn_offset.left;

            console.log(top_space);
            console.log(right_space);
            console.log(bottom_space);
            console.log(left_space);

            var useful_doc_width = Math.min ( body_offset.width, drop_offset.width ),
                useful_doc_height = Math.min ( body_offset.height, drop_offset.height );

            var areas = {
                'bottom': Math.min ( bottom_space, drop_offset.height ) * useful_doc_width,
                'top': Math.min ( top_space, drop_offset.height ) * useful_doc_width,
                'right': Math.min ( right_space, drop_offset.width ) * useful_doc_height,
                'left': Math.min ( left_space, drop_offset.width ) * useful_doc_height
            };

            var needed_area = drop_offset.width * drop_offset.height;

            // helpers

            var get_vertical_left = function () {

                if ( this.no_tip ) {

                    if ( right_space + btn_offset.width >= drop_offset.width ) {

                        return btn_offset.left + 'px';

                    } else if ( left_space + btn_offset.width >= drop_offset.width ) {

                        return left_space + btn_offset.width - drop_offset.width + 'px';

                    }

                }

                return Math.max ( 0, Math.min ( body_offset.width - drop_offset.width, btn_center_left - ( drop_offset.width / 2 ) ) ) + 'px';

            };

            var get_horizontal_top = function () {

                if ( this.no_tip ) {

                    if ( bottom_space + btn_offset.height >= drop_offset.height ) {

                        return btn_offset.top + 'px';

                    } else if ( top_space + btn_offset.height >= drop_offset.height ) {

                        return top_space + btn_offset.height - drop_offset.height + 'px';

                    }

                }

                return Math.max ( 0, Math.min ( body_offset.height - drop_offset.height, btn_center_top - ( drop_offset.height / 2 ) ) ) + 'px';

            };

            var get_direction_type = function ( direction ) {

                return ( direction === 'top' || direction === 'bottom' ) ? 'vertical' : 'horizontal';

            };

            // get first with acceptable area

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

                var max_area;

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

            // positionate everything

            if ( direction ) {

                var direction_type = get_direction_type ( direction );

                // positionate the dropdown

                var top = ( direction_type === 'horizontal' ) ? get_horizontal_top () : false;
                var left = ( direction_type === 'vertical' ) ? get_vertical_left () : false;

                switch ( direction ) {

                    case 'bottom':
                        top = ( body_offset.height - bottom_space ) + 'px';
                        break;

                    case 'top':
                        top = ( top_space - drop_offset.height ) + 'px';
                        break;

                    case 'right':
                        left = ( body_offset.width - right_space ) + 'px';
                        break;

                    case 'left':
                        left = ( left_space - drop_offset.width ) + 'px';
                        break;

                }

                this.$dropdown.css ({
                    top: top,
                    left: left
                });

                this.$node.addClass ( direction );
                this.$dropdown.addClass ( direction );

                // positionate the tip

                if ( !this.no_tip ) {

                    drop_offset = this.$dropdown.offset ();

                    switch ( direction ) {

                        case 'bottom':
                            this.$top_tip.css ( 'left', btn_center_left - drop_offset.left + 'px' );
                            break;

                        case 'top':
                            this.$bottom_tip.css ( 'left', btn_center_left - drop_offset.left + 'px' );
                            break;

                        case 'right':
                            this.$left_tip.css ( 'top', btn_center_top - drop_offset.top + 'px' );
                            break;

                        case 'left':
                            this.$right_tip.css ( 'top', btn_center_top - drop_offset.top + 'px' );
                            break;

                    }

                }

            }

        },

        update: function () {

            if ( this.opened ) {

                this.positionate ();

            }

        }

    });

}( lQuery, window, document ));



/* EXPANDER */

;(function ( $, window, document, undefined ) {

    $.factory ( 'expander', {

        /* SPECIAL */

        init: function () {

            this.$header = this.$node.children ( '.header' );
            this.$content_wrp = this.$node.children ( '.content' );
            this.opened = this.$node.hasClass ( 'active' );

            this._bind_click ();

        },

        ready: function () {

            $('.expander').expander ();

        },

        /* PRIVATE */

        _bind_click: function () {

            this.$header.on ( 'click', this._handler_click );

        },

        _handler_click: function ( event ) {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            this.opened = !this.opened;

            var opened;

            this.$node.defer ( function () {

                this.toggleClass ( 'active', opened );

            });

            this.$header.defer ( function () {

                this.toggleClass ( 'active', opened );

            });

            this.$content_wrp.toggleHeight ( this.opened );

        }

    });

}( lQuery, window, document ));



/* LOADING */

;(function ( $, window, document, undefined ) {

    $.factory ( 'loading', function ( activate ) {

        if ( activate ) {

            this.$node.addClass ( 'loading' ).defer ( function () {

                this.addClass ( 'loading_active' );

            });

        } else {

            this.$node.removeClass ( 'loading_active' ).defer ( function () {

                this.removeClass ( 'loading' );

            }, 200 );

        }

    });

}( lQuery, window, document ));



/* MENU */

var $menu_btn = false;
var $hamburger = false;

var menu_init_events = function () {

    $menu_btn = $('#menu_btn');
    $hamburger = $menu_btn.find ( '.layer' );

    $menu_btn.on ( 'click', function () {

        if ( $html.hasClass ( 'sidebar_open' ) ) {

            sidebar_toggle ( false );

        }

        var opened = $html.hasClass ( 'menu_open' );

        menu_toggle ( !opened );

    });

};

var menu_toggle = function ( open ) {

    $html.toggleClass ( 'menu_open', open );
    $menu_btn.toggleClass ( 'active', open );

    $hamburger.toggleClass ( 'from_arrow', !open );
    $hamburger.toggleClass ( 'to_arrow', open );

};

/* READY */

$.ready ( function () {

    menu_init_events ();

});



/* MODAL */

;(function ( $, window, document, undefined ) {

    $.factory ( 'modal', {

        /* SPECIAL */

        init: function () {

            this.modal_id = this.$node.data ( 'modal' );
            this.$modal = $('#' + this.modal_id);
            this.$closing = this.$modal.find ( '.closing' );

            this.$node.on ( 'click', this.open );
            this.$closing.on ( 'click', this.close );

        },

        ready: function () {

            $('.modal_trigger').modal ();

        },

        /* PRIVATE */

        _handler_esc_keydown: function ( event ) {

            if ( event.keyCode === 27 ) { // esc

                this.close ();

            }

        },

        /* PUBLIC */

        open: function () {

            this.$modal.addClass ( 'show' );

            this.$modal.defer ( function () {

                this.addClass ( 'active' );

            });

            $document.on ( 'keydown', this._handler_esc_keydown );

        },

        close: function () {

            this.$modal.removeClass ( 'active' );

            this.$modal.defer ( function () {

                this.removeClass ( 'show' );

            }, 200 );

            $document.off ( 'keydown', this._handler_esc_keydown );

        }

    });

}( lQuery, window, document ));



/* NOTY */

;(function ( $, window, document, undefined ) {

    // VARIABLES

    var $queue,
        timers = [];

    // INIT

    $(function () {

        $body.append ( '<div id="noty_queue"></div>' );

        $queue = $('#noty_queue');

    });

    // FUNCTIONS

    var get_html = function ( options ) {

        return '<div id="noty_wrp_' + options.id + '" class="noty_wrp hidden"><div id="noty_' + options.id + '" class="noty ' + options.type + ' ' + options.color + ' transparentize">' + get_img_html ( options.img ) + '<div class="noty_content">' + get_title_html ( options.title ) + get_body_html ( options.body ) + get_buttons_html ( options.buttons ) + '</div></div>';

    };

    var get_img_html = function ( img ) {

        return img ? '<div class="noty_img"><img src="' + img + '" class="smooth" /></div>' : '';

    };

    var get_title_html = function ( title ) {

        return title ? '<div class="noty_title">' + title + '</div>' : '';

    };

    var get_body_html = function ( body ) {

        return body ? '<div class="noty_body">' + body + '</div>' : '';

    };

    var get_buttons_html = function ( buttons ) {

        if ( !buttons ) return '';

        var buttons_html = '';

        _.each ( buttons, function ( button ) {

            buttons_html += get_button_html ( button );

        });

        return '<div class="noty_buttons multiple center">' + buttons_html + '</div>';

    };

    var get_button_html = function ( button ) {

        return button ? '<div class="button actionable ' + ( button.color || 'white' ) + ' ' + ( button.size || 'tiny' ) + ' ' + '">' + ( button.text || '' ) + '</div>' : '';

    };

    var remove = function ( del_id ) {

        var $noty_wrp = $('#noty_wrp_' + del_id);

        $noty_wrp.removeClass ( 'active' );

        $.defer ( function () {

            $noty_wrp.remove ();

        }, 200 );

    };

    // PLUGIN

    $.noty = function ( custom_options ) {

        // OPTIONS

        var options = {
            id: _.uniqueId (),

            title: false,
            body: false,
            img: false,
            buttons: false,
            /*
                   : [{
                color: 'white',
                size: 'tiny',
                text: '',
                onClick: $.noop
            }],
            */

            type: 'alert',
            color: 'black',

            ttl: 3500,

            onOpen: $.noop,
            onClose: $.noop
        };

        // EXTEND

        if ( _.isString ( custom_options ) ) {

            options.body = custom_options;

        } else if ( _.isDictionary ( custom_options ) ) {

            $.extend ( options, custom_options );

        }

        if ( options.buttons ) options.type = 'action';

        // WRITE

        $queue.prepend ( get_html ( options ) );

        // VARIABLES

        var $new_noty_wrp = $('#noty_wrp_' + options.id),
            $new_noty = $('#noty_' + options.id),
            noty_timer = false;

        // BUTTONS

        if ( options.buttons ) {

            var $buttons = $new_noty.find ( '.button' );

            _.each ( options.buttons, function ( button, index ) {

                var $button = $buttons.eq ( index );

                $button.on ( 'click', function ( event ) {

                    if ( button.onClick ) button.onClick.call ( this, event );

                    if ( noty_timer ) {

                        _.pull ( timers, noty_timer );

                        noty_timer.stop ();

                    }

                    remove ( options.id );

                    options.onClose.call ( $new_noty_wrp.get ( 0 ) );

                });

            });

        }

        // CLOSE FUNCTION

        var close = function () {

            if ( noty_timer ) {

                _.pull ( timers, noty_timer );

                noty_timer.stop ();

            }

            remove ( options.id );

            options.onClose.call ( $new_noty_wrp.get ( 0 ) );

        };

        // TIMER

        if ( !options.buttons && options.ttl !== 'forever' ) {

            noty_timer = $.timer ( close, options.ttl, true );

            timers.push ( noty_timer );

        }

        // CLOSE ON CLICK

        if ( !options.buttons ) {

            $new_noty.on ( 'click', close );

        }

        // PAUSE TIMERS ON HOVER

        $new_noty.hover ( function () {

            _.each ( timers, function ( timer ) {

                timer.pause ();

            });

        }, function () {

            _.each ( timers, function ( timer ) {

                timer.remaining ( Math.max ( 1000, timer.remaining () || 0 ) );

                timer.play ();

            });

        });

        // SHOW

        $new_noty_wrp.removeClass ( 'hidden' );

        $.defer ( function () {

            $new_noty_wrp.addClass ( 'active' );

        });

        options.onOpen.call ( $new_noty_wrp.get ( 0 ) );

    }

}( lQuery, window, document ));



/* PROGRESS BAR */

//TODO: add support for specific widths for each section

;(function ( $, window, document, undefined ) {

    $.factory ( 'progressBar', {

        /* SPECIAL */

        init: function () {

            this.$highlighted = this.$node.find ( '.highlighted' ),
            this.$label = this.$highlighted.find ( '.label' ),
            this.data_percentage = this.$node.data ( 'percentage' );

        },

        call: function ( percentage ) {

            if ( this.$node.hasClass ( 'fixed' ) ) return;

            if ( this.data_percentage !== undefined || percentage !== undefined ) {

                var percentage_nr = ( percentage === undefined ) ? this.data_percentage / this.$highlighted.length : percentage / this.$highlighted.length;

                this.$highlighted.css ( 'min-width', percentage_nr + '%' );

                this.$label.html ( percentage_nr + '%' );

            }

        },

        ready: function () {

            $('.progressBar').progressBar ();

        }

    });

}( lQuery, window, document ));



/* RADIOS */

;(function ( $, window, document, undefined ) {

    $.factory ( 'radio', {

        /* UTILITIES */

        /* SPECIAL */

        init: function () {

            this.$input = this.$node.find ( 'input' ),
            this.name = this.$input.attr ( 'name' ),
            this.$form = this.$node.parent ( 'form' ),
            this.$radios = this.$form.find ( 'input[name="' + this.name + '"]' ),
            this.$btns = this.$radios.parent ( '.radio' );

            if ( this.$input.checked () ) {

                this.$node.addClass ( 'selected' );

            } else if ( this.$node.hasClass ( 'selected' ) ) {

                this.$input.prop ( 'checked', true ).trigger ( 'change' );

            }

            this.$node.on ( 'click', this.select );

            this.$input.on ( 'change', this._update );

        },

        ready: function () {

            $('.radio').radio ();

        },

        /* PRIVATE */

        _update: function () {

            var active = this.$input.prop ( 'checked' );

            if ( active ) {

                this.$btns.removeClass ( 'selected' );

                this.$node.addClass ( 'selected' );

            }

        },

        /* PUBLIC */

        select: function () {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            this.$input.prop ( 'checked', true ).trigger ( 'change' );

        }

    });

}( lQuery, window, document ));



/* SELECTS */

;(function ( $, window, document, undefined ) {

    $.factory ( 'selects', {



    }, {

        /* UTILITIES */

        /* SPECIAL */

        init: function () {

            this.$select = this.$node.find ( 'select' );
            this.$options = this.$select.find ( 'option' );
            this.$placeholder = this.$node.find ( '.placeholder' );
            this.dropdown_id = $.getUID ();

            this.$dropdown = false;
            this.$dropdown_container = false;
            this.$buttons = false;

            this._update_placeholder ();

            if ( $.browser.is_mobile ) {

                this.$select.hide ();

                this._init_dropdown ();

                this.$buttons.on ( 'click', this._handler_click );

            }

            this.$select.on ( 'change', this.update );

        },

        ready: function () {

            $('.select').selects ();

        },

        /* PRIVATE */

        _handler_click: function ( event ) {

            var $button = $(this);

            this.$select.val ( $button.data ( 'value' ) ).trigger ( 'change' );

        },

        _init_dropdown: function () {

            $body.append ( this._get_dropdown_html () );

            this.$dropdown = $('#dropdown-' + this.dropdown_id);
            this.$dropdown_container = this.$dropdown.find ( '.container' );

            this.$node.addClass ( 'dropdown_trigger' ).data ( 'dropdown', 'dropdown-' + this.dropdown_id );

            this.$node.dropdowns ({
                beforeOpen: this._set_dropdown_width
            });

            this.$buttons = this.$dropdown.find ( '.button' );

            this._update_dropdown ();

        },

        _get_dropdown_html: function () {

            return '<div id="dropdown-' + this.dropdown_id + '" class="dropdown no_tip"><div class="container"><div class="multiple vertical">' + this._get_dropdown_options_html ( this.$select ) + '</div></div></div>';

        },

        _get_dropdown_options_html: function ( $parent ) {

            var html = '',
                $children = false;

            if ( $parent.is ( 'option' ) ) {

                html += '<div class="button actionable outlined tiny" data-value="' + $parent.attr ( 'value' ) + '">' + $parent.html () + '</div>';

            } else if ( $parent.is ( 'optgroup' ) ) {

                html += '<div class="separator_wrp"><div class="separator">' + $parent.attr ( 'label' ) + '</div></div>';

                $children = $parent.children ();

            } else if ( $parent.is ( 'select' ) ) {

                $children = $parent.children ();

            }

            if ( $children && $children.length > 0 ) {

                for ( var i = 0, l = $children.length; i < l; i++ ) {

                    html += this.get_dropdown_options_html ( $children.nodes[i] );

                }

            }

            return html;

        },

        _update_dropdown: function () {

            this.$buttons.removeClass ( 'active' );

            this.$buttons.filter ( '[data-value="' + this.$select.val () + '"]' ).addClass ( 'active' );

        },

        _set_dropdown_width: function () {

            this.$dropdown_container.css ( 'min-width', this.$node.width () );

        },

        _update_placeholder: function () {

            var $selected_option = this.$options.filter ( '[value="' + this.$select.val () + '"]' );

            this.$placeholder.html ( $selected_option.html () );

        },

        /* PUBLIC */

        update: function () {

            if ( !$.browser.is_mobile ) {

                this._update_dropdown ();

            }

            this._update_placeholder ();

        }


    });

}( lQuery, window, document ));



/* SIDEBAR */

var $sidebar_btn = false;

var sidebar_init_events = function () {

    $sidebar_btn = $('#sidebar_toggler');

    $sidebar_btn.on ( 'click', function () {

        if ( $html.hasClass ( 'menu_open' ) ) {

            menu_toggle ( false );

        }

        var opened = $html.hasClass ( 'sidebar_open' );

        sidebar_toggle ( !opened );

    });

};

var sidebar_toggle = function ( open ) {

    $html.toggleClass ( 'sidebar_open', open );
    $sidebar_btn.toggleClass ( 'active', open );

};

/* READY */

$.ready ( function () {

    sidebar_init_events ();

});



/* SLIDER */

;(function ( $, window, document, undefined ) {

    $.factory ( 'slider', {

        /* SPECIAL */

        init: function () {

            this.$slider = this.$node.find ( '.slider' );
            this.$min_btn = this.$slider.find ( '.min' );
            this.$max_btn = this.$slider.find ( '.max' );
            this.$input = this.$slider.find ( 'input' );
            this.$unhighlighted = this.$slider.find ( '.unhighlighted' );
            this.$highlighted = this.$slider.find ( '.highlighted' );
            this.$handler = this.$slider.find ( '.handler' );
            this.$label = this.$handler.find ( '.label' );

            this.min = this.$slider.data ( 'min' );
            this.max = this.$slider.data ( 'max' );
            this.start = this.$slider.data ( 'start' ) || this.$input.val () || 0;
            this.step = this.$slider.data ( 'step' ) || 1;
            this.decimals = this.$slider.data ( 'decimals' ) || 0;

            this.unhighlighted_width = this.$unhighlighted.width ();
            this.one_step_width = this.unhighlighted_width / ( this.max - this.min );
            this.required_step_width = this.step * this.one_step_width;
            this.current_value = this.start;

            this.start_pos = false;
            this.current_move = false;

            this.set_value ( this.current_value );

            this._bind_change ();
            this._bind_resize ();
            this._bind_arrows ();
            this._bind_min_max_click ();
            this._bind_drag ();
            this._bind_click ();

        },

        ready: function () {

            $('.slider_wrp').slider ();

        },

        /* PRIVATE */

        _round_value: function ( value ) {

            return Number(value).toFixed ( this.decimals );

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

        _bind_change: function () {

            this.$input.on ( 'change', this._handler_change );

        },

        _handler_change: function ( event ) {

            var input_val = Number(this.$input.val ());

            if ( input_val === this.current_value ) return;

            this.current_value = input_val;

            this.set_value ( this.current_value );

        },

        /* RESIZE */

        _bind_resize: function () {

            $window.on ( 'resize', this._handler_resize );

        },

        _handler_resize: function ( event ) {

            this.unhighlighted_width = this.$unhighlighted.width ();
            this.one_step_width = this.unhighlighted_width / ( this.max - this.min );
            this.required_step_width = this.step * this.one_step_width;

        },

        /* LEFT / RIGHT ARROWS */

        _bind_arrows: function () {

            this.$slider.hover ( this._handler_arrows_in, this._handler_arrows_out );

        },

        _handler_arrows_in: function ( event ) {

            if ( this.hasClass ( 'inactive' ) ) return;

            $document.on ( 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_out: function ( event ) {

            $document.off ( 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_keydown: function ( event ) {

            if ( event.keyCode === 37 ) { // left arrow

                this.navigate ( - this.step );

            } else if ( event.keyCode === 39 ) { // right arrow

                this.navigate ( this.step );

            }

        },

        /* MIN / MAX CLICK */

        _bind_min_click: function () {

            this.$min_btn.on ( 'click', this._handler_min_click );

        },

        _handler_min_click: function ( event ) {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            this.navigate ( - this.step );

        },

        _bind_max_click: function () {

            this.$max_btn.on ( 'click', this._handler_max_click );

        },

        _handler_max_click: function () {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            this.navigate ( this.step );


        },

        /* DRAG */

        _bind_drag: function () {

            this.$handler.on ( 'mousedown touchstart', this._handler_drag_start );

        },

        _handler_drag_start: function ( event ) {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            this.start_pos = get_event_pageXY ( event );
            this.current_move = 0;

            $html.addClass ( 'dragging' );
            this.$slider.addClass ( 'dragging' );

            $document.on ( 'mousemove touchmove', this._handler_drag_move );
            $document.on ( 'mouseup touchend', this._handler_drag_end );

        },

        _handler_drag_move: function ( event ) {

            var end_pos = get_event_pageXY ( event ),
                full_move = end_pos.pageX - this.start_pos.pageX,
                delta_move = full_move - this.current_move;

            if ( Math.abs ( delta_move ) >= 1 ) {

                var moved = this.navigate_move ( delta_move );

                if ( moved !== false && Math.abs ( delta_move ) >= 1 ) {

                    this.current_move += moved;

                }

            }

        },

        _handler_drag_end: function ( event ) {

            $html.removeClass ( 'dragging' );
            this.$slider.removeClass ( 'dragging' );

            $document.off ( 'mousemove touchmove', this._handler_drag_move );
            $document.off ( 'mouseup touchend', this._handler_drag_end );

        },

        /* CLICK */

        _bind_click: function () {

            this.$unhighlighted.on ( 'click', this._handler_click );

        },

        _handler_click: function ( event ) {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            if ( $(event.target).parents ().index ( this.$handler ) !== -1 ) return;

            var click_pos = get_event_pageXY ( event ),
                distance = click_pos.pageX - ( this.$highlighted.offset ().left + this.$highlighted.width () );

            this.navigate_move ( distance );

        },

        /* PUBLIC */

        set_value: function ( value ) {

            value = this._round_value ( value );

            var width = ( ( value - this.min ) * 100 / ( this.max - this.min ) ) + '%';

            this.$handler.css ( 'left', width );
            this.$highlighted.css ( 'width', width );

            this.$input.val ( value ).trigger ( 'change' );
            this.$label.html ( value );

        },

        navigate: function ( modifier ) {

            var possible_new_value = this.current_value + modifier;

            if ( possible_new_value >= this.min && possible_new_value <= this.max ) {

                this.current_value = possible_new_value;

                this.set_value ( this.current_value );

            }

        },

        navigate_move: function ( distance ) {

            distance = this._round_distance ( distance );

            if ( distance !== 0 ) {

                var possible_new_value = this.current_value + ( distance / this.one_step_width );

                possible_new_value = Math.max ( this.min, Math.min ( this.max, possible_new_value ) );

                if ( this.current_value !== possible_new_value ) {

                    this.current_value = possible_new_value;

                    this.set_value ( this.current_value );

                    return distance;

                }

            }

            return false;

        }

    });

}( lQuery, window, document ));



/* SPINNER */

;(function ( $, window, document, undefined ) {

    $.factory ( 'spinner', {

        /* SPECIAL */

        init: function () {

            this.$input = this.$node.find ( 'input' ),
            this.$label = this.$node.find ( '.label' ),
            this.$decrease_btn = this.$node.find ( '.decrease' ),
            this.$increase_btn = this.$node.find ( '.increase' ),

            this.min = this.$node.data ( 'min' ),
            this.max = this.$node.data ( 'max' ),
            this.start = this.$node.data ( 'start' ) || this.$input.val () || 0,
            this.step = this.$node.data ( 'step' ) || 1,
            this.decimals = this.$node.data ( 'decimals' ) || 0,

            this.current_value = start;

            this.set_value ( this.current_value );

            this._bind_change ();
            this._bind_arrows ();
            this._bind_minus_click ();

        },

        ready: function () {

            $('.spinner').spinner ();

        },

        /* PRIVATE */

        _round_value: function ( value ) {

            return Number(value).toFixed ( this.decimals );

        },

        /* CHANGE */

        _bind_change: function () {

            this.$input.on ( 'change', this._handler_change );

        },

        _handler_change: function () {

            var input_val = Number(this.$input.val ());

            if ( input_val === this.current_value ) return;

            this.current_value = input_val;

            this.set_value ( this.current_value );

        },

        /* LEFT / RIGHT ARROWS */

        _bind_arrows: function () {

            this.$node.hover ( this._handler_arrows_in, this._handler_arrows_out );

        },

        _handler_arrows_in: function ( event ) {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            $document.on ( 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_out: function ( event ) {

            $document.off ( 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_keydown: function ( event ) {

            if ( event.keyCode === 37 ) { // left arrow

                this.navigate ( - this.step );

            } else if ( event.keyCode === 39 ) { // right arrow

                this.navigate ( this.step );

            }

        },

        /* MINUS / PLUS CLICK */

        _bind_minus_click: function () {

            this.$decrease_btn.on ( 'click', this._handler_minus_click );

        },

        _handler_minus_click: function () {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            this.navigate ( - this.step );

        },

        _bind_plus_click: function () {

            this.$increase_btn.on ( 'click', this._handler_plus_click );

        },

        _handler_plus_click: function () {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            this.navigate ( this.step );

        },

        /* PUBLIC */

        set_value: function ( value ) {

            value = this._round_value ( value );

            this.$input.val ( value ).trigger ( 'change' );
            this.$label.html ( value );

            this.$decrease_btn.toggleClass ( 'inactive', value === this.min );
            this.$increase_btn.toggleClass ( 'inactive', value === this.max );


        },

        navigate: function ( modifier ) {

            var possible_new_value = this.current_value + modifier;

            if ( possible_new_value >= this.min && possible_new_value <= this.max ) {

                this.current_value = possible_new_value;

                this.set_value ( this.current_value );

            }

        }

    });

}( lQuery, window, document ));



/* SWITCHER */

;(function ( $, window, document, undefined ) {

    $.factory ( 'switcher', {

        theme: {
            on: 'secondary',
            off: 'gray'
        },
        icons: {
            on: false,
            off: false
        }

    }, {

        /* SPECIAL */

        init: function () {

            this.$bar = this.$node.find ( '.bar' );
            this.$handler = this.$node.find ( '.handler' );
            this.$icon = this.$node.find ( '.icon' );
            this.$input = this.$node.find ( 'input' );

            this.current_value = this.$input.prop ( 'checked' );
            this.dragging = false;

            this.start_pos = false,
            this.bar_width = false,
            this.start_percentage = false;

            this.set_value ( this.current_value );

            this._bind_change ();
            this._bind_arrows ();
            this._bind_click ();
            this._bind_drag ();

        },

        ready: function () {

            $('.switcher').switcher ();

        },

        /* CHANGE */

        _bind_change: function () {

            this.$input.on ( 'change', this._handler_change );

        },

        _handler_change: function () {

            var possible_new_value = this.$input.prop ( 'checked' );

            if ( possible_new_value === this.current_value ) return;

            this.current_value = possible_new_value;

            this.set_value ( this.current_value );

        },

        /* LEFT / RIGHT ARROWS */

        _bind_arrows: function () {

            this.$node.hover ( this._handler_arrows_in, this._handler_arrows_out );

        },

        _handler_arrows_in: function () {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            $document.on ( 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_out: function () {

            $document.off ( 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_keydown: function ( event ) {

            if ( event.keyCode === 37 ) { // left arrow

                if ( this.current_value !== false ) {

                    this.current_value = false;

                    this.set_value ( this.current_value );

                }

            } else if ( event.keyCode === 39 ) { // right arrow

                if ( this.current_value !== true ) {

                    this.current_value = true;

                    this.set_value ( this.current_value );

                }

            }

        },

        /* CLICK */

        _bind_click: function () {

            this.$node.on ( 'click', this._handler_click );

        },

        _handler_click: function () {

            if ( this.dragging || this.$node.hasClass ( 'inactive' ) ) return;

            this.toggle ();

        },

        /* DRAG */

        _bind_drag: function () {

            this.$handler.on ( 'mousedown touchstart', this._handler_drag_start );

        },

        _handler_drag_start: function ( event ) {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            this.start_percentage = this.current_value ? 100 : 0;

            this.start_pos = get_event_pageXY ( event );
            this.bar_width = this.$bar.width ();

            $html.addClass ( 'dragging' );
            this.$node.addClass ( 'dragging' );

            $document.on ( 'mousemove touchmove', this._handler_drag_move );
            $document.on ( 'mouseup touchend', this._handler_drag_end );

        },

        _handler_drag_move: function ( event ) {

            this.dragging = true;

            var move_pos = get_event_pageXY ( event ),
                distance = move_pos.pageX - this.start_pos.pageX,
                abs_distance = Math.max ( - this.bar_width, Math.min ( Math.abs ( distance ), this.bar_width ) ),
                percentage = abs_distance * 100 / this.bar_width,
                possible_new_percentage = ( distance >= 0 ) ? this.start_percentage + percentage : this.start_percentage - percentage;

            this.$handler.css ( 'left', Math.max ( 0, Math.min ( 100, possible_new_percentage ) ) + '%' );

        },

        _handler_drag_end: function ( event ) {

            var bar_off = this.$bar.offset (),
                handler_off = this.$handler.offset ();

            this.current_value = ( handler_off.left + ( handler_off.width / 2 ) >= bar_off.left + ( bar_off.width / 2 ) );

            $html.removeClass ( 'dragging' );
            this.$node.removeClass ( 'dragging' );

            $document.off ( 'mousemove touchmove', this._handler_drag_move );
            $document.off ( 'mouseup touchend', this._handler_drag_end );

            this.set_value ( this.current_value );

            this.dragging = false; //FIXME: It should be wrapped in a defer function, but how can we set the this value then???

        },

        /* PUBLIC */

        set_value: function ( value ) {

            this.$handler.css ( 'left', value ? '100%' : 0 );

            var inactive = this.$switcher.hasClass ( 'inactive' );

            this.$bar.toggleClass ( this.options.theme.on, value && !inactive );
            this.$handler.toggleClass ( this.options.theme.on, value && !inactive );

            this.$bar.toggleClass ( this.options.theme.off, !value );
            this.$handler.toggleClass ( this.options.theme.off, !value );

            if ( this.options.icons.on ) {

                this.$icon.toggleClass ( this.options.icons.on, value );

            }

            if ( this.options.icons.off ) {

                this.$icon.toggleClass ( this.options.icons.off, !value );

            }

            this.$input.prop ( 'checked', value ).trigger ( 'change' );

        },

        toggle: function () {

            this.current_value = !this.current_value;
            this.set_value ( this.current_value );

        }

    });

}( lQuery, window, document ));



/* TABS */

;(function ( $, window, document, undefined ) {

    $.factory ( 'tabs', {

        init: function () {

            $tabs = this.$node.find ( '.tab' ),
            $contabs = this.$node.find ( '.contab' );

            $tabs.each ( function () {

                var $tab = $(this),
                    $contab = $contabs.eq ( $tabs.index ( $tab ) ),
                    to_bottom = $contab.hasClass ( 'to_bottom' ),
                    $top_section = $contab.find ( '.top_section' ),
                    $main_section = ( $top_section.size () !== 0 ) ? $top_section : $contab;

                $tab.on ( 'click', function () {

                    if ( $tab.hasClass ( 'inactive' ) || $tab.hasClass ( 'active' ) ) return;

                    $tabs.removeClass ( 'active highlight' );
                    $contabs.removeClass ( 'active' );

                    $tab.addClass ( 'active highlight' );
                    $contab.addClass ( 'active' );

                    if ( to_bottom ) {

                        $main_section.scrollBottom ( 0 );

                    }

                });

            });

        },

        ready: function () {

            $('.tabs_wrp').tabs ();

        }

    });

}( lQuery, window, document ));



/* TAGBOX */

;(function ( $, window, document, undefined ) {

    $.factory ( 'tagbox', {

        input: {
            default_width: '100',
            placeholder: 'New tag...',
            theme: 'transparent small'
        },
        tag: {
            min_length: 3,
            theme: 'outlined small'
        },
        forbidden: [ '<', '>', ';', '`' ],
        separator: ',',
        sort: false,
        append: true

    }, {

        /* SPECIAL */

        init: function () {

            this.tagbox_id = $.getUID ();

            var template = '<div id="tagbox_' + this.tagbox_id + '" class="container transparent no-padding"><div class="multiple">' + this._get_tags_html () + '<input value="" placeholder="' + this.options.input.placeholder + '" class="autogrow ' + this.options.input.theme + '" data-default-width="' + this.options.input.default_width + '" /></div></div>';

            this.$node.after ( template ).addClass ( 'hidden' );

            this.$tagbox = $('#tagbox_' + this.tagbox_id);
            this.$partial = this.$tagbox.find ( 'input' );
            this.$tags = false;
            this.tags_arr = false;

            this.$partial.autogrow ();

            this._update_variables ();

        },

        ready: function () {

            $('input.tagbox').tagbox ();

        },

        /* PRIVATE */

        _get_tags_html: function () {

            var value = this.$node.val (),
                tags_str = value.split ( this.options.separator ),
                tags_html = '';

            for ( var n = 0; n < tags_str.length; n++ ) {

                tags_str[n] = this._sanitize_str ( tags_str[n] );

            }

            if ( this.options.sort ) {

                tags_str.sort ();

            }

            for ( var n = 0; n < tags_str.length; n++ ) {

                tags_html += this._get_tag_html ( tags_str[n] );

            }

            return tags_html;

        },

        _get_tag_html: function ( tag_str ) {

            tag_str = this._sanitize_str ( tag_str );

            return '<div class="tag button ' + this.options.tag.theme + '"><div class="label">' + tag_str + '</div><div class="sub right actionable close">x</div></div>';

        },

        _sanitize_str: function ( string ) {

            return string.replace ( /[\n\r\t]/g, ' ' ).replace ( /\s+/g, ' ' );

        },

        _update_variables: function () {

            this.$tags = this.$tagbox.find ( '.tag' );

            this.tags_arr = [];

            for ( var i = 0, l = this.$tags.length; i < l; i++ ) {

                var $tag = this.$tags.nodes[i],
                    $label = $tag.find ( '.label' );

                this.tags_arr.push ( $label.html () );

            }

        },

        _update_input: function () {

            this.$node.val ( this.tags_arr.join ( this.options.separator ) );

        },

        /* KEYDOWN */

        _bind_keydown: function () {

            this.$partial.on ( 'keydown', this._handler_keydown );

        },

        _handler_keydown: function ( event ) {

            switch ( event.keyCode ) {

                case 13: // enter
            //  case 32: // spacebar, if enabled actually disables tags with spaces inside of them
                case 188: // comma
                    this.add_tag ( this.$partial.val (), true );
                    event.preventDefault ();
                    event.stopImmediatePropagation ();
                    break;

                case 8: // backspace
                case 46: // del
                    if ( this.$partial.val ().length === 0 && this.$tags.length > 0 ) {
                        var $last = this.$tags.last ();
                        this.remove_tag ( $last, !event.ctrlKey );
                        event.preventDefault ();
                        event.stopImmediatePropagation ();
                    }
                    break;

                default:
                    if ( this.options.forbidden.indexOf ( event.key ) !== -1 ) {
                        $.noty ( 'The character you entered is forbidden' );
                        event.preventDefault ();
                        event.stopImmediatePropagation ();
                    }
                    break;

            }

        },

        /* PASTE */

        _bind_paste: function () {

            this.$partial.on ( 'past', this._handler_paste );

        },

        _handler_paste: function ( event ) {

            // $.defer ( function () { //FIXME: it should be wrapped on defer

                var tags_str = this.$partial.val ().split ( this.options.separator );

                for ( var i = 0; i < tags_str.length; i++ ) {

                    this.add_tag ( tags_str[i], false );

                }

                this.$partial.val ( '' );

            // });

        },

        /* CLICK ON CLOSE */

        _bind_click_on_close: function () {

            this.$tagbox.on ( 'click', this._handler_click_on_close );

        },

        _handler_click_on_close: function ( event ) {

            var $target = $(event.target);

            if ( $target.is ( '.close ') ) {

                var $tag = $target.parent ();

                this.remove_tag ( $tag );

            }

        },

        /* CLICK ON EMPTY */

        _bind_click_on_empty: function () {

            this.$tagbox.on ( 'click', this._handler_click_on_empty );

        },

        _handler_click_on_empty: function ( event ) {

            if ( this.$partial.get ( 0 ) !== document.activeElement && !$(event.target).is ( 'input, .label' ) ) {

                this.$partial.get ( 0 ).focus ();

            }

        },

        /* PUBLIC */

        add_tag: function ( tag_str, empty ) {

            tag_str = this._sanitize_str ( tag_str );

            if ( tag_str.length < this.options.tag.min_length ) {

                if ( tag_str.length > 0 ) { // so it won't be triggered when the user presses enter and the $partial is empty

                    $.noty ( 'You cannot use tags shorter than 3 characters' );

                }

            } else if ( this.tags_arr.indexOf ( tag_str ) !== -1 ) {

                $.noty ( 'You cannot use duplicate tags' );

            } else {

                var tag_html = this._get_tag_html ( tag_str );

                if ( $tags.length === 0 || this.options.append ) {

                    this.$partial.before ( tag_html );

                } else {

                    var tags_ord_arr = tags_arr;

                    tags_ord_arr.push ( tag_str );
                    tags_ord_arr.sort ();

                    var index = tags_ord_arr.indexOf ( tag_str );

                    if ( index - 1 < 0 ) {

                        this.$tags.first ().before ( tag_html );

                    } else {

                        this.$tags.eq ( index - 1 ).after ( tag_html );

                    }

                }

                this.update_variables ();
                this.update_input ();

                if ( empty === true ) {

                    this.$partial.val ( '' );

                }

            }

        },

        remove_tag: function ( $tag, edit ) {

            var $label = $tag.find ( '.label' ),
                tag_str = $label.html ();

            $tag.remove ();

            this.update_variables ();
            this.update_input ();

            if ( edit === true ) {

                this.$partial.val ( tag_str );

            }

        }

    });

}( lQuery, window, document ));



/* TIMEAGO */


;(function ( $, window, document, undefined ) {

    /* PLUGIN */

    $.factory ( 'timeAgo', {

        onUpdate: $.noop

    }, {

        /* SPECIAL */

        init: function () {

            this.timestamp = this.$node.data ( 'timestamp' );

            this._update_loop ( 0 );

        },

        ready: function () {

            $('[data-timestamp]').timeAgo ();

        },

        /* PRIVATE */

        _update_loop: function ( wait ) {

            var instance = this;

            setTimeout ( function () {

                var timeago = _.timeAgo ( instance.timestamp );

                instance.$node.html ( timeago.str );

                instance.hook ( 'onUpdate' );

                instance._update_loop ( timeago.next );

            }, wait * 1000 );

        },

        /* PUBLIC */

        update: function () {

            var timeago = _.timeAgo ( this.timestamp );

            this.$node.html ( timeago.str );

            this.hook ( 'onUpdate' );

        }

    });

}( lQuery, window, document ));



/* BINARY TREE .each() */

;(function ( $, window, document, undefined ) {

    $.factory ( 'btEach', function ( callback, start_center ) {

        var start = 0,
            end = this.length - 1,
            center = 0,
            iterations = 0,
            result = false;

        while ( start <= end ) {

            center = ( iterations === 0 && typeof start_center === 'number' ) ? start_center : Math.ceil ( ( start + end ) / 2 );

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

    });

}( lQuery, window, document ));




