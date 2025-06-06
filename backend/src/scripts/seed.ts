import { AppDataSource } from '../data-source';
import { Player } from '../modules/players/player.entity';
import { Formation } from '../modules/formations/formation.entity';
import { Match } from '../modules/matches/match.entity';

async function seed() {
  await AppDataSource.initialize();

  const playersRepo = AppDataSource.getRepository(Player);
  const formationsRepo = AppDataSource.getRepository(Formation);
  const matchesRepo = AppDataSource.getRepository(Match);

  const players = [
    { name: 'Juan Pérez', position: 'Delantero', fitness: 80, technical: 85 },
    { name: 'Carlos Díaz', position: 'Mediocampista', fitness: 75, technical: 80 },
    { name: 'Luis Gómez', position: 'Defensa', fitness: 85, technical: 70 },
  ];

  for (const p of players) {
    await playersRepo.save(playersRepo.create(p));
  }

  const formations = [
    {
      name: '4-4-2 Clásico',
      description:
        'Formación básica con 4 defensas, 4 mediocampistas y 2 delanteros.',
    },
    {
      name: '4-3-3 Ofensiva',
      description: 'Mayor presencia en ataque con tres delanteros.',
    },
  ];

  for (const f of formations) {
    await formationsRepo.save(formationsRepo.create(f));
  }

  await matchesRepo.save(matchesRepo.create({ date: new Date() }));

  await AppDataSource.destroy();
}

seed()
  .then(() => {
    console.log('Datos de ejemplo cargados.');
  })
  .catch(async (err) => {
    console.error('Error al cargar datos:', err);
    await AppDataSource.destroy();
  });
