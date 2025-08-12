<p align="center"><a href="https://dclm.org" target="_blank"><img src="https://dclmcloud.s3.amazonaws.com/img/logo.png" width="206.5" height="190"></a></p>

# DLES MBS API - NestJS

Church Member Management System API built with NestJS and MariaDB.

## Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ (for local development)

### Database Setup

1. **Start the database:**
```bash
docker-compose up -d
```

2. **Copy environment variables:**
```bash
cp .env.example .env
```

3. **Access the database:**
- **MariaDB**: `localhost:3307`
  - Database: `dles_mbs_db`
  - Username: `dles_user`
  - Password: `dles_password123`

- **DbGate (Database GUI)**: http://localhost:9080
  - Pre-configured connection to your database
  - Advanced SQL editor and data browser
  - Schema visualization and export tools

### Development Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Run database migrations/sync:**
```bash
# If using Sequelize CLI
npx sequelize-cli db:migrate

# Or if using auto-sync in development
npm run start:dev
```

3. **Start the application:**
```bash
npm run start:dev
```

## Database Schema

### Core Models
- **User** - Authentication and permissions
- **BioData** - Member personal information  
- **ChurchData** - Church-related member data
- **Country/State/LocalGovt** - Geographic data
- **Position** - Church positions and roles
- **MemberStatus** - Member status tracking

### Model Relationships
- User ↔ BioData (One-to-One)
- BioData ↔ ChurchData (One-to-One)
- Country ↔ State ↔ LocalGovt (Hierarchical)
- Position ↔ User/ChurchData (One-to-Many)

## Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services  
docker-compose down

# View logs
docker-compose logs mariadb

# Access MariaDB directly
docker exec -it dles-mbs-mariadb mysql -u dles_user -p dles_mbs_db

# Reset database (removes all data)
docker-compose down -v
docker-compose up -d
```

## API Endpoints

Once running, the API will be available at:
- **API Base**: http://localhost:3000/api/v1
- **Swagger Docs**: http://localhost:3000/api/docs

## Environment Variables

Key environment variables (see `.env.example`):

- `DB_HOST` - Database host
- `DB_PORT` - Database port  
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password
- `DB_DATABASE` - Database name
- `JWT_SECRET` - JWT signing secret
- `PORT` - Application port

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

[Add your license here]
