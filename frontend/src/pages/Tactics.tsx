import { useState } from "react";
import {
  useFormations,
  useCreateFormation,
} from "@/hooks/useFormations";
import Spinner from "@/components/ui/spinner";
import FormationWizard from "@/components/FormationWizard";

export default function Tactics() {
  const { data: formations, isLoading, error } = useFormations();
  const createFormation = useCreateFormation();
  const [showWizard, setShowWizard] = useState(false);

  if (isLoading)
    return (
      <div className="flex justify-center mt-10">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Formaciones</h2>
      <button
        onClick={() => setShowWizard(true)}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Crear formaci\u00f3n
      </button>
      <ul>
        {formations.map((f) => (
          <li key={f.id} className="border-b py-2">
            {f.name}
          </li>
        ))}
      </ul>
      {showWizard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <FormationWizard
            onComplete={async (data) => {
              await createFormation.mutateAsync(data);
              setShowWizard(false);
            }}
            onCancel={() => setShowWizard(false)}
          />
        </div>
      )}
    </div>
  );
}
