Hints.numericHints=true;

addSearchAlias('e', 'To English', 'https://translate.google.com/?source=osdd#auto/en/');
addSearchAlias('c', 'To Chinese', 'https://translate.google.com/?source=osdd#auto/zh-CN/');

Front.registerInlineQuery({
    url: function(q) {
        return `http://dict.youdao.com/w/eng/${q}/#keyfrom=dict2.index`;
    },
    parseResult: function(res) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(res.text, "text/html");
        var collinsResult = doc.querySelector("#collinsResult");
        var authTransToggle = doc.querySelector("#authTransToggle");
        var examplesToggle = doc.querySelector("#examplesToggle");
        if (collinsResult) {
            collinsResult.querySelectorAll("div>span.collinsOrder").forEach(function(span) {
                span.nextElementSibling.prepend(span);
            });
            collinsResult.querySelectorAll("div.examples").forEach(function(div) {
                div.innerHTML = div.innerHTML.replace(/<p/gi, "<span").replace(/<\/p>/gi, "</span>");
            });
            var exp = collinsResult.innerHTML;
            return exp;
        } else if (authTransToggle) {
            authTransToggle.querySelector("div.via.ar").remove();
            return authTransToggle.innerHTML;
        } else if (examplesToggle) {
            return examplesToggle.innerHTML;
        }
    }
});
