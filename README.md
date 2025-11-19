# PostgreSQL Node

A comprehensive PostgreSQL database node for workflow automation.

## Features

- **Execute Custom Queries**: Run any SQL query with parameterized inputs
- **Select**: Retrieve data with filtering, ordering, and pagination
- **Insert**: Add new records to tables
- **Update**: Modify existing records with WHERE conditions
- **Delete**: Remove records with WHERE conditions (safety required)

## Operations

### Execute Query
Execute any custom SQL query with support for parameterized queries using `$1`, `$2`, etc.

**Example:**
```sql
SELECT * FROM users WHERE status = $1 AND created_at > $2
```
Parameters: `active,2024-01-01`

### Select
Retrieve data from a table with various options:
- Choose specific columns or use `*` for all
- Add WHERE conditions for filtering
- Order results with ORDER BY
- Limit number of results

### Insert
Insert new records into a table. Provide data as JSON:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "status": "active"
}
```

### Update
Update existing records. Requires a WHERE clause for safety:
- Provide new data as JSON
- Specify WHERE condition to target specific rows
- Returns updated rows

### Delete
Delete records from a table. Requires a WHERE clause to prevent accidental deletion of all data.

## Configuration

### Connection Settings
- **Host**: PostgreSQL server hostname or IP
- **Port**: Server port (default: 5432)
- **Database**: Database name
- **User**: Database user
- **Password**: User password
- **SSL**: Enable SSL connection

### Security Notes
- Use parameterized queries to prevent SQL injection
- UPDATE and DELETE operations require WHERE clauses
- Store credentials securely using environment variables
- Consider using connection pooling for better performance

## Examples

### Example 1: Select Users
Operation: Select
- Table: `users`
- Columns: `id,name,email`
- Where: `status = $1`
- Where Parameters: `active`
- Order By: `created_at DESC`
- Limit: `10`

### Example 2: Insert New User
Operation: Insert
- Table: `users`
- Data: `{"name": "Jane Smith", "email": "jane@example.com", "status": "active"}`
- Return Fields: `*`

### Example 3: Update User Status
Operation: Update
- Table: `users`
- Data: `{"status": "inactive", "updated_at": "2024-01-01"}`
- Where: `id = $1`
- Where Parameters: `123`

### Example 4: Complex Query
Operation: Execute Query
- Query: 
  ```sql
  SELECT u.name, COUNT(o.id) as order_count 
  FROM users u 
  LEFT JOIN orders o ON u.id = o.user_id 
  WHERE u.status = $1 
  GROUP BY u.name 
  HAVING COUNT(o.id) > $2
  ```
- Query Parameters: `active,5`

## Installation

The node uses the `pg` package for PostgreSQL connectivity. Install dependencies:

```bash
cd backend/custom-nodes/packages/postgres
npm install
```

## Error Handling

The node includes comprehensive error handling:
- Connection errors are caught and reported
- Invalid JSON data is validated
- SQL errors include detailed messages
- Each item is processed independently to prevent complete workflow failure
