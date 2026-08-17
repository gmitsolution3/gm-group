export type DashboardSummary = {
  documentCount: {
    totalBookings: number;

    applications: {
      pending: number;
      approved: number;
      rejected: number;
    };

    payment: {
      pending: number;
      partial: number;
      paid: number;
    };
  };

  genderStats: {
    gender: string;
    count: number;
  }[];

  recentBookings: {
    _id: string;

    applicantInfo: {
      fullName: string;
      gender: string;
      phone: string;
      email: string;
    };

    travelInfo: {
      packageType: string;
    };

    payment: {
      paymentStatus: string;
    };

    pkgInfo: {
      pkgName: string;
    };

    createdAt: string;
    applicationStatus: string;
  }[];

  topPackages: {
    _id: string;
    count: number;
    totalRevenue: number;
  }[];

  monthlyTrend: {
    _id: {
      year: number;
      month: number;
    };
    count: number;
  }[];

  summary: {
    totalRevenue: number;
  };
};
