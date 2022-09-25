
var mustache = require('mustache')

 function demo() {

    // 模板字符串
     let template = `
      <div>
            <div>姓名-{{name}}</div>
            <div>年龄-{{age}}</div>
            <div>主页-{{{homepage}}}</div>
            <div>
                兴趣：
                <ul>
                    {{#hobbies}}
                    <li>{{.}}</li>
                    {{/hobbies}}
                </ul>
            </div>
            
            <div>
                朋友：
                <ul>
                    {{#friends}}
                    <li>{{.}}</li>
                    {{/friends}}
                    {{^friends}}
                    没有朋友
                    {{/friends}}
                </ul>
            </div>
        </div>

    `;

    // 数据
     let date = {
         name: '张三',
         age: 20,
         hobbies: ['唱歌', '跳舞'],
         friends: ['好友1', '好友2'],
         homepage: "<a target='_blank' href='http://www.baidu.com/'>我的主页<a>"
     };
     var html = mustache.render(template, date);
     //console.log(html);
     return html;
}

exports.demo = demo;