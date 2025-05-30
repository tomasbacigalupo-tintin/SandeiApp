import { useState } from "react";
import Spinner from "@/components/ui/spinner";

export interface FormationWizardData {
  name: string;
  description: string;
}

export default function FormationWizard({
  onComplete,
  onCancel,
}: {
  onComplete: (data: FormationWizardData) => Promise<void> | void;
  onCancel: () => void;
}) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const totalSteps = 3;

  const next = () => {
    if (step === 1 && !name) return;
    setStep((s) => Math.min(s + 1, totalSteps));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const finish = async () => {
    setSaving(true);
    await onComplete({ name, description });
    setSaving(false);
  };

  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="bg-white p-6 rounded w-96">
      <div className="h-2 bg-gray-200 rounded mb-4">
        <div className="h-full bg-blue-700 rounded" style={{ width: `${progress}%` }} />
      </div>
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Nombre de la formaci\u00f3n</h2>
          <label htmlFor="formation-name" className="sr-only">Nombre</label>
          <input
            id="formation-name"
            type="text"
            className="border p-2 w-full rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            aria-label="Nombre"
          />
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Descripci\u00f3n</h2>
          <label htmlFor="formation-description" className="sr-only">Descripci\u00f3n</label>
          <textarea
            id="formation-description"
            className="border p-2 w-full rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripci\u00f3n"
            aria-label="Descripci\u00f3n"
          />
        </div>
      )}
      {step === 3 && (
        <div className="space-y-2">
          <h2 className="text-lg font-bold">Confirmar datos</h2>
          <p>
            <strong>Nombre:</strong> {name}
          </p>
          <p>
            <strong>Descripci\u00f3n:</strong> {description}
          </p>
        </div>
      )}
      <div className="flex justify-between mt-4">
        {step > 1 ? (
          <button onClick={prev} className="text-blue-600 underline">
            Atr\u00e1s
          </button>
        ) : (
          <span />
        )}
        {step < totalSteps && (
          <button onClick={next} className="bg-blue-700 text-white px-4 py-2 rounded">
            Siguiente
          </button>
        )}
        {step === totalSteps && (
          <button
            onClick={finish}
            disabled={saving}
            className="bg-green-700 text-white px-4 py-2 rounded flex items-center"
          >
            {saving && <Spinner className="h-4 w-4 mr-2 text-white" />}
            Guardar
          </button>
        )}
        <button onClick={onCancel} className="ml-2 text-red-600 underline">
          Cancelar
        </button>
      </div>
    </div>
  );
}
