export interface ObservationApi {
    id: number;
    patient: {
        name:string,
        id:number
    };
    doctor: {
        name:string,
        id:number
    };
    content: string;
}

export interface EncounterApi {
    id: number;
    title: string;
    patient: {
        name:string,
        id:number
    };
    doctor: {
        name:string,
        id:number
    };
    observations: ObservationApi[];
    date: string;
    details: string;
}
