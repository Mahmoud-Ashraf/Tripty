import { useSelector } from 'react-redux'

const useTranslate = (text) => {
    const translation = useSelector(state => state.lang.translation);
    // let translatedText = { ...translation };
    // const objDirArr = text?.split('.');
    // for (let i = 0; i < objDirArr?.length; i++) {
    //     if (!translatedText[objDirArr[i]]) {
    //         translatedText = text;
    //         break;
    //     }
    //     translatedText = translatedText[objDirArr[i]];
    // }
    // return translatedText;

    const translate = (text) => {
        let translatedText = { ...translation };
        const objDirArr = text?.split('.');
        for (let i = 0; i < objDirArr?.length; i++) {
            if (!translatedText[objDirArr[i]]) {
                translatedText = text;
                break;
            }
            translatedText = translatedText[objDirArr[i]];
        }
        return translatedText;
    };
    return { translate }
}

export default useTranslate;