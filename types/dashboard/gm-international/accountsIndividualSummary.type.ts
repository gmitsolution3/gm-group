export interface AccountHolder {
  email: string;
  phone: string;
  userRole: string;
  branchName: string | null;
}

export interface StudentAccount {
  _id: string;
  name: string;
  userEmail: string;
  degree: string;
  university: string;
  intake: string;
  totalAmount: number;
  advance: number;
  due: number;
  createdAt: string;
  updatedAt?: string;
  missingDocuments: string[];
  accountHolder?: AccountHolder;
}

export interface MedicalAccount {
  _id: string;
  name: string;
  hospitalName: string;
  countryName: string;
  patientAge: number;
  patientPhone: string;
  patientDisease: string;
  flyingDate: string;
  totalAmount: number;
  advance: number;
  due: number;
  createdAt: string;
  updatedAt?: string;
  accountHolder?: AccountHolder;
}

export interface TouristAccount {
  _id: string;
  clientName: string;
  gender: string;
  numberOfGuests: number;
  clientPhone: string;
  passportNumber: string;
  destinationCountry: string;
  duration: string;
  flyingDate: string;
  coverageAreas: string[];
  totalAmount: number;
  advance: number;
  due: number;
  createdAt: string;
  accountHolder?: AccountHolder;
}

export interface BusinessAccount {
  _id: string;
  clientName: string;
  clientPhone: string;
  gender: string;
  passportNumber: string;
  officeLocation: string;
  country: string;
  totalAmount: number;
  advance: number;
  remarks: string;
  due: number;
  createdAt: string;
  updatedAt?: string;
  accountHolder?: AccountHolder;
}

export interface VisaAccount {
  _id: string;
  clientName: string;
  clientPhone: string;
  passportNumber: string;
  dateOfBirth: string;
  country: string;
  totalAmount: number;
  advance: number;
  due: number;
  createdAt: string;
  accountHolder?: AccountHolder;
}

export interface AccountServiceResponse<T> {
  success: boolean;
  data?: {
    success: boolean;
    message: string;
    data: {
      result: T[];
      adminHolder?: AccountHolder;
      adminAccount?: AccountHolder;
    };
  };
  error?: string;
}

export interface AccountsIndividualSummary {
  student: AccountServiceResponse<StudentAccount>;
  medical: AccountServiceResponse<MedicalAccount>;
  tourist: AccountServiceResponse<TouristAccount>;
  business: AccountServiceResponse<BusinessAccount>;
  visa: AccountServiceResponse<VisaAccount>;
}