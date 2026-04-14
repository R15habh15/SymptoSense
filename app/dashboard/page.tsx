'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useApp } from '../context/AppContext';
import AppShell from '../components/AppShell';
import Dashboard from '../components/Dashboard';
import LanguageModal from '../components/LanguageModal';
import PersonModal from '../components/PersonModal';
import QuestionPanel from '../components/QuestionPanel';
import LoadingScreen from '../components/LoadingScreen';
import ResultsPage from '../components/ResultsPage';

export default function DashboardRoute() {
  const { data: session, status } = useSession();
  const { triageScreen } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') return null;
  if (!session) return null;

  return (
    <AppShell>
      {(triageScreen === 'dashboard' || triageScreen === 'language' || triageScreen === 'person') && (
        <>
          <Dashboard />
          {triageScreen === 'language' && <LanguageModal />}
          {triageScreen === 'person'   && <PersonModal />}
        </>
      )}
      {triageScreen === 'questions' && <QuestionPanel />}
      {triageScreen === 'loading'   && <LoadingScreen />}
      {triageScreen === 'results'   && <ResultsPage />}
    </AppShell>
  );
}
