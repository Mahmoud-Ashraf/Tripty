import TermsConditions from "@/components/Static/TermsConditions/TermsConditions";
import MobileLayout from "@/components/layout/MobileLayout/MobileLayout";
import Head from "next/head";

const TermsAndConditionsPage = () => {
    return (
        <MobileLayout>
            <Head>
                <title>Tripty - Privacy Policy</title>
            </Head>
            <TermsConditions />
        </MobileLayout>
    )
}

export default TermsAndConditionsPage;