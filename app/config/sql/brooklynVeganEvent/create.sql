INSERT INTO broooklyn_vegan_events (source, cost, start_date, title, event_url, img_src, address, description) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
