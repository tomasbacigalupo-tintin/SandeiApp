import { Formation } from '@/types/formation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FormationCardProps {
  formation: Formation;
}

export default function FormationCard({ formation }: FormationCardProps) {
  const shareText = `Formación ${formation.name}${
    formation.description ? ` - ${formation.description}` : ''}`;

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
      <CardContent className="flex justify-end pt-0">
        <Button asChild size="sm" variant="outline">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Compartir
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
