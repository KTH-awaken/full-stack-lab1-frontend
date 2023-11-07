import { useParams } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Card } from "../../components/ui/card";


const Information = () => {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Information</h1>
            <div className="flex flex-col gap-2">
                <p><strong className="text-foreground/50 font-medium">Name: </strong> Hamada Aljarrah</p>
                <p><strong className="text-foreground/50 font-medium">Email: </strong> hamada@gmail.com</p>
                <p><strong className="text-foreground/50 font-medium">Conditions: </strong> 4 </p>
                <p><strong className="text-foreground/50 font-medium">Observations: </strong> 5</p>
            </div>
        </>

    )
}


const PatientDetails = () => {
    const params = useParams();

    return (

        <Card className="p-6">
            <Tabs defaultValue="info" >
                <TabsList className="mb-4 w-full justify-between">
                    <TabsTrigger className="w-1/3" value="info">Information</TabsTrigger>
                    <TabsTrigger className="w-1/3" value="condition">Conditions</TabsTrigger>
                    <TabsTrigger className="w-1/3" value="encounter">Encounters</TabsTrigger>
                </TabsList>
                <TabsContent value="info"><Information /></TabsContent>
                <TabsContent value="condition">Change your conditions here.</TabsContent>
                <TabsContent value="encounter">Change your enounters here.</TabsContent>
            </Tabs>
        </Card>
    )
}

export default PatientDetails