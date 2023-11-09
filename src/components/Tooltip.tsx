import { ReactNode } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"


interface Props {
    children: ReactNode,
    desciption: string
}
const CustomTooltip = ({ children, desciption }: Props) => {
    return (
        <Tooltip>
            <TooltipTrigger className='px-2 py-1 box-content cursor-pointer' asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent>
                <p>{desciption}</p>
            </TooltipContent>
        </Tooltip>

    )
}

export default CustomTooltip