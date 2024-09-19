import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.0.115:4000/' }),
  endpoints: (builder) => ({
    // GET request to fetch a Pokemon by name
    // getPokemonByName: builder.query({
    //   query: (name) => `pokemon/${name}`,
    // }),

    // POST request to send data (this should use builder.mutation)
    loginUser: builder.mutation({
      query: (user) => ({

        url: 'login',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
// Note: Mutations use `useMutation`, not `useQuery`
export const {  usePostPokemonByNameMutation } = pokemonApi;
