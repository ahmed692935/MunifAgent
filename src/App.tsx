import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./route";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />

      <RouterProvider router={router} />
    </>
  );
}

export default App;
