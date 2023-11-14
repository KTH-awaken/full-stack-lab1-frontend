export interface ConditionApi {
    id: number;
    patient: {
        id: number;
        firstName: any;
        lastName: any;
        email: any;
    };
    doctor: {
        id: number;
        firstName: any;
        lastName: any;
        email: any;
    };
    timestamp: string;
    diagnosis: string;
}
