import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

interface Props {
    title: string,
    details: string,
}
const Explandable = ({ details, title }: Props) => {
    return (

        <AccordionItem value={title} className="border mb-2 px-3 data-[state=open]:border-l-8 data-[state=open]:border-main" >
            <AccordionTrigger className="hover:no-underline">{title}</AccordionTrigger>
            <AccordionContent>
                {details}
            </AccordionContent>
        </AccordionItem>
    )
}

export default Explandable