import { useSelector } from 'react-redux'

const useTranslate = (text) => {
    const translation = useSelector(state => {
        return state.lang.translation
    });
    let translatedText = { ...translation };
    const objDirArr = text.split('.');
    for (let i = 0; i < objDirArr.length; i++) {
        if (!translatedText[objDirArr[i]]) {
            translatedText = text;
            break;
        }
        translatedText = translatedText[objDirArr[i]];
    }
    return translatedText;
}

export default useTranslate;