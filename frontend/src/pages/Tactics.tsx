import { useState } from "react";
import {
  useFormations,
  useCreateFormation,
} from "@/hooks/useFormations";
import Spinner from "@/components/ui/spinner";
import FormationWizard from "@/components/FormationWizard";
import FormationCard from "@/components/FormationCard";
import { Button } from "@/components/ui/button";
import TacticsBoard from "@/components/TacticsBoard";

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
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Formaciones</h2>
      <Button onClick={() => setShowWizard(true)} className="w-fit">
        Crear formaci\u00f3n
      </Button>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {formations.map((f) => (
          <FormationCard key={f.id} formation={f} />
        ))}
      </div>
      <TacticsBoard />
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
