import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'universal-cookie';
const cookies = new Cookies()

// Define a service using a base URL and expected endpoints
export const leadsApi = createApi({
  reducerPath: 'leadsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
    // baseUrl: "http://192.168.0.119:3000/api/",
    // 'https://crm-backend-wui1.onrender.com/api/leads'

    credentials:"include",
    prepareHeaders: (headers, { getState }) => {   

      return headers;
    },

  }),
  tagTypes: ["leadProfile","rejectedLeads","holdLeads","logs"],
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
      invalidatesTags: ["leadProfile"]
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
      query: ({id,reason}) => ({

        url: `leads/hold/${id}`,
        method: 'PATCH',
        body:{reason}
      }),
      invalidatesTags:["leadProfile",'logs']
    }),
    rejectLead: builder.mutation({
      query: ({id,reason}) => ({

        url: `leads/reject/${id}`,
        method: 'PATCH',
        body:{reason}
      }),
      invalidatesTags:["leadProfile",'logs']
    }),
    unholdLead: builder.mutation({
      query: (id) => ({

        url: `leads/unhold/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags:["leadProfile","logs"]
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
      invalidatesTags:["leadProfile"]
    }),
    getEmailOtp: builder.mutation({
      query: (id) => ({

        url: `verify/email/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags:["leadProfile"]
    }),
    verifyEmailOtp: builder.mutation({
      query: ({id,data}) => ({

        url: `verify/email-otp/${id}`,
        method: 'PATCH',
        body:{otp:data}
      }),
      invalidatesTags:["leadProfile"]
    }),
    verifyAadhaarOtp: builder.mutation({
      query: ({id,trx_id,otp}) => ({

        url: `verify/aadhaar-otp/?id=${id}&trx_id=${trx_id}`,
        method: 'POST',
        body:{otp}
      }),
      invalidatesTags:["leadProfile"]
    }),
    verifyAadhaar: builder.mutation({
      query: ({id,details}) => ({

        url: `verify/aadhaar/${id}`,
        method: 'POST',
        body:{details}
      }),
      invalidatesTags:["leadProfile"]
    }),
    verifyPan: builder.mutation({
      query: ({id,data}) => ({

        url: `verify/pan/${id}`,
        method: 'POST',
        body:{data}
      }),
      invalidatesTags:["leadProfile"]
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
      providesTags: ["leadProfile"]
    }),
    getLeadDocs: builder.query({
      query: (data) => `/leads/docs/${data.id}/?docType=${data.docType}`,
    }),
    getInternalDedupe: builder.query({
      query: (id) => `/leads/old-history/${id}`,
      providesTags:['holdLeads','rejectedLeads']
    }),
    applicationLogs: builder.query({
      query: (id) => `/leads/viewleadlog/${id}`,
      providesTags:["logs"]
    }),
    fetchAllHoldLeads: builder.query({
      query: () => `/leads/hold`,
      providesTags:["holdLeads"]
    }),
    fetchAllRejectedLeads: builder.query({
      query: () => `/leads/reject`,
      providesTags:["rejectedLeads"]
    }),
    fetchCibilScore: builder.query({
      query: (id) => `verify/equifax/${id}`,
      // providesTags:["rejectedLeads"]
    }),
    aadhaarOtp: builder.query({
      query: (id) => `verify/aadhaar/${id}`,
      // providesTags:["leadProfile"]
    }),
    getPanDetails: builder.query({
      query: (id) => `verify/pan/${id}`,
      // providesTags:["leadProfile"]
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
  useLazyGetLeadDocsQuery,
  useGetInternalDedupeQuery,
  useApplicationLogsQuery,
  useBulkUploadMutation,
  useHoldLeadMutation,
  useFetchAllHoldLeadsQuery,
  useUnholdLeadMutation,
  useApproveLeadMutation,
  useGetEmailOtpMutation,
  useVerifyEmailOtpMutation,
  useLazyAadhaarOtpQuery,
  useVerifyPanMutation,
  useVerifyAadhaarOtpMutation,
  useVerifyAadhaarMutation,
  useLazyGetPanDetailsQuery,  
  useRejectLeadMutation,
  useLazyFetchCibilScoreQuery,
  useFetchAllRejectedLeadsQuery,
} = leadsApi;
