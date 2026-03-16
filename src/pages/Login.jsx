import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Phone, Lock, Loader2, AlertCircle } from 'lucide-react';

const Login = () => {
  const [step, setStep] = useState(1); // 1 = Phone, 2 = OTP
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  // Etape 1 : Demander le code OTP
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!phone || phone.length < 8) {
      return setError('Veuillez entrer un numero de telephone valide.');
    }

    setLoading(true);
    try {
      // Appel a la route d'inscription/connexion du backend
      await api.post('/auth/register', { phone });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'envoi du code.');
    } finally {
      setLoading(false);
    }
  };

  // Etape 2 : Verifier le code OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');

    if (!otp || otp.length < 4) {
      return setError('Veuillez entrer le code a 4 chiffres.');
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/verify', { phone, otp });
      
      const { user, accessToken } = response.data.data;
      
      // On met a jour le contexte global
      login(user, accessToken);
      
      // On redirige vers l'accueil
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Code invalide ou expire.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-surface rounded-xl shadow-2xl p-8 border border-border">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-textMain tracking-tight">
            {step === 1 ? 'Connexion' : 'Verification'}
          </h2>
          <p className="mt-2 text-sm text-textMuted">
            {step === 1 
              ? 'Entrez votre numero pour recevoir un code d\'acces' 
              : `Code envoye au ${phone}`}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-error bg-opacity-10 border border-error rounded flex items-center gap-2 text-error text-sm">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleRequestOTP} className="space-y-6">
            <div>
              <label htmlFor="phone" className="sr-only">Numero de telephone</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-textMuted" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-border bg-background text-textMain focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
                  placeholder="Numero de telephone (ex: 0707070707)"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Recevoir le code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div>
              <label htmlFor="otp" className="sr-only">Code OTP</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-textMuted" />
                </div>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  maxLength="4"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-border bg-background text-textMain focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors tracking-[1em] font-bold text-center"
                  placeholder="••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Verifier et se connecter'}
            </button>
            
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-textMuted hover:text-primary transition-colors"
              >
                Modifier le numero
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;