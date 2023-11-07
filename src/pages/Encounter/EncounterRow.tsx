import { ObservationApi } from "../../api/types/encounter"
import { AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"
import { Card } from "../../components/ui/card"
import { uid } from "../../helpers/helpers"

interface Props {
    title: string,
    details: string,
    observations: ObservationApi[]
}

const EncounterRow = ({ details, title, observations }: Props) => {
    return (

        <Card className="mb-3 ">
            <AccordionItem value={title} className=" border-b-0 data-[state=open]:border-l-8 border-primary px-5 py-2 rounded-2xl bg-background" >
                <AccordionTrigger className="hover:no-underline">{title}</AccordionTrigger>
                <AccordionContent>
                    <p className="font-semibold text-foreground/50 mb-1">Details</p>
                    <p>{details}</p>
                    <br />
                    <p className="font-semibold text-foreground/50 mb-1">Observations</p>
                    <ul>
                        {observations.map((o: ObservationApi) => <div key={o.id} className="flex gap-2 items-center mb-1 pl-2">
                            <span className="w-2 h-2 block rounded-full bg-primary/80"></span>
                            <li  key={uid()}>{o.content}</li>
                            </div>)}
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Card>

    )
}

export default EncounterRow
