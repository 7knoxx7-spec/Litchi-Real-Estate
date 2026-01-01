# Backup and Recovery Policy

## Database (SQLite)
The application uses SQLite (`dev.db`).

### Backup
To back up the database, simply copy the `server/prisma/dev.db` file to a secure location.

**Manual Backup Command:**
```bash
cp server/prisma/dev.db server/backups/dev_$(date +%Y%m%d).db
```

**Automated Backup:**
Recommended to set up a cron job to run the above command daily.

### Recovery
To restore the database:
1. Stop the server.
2. Replace `server/prisma/dev.db` with your backup file.
3. Restart the server.

```bash
cp server/backups/dev_20240101.db server/prisma/dev.db
npm start
```

## Environment Variables
Ensure you have a backup of your `.env` file as it contains secrets (JWT_SECRET).

## Uploads
Back up the `server/uploads` directory to preserve user-uploaded images.
