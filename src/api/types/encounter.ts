export interface ObservationApi {
    id:string;
    description: string;
    date: string;
}

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
