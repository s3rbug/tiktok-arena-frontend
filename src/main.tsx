import { ChakraProvider } from "@chakra-ui/react"
import ReactDOM from "react-dom/client"
import { App } from "./components"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import "./index.css"
import "./i18n/config"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		<ChakraProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ChakraProvider>
	</Provider>
)
