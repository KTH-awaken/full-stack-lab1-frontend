import Explandable from "../components/Explandable";
import {
    Accordion,

} from "../components/ui/accordion"

const DATA = [
    {
        title: "First Doctor Visit",
        details: "Visited the doctor for a routine checkup."
    },
    {
        title: "Second Doctor Visit",
        details: "Consulted a specialist for a specific health issue."
    },
    {
        title: "Emergency Room Visit",
        details: "Had to go to the ER due to an injury."
    },
    {
        title: "Dental Appointment",
        details: "Scheduled a dental checkup and cleaning."
    },
    {
        title: "Vaccination Appointment",
        details: "Received a COVID-19 vaccination."
    },
    {
        title: "Medical Test Results",
        details: "Received test results and discussed them with the doctor."
    },
    {
        title: "Prescription Refill",
        details: "Visited the doctor to get a prescription renewed."
    },
    {
        title: "Physical Therapy Session",
        details: "Attended a physical therapy session for rehabilitation."
    },
    {
        title: "Annual Health Checkup",
        details: "Went for the yearly comprehensive health checkup."
    },
    {
        title: "Pediatrician Visit",
        details: "Took a child to the pediatrician for a checkup."
    }
];



const Encounters = () => {


    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">My Encounters</h1>
            <Accordion type="single" collapsible>
                {DATA.map((row, index) => <Explandable key={index + "-" + row.title} title={row.title} details={row.details} />)}
            </Accordion>
        </div>
    )
}

export default Encounters