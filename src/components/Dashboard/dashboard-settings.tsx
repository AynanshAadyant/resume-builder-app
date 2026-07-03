import { useState, useEffect } from "react";
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/api/api";
import { useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import ResumeTile from "../ResumeTile";
import JDTile from "../JDTile";
import { Link } from "react-router";

export default function DashboardSettings() {
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [loadingUser, setLoadingUser ] = useState(false)
    const [resumes, setResumes ] = useState( [] )
    const [loadingResumes, setLoadingResumes ] = useState( false );
    const [jds, setJDs ] = useState([]);
    const [loadingJDs, setLoadingJDs ] = useState( false );
    const [savingProfile, setSavingProfile] = useState( false );


    const user = useAppSelector((state) => state.auth.user)
    
    //functions
    const fetchUser = async() => {
        try {
            setLoadingUser( true );
            if( user ) {
                setUserEmail( user.email );
                setUserName( user.name );
            }
            else {
                const response = await api.get( "/auth/current")
                if( response.success && response.body ) {
                    setUserEmail( response.body.email );
                    setUserName( response.body.name );
                }
            }
        }
        catch( e : any ) {
            console.error( e );
        }
        finally {
            setLoadingUser( false );
        }
    }
    const fetchResumes = async() => {
        try {
            setLoadingResumes( true );
            const response = await api.get( "/resume");
            if( response.success && response.resumes ) {
                setResumes( response.resumes )
            }
        }
        catch ( e : any ) {
            console.log( "ERROR : ", e );
        }
        finally {
            setLoadingResumes( false );
        }
    }

    const fetchJDs = async() => {
        try {
            setLoadingJDs( true )
            const response = await api.get( "/jd" )
            if( response.success && response.data ) {
                setJDs( response.data );
            }
        }
        catch( e : any ) {
            console.error( e );
        }
        finally {
            setLoadingJDs( false );
        }
    }

    const updateName = async() => {
        setSavingProfile( true );
        try {
            const response = await api.put( "/auth/update", {userName} );
            if( response.success ) {
                toast.success( response.message );
            }
            else
                toast.error( response.message );
        }
        catch( e : any ) {
            toast.error( "Something went wrong" );
        }
        finally{
            setSavingProfile( false );
        }
    }

    const fetchInitialData = async() => {
        await fetchUser();
        await fetchResumes();
        await fetchJDs();
    }

    useEffect( () => { fetchInitialData() }, [] );

    return (
        <div className="p-8 w-full max-w-[1180px] pb-12">
            <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <h2 className="font-['Satoshi'] text-3xl font-bold text-slate-950">Settings</h2>
                    <p className="mt-2 text-base text-slate-500">Manage account details, AI behavior, and export defaults.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {
                    loadingUser ?
                    <h1> Loading ... </h1>
                    :
                    <Card className="rounded-lg border-slate-200 bg-white shadow-sm">
                        <CardHeader className="flex flex-row justify-between items-center gap-3">
                            <div className="flex flex-row justify-center items-center gap-2">
                                <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                                    <UserCircle className="h-5 w-5" />
                                </div>
                                <CardTitle className="text-xl text-slate-950">Account Details</CardTitle>
                            </div>
                            <Button variant="default" className={`bg-black text-white px-5 ${savingProfile ? `bg-gray-700` : ``}`}
                                onClick={ (e) => {
                                    e.preventDefault();
                                    updateName();
                                }}
                            > {savingProfile ? `Saving Profile` : `Save Profile`} </Button>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-lg flex flex-col border border-slate-200 bg-slate-50 p-4">
                                <label htmlFor="name" className="text-xs font-semibold uppercase text-slate-400">Name</label>
                                <input name="name" type="text" value={userName || "Alex"}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setUserName(e.target.value)
                                    }}
                                    className="mt-1 text-base font-medium text-slate-950"></input>
                            </div>
                            <div className="rounded-lg border flex flex-col border-slate-200 bg-slate-50 p-4">
                                <label htmlFor="email" className="text-xs font-semibold uppercase text-slate-400">Email Address</label>
                                <input readOnly={true} type="email" name="email" value={userEmail || "alex@example.com"}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setUserEmail(e.target.value)
                                    }}
                                    className="mt-1 text-base font-medium text-slate-950"></input>
                            </div>
                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 md:col-span-2">
                                <span className="text-xs font-semibold uppercase text-slate-400">Active Resumes</span>
                                <p className="mt-1 text-base font-medium text-slate-950">{resumes.length} tailored resumes generated</p>
                            </div>
                        </CardContent>
                    </Card>
                }

                <div className="resumes flex flex-col">
                    <h1> Resumes Generated : </h1>
                    {
                        loadingResumes ? 
                        <h1> Loading </h1>
                        :
                        resumes.length > 0 ?
                        resumes.map( (resume, index ) => <ResumeTile resume={resume} index={index} />)
                        :
                        <p> No resumes generated. Generate <Link to="/dashboard/ai"> Now </Link></p>
                    }
                </div>
                <div className="jds">
                    <h1> Job Description parsed : </h1>
                    {
                        loadingJDs ?
                        <h1> Loading ... </h1>
                        :
                        jds.length > 0 ?
                        jds.map( (jd, index) => <JDTile jd={jd} index={index}/>)
                        :
                        <p> No Job Descriptions parsed. Parse <Link to="/dashboard/ai"> Now </Link></p>

                    }
                </div>
                </div>
        </div>
    );
}
