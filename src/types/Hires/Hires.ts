export interface hireItemType {
  postId?: number | undefined;
  teamLogo: string | undefined;
  date: string | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
  city: string | undefined;
  region: string | undefined;
  groundName: string | undefined;
  position: string | undefined;
  ageGroup: string | undefined;
  teamMannerTemperature: number | undefined;
  hiredPlayerNumber?: number | undefined;
  hirePlayerNumber: number | undefined;
  teamName: string | undefined;
  teamCaptainName: string | undefined;
  detail: string | undefined;
}

export interface previousHiresInfo {
  prevHiredNumber?: number;
  prevDate?: string;
  prevStartTime?: string;
  prevEndTime?: string;
  prevCity?: string;
  prevRegion?: string;
  prevGroundName?: string;
  prevPosition?: string;
  prevAgeGroup?: string;
  prevDetail?: string;
  postId?: number;
}
