create table public.usuario (
  id uuid references auth.users on delete cascade not null primary key,
  nome text,
  idade int
);