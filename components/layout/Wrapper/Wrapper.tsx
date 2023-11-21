import { langActions } from "@/store/Lang/Lang";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";


const Wrapper = (props: PropsWithChildren) => {
  const dispatch = useDispatch();

    useEffect(() => {
        const localLang = localStorage.getItem('lang');
        if (localLang) {
          dispatch(langActions.translation({ lang: localLang }));
        }
      }, []);
    return <>{props.children}</>
}

export default Wrapper;