import { EncounterApi, ObservationApi } from "../../api/types/encounter"
import { AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"
import { Card } from "../../components/ui/card"
import { uid } from "../../helpers/helpers"


const EncounterRow = ({ encounter }: { encounter: EncounterApi }) => {
    return (

        <Card className="mb-3 ">
            <AccordionItem value={encounter.title} className=" border-b-0 data-[state=open]:border-l-8 border-primary px-5 py-2 rounded-2xl bg-background" >
                <AccordionTrigger className="hover:no-underline">
                    <p>{encounter.title}</p>
                </AccordionTrigger>
                <AccordionContent >
                    <div className="flex flex-col gap-3">
                        <div>
                            <p className="font-semibold text-foreground/50 mb-1">Details</p>
                            <p>{encounter.details}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-foreground/50 mb-1">Time</p>
                            <p>{encounter.date}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-foreground/50 mb-1">Doctor</p>
                            <p>{encounter.doctor.name}</p>
                        </div>
                        <div>

                            <p className="font-semibold text-foreground/50 mb-1">Observations</p>
                            <ul>
                                {encounter.observations.map((o: ObservationApi) => <div key={o.id} className="flex gap-2 items-center mb-1 pl-2">
                                    <span className="w-2 h-2 block rounded-full bg-primary/80"></span>
                                    <li key={uid()}>{o.content}</li>
                                </div>)}
                            </ul>
                        </div>
                    </div>




                    {/* <Button className="bg-primary/10 hover:bg-primary/20  text-primary/80">More details</Button> */}

                </AccordionContent>
            </AccordionItem>
        </Card>

    )
}

export default EncounterRow
