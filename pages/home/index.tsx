import HomeEntryPoints from "@/components/HomeEntryPoints/HomeEntryPoints";
import HomeReviews from "@/components/HomeReviews/HomeReviews";
import HomeSlider from "@/components/HomeSlider/HomeSlider";
import HomeTabs from "@/components/HomeTabs/HomeTabs";
import SectionHeader from "@/components/UI/SectionHeader/SectionHeader";
import Head from "next/head";

const Home = () => {
   return (
      <>
         <Head>
            <title>Tripty - Home</title>
         </Head>

         <HomeSlider />

         <HomeEntryPoints />

         <HomeTabs />

         <HomeReviews />
      </>
   )
}

export default Home;