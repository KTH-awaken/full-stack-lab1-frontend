import { AccountVm } from "./user";


export interface ConditionApi {
    id: number
    timestamp: string
    diagnosis: string
    doctor: AccountVm
    patient: AccountVm
  }