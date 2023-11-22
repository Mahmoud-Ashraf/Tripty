import { langActions } from "@/store/Lang/Lang";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";


const Wrapper = (props: PropsWithChildren) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const localLang = router.locale;
    if (localLang) {
      dispatch(langActions.translation({ lang: localLang }));
    }
  }, []);
  return <>{props.children}</>
}

export default Wrapper;