import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Card } from "./ui/card"

interface Props {
    title: string,
    details: string,
}
const Explandable = ({ details, title }: Props) => {
    return (

        // <AccordionItem value={title} className="border mb-2 px-3 data-[state=open]:border-l-8 data-[state=open]:border-main" >
        //     <AccordionTrigger className="hover:no-underline">{title}</AccordionTrigger>
        //     <AccordionContent>{details}</AccordionContent>
        // </AccordionItem>

        <Card className="mb-3 ">
            <AccordionItem value={title} className=" border-b-0 data-[state=open]:border-l-8 border-primary px-5 py-2 rounded-2xl bg-background" >
                <AccordionTrigger className="hover:no-underline">{title}</AccordionTrigger>
                <AccordionContent>{details}</AccordionContent>
            </AccordionItem>
        </Card>

    )
}

export default Explandable