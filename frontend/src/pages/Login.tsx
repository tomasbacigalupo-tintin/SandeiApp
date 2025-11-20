import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/useAuth';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Shield,
  Users,
  TrendingUp,
  Zap
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Spinner from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('¡Bienvenido de vuelta!', {
        description: 'Has iniciado sesión correctamente'
      });
      navigate('/dashboard');
    } catch {
      toast.error('Error de autenticación', {
        description: 'Verifica tus credenciales e intenta de nuevo'
      });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Users,
      title: 'Gestión de Jugadores',
      description: 'Administra tu equipo completo'
    },
    {
      icon: TrendingUp,
      title: 'Análisis Avanzado',
      description: 'Estadísticas detalladas y métricas'
    },
    {
      icon: Shield,
      title: 'Tácticas Personalizadas',
      description: 'Crea estrategias ganadoras'
    },
    {
      icon: Zap,
      title: 'IA Integrada',
      description: 'Recomendaciones inteligentes'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-cyan-400/30 blur-3xl" />
        <div className="absolute left-24 top-24 h-40 w-40 rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="absolute inset-6 rounded-[32px] border border-white/5 bg-gradient-to-br from-white/5 via-white/0 to-white/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.12),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(167,139,250,0.12),transparent_30%)]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        {/* Panel izquierdo - Información */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center gap-10 px-12 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">Plataforma Elite</p>
                <h1 className="mt-3 text-5xl font-bold leading-tight text-white drop-shadow-[0_10px_40px_rgba(14,165,233,0.35)]">
                  SandeiApp
                </h1>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 shadow-inner">
                Glass Premium
              </div>
            </div>
            <p className="text-lg text-slate-200/80">
              La plataforma definitiva para la gestión profesional de equipos deportivos con análisis de datos y paneles inteligentes listos para competir.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                  className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
                >
                  <div className="rounded-xl bg-white/10 p-2 text-sky-100 shadow-[0_10px_30px_rgba(59,130,246,0.35)]">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-50">{feature.title}</h3>
                    <p className="text-sm text-slate-200/70">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[{ label: 'IA Activa', value: 'En tiempo real' }, { label: 'Equipos', value: '120+' }, { label: 'Rendimiento', value: '+40%' }].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur-xl"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-200/70">{item.label}</p>
                  <p className="mt-2 text-xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-5 backdrop-blur-xl"
          >
            <div className="rounded-xl bg-white/10 p-3 text-sky-200">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-100">Seguridad reforzada</p>
              <p className="text-xs text-slate-200/70">Encriptación avanzada y accesos protegidos</p>
            </div>
          </motion.div>
        </div>

        {/* Panel derecho - Formulario */}
        <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <Card className="border border-white/10 bg-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-3xl">
              <CardHeader className="text-center pb-2">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 shadow-[0_15px_45px_rgba(59,130,246,0.45)]"
                >
                  <Shield className="h-8 w-8 text-white" />
                </motion.div>
                <CardTitle className="text-2xl font-bold text-white">Acceso Glass Premium</CardTitle>
                <p className="mt-2 text-sm text-slate-200/70">
                  Accede a tu cuenta profesional con el estilo Glass Premium
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="form-label text-slate-100">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input rounded-xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-slate-400 focus:border-sky-300"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="form-label text-slate-100">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input rounded-xl border-white/10 bg-white/5 pl-10 pr-12 text-white placeholder:text-slate-400 focus:border-sky-300"
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 transition-colors hover:text-white"
                        disabled={loading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-slate-200/80">
                    <div className="flex items-center space-x-2">
                      <input
                        id="remember"
                        type="checkbox"
                        className="rounded border-white/20 bg-white/5 text-sky-300 focus:ring-sky-300"
                      />
                      <label htmlFor="remember" className="text-sm">
                        Recordarme
                      </label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-sky-200 transition-colors hover:text-white"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn-primary btn-lg shadow-[0_12px_35px_rgba(56,189,248,0.35)]"
                    disabled={loading || !email || !password}
                  >
                    {loading ? (
                      <>
                        <Spinner className="mr-2 h-4 w-4" />
                        Iniciando sesión...
                      </>
                    ) : (
                      <>
                        Iniciar Sesión
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-transparent px-2 text-slate-200/70">
                      O continúa con
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="btn-outline rounded-xl border-white/20 bg-white/5 text-white">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="btn-outline rounded-xl border-white/20 bg-white/5 text-white">
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/5 p-4 text-center text-sm text-slate-200/80">
                  <p>
                    ¿No tienes una cuenta?{' '}
                    <Link
                      to="/register"
                      className="font-medium text-sky-200 transition-colors hover:text-white"
                    >
                      Crear cuenta
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 text-center text-xs text-slate-300"
            >
              <p>
                Al acceder, aceptas nuestros{' '}
                <Link to="/terms" className="text-sky-200 transition-colors hover:text-white">
                  Términos de Servicio
                </Link>{' '}
                y{' '}
                <Link to="/privacy" className="text-sky-200 transition-colors hover:text-white">
                  Política de Privacidad
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
