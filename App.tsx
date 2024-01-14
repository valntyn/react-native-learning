import { NavigationContainer } from '@react-navigation/native';
import { StoreProvider } from '@/app/providers/StoreProvider';
import AppRouter from '@/app/providers/navigation/AppRouter';

export default function App() {
    return (
        <NavigationContainer>
            <StoreProvider>
                <AppRouter />
            </StoreProvider>
        </NavigationContainer>
    );
}
