import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// const options = {
//     method: 'GET',
//     url: 'https://shazam-core.p.rapidapi.com/v1/charts/world',
//     headers: {
//         'X-RapidAPI-Key': process.env.VITE_SHAZAM_CORE_RAPID_API_KEY,
//         'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
//     }
// };

// axios.request(options).then(function (response) {
//     console.log(response.data);
// }).catch(function (error) {
//     console.error(error);
// });




export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '22c28848cbmshd3eb5b8862d6f8dp1a663bjsn2bdd94b38d55')
            return headers
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/world' }),
    })
});


export const { useGetTopChartsQuery } = shazamCoreApi;