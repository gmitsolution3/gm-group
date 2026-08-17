export type AccountDashboardResponse = {
  success: boolean;
  message: string;

  data: {
    overview: {
      totalAmount: number;
      totalAdvance: number;
      totalDue: number;
    };

    serviceWise: {
      student: ServiceStats;
      medical: ServiceStats;
      tourist: ServiceStats;
      business: ServiceStats;
      visa: ServiceStats;
    };

    monthlyTrend: MonthlyTrend[];

    accountHolderStats: AccountHolderStats[];

    branchStats: BranchStats[];

    dueAnalysis: {
      totalDue: number;
      dueRatio: number;
    };

    missingDocsAnalysis: {
      totalMissingAccounts: number;
      documents: string[];
    };

    documentCount: {
      totalCounts: {
        totalRecords: number;
        student: number;
        medical: number;
        tourist: number;
        business: number;
        visa: number;
      };

      branchCounts: BranchCount[];

      accountHolderCounts: AccountHolderCount[];
    };
  };
};

export type ServiceStats = {
  total: number;
  advance: number;
  due: number;
};

export type MonthlyTrend = {
  month: string;
  total: number;
  advance: number;
  due: number;
};

export type AccountHolderStats = {
  email: string;
  total: number;
  advance: number;
  due: number;
};

export type BranchStats = {
  branch: string;
  total: number;
  advance: number;
  due: number;
};

export type BranchCount = {
  branch: string;
  count: number;
};

export type AccountHolderCount = {
  email: string;
  branch: string;
  count: number;
};