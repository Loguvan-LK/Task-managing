import { ThemeProvider } from './components/themes/ThemeProvider';
import ThemeToggle from './components/themes/ThemeToggle';
import LogoutButton from './auth/Logout';
import AppRoutes from './routes/routes';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Provider store={store}>
      <ThemeProvider>
      <div className="h-screen bg-gray-100 dark:bg-zinc-950">
  <header className="flex justify-end items-center p-4">
     <div className="flex items-center space-x-4">
      <LogoutButton />
      <ThemeToggle />
    </div>
  </header>

  <main >
    <AppRoutes />
  </main>
</div>

      </ThemeProvider>
    </Provider>
    </BrowserRouter>
  );
}
