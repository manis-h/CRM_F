import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const apiQurey = createApi({
  reducerPath: 'apiQurey',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/",
    // 'https://crm-backend-wui1.onrender.com/api/leads'
    // credentials:"include"

   }),
  endpoints: (builder) => ({
    // GET request to fetch a Pokemon by name
    // getPokemonByName: builder.query({
    //   query: (name) => `pokemon/${name}`,
    // }),

    // POST request to send data (this should use builder.mutation)
    loginUser: builder.mutation({
      query: (user) => ({

        url: '/employees/login',
        method: 'POST',
        body: user,
      }),
    }),
    
  }),
});

// Export hooks for usage in functional components
// Note: Mutations use `useMutation`, not `useQuery`
export const {  useLoginUserMutation } = apiQurey;