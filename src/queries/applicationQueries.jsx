import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'universal-cookie';
const cookies = new Cookies()

// Define a service using a base URL and expected endpoints
export const applicationApi = createApi({
  reducerPath: 'applicationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api", 
    // baseUrl: "http://192.168.0.119:3000/api", 
    // 'https://crm-backend-wui1.onrender.com/api/leads'

    credentials:"include",
    prepareHeaders: (headers, { getState }) => {
     

      return headers;
    },

  }),
  tagTypes: ["getApplication","getProfile","bankDetails","applicantDetails"],
  endpoints: (builder) => ({
    // GET request to fetch a Pokemon by name

    holdApplication: builder.mutation({
      query: ({id,reason}) => ({

        url: `applications/hold/${id}`,
        method: 'PATCH',
        body:{reason}
      }),
      invalidatesTags:["getProfile"]
    }),
    rejectApplication: builder.mutation({
      query: ({id,reason}) => ({

        url: `applications/reject/${id}`,
        method: 'PATCH',
        body:{reason}
      }),
      invalidatesTags:["getProfile","getApplication"]
    }),
    unholdApplication: builder.mutation({
      query: ({id,reason}) => ({

        url: `applications/unhold/${id}`,
        method: 'PATCH',
        body:{reason}
      }),
      invalidatesTags:["getProfile"]
    }),
    sendBack: builder.mutation({
      query: ({id,reason,sendTo}) => ({

        url: `applications/sent-back/${id}`,
        method: 'PATCH',
        body:{sendTo,reason}
      }),
      invalidatesTags:["getApplication"]
    }),
    recommendApplication: builder.mutation({
      query: (id) => ({

        url: `applications/recommend/${id}`,
        method: 'PATCH',
      }),
    }),

    // addEmployee: builder.mutation({
    //   query: (data) => ({

    //     url: 'employees/register',
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),
    allocateApplication: builder.mutation({
      query: (id) => ({

        url: `/applications/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags:["getApplication"]
    }),
    addBank: builder.mutation({
      query: ({id,data}) => ({

        url: `/applicant/bankDetails/${id}`,
        method: 'POST',
        body:data
      }),
      invalidatesTags:["getApplication","bankDetails"]
    }),
    updatePersonalDetails: builder.mutation({
      query: ({id,updates}) => ({

        url: `/applicant/${id}`,
        method: 'PATCH',
        body:updates
      }),
      invalidatesTags:["getApplication","applicantDetails"]
    }),

   
 
    fetchAllApplication: builder.query({
      query: ({ page, limit }) => `/applications/?page=${page}&limit=${limit}`,
      providesTags:["getApplication"]
    }),
    fetchAllocatedApplication: builder.query({
      query: ({page,limit}) => `/applications/allocated/?page=${page}&limit=${limit}`,
      providesTags: ["getApplication"]
    }),
    
    fetchSingleApplication: builder.query({
      query: (id) => `/applications/${id}`,
      providesTags: ["getProfile"]
    }),
    applicantPersonalDetails: builder.query({
      query: (id) => `/applicant/${id}`,
      providesTags: ["applicantDetails"]
    }),
    getBankDetails: builder.query({
      query: (id) => `/applicant/bankDetails/${id}`,
      providesTags:['bankDetails']
    }),
    allHoldApplication: builder.query({
      query: () => `/applications/hold`,
      providesTags: ["applicationHeld"]
    }),
   
    // getLeadDocs: builder.query({
    //   query: (data) => `/leads/docs/${data.id}/?docType=${data.docType}`,
    // }),
    // getInternalDedupe: builder.query({
    //   query: (id) => `/leads/old-history/${id}`,
    // }),
    // applicationHistory: builder.query({
    //   query: (id) => `/leads/viewleadlog/${id}`,
    // }),
    // fetchAllgetApplication: builder.query({
    //   query: () => `/leads/hold`,
    //   providesTags:["getApplication"]
    // }),
    getRejectedApplications: builder.query({
      query: () => `/applications/rejected`,
      providesTags:["getApplication"]
    }),
    
  }),
});
export const {
    useFetchAllApplicationQuery,
    useAllocateApplicationMutation,
    useHoldApplicationMutation,
    useRejectApplicationMutation,
    useUnholdApplicationMutation,
    useRecommendApplicationMutation,
    useAddBankMutation,
    useSendBackMutation,
    useUpdatePersonalDetailsMutation,
    useGetBankDetailsQuery,
    useFetchAllocatedApplicationQuery,
    useFetchSingleApplicationQuery,
    useApplicantPersonalDetailsQuery,
    useAllHoldApplicationQuery,
    useGetRejectedApplicationsQuery,

  
} = applicationApi;
