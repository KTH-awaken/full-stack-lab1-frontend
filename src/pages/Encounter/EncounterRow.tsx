import { NavLink } from "react-router-dom"
import { EncounterApi } from "../../api/types/encounter"
import { AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"
import { Card } from "../../components/ui/card"
import { ArrowRightCircle } from "lucide-react"
import { Button } from "../../components/ui/button"


const EncounterRow = ({ encounter, className }: { encounter: EncounterApi, className?: string }) => {
    return (


        <Card className={`mb-3`}>
            <AccordionItem value={encounter.title} className={`border-b-0 data-[state=open]:border-l-8 border-primary px-5 py-2 rounded-2xl bg-background ${className}`} >
                <AccordionTrigger className="hover:no-underline">
                    <p>{encounter.title}</p>
                </AccordionTrigger>
                <AccordionContent >
                    <div className="flex flex-col gap-3">
                        <div>
                            <p className="font-semibold text-foreground/50 mb-1">Details</p>
                            <p>{encounter.description}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-foreground/50 mb-1">Date</p>
                            <p>{encounter.date.substring(0, 10)}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-foreground/50 mb-1">Time</p>
                            <p> {encounter.date.substring(11, 16)}</p>
                        </div>

                        <NavLink to={`/encounters/${encounter.id}`} >
                            <Button>More details <ArrowRightCircle className="ml-2 h-5"/></Button>
                        </NavLink>
                    </div>

                </AccordionContent>
            </AccordionItem>
        </Card>

    )
}

export default EncounterRow
