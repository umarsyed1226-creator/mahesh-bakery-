import React, { useState, useRef, useEffect } from 'react';
import { User, Mail, Lock, ArrowRight, AlertCircle, X } from 'lucide-react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

/** Maps Firebase error codes to user-friendly messages */
function getFirebaseErrorMessage(error: any): string {
  const code = error?.code || '';
  const errorMap: Record<string, string> = {
    'auth/invalid-credential': 'Invalid email or password. Please check your credentials and try again.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/user-not-found': 'No account found with this email. Please sign up first.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/user-disabled': 'This account has been disabled. Please contact support.',
    'auth/too-many-requests': 'Too many failed attempts. Please wait a few minutes and try again.',
    'auth/network-request-failed': 'Network error. Please check your internet connection and try again.',
    'auth/email-already-in-use': 'This email is already registered. Please sign in instead.',
    'auth/weak-password': 'Password is too weak. Please use at least 6 characters.',
    'auth/operation-not-allowed': 'Email/Password Sign-In is not enabled yet. Please go to Firebase Console → Authentication → Sign-in method and enable "Email/Password". Or use "Continue with Google" below!',
    'auth/argument-error': 'Firebase configuration error. Please ensure Firebase is correctly initialized.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
    'auth/popup-blocked': 'Sign-in popup was blocked by your browser. Please allow popups and try again.',
    'auth/cancelled-popup-request': 'Sign-in was cancelled. Please try again.',
    'auth/internal-error': 'An internal error occurred. Please try again later.',
  };
  return errorMap[code] || error?.message?.replace(/^Firebase:\s*/, '').replace(/\s*\(.*\)\.?$/, '') || 'Something went wrong. Please try again.';
}

export default function Login({ onLogin, notice }: { onLogin: (email: string, password?: string, isAdmin?: boolean, customName?: string, uid?: string, avatar?: string) => void; notice?: string | null }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const errorRef = useRef<HTMLDivElement>(null);

  // Scroll to error when it appears
  useEffect(() => {
    if (errorMsg && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [errorMsg]);

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      const result = await signInWithPopup(auth, provider);
      onLogin(result.user.email || '', '', false, result.user.displayName || 'Google User', result.user.uid, result.user.photoURL || undefined);
    } catch (error: any) {
      setErrorMsg(error.message || 'Google Sign-In failed.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanEmail = (email || '').trim();
    const cleanPassword = (password || '').trim();

    if (!cleanEmail) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!cleanPassword || cleanPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (isLogin) {
      if (cleanEmail === 'admin@maheshbakery.com' && cleanPassword === 'admin') {
        onLogin(cleanEmail, cleanPassword, true, 'Store Admin', 'admin-id');
        return;
      }
      if (cleanEmail === 'customer@maheshbakery.com' && cleanPassword === 'password') {
        onLogin(cleanEmail, cleanPassword, false, 'Demo Customer', 'demo-customer-id');
        return;
      }

      try {
        const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, cleanPassword);
        onLogin(cleanEmail, cleanPassword, false, userCredential.user.displayName || 'Cake Lover', userCredential.user.uid);
      } catch (error: any) {
        console.error(error);
        setErrorMsg(getFirebaseErrorMessage(error));
      }
    } else {
      if (!name.trim()) {
        setErrorMsg('Name is required.');
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPassword);
        onLogin(cleanEmail, cleanPassword, false, name, userCredential.user.uid);
      } catch (error: any) {
        console.error(error);
        setErrorMsg(getFirebaseErrorMessage(error));
      }
    }
  };


  return (
    <div className="py-24 px-6 min-h-[85vh] flex items-center justify-center relative overflow-hidden bg-[#4f3370]/95">
      {/* Background Image with Referrer Policy */}
      <img 
        src="https://ik.imagekit.io/psfnvg1yb/ChatGPT%20Image%20May%2022,%202026,%2008_27_01%20PM.png" 
        alt="Mahesh Bakery Premium Background" 
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none opacity-20"
        referrerPolicy="no-referrer"
      />
      
      {/* Sleek Vignette Overlay for Readability */}
      <div className="absolute inset-0 bg-[#4f3370]/20 backdrop-blur-xs z-0" />

      <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-[2.5rem] p-10 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.2)] border border-white/40 relative z-10">
        {notice && (
          <div className="mb-8 p-4.5 bg-purple-50 border border-purple-100 rounded-3xl text-sm font-semibold text-[#4f3370] leading-normal flex items-start gap-2.5 shadow-sm text-left animate-fade-in">
            <span className="w-5 h-5 bg-[#4f3370] text-white rounded-full flex items-center justify-center text-xs shrink-0 font-bold mt-0.5">i</span>
            <span>{notice}</span>
          </div>
        )}
        {errorMsg && (
          <div ref={errorRef} className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-sm font-semibold text-red-700 flex items-start gap-3 shadow-lg text-left animate-fade-in" style={{ animation: 'shake 0.4s ease-in-out' }}>
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-red-800 text-[13px] mb-0.5">Login Failed</p>
              <p className="text-red-600 text-[12.5px] leading-relaxed">{errorMsg}</p>
            </div>
            <button onClick={() => setErrorMsg('')} className="text-red-400 hover:text-red-600 transition-colors shrink-0 mt-0.5">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-100 shadow-[0_8px_30px_rgba(79,51,112,0.15)] mb-4 shrink-0 transition-transform duration-300 hover:scale-105 bg-[#4f3370]">
            <img 
              src="https://ik.imagekit.io/exmpcpadx/image.png" 
              alt="Mahesh Bakery Logo" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-sans font-extrabold text-3xl text-[#FFB01A] lowercase tracking-tighter leading-none select-none">
            {isLogin ? 'welcome back' : 'create account'}
          </span>
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1.5 mb-2 select-none">
            mahesh bakery
          </span>
        </div>



        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-[#2c1b40] mb-2 px-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  required={!isLogin}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="" 
                  className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-[#4f3370]/20 focus:border-[#4f3370] transition-all font-medium bg-white"
                />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold text-[#2c1b40] mb-2 px-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="" 
                className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-[#4f3370]/20 focus:border-[#4f3370] transition-all font-medium bg-white"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-[#2c1b40] mb-2 px-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="" 
                className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-[#4f3370]/20 focus:border-[#4f3370] transition-all font-medium bg-white"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#4f3370] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#3d2757] transition-colors shadow-lg hover:shadow-[#4f3370]/30 hover:-translate-y-1 flex items-center justify-center gap-2 group mt-8"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase tracking-wider">Or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-white text-gray-700 border border-gray-200 py-3.5 rounded-2xl font-bold text-base hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrorMsg('');
              }}
              className="text-sm font-semibold text-gray-500 hover:text-[#4f3370] transition-colors"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
