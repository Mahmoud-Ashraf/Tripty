import HomeEntryPoints from "@/components/HomeEntryPoints/HomeEntryPoints";
import HomeReviews from "@/components/HomeReviews/HomeReviews";
import HomeSlider from "@/components/HomeSlider/HomeSlider";
import HomeTabs from "@/components/HomeTabs/HomeTabs";
import HomeTourism from "@/components/HomeTourism/HomeTourism";
import PlaceHeader from "@/components/UI/PlaceHeader/PlaceHeader";
import Translate from "@/components/helpers/Translate/Translate";
import useHTTP from "@/hooks/use-http";
import { Category } from "@/interfaces/category";
import { Place } from "@/interfaces/place";
import { Slider } from "@/interfaces/slider";
import { RootState } from "@/store";
import { tripActions } from "@/store/Trip/Trip";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
   sliders: Slider[] | [],
   tabs: Category[] | [],
   categorizedPlaces: { [categoryName: string]: Place[] }
}
const Home = (props: Props) => {
   // const { isLoading, error, sendRequest } = useHTTP();
   // const [tabs, setTabs] = useState([]);
   // const [sliders, setSliders] = useState([]);
   // const [categorizedPlaces, setCategorizedPlaces] = useState({});
   const { sliders, tabs, categorizedPlaces } = props;
   const dispatch = useDispatch();
   // useEffect(() => {
   //    fetchTabsData();
   //    fetchSliders();
   // }, []);

   // const fetchTabsData = () => {
   //    sendRequest(
   //       {
   //          url: 'http://18.133.139.168/api/v1/front/categories',
   //       }, (categoriesData: any) => {
   //          categoriesData.data.unshift({ name: 'all', id: 0, icon: '' });
   //          setTabs(categoriesData.data);
   //          // const categorizedPlaces: CategorizedPlaces = {}; // Initialize as the defined interface
   //          categoriesData.data.map(async (category: any) => {
   //             sendRequest(
   //                {
   //                   url: `http://18.133.139.168/api/v1/front/places?category_id=${category.id}`
   //                },
   //                (categoryPlacesData: any) => {
   //                   setCategorizedPlaces({ ...categorizedPlaces, [category.name]: categoryPlacesData.data });
   //                   // categorizedPlaces[category.name] = categoryPlacesData.data;
   //                },
   //                (err: any) => console.log(err)
   //             )
   //          })
   //       },
   //       (err: any) => console.log(err)
   //    )

   // }

   // const fetchSliders = () => {
   //    sendRequest(
   //       {
   //          url: 'http://18.133.139.168/api/v1/front/sliders'
   //       },
   //       (slidersData: any) => {
   //          setSliders(slidersData.data);
   //       }
   //    )
   // }
   return (
      <>
         <Head>
            <title>Tripty - Home</title>
         </Head>

         <HomeSlider sliders={sliders} />

         <HomeEntryPoints />

         <HomeTabs showTitle tabs={tabs} categorizedPlaces={categorizedPlaces} />

         <PlaceHeader onClick={() => { dispatch(tripActions.openShowTripModal()) }}>
            <h2><Translate id='headings.startYour' /></h2>
            <h2><Translate id='headings.trip' /></h2>
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

export async function getStaticProps({ locale }: any) {
   const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

   try {
      const categoriesReq = await fetch(`${baseUrl}categories?change_language=${locale}`);
      const categoriesData = await categoriesReq.json();
      categoriesData.data.unshift({ name: 'all', id: 0, icon: '' });

      const slidersReq = await fetch(`${baseUrl}sliders?change_language=${locale}`);
      const slidersData = await slidersReq.json();

      const categorizedPlaces: CategorizedPlaces = {}; // Initialize as the defined interface

      await Promise.all(categoriesData.data.map(async (category: any) => {
         const categoryPlacesReq = await fetch(`${baseUrl}places?change_language=${locale}&category_id=${category.id}`);
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