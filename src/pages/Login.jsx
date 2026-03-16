import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Phone, Lock, Loader2, AlertCircle, X } from 'lucide-react';

const Login = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!phone || phone.length < 8) {
      return setError('Veuillez entrer un numero de telephone valide.');
    }

    setLoading(true);
    try {
      await api.post('/auth/send-otp', { phone });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'envoi du code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');

    if (!otp || otp.length < 4) {
      return setError('Veuillez entrer le code a 4 chiffres.');
    }

    setLoading(true);
    try {
      // CORRECTION : Alignement strict avec la route backend (/verify-otp au lieu de /verify)
      const response = await api.post('/auth/verify-otp', { phone, otp });
      const { user, accessToken } = response.data.data;
      
      login(user, accessToken);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Code invalide ou expire.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4 sm:px-6">
      <div className="relative w-full max-w-md bg-surface rounded-xl shadow-2xl p-6 sm:p-8 border border-border">
        
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 text-textMuted hover:text-textMain transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1"
          aria-label="Fermer"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-8 mt-2">
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
          <div className="mb-6 p-3 bg-error/10 border border-error rounded-lg flex items-center gap-2 text-error text-sm">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
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
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-textMain placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm transition-all"
                  placeholder="Numero (ex: 0707070707)"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-textMain placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm transition-all tracking-[1em] font-bold text-center"
                  placeholder="••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Verifier et se connecter'}
            </button>
            
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-textMuted hover:text-textMain transition-colors"
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