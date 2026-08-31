import { LanguageProvider } from '@/lib/i18n.jsx';
import { ThemeProvider } from '@/lib/theme.jsx';
import Portfolio from '@/pages/Portfolio';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;