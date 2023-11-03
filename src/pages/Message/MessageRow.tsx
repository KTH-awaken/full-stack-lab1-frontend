
interface Props { self: boolean, content: string }

export const MessageRow = ({ self, content }: Props) => {
    return (
        <p className={`text-sm font-light w-fit inline-block max-w-[60%]  px-4 py-2 rounded-2xl leading-6 
            ${self ? "bg-primary text-white self-end" : "bg-accent"}`}>
            {content}
        </p>
    )
}
