Hints.numericHints=true;

addSearchAlias('o', 'Open', '');
addSearchAlias('e', 'To English', 'https://translate.google.com/?source=osdd#auto/en/');
addSearchAlias('c', 'To Chinese', 'https://translate.google.com/?source=osdd#auto/zh-CN/');

Front.registerInlineQuery({
    url: "https://api.shanbay.com/bdc/search/?word=",
    parseResult: function(res) {
        try {
            res = JSON.parse(res.text);
            var exp = res.msg;
            if (res.data.definition) {
                var pronunciations = [];
                for (var reg in res.data.pronunciations) {
                    pronunciations.push(`<div>[${reg}] ${res.data.pronunciations[reg]}</div>`);
                    // pronunciations.push(`<div><audio src="${res.data[reg+'_audio']}" controls></audio></div>`);
                }
                var definition = res.data.definition.split("\n").map(function(d) {
                    return `<li>${d}</li>`;
                }).join("");
                exp = `${pronunciations.join("")}<ul>${definition}</ul>`;
            }
            if (res.data.en_definitions) {
                exp += "<hr/>";
                for (var lex in res.data.en_definitions) {
                    var sense = res.data.en_definitions[lex].map(function(s) {
                        return `<li>${s}</li>`;
                    }).join("");
                    exp += `<div>${lex}</div><ul>${sense}</ul>`;
                }
            }
            return exp;
        } catch (e) {
            return "";
        }
    }
});
