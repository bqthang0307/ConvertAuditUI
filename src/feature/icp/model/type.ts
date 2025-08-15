export type IcpStep1 = {
  mainGoal: string;
  targetCustomer: string;
};

export type IcpStep2 = {
  painPoint: string;
  uniqueValue: string;
};

export type IcpStep3 = {
  email: string;
  landingUrl: string;
};

export type IcpPayload = IcpStep1 & IcpStep2 & IcpStep3;
