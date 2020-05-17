const nodejieba = require("nodejieba");
const REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;


export const textToCharacters = (text) => {
    
    const parsedText = text.map(e => nodejieba.cut(e))
    const isChinese = parsedText.map(e => e.map(i => REGEX_CHINESE.test(i)))
    const onlyChinese = parsedText.map(e => e.filter(i => REGEX_CHINESE.test(i)))
    return [parsedText, isChinese, onlyChinese]
}

