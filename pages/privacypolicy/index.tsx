import PrivacyPolicyCom from "@/components/Static/PrivacyPolicyCom/PrivacyPolicyCom";
import MobileLayout from "@/components/layout/MobileLayout/MobileLayout";
import Head from "next/head";

const PrivacyPolicyPage = () => {
    return (
        <MobileLayout>
            <Head>
                <title>Tripty - Privacy Policy</title>
            </Head>
            <PrivacyPolicyCom />
        </MobileLayout>
    )
}

export default PrivacyPolicyPage;