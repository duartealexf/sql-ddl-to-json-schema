CREATE UNIQUE INDEX u_initials using rtree on person (char(3) asc) key_block_size 4096 using rtree with parser initialsParser comment 'unique initials' algorithm default lock none;
