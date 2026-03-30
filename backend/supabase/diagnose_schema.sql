select current_database(), current_schema();

select schemaname, tablename
from pg_tables
where tablename in ('tenders', 'vendors', 'purchase_orders', 'hse_incidents')
order by schemaname, tablename;

notify pgrst, 'reload schema';