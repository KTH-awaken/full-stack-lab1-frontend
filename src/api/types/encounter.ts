export interface ObservationApi {
    id: number;
    patientId: number;
    encounterId: number;
    content: string;
}

export interface EncounterApi {
    id: number;
    title: string;
    patientId: number;
    doctorId: number;
    observations: ObservationApi[];
    date: string;
    details: string;
}
