var fs = require('fs');
var mustache = require('mustache')

function page(pageName) {
    var pagePath = './pages/' + pageName;
    console.log("request page:" + pagePath);
    var jsFullPath = pagePath + '.js';
    var wxmlFullPath = pagePath + '.wxml';

    try {
        var viewData = JSON.parse(fs.readFileSync(jsFullPath).toString());
        var templateData = fs.readFileSync(wxmlFullPath).toString();

        //console.log(viewData);
        //console.log(templateData);

        var html = mustache.render(templateData, viewData);
        return html;
    }
    catch (err) {
        return pageName + " No Found!";
    }
}

exports.page = page;