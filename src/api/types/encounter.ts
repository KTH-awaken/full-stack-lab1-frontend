import { AccountVm } from "./user";



export interface EncounterApi {
    id: number;
    patient: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    };
    doctor: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    };
    title: string;
    description: string;
    date: string;
    observations: ObservationApi[];
}
export interface EncounterDetailsApi {
    id: number;
    doctor: AccountVm;
    patient: AccountVm;
    title: string;
    description: string;
    date: string;
    timestamp: string;
    observations: ObservationApi[];
}

export interface ObservationApi {
    id: string;
    description: string;
    date: string;
}