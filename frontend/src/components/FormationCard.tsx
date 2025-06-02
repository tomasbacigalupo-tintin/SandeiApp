import { Formation } from '@/types/formation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface FormationCardProps {
  formation: Formation;
}

export default function FormationCard({ formation }: FormationCardProps) {
  return (
    <Card className="flex flex-col gap-2">
      <CardHeader>
        <CardTitle>{formation.name}</CardTitle>
      </CardHeader>
      {formation.description && (
        <CardContent className="text-sm whitespace-pre-wrap">
          <p>{formation.description}</p>
        </CardContent>
      )}
    </Card>
  );
}
