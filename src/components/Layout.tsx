import { Footer } from "./Footer"
import Header from "./header"


export const Layout = ({ children }: any) => {
    return (
        <div className="h-100" data-bs-theme="dark">
            <div className="d-flex h-100 text-bg-dark">
                <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column" style={{minHeight: "100vh"}}>
                    <Header/>
                    <main className="">
                        {children}
                    </main>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}