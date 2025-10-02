
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Reloj } from "../Reloj/Reloj";
import { Estrategias } from "./Estrategias";
import { TimeSection } from "./TimeSection";

export function PageContent() {
    return (
        <>
            <main className="h-screen w-full flex flex-col">
                <Header />

                <div className="grow overflow-y-auto">
                    <Reloj />
                    <Estrategias />
                    <TimeSection />

                </div>
                <Footer counter="Reloj" />
            </main>
        </>
    )
}