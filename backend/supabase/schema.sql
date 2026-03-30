create table if not exists tenders (
  id text primary key,
  t text not null,
  cat text not null,
  st text not null,
  dl date not null,
  bgt text not null,
  bids integer not null default 0,
  hse text,
  urg text
);

create table if not exists vendors (
  id text primary key,
  nm text not null,
  cat text not null,
  rt numeric(2,1),
  hse integer,
  st text not null,
  co text,
  certs text[] default '{}',
  prj integer default 0
);

create table if not exists purchase_orders (
  id text primary key,
  vn text not null,
  d text not null,
  a text not null,
  st text not null,
  dt date not null
);

create table if not exists hse_incidents (
  id text primary key,
  tp text not null,
  d text not null,
  site text not null,
  dt date not null,
  sv text not null,
  st text not null
);
