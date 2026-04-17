const fs = require('fs');
const path = require('path');
const db = require('../src/config/db');

async function migrate() {
    const migrationsDir = path.join(__dirname, '../migrations');
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();
    console.log('--- Starting Migrations ---');
    let connection;
    try {
        connection = await db.getConnection();
        let appliedMigrations = [];
        try {
            const [rows] = await connection.query('SELECT migration_name FROM migration_meta');
            appliedMigrations = rows.map(r => r.migration_name);
        } catch (e) {
            console.log('Migration meta table not found. Initializing...');
        }

        for (const file of files) {
            if (appliedMigrations.includes(file)) {
                console.log(`Skipping: ${file} (Already applied)`);
                continue;
            }

            console.log(`Applying: ${file}...`);
            const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
            await connection.query(sql);

            // Record migration in migration_meta table if it exists
            try {
                await connection.query('INSERT IGNORE INTO migration_meta (migration_name) VALUES (?)', [file]);
                console.log(`Success and recorded: ${file}`);
            } catch (recordError) {
                // If recording fails (e.g. table not created yet), just log success of the migration execution
                console.log(`Success: ${file} (Note: could not record in meta table)`);
            }

        }

        console.log('--- Migrations Completed Successfully ---');
    } catch (error) {
        console.error('--- Migration Failed ---');
        console.error('Error in file:', error.file || 'unknown');
        console.error(error);
    } finally {

        if (connection) connection.release();
        process.exit();
    }
}

migrate();
