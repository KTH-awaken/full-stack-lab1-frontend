export interface PatientApi {
    id: number;
    mCondition: string;
    account: {
        id: number;
        email: string;
        receivedMessages: any[];
        sentMessages: any[];
        firstName: string;
        lastName: string;
        age: number;
        userType: string;
        password: string;
        type: string;
    };
}
