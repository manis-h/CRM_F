import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'universal-cookie';
const cookies = new Cookies()

// Define a service using a base URL and expected endpoints
export const apiQurey = createApi({
  reducerPath: 'apiQurey',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/",
    // 'https://crm-backend-wui1.onrender.com/api/leads'

    // credentials:"include"
    prepareHeaders: (headers, { getState }) => {
      const token = cookies.get('authToken');

      console.log('outh token',token)

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },

   }),
  endpoints: (builder) => ({
    // GET request to fetch a Pokemon by name
    getEmployees: builder.query({
      query: () => `employees/me`,
    }),
//
    allocateLead: builder.mutation({
      query: (id) => ({

        url: `leads/${id}`,
        method: 'PATCH',
      }),
    }),
    uploadDocuments: builder.mutation({
      query: ({id,docsData}) =>{ 
        console.log('data',id,docsData)
       return ({

        url: `leads/docs/${id}`,
        method: 'PATCH',
        body:docsData
      })},
    }),

    // POST request to send data (this should use builder.mutation)
    loginUser: builder.mutation({
      query: (user) => ({

        url: 'employees/login',
        method: 'POST',
        body: user,
      }),
    }),

    addEmployee: builder.mutation({
      query: (user) => ({

        url: 'employees/register',
        method: 'POST',
        body: user,
      }),
    }),

    fetchAllEmployee: builder.query({
      query: () => '/employees',
    }),
    fetchAllocatedLeads: builder.query({
      query: ({page,limit}) => `/leads/allocated/?page=${page}&limit=${limit}`,
    }),
    fetchAllLeads: builder.query({
      query: ({page,limit}) => `/leads/?page=${page}&limit=${limit}`,
    }),
    fetchSingleLead: builder.query({
      query: (id) => `/leads/${id}`,
    }),
    getLeadDocs: builder.query({
      query: (data) => `/leads/docs/${data.id}/?docType=${data.docType}`,
    }),
    getInternalDedupe: builder.query({
      query: (id) => `/leads/old-history/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components
// Note: Mutations use `useMutation`, not `useQuery`
export const {  
  useLoginUserMutation,
  useGetEmployeesQuery, 
  useAllocateLeadMutation,
  useAddEmployeeMutation,
  useFetchAllEmployeeQuery,
  useFetchAllocatedLeadsQuery,
  useFetchAllLeadsQuery,
  useFetchSingleLeadQuery,
  useUploadDocumentsMutation,
  useGetLeadDocsQuery,
  useGetInternalDedupeQuery,
} = apiQurey;
