import { Terminal } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

type AlertType = 'Error' | 'Info' | 'Warning' | 'Success'
type Color = { type: AlertType, bgColor: string, textColor: string }
interface Props {
    message: string,
    title: AlertType
}


const colors: Color[] = [
    { type: 'Error', bgColor: 'bg-red-50', textColor: "text-red-800" },
    { type: 'Success', bgColor: 'bg-green-50', textColor: "text-green-800" },
    { type: 'Warning', bgColor: 'bg-orange-50', textColor: "text-orange-800" },
    { type: 'Info', bgColor: 'bg-blue-50', textColor: "text-blue-800" },

]

export const CustomAlert = ({ message, title }: Props) => {
    const color: Color = colors.find(e => e.type === title) ?? {} as Color;
    return (
        <Alert className={`${color.bgColor}`}>
            <Terminal className="h-4 w-4" />
            <AlertTitle className={`${color.textColor}`}>{title}</AlertTitle>
            <AlertDescription className={`${color.textColor}`}>
                {message}
            </AlertDescription>
        </Alert>
    )
}

export default CustomAlert