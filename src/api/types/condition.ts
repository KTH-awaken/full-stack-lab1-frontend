export interface ConditionApi {
    id: number;
    doctor: {
        name: string;
        id: number;
    };
    patient: {
        name: string;
        id: number;
    };
    diagnosis: string;
    timestamp: string;

}
