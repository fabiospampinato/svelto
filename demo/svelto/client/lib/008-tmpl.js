
/* =========================================================================
 * Svelto - Tmpl
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * Fork of https://github.com/blueimp/JavaScript-Templates - Sebastian Tschan
 * =========================================================================
 * @require ../svelto/svelto.js
 * ========================================================================= */

/***************************
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
 *   {% include('tmpl-link', {name: "Website", url: "https://example.org"}); %}
 * </div>
 *
 * - If else condition
 * {% if (o.author.url) { %}
 *   <a href="{%=encodeURI(o.author.url)%}">{%=o.author.name%}</a>
 * {% } else { %}
 *   <em>No author url.</em>
 * {% } %}
 *
 * - For loop
 * <ul>
 *   {% for (var i=0; i<o.features.length; i++) { %}
 *     <li>{%=o.features[i]%}</li>
 *   {% } %}
 * </ul>
 *
 ***************************/

(function ( $, _, Svelto ) {

  'use strict';

  /* TMPL */

  let tmpl = function ( str, data ) {

    let f = !/[^\w\-\.:]/.test ( str )
              ? tmpl.cache[str] = tmpl.cache[str] || tmpl ( document.getElementById ( str ).innerHTML )
              : new Function ( tmpl.arg + ',tmpl', "var _e=_.escape" + tmpl.helper + ",_s='" + str.replace ( tmpl.regexp, tmpl.func ) + "';return _s;" );

    return data
             ? f ( data, tmpl )
             : data => f ( data, tmpl );

  };

  tmpl.cache = {}; // Store the cached templates
  tmpl.cached = {}; // Store pairs like: `noty: true`, so that we know that we already cached `noty`'s templates

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

  /* UTILITY */

  $.tmpl = tmpl;

}( Svelto.$, Svelto._, Svelto ));