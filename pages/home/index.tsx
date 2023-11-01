import HomeEntryPoints from "@/components/HomeEntryPoints/HomeEntryPoints";
import HomeReviews from "@/components/HomeReviews/HomeReviews";
import HomeSlider from "@/components/HomeSlider/HomeSlider";
import HomeTabs from "@/components/HomeTabs/HomeTabs";
import HomeTourism from "@/components/HomeTourism/HomeTourism";
import PlaceHeader from "@/components/UI/PlaceHeader/PlaceHeader";
import SectionHeader from "@/components/UI/SectionHeader/SectionHeader";
import { Category } from "@/interfaces/category";
import { Place } from "@/interfaces/place";
import { Slider } from "@/interfaces/slider";
import Head from "next/head";

interface Props {
   sliders: Slider[] | [],
   tabs: Category[] | [],
   categorizedPlaces: { [categoryName: string]: Place[] }
}
const Home = (props: Props) => {
   const { sliders, tabs, categorizedPlaces } = props;
   return (
      <>
         <Head>
            <title>Tripty - Home</title>
         </Head>

         <HomeSlider sliders={sliders} />

         <HomeEntryPoints />

         <HomeTabs tabs={tabs} categorizedPlaces={categorizedPlaces} />

         <PlaceHeader>
            <h2>START YOUR</h2>
            <h2>TRIP</h2>
         </PlaceHeader>
         <HomeTourism />

         <HomeReviews />
      </>
   )
}

interface CategorizedPlaces {
   [categoryName: string]: Place[]; // Define the structure for categorized places
}

//  interface Place {
//    // Define the structure for the Place object
//    id: number;
//    name: string;
//    // Add other properties based on your data structure
//  }

export async function getStaticProps() {
   try {
      const categoriesReq = await fetch('http://18.133.139.168/api/v1/front/categories');
      const categoriesData = await categoriesReq.json();
      categoriesData.data.unshift({ name: 'all', id: 0, icon: '' });

      const slidersReq = await fetch('http://18.133.139.168/api/v1/front/sliders');
      const slidersData = await slidersReq.json();

      const categorizedPlaces: CategorizedPlaces = {}; // Initialize as the defined interface

      await Promise.all(categoriesData.data.map(async (category: any) => {
         const categoryPlacesReq = await fetch(`http://18.133.139.168/api/v1/front/places?category_id=${category.id}`);
         const categoryPlacesData = await categoryPlacesReq.json();

         categorizedPlaces[category.name] = categoryPlacesData.data;
      }));
      return {
         props: {
            tabs: categoriesData.data,
            categorizedPlaces,
            sliders: slidersData.data,
         }
      };
   } catch (error) {
      console.error('Error fetching data:', error);
      return {
         props: {
            tabs: [],
            categorizedPlaces: {} as CategorizedPlaces, // Initialize as the defined interface
            sliders: [] // Adjust based on the expected sliders data structure
         }
      };
   }
}


export default Home;