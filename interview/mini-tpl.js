/**
 *  mini template engine
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Thu 09 Mar 2017 02:23:51 PM CST
 */

var TemplateEngine = function (html, options) {
  var 
    re = /<%([^%>]+)?%>/g,
    reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
    code = 'var r=[];\n',
    cursor = 0,
    match

  var add = function (line, js) {
    js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
      (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '')
    return add
  }

  while ( match = re.exec(html) ) {
    add(html.slice(cursor, match.index))(match[1], true)
    cursor = match.index + match[0].length
  }

  add(html.substr(cursor, html.length - cursor))
  code += 'return r.join("");'

  return new Function(code.replace(/[\r\t\n]/g, '')).apply(options)
}

