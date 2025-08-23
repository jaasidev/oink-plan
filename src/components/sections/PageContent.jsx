import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export function PageContent(){
    return (
        <>
        <main className="h-screen w-full flex flex-col">
           <Header/>

            <div className="grow overflow-y-auto"></div>
            <Footer/>
        </main>
        </>
    )
}