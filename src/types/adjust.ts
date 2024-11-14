export interface AdjustData {
    ywatch?: number;
    ylike?: number;
    ysub?: number;
    join?: number;
    fee?: number;
    token?: number;
    mtask?: number;
    mchild?: number;
    mcreate?: number;
    Account?: string;
    balance?: number;
    wallet?: number;
  }
  
  export interface InputField {
    id: keyof AdjustData;
    label: string;
    type: "text" | "number";
  }