import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { authService } from './services/auth.service';
import { useAuthStore } from './store/auth.store';

// App — root component
function App() {
  const setInitializing = useAuthStore((state) => state.setInitializing);

  useEffect(() => {
    authService.init().finally(() => {
      setInitializing(false);
    });
  }, [setInitializing]);

  return <RouterProvider router={router} />;
}

export default App;