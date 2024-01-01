import TermsConditions from "@/components/Static/TermsConditions/TermsConditions";
import MobileLayout from "@/components/layout/MobileLayout/MobileLayout";
import Head from "next/head";

const TermsAndConditions = () => {
    return (
        <MobileLayout>
            <Head>
                <title>Tripty - Privacy Policy</title>
            </Head>
            <TermsConditions />
        </MobileLayout>
    )
}

export default TermsAndConditions;