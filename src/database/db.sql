CREATE TABLE workspaces (
	id_workspace SERIAL, 
	name_workspace VARCHAR(40) NOT NULL UNIQUE, 
	PRIMARY KEY(id_workspace)
);

CREATE TABLE boards (
	id_board SERIAL, 
	name_board VARCHAR(40) NOT NULL, 
	id_workspace INTEGER, 
	PRIMARY KEY(id_board), 
	FOREIGN KEY(id_workspace) REFERENCES workspaces(id_workspace) ON DELETE CASCADE
);

CREATE TABLE cards (
	id_card SERIAL, 
	idx_card INTEGER DEFAULT 0, 
	name_card VARCHAR(40) NOT NULL, 
	id_board INTEGER, 
	PRIMARY KEY(id_card), 
	FOREIGN KEY(id_board) REFERENCES boards(id_board) ON DELETE CASCADE
);

CREATE TABLE tasks (
	id_task SERIAL, 
	idx_task INTEGER DEFAULT 0, 
	title_task VARCHAR(80) NOT NULL, 
	fulfilled BOOLEAN DEFAULT FALSE,  
	exp_date DATE, 
	description VARCHAR(400), 
	id_card INTEGER, 
	PRIMARY KEY(id_task), 
	FOREIGN KEY(id_card) REFERENCES cards(id_card) ON DELETE CASCADE
);