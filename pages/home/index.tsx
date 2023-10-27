import HomeEntryPoints from "@/components/HomeEntryPoints/HomeEntryPoints";
import HomeReviews from "@/components/HomeReviews/HomeReviews";
import HomeSlider from "@/components/HomeSlider/HomeSlider";
import HomeTabs from "@/components/HomeTabs/HomeTabs";
import SectionHeader from "@/components/UI/SectionHeader/SectionHeader";
import { Slider } from "@/interfaces/slider";
import Head from "next/head";

interface Props {
   sliders: Slider[] | undefined;
}
const Home = (props: Props) => {
   const { sliders } = props;
   return (
      <>
         <Head>
            <title>Tripty - Home</title>
         </Head>

         <HomeSlider sliders={sliders} />

         <HomeEntryPoints />

         <HomeTabs />

         <HomeReviews />
      </>
   )
}

// export async function getStaticPaths() {
//    // Fetch the list of place IDs from an API or database
//    const sliders = await fetch('http://18.133.139.168/api/v1/front/sliders').then(data => data.json());
//    const paths = sliders.data.map((place: Slider) => ({
//       params: { placeId: place.id.toString() },
//    }));

//    return {
//       paths,
//       fallback: true, // or true, depending on your requirements
//    };
// }

export async function getStaticProps(context: any) {
   // const { placeId } = context.params;
   try {
      const slidersResponse = await fetch(`http://18.133.139.168/api/v1/front/sliders`).then(data => data.json());
      // const slidersResponse = await fetch(`http://18.133.139.168/api/v1/front/places/${placeId}`).then(data => data.json());
      // const data = await response.json();

      return {
         props: {
            sliders: slidersResponse?.data || undefined,
         },
      };
   } catch (error) {
      console.error(error);
      return {
         props: {
            notFound: true
         }
         // notFound: true,
      };
   }
}

export default Home;