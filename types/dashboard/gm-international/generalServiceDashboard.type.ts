export type TrendItem = {
  _id: {
    year: number;
    month: number;
  };
  count: number;
};

export type StudentDashboard = {
  documentCount: {
    totalApplications: number;
    totalApproved: number;
    totalPending: number;
    totalRejected: number;
  };

  paymentStats: {
    pending: number;
    paid: number;
    failed: number;
  };

  recentApplications: {
    _id: string;
    applicantId: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    university: string;
    paymentStatus: string;
    applicationStatus: string;
    submittedAt: string;
  }[];

  topUniversities: {
    _id: string;
    count: number;
  }[];

  monthlyTrend: TrendItem[];
};

export type MedicalDashboard = {
  documentCount: {
    totalApplications: number;
    totalApproved: number;
    totalPending: number;
    totalRejected: number;
    totalHospitals: number;
  };

  paymentStats: {
    pending: number;
    paid: number;
    delivered: number;
    failed: number;
  };

  recentApplications: {
    _id: string;
    hospital_name: string;
    patientName: string;
    patient_disease: string;
    email: string;
    createdAt: string;
    paymentStatus: string;
    appointmentStatus: string;
  }[];

  topHospitals: {
    _id: string;
    count: number;
  }[];

  monthlyTrend: TrendItem[];
};

export type TouristDashboard = {
  documentCount: {
    totalBookings: number;
    totalApproved: number;
    totalPending: number;
    totalInternationalBookings: number;
    totalDomesticBookings: number;
    totalTourPackages: number;
    totalCustomPackage: number;
  };

  paymentStats: Record<string, number>;

  internationalVsDomestic: {
    international: number;
    domestic: number;
    internationalRevenue: number;
    domesticRevenue: number;
  };

  recentBookings: {
    _id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    createdAt: string;
    packageInfo: {
      title: string;
      thumbnail: string;
      packageName: string;
    };
    location: {
      country: string;
      destinationPlace: string;
      subDestination: string;
    };
    totalCost: string;
  }[];

  topPackages: {
    _id: string;
    count: number;
  }[];

  monthlyTrend: TrendItem[];
};

export type BusinessDashboard = {
  documentCount: {
    totalCompanies: number;
    totalBusinessApplications: number;
    totalBusinessDeals: number;
    totalBusinessPackages: number;

    applications: {
      approved: number;
      pending: number;
      rejected: number;
    };

    deals: {
      approved: number;
      pending: number;
    };
  };

  recentApplications: {
    _id: string;
    country: string;
    companyName: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    createdAt: string;
    paymentStatus: string;
    applicationStatus: string;
  }[];

  recentDeals: {
    _id: string;
    f_name: string;
    c_name: string;
    c_email: string;
    serviceTitle: string;
    createdAt: string;
    applicationStatus: string;
  }[];

  topCountries: {
    _id: string;
    count: number;
  }[];

  monthlyTrendApplications: TrendItem[];
  monthlyTrendDeals: TrendItem[];

  summary: {
    totalBusinessActivity: number;
  };
};

/*
 * Student / medical / tourist have an extra response wrapper:
 *
 * service
 *   └── data
 *       ├── success
 *       └── data
 *           └── actual dashboard
 *
 * Business is different:
 *
 * business
 *   └── data
 *       └── actual dashboard
 */
export type NestedServiceResponse<T> = {
  success: boolean;
  data: T | null;
} | null;

export type BusinessServiceResponse = {
  success: boolean;
  data: BusinessDashboard | null;
} | null;

export type GeneralDashboardResponse = {
  success: boolean;
  message: string;

  data: {
    student?: NestedServiceResponse<StudentDashboard>;
    medical?: NestedServiceResponse<MedicalDashboard>;
    tourist?: NestedServiceResponse<TouristDashboard>;
    business?: BusinessServiceResponse;
  } | null;
};
