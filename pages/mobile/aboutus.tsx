import About from "@/components/Static/About/About";
import MobileLayout from "@/components/layout/MobileLayout/MobileLayout";
import Head from "next/head";

const AboutUs = () => {
    return (
        <MobileLayout>
            <Head>
                <title>Tripty - About Us</title>
            </Head>
            <About />
        </MobileLayout>
    )
}

export default AboutUs;