import api from "@/api/api";
import {
    Collapsible, CollapsibleTrigger, CollapsibleContent
} from "@/components/ui/collapsible"
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
    ChevronDown
} from "lucide-react"
import { toast } from "sonner";

interface JDTileProps { 
    jd : any,
    index : number
}
export default function JDTile({jd, index} : JDTileProps) {

    const handleDelete = async() => {
        try {
            if( !jd._id ) {
                toast.error( "Cannot delete JD" );
            }
            const response = await api.delete(`/jd/${jd._id}`)
            if( response.success ) {
                toast.info("Job Description deleted successfully" );
            }
            else {
                toast.error( "Something went wrong" );
                console.error( response );
            }
        }
        catch( e : any ) {
            console.log( e );
            toast.error( "Something went wrong" );
        }
    }

    const company =
        jd?.parsedText?.metadata?.company || "Unknown Company";

    const jobTitle =
        jd?.parsedText?.metadata?.jobTitle || "Unknown Role";

    const skills =
        jd?.parsedText?.skills?.required?.length || 0;

    const KeywordPill = ({ keyword, index }: { keyword: string; index: number }) => {
        const colorClasses = [
            "bg-cyan-50 text-cyan-700 border-cyan-100",
            "bg-emerald-50 text-emerald-700 border-emerald-100",
            "bg-amber-50 text-amber-700 border-amber-100",
            "bg-slate-50 text-slate-700 border-slate-200",
        ];

        return (
            <span className={`rounded-lg border px-3 py-2 text-sm font-medium ${colorClasses[index % colorClasses.length]}`} key={index}>
                {keyword}
            </span>
        );
    };

    return (
            <div className="jd w-full group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-cyan-200 hover:shadow-md">
                <Collapsible>
                    
                <div className="flex flex-row justify-between "> 
                    <div>
                        <h4 className="font-['Inter'] text-base font-semibold text-slate-950">
                            {jobTitle}
                        </h4>

                        <p className="mt-1 text-sm text-slate-500">
                            {company}
                        </p>
                    </div>

                    <Button onClick={handleDelete}> <Trash2 />  </Button>               
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                        {skills} skills detected
                    </span>
                    <CollapsibleTrigger>
                        <ChevronDown  />
                    </CollapsibleTrigger>   
                </div>
                <CollapsibleContent>
                    <div className="skills overflow-x-auto flex flex-col gap-4">
                        {jd?.parsedText?.skills?.required.slice( 0, 5 ).map( ( skill : any, index : any ) =>
                        <KeywordPill keyword={skill} index={ index } />
                     ) }
                    </div>
                </CollapsibleContent>
                </Collapsible>
            </div>
            
            
    );
}