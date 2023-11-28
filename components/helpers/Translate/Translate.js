import useTranslate from "../../../hooks/use-translate";

export const Translate = (props) => {
    const { translate } = useTranslate()
    return translate(props.id);

}

export default Translate;