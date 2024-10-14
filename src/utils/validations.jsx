import * as Yup from 'yup';



export const residenceSchema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    pincode: Yup.string().matches(/^[0-9]{6}$/, 'Invalid pincode (must be 6 digits)').required('Pincode is required'),
    residingSince: Yup.string().required('Residence Since is required'),
    unit: Yup.string().required('Unit is required'),
  });
 
  export const employmentSchema = Yup.object().shape({
    companyName: Yup.string()
      .required('Company name is required')
      .min(2, 'Company name must be at least 2 characters long')
      .max(100, 'Company name cannot exceed 100 characters'),
  
    companyAddress: Yup.string()
      .required('Company address is required')
      .min(5, 'Company address must be at least 5 characters long')
      .max(255, 'Company address cannot exceed 255 characters'),
  
    state: Yup.string()
      .required('State is required')
      .min(2, 'State must be at least 2 characters long'),
  
    city: Yup.string()
      .required('City is required')
      .min(2, 'City must be at least 2 characters long'),
  
    pincode: Yup.string()
      .required('Pincode is required')
      .matches(/^\d{6}$/, 'Pincode must be exactly 6 digits'),
  
    department: Yup.string()
      .required('Department is required')
      .min(2, 'Department must be at least 2 characters long')
      .max(100, 'Department cannot exceed 100 characters'),
  
    designation: Yup.string()
      .required('Designation is required')
      .min(2, 'Designation must be at least 2 characters long')
      .max(100, 'Designation cannot exceed 100 characters'),
  
    employedSince: Yup.date()
      .required('Employment start date is required')
      .max(new Date(), 'Employment start date cannot be in the future'),
  });
  