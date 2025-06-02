import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerUser } from '@/services/authService';
import Spinner from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Register() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [team, setTeam] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const totalSteps = 3;

  function validateStep1() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Nombre requerido';
    if (!email.includes('@')) e.email = 'Email inválido';
    if (password.length < 6) e.password = 'Mínimo 6 caracteres';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e: Record<string, string> = {};
    if (!team.trim()) e.team = 'Equipo requerido';
    if (!role.trim()) e.role = 'Posición requerida';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const next = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setErrors({});
    setStep((s) => Math.min(s + 1, totalSteps));
  };

  const prev = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  };

  async function finish(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep1() || !validateStep2()) {
      setStep(1);
      return;
    }
    setLoading(true);
    try {
      await registerUser(name, email, password);
      navigate('/login');
    } catch {
      setErrors({ submit: 'No se pudo registrar el usuario' });
    } finally {
      setLoading(false);
    }
  }

  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <form onSubmit={finish} className="max-w-sm mx-auto mt-10 space-y-4">
      <div className="h-2 bg-gray-200 rounded">
        <div
          className="h-full bg-blue-700 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>

      {step === 1 && (
        <div className="space-y-3">
          <h1 className="text-lg font-bold">Datos personales</h1>
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Nombre
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <h1 className="text-lg font-bold">Información de equipo</h1>
          <div>
            <label htmlFor="team" className="text-sm font-medium">
              Equipo
            </label>
            <Input
              id="team"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
            />
            {errors.team && (
              <p className="text-red-500 text-sm">{errors.team}</p>
            )}
          </div>
          <div>
            <label htmlFor="role" className="text-sm font-medium">
              Posición
            </label>
            <Input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role}</p>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-2">
          <h1 className="text-lg font-bold">Confirmar datos</h1>
          <p>
            <strong>Nombre:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Equipo:</strong> {team}
          </p>
          <p>
            <strong>Posición:</strong> {role}
          </p>
          {errors.submit && (
            <p className="text-red-500 text-sm">{errors.submit}</p>
          )}
        </div>
      )}

      <div className="flex justify-between pt-2">
        {step > 1 ? (
          <Button type="button" variant="outline" onClick={prev}>
            Atrás
          </Button>
        ) : (
          <span />
        )}
        {step < totalSteps && (
          <Button type="button" onClick={next}>
            Siguiente
          </Button>
        )}
        {step === totalSteps && (
          <Button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center"
          >
            {loading && <Spinner className="mr-2 h-4 w-4 text-white" />}
            Completar
          </Button>
        )}
      </div>
    </form>
  );
}
