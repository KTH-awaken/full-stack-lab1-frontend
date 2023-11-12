import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command";
import { uid } from "../helpers/helpers";
import { cn } from "../lib/lib";

type SelectPopoverProps = {
    title:string
    className?:string,
    list: {
        label: string,
        value: string
    }[],
    value: string;
    onValueChange: (newValue: string) => void;
}

 const SelectPopover = ({ title, className, list, value, onValueChange }: SelectPopoverProps) => {
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={"justify-between "+ className}
                >
                    {value
                        ? list.find((data) => data.value == value)?.label
                        : `Select ${title}...`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 " />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={`Search ${title}...`} />
                    <CommandEmpty>No {title} found.</CommandEmpty>
                    <CommandGroup>
                        {list.map((data) => (
                            <CommandItem
                                key={uid()}
                                value={data.value}
                                onSelect={(currentValue) => {
                                    onValueChange(currentValue === value ? "" : currentValue);
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === data.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {data.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default SelectPopover