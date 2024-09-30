import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'universal-cookie';
const cookies = new Cookies()

// Define a service using a base URL and expected endpoints
export const applicationApi = createApi({
  reducerPath: 'applicationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/applications",
    // 'https://crm-backend-wui1.onrender.com/api/leads'

    credentials:"include",
    prepareHeaders: (headers, { getState }) => {
     

      return headers;
    },

  }),
  tagTypes: ["getDocs","rejectedLeads","holdLeads"],
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
  

   
    holdLead: builder.mutation({
      query: (id) => ({

        url: `leads/hold/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags:["holdLeads"]
    }),
    rejectLead: builder.mutation({
      query: (id) => ({

        url: `leads/reject/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags:["rejectedLeads"]
    }),
    unholdLead: builder.mutation({
      query: (id) => ({

        url: `leads/unhold/${id}`,
        method: 'PATCH',
      }),
    }),
    approveLead: builder.mutation({
      query: (id) => ({

        url: `leads/approve/${id}`,
        method: 'PATCH',
      }),
    }),

    addEmployee: builder.mutation({
      query: (data) => ({

        url: 'employees/register',
        method: 'POST',
        body: data,
      }),
    }),
    updateLead: builder.mutation({
      query: ({id,formData}) => ({

        url: `leads/update/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags:["getDocs"]
    }),

   
 
    fetchAllApplication: builder.query({
      query: ({ page, limit }) => `/?page=${page}&limit=${limit}`,
    }),
    // fetchSingleLead: builder.query({
    //   query: (id) => `/leads/${id}`,
    //   providesTags: ["getDocs"]
    // }),
    // getLeadDocs: builder.query({
    //   query: (data) => `/leads/docs/${data.id}/?docType=${data.docType}`,
    // }),
    // getInternalDedupe: builder.query({
    //   query: (id) => `/leads/old-history/${id}`,
    // }),
    // applicationHistory: builder.query({
    //   query: (id) => `/leads/viewleadlog/${id}`,
    // }),
    // fetchAllHoldLeads: builder.query({
    //   query: () => `/leads/hold`,
    //   providesTags:["holdLeads"]
    // }),
    // fetchAllRejectedLeads: builder.query({
    //   query: () => `/leads/reject`,
    //   providesTags:["rejectedLeads"]
    // }),
    
  }),
});
export const {
  
} = applicationApi;
