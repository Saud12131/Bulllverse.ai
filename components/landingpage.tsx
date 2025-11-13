import { GlobeDemo } from "./globe";
import Navbar from "./navbar";

export default function LandingPage(){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Navbar/>
            <GlobeDemo />
        </div>
    )
}