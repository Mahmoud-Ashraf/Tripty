import HomeEntryPoints from "@/components/HomeEntryPoints/HomeEntryPoints";
// import HomeReviews from "@/components/HomeReviews/HomeReviews";
import HomeSlider from "@/components/HomeSlider/HomeSlider";
import HomeTabs from "@/components/HomeTabs/HomeTabs";
import HomeTourism from "@/components/HomeTourism/HomeTourism";
import PlaceHeader from "@/components/UI/PlaceHeader/PlaceHeader";
import SectionHeader from "@/components/UI/SectionHeader/SectionHeader";
import Translate from "@/components/helpers/Translate/Translate";
import useHTTP from "@/hooks/use-http";
import { Category } from "@/interfaces/category";
import { Place } from "@/interfaces/place";
import { Slider } from "@/interfaces/slider";
import { tripActions } from "@/store/Trip/Trip";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import explore from '@/public/assets/images/explore.svg';
import HomeTrip from "@/components/HomeTrip/HomeTrip";

interface Props {
   sliders: Slider[] | [],
   tabs: Category[] | [],
   categorizedPlaces: { [categoryName: string]: Place[] }
}
const Home = (props: Props) => {
   const { isLoading, error, sendRequest } = useHTTP();
   const { sliders, tabs, categorizedPlaces } = props;
   const [newTabs, setNewTabs] = useState(tabs);
   const [newPlaces, setNewPlaces] = useState(categorizedPlaces);
   const [newSliders, setNewSliders] = useState(sliders);
   const dispatch = useDispatch();

   useEffect(() => {
      fetchPlaces();
      fetchSliders();
   }, []);

   const fetchPlaces = () => {
      sendRequest(
         {
            url: '/api/places/categorized',
            method: 'GET'
         },
         (data: any) => {
            console.log(data);
            setNewPlaces(data.categorizedPlaces);
            setNewTabs(data.categories);
         },
         (err: any) => {
            // setNewTabs([]);
            // setNewPlaces({});
         }
      )
   }

   const fetchSliders = () => {
      sendRequest(
         {
            url: '/api/sliders',
            method: 'GET'
         },
         (data: any) => {
            setNewSliders(data);
         },
         (err: any) => {
            // setNewSliders([]);
         }
      )
   }
   return (
      <>
         <Head>
            <title>Tripty - Home</title>
         </Head>

         <HomeSlider sliders={newSliders} />

         <SectionHeader title="headings.explore" />
         <HomeEntryPoints />

         <HomeTabs tabs={newTabs} categorizedPlaces={newPlaces} />

         {/* <PlaceHeader onClick={() => { dispatch(tripActions.openShowTripModal()) }}>
            <h2><Translate id='headings.startYour' /></h2>
            <h2><Translate id='headings.trip' /></h2>
         </PlaceHeader> */}

         <HomeTrip />

         <HomeTourism />

         {/* <HomeReviews /> */}
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

export async function getServerSideProps({ locale }: any) {
   const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

   try {
      const categoriesReq = await fetch(`${baseUrl}categories?change_language=${locale}`);
      if (!categoriesReq.ok) {
         throw new Error('error fetching categories');
      }
      const categoriesData = await categoriesReq?.json();
      categoriesData?.data?.unshift({ name: locale === 'ar' ? 'الكل' : 'all', id: 0, icon: '' });

      const slidersReq = await fetch(`${baseUrl}sliders`);
      if (!slidersReq.ok) {
         throw new Error('error fetching sliders');
      }
      const slidersData = await slidersReq?.json();

      const categorizedPlaces: CategorizedPlaces = {}; // Initialize as the defined interface

      await Promise.all(categoriesData?.data?.map(async (category: any) => {
         const categoryPlacesReq = await fetch(`${baseUrl}places?change_language=${locale}&category_id=${category.id}`);
         if (!categoryPlacesReq.ok) {
            throw new Error('error fetching categoty data');
         }
         const categoryPlacesData = await categoryPlacesReq?.json();
         categorizedPlaces[category.name] = categoryPlacesData?.data;
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