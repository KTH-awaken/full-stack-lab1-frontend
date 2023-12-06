import { Car, SearchIcon } from "lucide-react"
import { Input } from "../../components/ui/input"
import { Card } from "../../components/ui/card"
import { useGetCall } from "../../api/apiService"
import { SearchResultApi } from "../../api/types/search"
import { FormEvent, useState } from "react"
import { Skeleton } from "../../components/ui/skeleton"
import { uid } from "../../helpers/helpers"
import CustomAlert from "../../components/CustomAlert"




const SearchPage = () => {
    const [text, setText] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [hasSearched, setHasSearched] = useState<boolean | null>(null);

    const { data, isLoading, isError, refetch } = useGetCall<SearchResultApi[]>("/search/find/" + searchKey, "search");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearchKey(text);
        setHasSearched(true)
        refetch();
    }



    return (
        <div className="flex flex-col gap-2">
            <form onSubmit={handleSubmit} className="relative max-w-[550px] flex">
                <Input onChange={e => setText(e.target.value)} className="w-full rounded-md  h-11 static" type="text" />

                <button type="submit" className="rounded-r-md w-12 h-11 flex justify-center items-center bg-primary absolute right-0 top-1/2 -translate-y-1/2">
                    <SearchIcon className="text-white " />
                </button>
            </form>
            {isLoading &&
                <Loading />
            }
            {isError &&
                <CustomAlert title='Error' message='An error occured. Please try again later' />
            }
            {data && data.length > 0 &&
                <div>
                    <p className="text-sm opacity-50 my-3">{data?.length} results</p>
                    {
                        data.map(r =>
                            <SearchResult
                                id={r.id}
                                key={r.id + "-" + r.createdAt}
                                title={r.title}
                                type={r.type}
                                createdAt={r.createdAt}
                                matchKey={r.matchKey}
                                strong={searchKey}
                            />)
                    }
                </div>
            }
            {hasSearched && data && data.length == 0 &&
                <div className="flex justify-center flex-col items-center py-10">
                    <img className="w-2/3" src="no-data.svg" alt="" />
                    <h1 className="text-3xl font-bold">Ops!... No results found</h1>
                    <p className="text-xl mt-2 opacity-80">Please try another search</p>
                </div>
            }



        </div>
    )
}



const SearchResult = ({ type, title, matchKey, createdAt, strong }: SearchResultApi) => {
    const color = type === "Condition" ? "text-orange-500 bg-orange-50" : type === "Encounter" ? "text-blue-500 bg-blue-50" : "text-green-500 bg-green-50"
    return (
        <Card className="p-4 mb-2 flex flex-col gap-2 cursor-pointer">
            <div className="flex items-center gap-2">
                <h1 className="text-xl">{title}</h1>
                <p className={`px-2 py-1 rounded-lg text-xs ${color}`}>{type}</p>
            </div>
            <p className="text-sm">{matchKey}: <strong className="font-semibold opacity-85">{strong}</strong></p>
            <p className="opacity-50 text-sm">{createdAt.substring(0, 10)} {createdAt.substring(11, 16)}</p>
        </Card>
    )
}

const Loading = () => {
    const arr = new Array(3).fill(1);

    return (
        <>
            <div className="my-3">
            </div>
            {arr.map(_ => (
                <Card key={uid()} className="mb-3">
                    <div className="flex flex-col gap-2 border-b-0 data-[state=open]:border-l-8 border-primary px-5 py-[27px] rounded-2xl bg-background" >
                        <Skeleton className="h-8 w-[200px]" />
                        <Skeleton className="h-4 w-[300px]" />
                        <Skeleton className="h-2 w-[150px]" />

                    </div>
                </Card>
            ))}
        </>

    )
}

export default SearchPage