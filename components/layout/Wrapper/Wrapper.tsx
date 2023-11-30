import { langActions } from "@/store/Lang/Lang";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";


const Wrapper = (props: PropsWithChildren) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const { data: session } = useSession();

  useEffect(() => {
    const localLang = router.locale;
    if (localLang) {
      dispatch(langActions.translation({ lang: localLang }));
    }
  }, []);

  // useEffect(() => {
  //   if (session && session.user && Object.values(session.user).some(value => value === null)) {
  //     router.push('/auth/complete-data');
  //   } else {
  //     router.push('/home');
  //   }
  // }, [router.pathname]);

  return <>{props.children}</>
}

export default Wrapper;