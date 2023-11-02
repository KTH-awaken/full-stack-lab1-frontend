import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

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

        <AccordionItem value={title} className=" border-b-0 mb-3 data-[state=open]:border-l-8 border-primary px-5 py-2 rounded-2xl bg-white" >
            <AccordionTrigger className="hover:no-underline">{title}</AccordionTrigger>
            <AccordionContent>{details}</AccordionContent>
        </AccordionItem>
    )
}

export default Explandable