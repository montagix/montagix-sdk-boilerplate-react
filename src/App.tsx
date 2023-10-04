import EngineStoreContextProvider from "./contexts/EngineStoreContext";
import EditorContainer from "./containers/EditorContainer";

function App() {
  return (
    <EngineStoreContextProvider>
      <EditorContainer />
    </EngineStoreContextProvider>
  );
}

export default App;
