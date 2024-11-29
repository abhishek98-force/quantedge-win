export interface Strategy {
  id?: number; // Optional because it can be null
  strategy_name: string;
  description: string;
  whenToUse: string;
  nakedPutsDelta: string;
  pdsLongPutDelta: string;
  pdsWidth: string;
  pdsNPRCostRatio: string;
  technicalIndicators: string;
  created_at: Date; // Use Date for datetime fields
}
