CREATE FULLTEXT INDEX fi_history using rtree on person (text(20) asc) key_block_size 4096 using rtree with parser initialsParser comment 'unique initials' algorithm default lock none;
