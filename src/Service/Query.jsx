import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'universal-cookie';
const cookies = new Cookies()

// Define a service using a base URL and expected endpoints
export const leadsApi = createApi({
  reducerPath: 'leadsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
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
    uploadDocuments: builder.mutation({
      query: ({ id, docsData }) => ({

        url: `leads/docs/${id}`,
        method: 'PATCH',
        body: docsData
      }),
      invalidatesTags: ["getDocs"]
    }),

    // POST request to send data (this should use builder.mutation)
    loginUser: builder.mutation({
      query: (data) => ({

        url: 'employees/login',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'employees/logout',
        method: 'POST',       
      }),
    }),
    bulkUpload: builder.mutation({
      query: (data) => ({

        url: 'leads/bulk-upload',
        method: 'POST',
        body: data,
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

    fetchAllEmployee: builder.query({
      query: () => 'employees',
    }),
    fetchAllocatedLeads: builder.query({
      query: ({ page, limit }) => `/leads/allocated/?page=${page}&limit=${limit}`,
    }),
    fetchAllLeads: builder.query({
      query: ({ page, limit }) => `/leads/?page=${page}&limit=${limit}`,
    }),
    fetchSingleLead: builder.query({
      query: (id) => `/leads/${id}`,
      providesTags: ["getDocs"]
    }),
    getLeadDocs: builder.query({
      query: (data) => `/leads/docs/${data.id}/?docType=${data.docType}`,
    }),
    getInternalDedupe: builder.query({
      query: (id) => `/leads/old-history/${id}`,
    }),
    applicationHistory: builder.query({
      query: (id) => `/leads/viewleadlog/${id}`,
    }),
    fetchAllHoldLeads: builder.query({
      query: () => `/leads/hold`,
      providesTags:["holdLeads"]
    }),
    fetchAllRejectedLeads: builder.query({
      query: () => `/leads/reject`,
      providesTags:["rejectedLeads"]
    }),
    
  }),
});

// Export hooks for usage in functional components
// Note: Mutations use `useMutation`, not `useQuery`
export const {
  useLoginUserMutation,
  useLogoutMutation,
  useGetEmployeesQuery,
  useAllocateLeadMutation,
  useAddEmployeeMutation,
  useFetchAllEmployeeQuery,
  useFetchAllocatedLeadsQuery,
  useFetchAllLeadsQuery,
  useFetchSingleLeadQuery,
  useUploadDocumentsMutation,
  useUpdateLeadMutation,
  useGetLeadDocsQuery,
  useGetInternalDedupeQuery,
  useApplicationHistoryQuery,
  useBulkUploadMutation,
  useHoldLeadMutation,
  useFetchAllHoldLeadsQuery,
  useUnholdLeadMutation,
  useApproveLeadMutation,
  useRejectLeadMutation,
  useFetchAllRejectedLeadsQuery,
} = leadsApi;
